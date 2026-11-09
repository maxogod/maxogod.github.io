export const CATEGORIES = ['sys', 'web', 'datasci', 'games'] as const;
export type CategoryId = typeof CATEGORIES[number];

/** One entry of data/projects_{en,es}.yaml. */
interface ProjectType {
    name: string;
    description: string;
    image: string;
    url: string;
    vid: string;
    technologies: string[];
    /** Marks the "check out my github" card that closes each section. */
    more?: boolean;
}

/** A project after loading: image resolved, plus routing info. */
export interface Project extends ProjectType {
    slug: string;
    category: CategoryId;
}

export interface ProjectsData {
    sys_projects: ProjectType[];
    web_projects: ProjectType[];
    datasci_projects: ProjectType[];
    game_projects: ProjectType[];
}

export type ProjectsByCategory = Record<CategoryId, Project[]>;

export default ProjectType;
