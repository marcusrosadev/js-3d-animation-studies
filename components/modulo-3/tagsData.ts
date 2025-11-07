// Dados das suas skills/tecnologias
// SUBSTITUA pelos dados reais do seu CV

export interface TagData {
  id: string
  name: string
  experience: string
  projects: string[]
  color: string
  url?: string
}

export const tagsData: TagData[] = [
  {
    id: 'react',
    name: 'React',
    experience: '3 anos',
    projects: ['E-commerce Platform', 'Dashboard Admin', 'Social Media App'],
    color: '#61dafb',
    url: 'https://reactjs.org/'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    experience: '2 anos',
    projects: ['Portfolio Site', 'Blog Platform', 'E-commerce'],
    color: '#000000',
    url: 'https://nextjs.org/'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    experience: '2.5 anos',
    projects: ['All React Projects', 'Node.js APIs'],
    color: '#3178c6',
    url: 'https://www.typescriptlang.org/'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    experience: '2 anos',
    projects: ['REST APIs', 'Real-time Chat', 'Microservices'],
    color: '#339933',
    url: 'https://nodejs.org/'
  },
  {
    id: 'vue',
    name: 'Vue.js',
    experience: '1.5 anos',
    projects: ['Admin Dashboard', 'SPA Applications'],
    color: '#4fc08d',
    url: 'https://vuejs.org/'
  },
  {
    id: 'angular',
    name: 'Angular',
    experience: '1 ano',
    projects: ['Enterprise App', 'Internal Tools'],
    color: '#dd0031',
    url: 'https://angular.io/'
  },
  {
    id: 'svelte',
    name: 'Svelte',
    experience: '6 meses',
    projects: ['Performance App'],
    color: '#ff3e00',
    url: 'https://svelte.dev/'
  },
  {
    id: 'framer',
    name: 'Framer Motion',
    experience: '1 ano',
    projects: ['Portfolio Animations', 'UI Components'],
    color: '#ff0055',
    url: 'https://www.framer.com/motion/'
  },
  {
    id: 'gsap',
    name: 'GSAP',
    experience: '1 ano',
    projects: ['Scroll Animations', 'Interactive Websites'],
    color: '#88ce02',
    url: 'https://greensock.com/gsap/'
  },
  {
    id: 'threejs',
    name: 'Three.js',
    experience: '6 meses',
    projects: ['3D Portfolio', 'Interactive Experiences'],
    color: '#000000',
    url: 'https://threejs.org/'
  },
  {
    id: 'd3',
    name: 'D3.js',
    experience: '1 ano',
    projects: ['Data Visualizations', 'Charts'],
    color: '#f9a03c',
    url: 'https://d3js.org/'
  },
  {
    id: 'python',
    name: 'Python',
    experience: '4 anos',
    projects: ['Data Analysis', 'ML Models', 'Automation'],
    color: '#3776ab',
    url: 'https://www.python.org/'
  },
  {
    id: 'express',
    name: 'Express.js',
    experience: '2 anos',
    projects: ['REST APIs', 'Backend Services'],
    color: '#000000',
    url: 'https://expressjs.com/'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    experience: '1.5 anos',
    projects: ['Database Design', 'NoSQL Solutions'],
    color: '#47a248',
    url: 'https://www.mongodb.com/'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    experience: '2 anos',
    projects: ['Database Management', 'SQL Queries'],
    color: '#336791',
    url: 'https://www.postgresql.org/'
  },
  {
    id: 'git',
    name: 'Git',
    experience: '5 anos',
    projects: ['Version Control', 'CI/CD'],
    color: '#f05032',
    url: 'https://git-scm.com/'
  },
  {
    id: 'docker',
    name: 'Docker',
    experience: '1 ano',
    projects: ['Containerization', 'DevOps'],
    color: '#2496ed',
    url: 'https://www.docker.com/'
  },
  {
    id: 'aws',
    name: 'AWS',
    experience: '1 ano',
    projects: ['Cloud Infrastructure', 'Deployments'],
    color: '#ff9900',
    url: 'https://aws.amazon.com/'
  },
  {
    id: 'jest',
    name: 'Jest',
    experience: '2 anos',
    projects: ['Unit Testing', 'Integration Tests'],
    color: '#c21325',
    url: 'https://jestjs.io/'
  },
  {
    id: 'cypress',
    name: 'Cypress',
    experience: '1 ano',
    projects: ['E2E Testing', 'Test Automation'],
    color: '#17202c',
    url: 'https://www.cypress.io/'
  }
]

