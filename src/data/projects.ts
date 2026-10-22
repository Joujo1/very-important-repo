export interface SubProject {
  readonly description: string
  /** Path inside /public, e.g. "images/project-1.jpeg" */
  readonly image: string
  readonly link?: string
}

/** One step below the parent picture: a single sub-project, or two side by side. */
export type SubStep = SubProject | readonly [SubProject, SubProject]

// shortcut: one level of sub-projects only, add nesting when a 5.1.1 shows up
/** A project on the timeline. Its children hang below its picture (5.1, 5.2, ...). */
export interface Project extends SubProject {
  readonly title: string
  readonly date: string
  readonly children?: readonly SubStep[]
}

/** The timeline, oldest first. */
export const projects: readonly Project[] = [
  {
    date: '2020',
    title: 'Original Lime-Scooter',
    description:
      'Altough we are in no way associated with Lime, we have made great contributions to the scooter market. Furthermore, security has always been our top priority, without compromising comfort.',
    image: 'images/1.jpeg',
  },
  {
    date: '2021',
    title: 'Rocket-Pallet',
    description:
      'Im happy to reveal our transformative, revolutionary and market-destroying logistics solution.',
    image: 'images/2.jpeg',
    children: [
      { description: 'Testing – works.', image: 'images/2.1.jpeg' },
      { description: 'Manufacturing – in our Suva-approved cleanroom, every pallet is made with handcrafted swiss care.', image: 'images/2.2.jpeg' },
    ],
  },
  {
    date: '2022',
    title: 'Car',
    description:
      '',
    image: 'images/3.jpeg',
  },
  {
    date: '2023',
    title: 'Model 0',
    description:
      'Continuing our tradition of building safe and sound vehicles.',
    image: 'images/4.jpeg',
    children: [
      [
        { description: 'Two follow-ups that ran at the same time, side by side.', image: 'images/4.1.jpeg' },
        { description: 'The second of the pair.', image: 'images/4.2.jpeg' },
      ],
    ],
  },
  {
    date: '2024',
    title: 'Project five',
    description: 'What this project was about and what you did on it.',
    image: 'images/5.jpeg',
    children: [{ description: 'A spin-off that grew out of project five.', image: 'images/5.1.jpeg' }],
  },
  {
    date: '2025',
    title: 'Project six',
    description: 'What this project was about and what you did on it.',
    image: 'images/6.jpeg',
    children: [
      { description: 'A follow-up to project six.', image: 'images/6.1.jpeg' },
      { description: 'Another follow-up to project six.', image: 'images/6.2.jpeg' },
    ],
  },
  {
    date: '2026',
    title: 'Project seven',
    description: 'What this project was about and what you did on it.',
    image: 'images/7.jpeg',
    children: [{ description: 'A follow-up to project seven.', image: 'images/7.1.jpeg' }],
  },
  {
    date: '2026',
    title: 'Project eight',
    description:
      'My most recent work.',
    image: 'images/8.jpeg',
  },
]
