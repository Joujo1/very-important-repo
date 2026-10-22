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
    date: '2022',
    title: 'Project one',
    description:
      'A short description of what you built, which tools you used, and the part you’re proudest of. Two or three sentences is plenty.',
    image: 'images/project-1.jpeg',
    link: '#',
  },
  {
    date: '2023',
    title: 'Project two',
    description:
      'What problem did this solve, and for whom? Mention one concrete result if you have one, like users, a grade, or time saved.',
    image: 'images/project-2.jpeg',
    link: '#',
  },
  {
    date: '2024',
    title: 'Project three',
    description:
      'Describe your role here. Did you build it alone or with a team, and which part was yours?',
    image: 'images/project-3.jpeg',
    link: '#',
  },
  {
    date: '2025',
    title: 'Project four',
    description:
      'Something you learned from this project, or what you would do differently next time.',
    image: 'images/project-4.jpeg',
    link: '#',
    children: [
      [
        {
          description: 'Two follow-ups that ran at the same time, side by side.',
          image: 'images/project-4-1.jpeg',
        },
        {
          description: 'The second of the pair.',
          image: 'images/project-4-2.jpeg',
        },
      ],
    ],
  },
  {
    date: '2026',
    title: 'Project five',
    description:
      'Your most recent work. Put your strongest project here or at the top, since those are the ones people actually read.',
    image: 'images/project-5.jpeg',
    link: '#',
    children: [
      {
        description: 'A spin-off that grew out of project five.',
        image: 'images/project-5-1.jpeg',
      },
      {
        description: 'Another follow-up to project five.',
        image: 'images/project-5-2.jpeg',
      },
    ],
  },
]
