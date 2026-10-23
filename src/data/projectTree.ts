/** One picture and the pictures that branch off below it. */
export interface Shot {
  /** Position within the project, as in the file name: "1", "1.1", "1.1.2" */
  readonly id: string
  readonly image: string
  readonly description?: string
  /** At most two, and at most one of them has children of its own */
  readonly children: readonly Shot[]
}

export interface Project {
  /** Folder name, e.g. "proj3" */
  readonly folder: string
  readonly title?: string
  readonly date?: string
  readonly description?: string
  /** The main picture, "1" */
  readonly root: Shot
}

/** A row below the main picture: one or two shots hanging off the row above. */
export interface Step {
  readonly shots: readonly Shot[]
  /** Centre of the picture above, in percent of the picture column: where the curves start */
  readonly fromX: number
  /** Index in `shots` of the one the timeline continues from, or -1 on the last row */
  readonly parent: number
}

interface Info {
  title?: string
  date?: string
  description?: string
  texts: Record<string, string>
}

const SHOT_ID = /^1(\.[1-9]\d*)*$/
const PICTURE_PATH = /^\/images\/(proj(\d+))\/([^/]+)\.[a-z]+$/i
const INFO_PATH = /^\/images\/(proj\d+)\/info\.json$/

/**
 * Centre of a shot in its row, in percent of the row (the picture column plus an equal margin on
 * each side, see --grow in styles.css). Pair centres match the two columns and 4% gap there.
 */
export const shotX = (count: number, index: number) => (count === 1 ? 50 : index === 0 ? 24 : 76)

/**
 * Turns the files found under images/ into projects, ordered by folder number.
 * `pictures` maps paths like "/images/proj3/1.1.jpeg" to their URLs, `infos` maps
 * "/images/proj3/info.json" to its parsed content. Anything that can't be shown ends up in `warnings`.
 */
export function loadProjects(
  pictures: Readonly<Record<string, string>>,
  infos: Readonly<Record<string, unknown>>,
) {
  const warnings: string[] = []
  const folders = new Map<string, { number: number; images: Map<string, string> }>()
  for (const [path, url] of Object.entries(pictures)) {
    const match = PICTURE_PATH.exec(path)
    if (!match) {
      warnings.push(`${path}: not inside an images/projN folder, ignored`)
      continue
    }
    const [, folder, number, name] = match
    if (!SHOT_ID.test(name)) {
      warnings.push(`${path}: name should be 1, 1.1, 1.2, 1.1.1, ... ignored`)
      continue
    }
    const entry = folders.get(folder) ?? { number: Number(number), images: new Map<string, string>() }
    entry.images.set(name, url)
    folders.set(folder, entry)
  }

  const rawInfos = new Map<string, unknown>()
  for (const [path, raw] of Object.entries(infos)) {
    const match = INFO_PATH.exec(path)
    if (match) rawInfos.set(match[1], raw)
  }

  const projects: Project[] = []
  const byNumber = [...folders].sort(([, a], [, b]) => a.number - b.number)
  for (const [folder, { images }] of byNumber) {
    const info = readInfo(rawInfos.get(folder), folder, warnings)
    const root = buildShot('1', images, info.texts)
    if (!root) {
      warnings.push(`${folder}: has no main picture named 1, skipped`)
      continue
    }
    const shown = new Set(shotIds(root))
    for (const id of images.keys()) {
      if (!shown.has(id)) {
        warnings.push(
          `${folder}/${id}: not shown. A row holds two pictures, only one of them can have children, and every picture needs its parent`,
        )
      }
    }
    projects.push({ folder, title: info.title, date: info.date, description: info.description, root })
  }
  return { projects, warnings }
}

/** The rows below the main picture, following the one shot per row that has children. */
export function layoutSteps(root: Shot): Step[] {
  const steps: Step[] = []
  let node = root
  let fromX = 50
  while (node.children.length > 0) {
    const shots = node.children
    const parent = shots.findIndex((shot) => shot.children.length > 0)
    steps.push({ shots, fromX, parent })
    if (parent === -1) break
    fromX = shotX(shots.length, parent)
    node = shots[parent]
  }
  return steps
}

function buildShot(id: string, images: ReadonlyMap<string, string>, texts: Readonly<Record<string, string>>): Shot | undefined {
  const image = images.get(id)
  if (image === undefined) return undefined
  const children = [`${id}.1`, `${id}.2`].flatMap((childId) => buildShot(childId, images, texts) ?? [])
  const [first, second] = children
  // Only one of two side-by-side pictures may branch on, so pictures never shrink row by row; the first wins
  const bothBranch = first !== undefined && second !== undefined && first.children.length > 0 && second.children.length > 0
  return { id, image, description: texts[id], children: bothBranch ? [first, { ...second, children: [] }] : children }
}

function shotIds(shot: Shot): string[] {
  return [shot.id, ...shot.children.flatMap(shotIds)]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readInfo(raw: unknown, folder: string, warnings: string[]): Info {
  const info: Info = { texts: {} }
  if (raw === undefined) return info
  if (!isRecord(raw)) {
    warnings.push(`${folder}/info.json: should look like { "title": "...", "date": "...", "description": "..." }`)
    return info
  }
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value !== 'string') {
      warnings.push(`${folder}/info.json: "${key}" should be text in quotes, ignored`)
    } else if (key === 'title' || key === 'date' || key === 'description') {
      info[key] = value
    } else if (SHOT_ID.test(key)) {
      info.texts[key] = value
    } else {
      warnings.push(`${folder}/info.json: unknown key "${key}", ignored`)
    }
  }
  return info
}
