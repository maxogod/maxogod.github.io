interface ProjectType {
    name: string;
    description: string;
    image: string;
    url: string;
    vid: string;
    technologies: string[];
}

export interface ProjectsData {
    sys_projects: ProjectType[];
    web_projects: ProjectType[];
    datasci_projects: ProjectType[];
    game_projects: ProjectType[];
    technologyColors: { [key: string]: string };
}

export default ProjectType;