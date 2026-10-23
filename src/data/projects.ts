import { loadProjects } from './projectTree'

// Every picture in images/projN/ and each folder's info.json, found at build time.
// Adding or renaming files there updates the page, no code changes needed.
const pictures = import.meta.glob<string>('/images/proj*/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const infos = import.meta.glob<unknown>('/images/proj*/info.json', { eager: true, import: 'default' })

const loaded = loadProjects(pictures, infos)
for (const warning of loaded.warnings) console.warn(`[projects] ${warning}`)

/** The timeline, in folder order: proj1 first. */
export const projects = loaded.projects
