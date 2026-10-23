// Runnable check for projectTree.ts: npm run check
import { layoutSteps, loadProjects } from './projectTree.ts'

function check(condition: boolean, message: string) {
  if (!condition) throw new Error(`check failed: ${message}`)
}

const files = [
  'proj10/1.jpg',
  // proj2: only 1.2 branches on, 1.3 is one too many
  'proj2/1.jpeg', 'proj2/1.1.jpeg', 'proj2/1.2.jpeg', 'proj2/1.2.1.png', 'proj2/1.2.2.png', 'proj2/1.3.jpg',
  // proj5: both of the pair have children, the first wins
  'proj5/1.jpg', 'proj5/1.1.jpg', 'proj5/1.2.jpg', 'proj5/1.1.1.jpg', 'proj5/1.2.1.jpg',
  // proj7: a lone child
  'proj7/1.jpg', 'proj7/1.1.jpg',
  // proj3: no main picture
  'proj3/1.1.jpg',
  'proj2/notes.jpg',
]
const { projects, warnings } = loadProjects(
  Object.fromEntries(files.map((file) => [`/images/${file}`, `url/${file}`])),
  { '/images/proj2/info.json': { title: 'Two', '1.2': 'second', count: 3 } },
)

check(projects.map((p) => p.folder).join() === 'proj2,proj5,proj7,proj10', 'sorted by number, proj3 skipped')
const [two, five, seven, ten] = projects
check(two.title === 'Two' && two.root.children[1].description === 'second', 'texts from info.json')

const twoSteps = layoutSteps(two.root)
check(twoSteps.length === 2, 'proj2 has two rows')
check(twoSteps[0].fromX === 50 && twoSteps[0].parent === 1, 'row 1 starts at the main picture, continues from 1.2')
check(twoSteps[1].fromX === 76 && twoSteps[1].parent === -1, 'row 2 starts under the right picture')
check(twoSteps[1].shots.map((s) => s.id).join() === '1.2.1,1.2.2', 'row 2 holds 1.2.1 and 1.2.2')

check(five.root.children[0].children.length === 1 && five.root.children[1].children.length === 0, 'first of the pair wins')
check(layoutSteps(seven.root)[0].shots.length === 1, 'lone child is one shot')
check(layoutSteps(ten.root).length === 0, 'no children, no rows')

for (const expected of ['proj2/1.3', 'proj5/1.2.1', 'proj3: has no main picture', 'notes.jpg', '"count"']) {
  check(warnings.some((w) => w.includes(expected)), `warns about ${expected}`)
}

console.log('projectTree: all checks passed')
