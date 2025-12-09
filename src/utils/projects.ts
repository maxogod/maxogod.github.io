import yaml from 'js-yaml';
import { ProjectsData } from '../@types/ProjectType';
import projectsEnYaml from '../../data/projects_en.yaml?raw';
import projectsEsYaml from '../../data/projects_es.yaml?raw';
import technologyColorsYaml from '../../data/technology_colors.yaml?raw';

// Load project data
const projectsEn: ProjectsData = yaml.load(projectsEnYaml) as ProjectsData;
const projectsEs: ProjectsData = yaml.load(projectsEsYaml) as ProjectsData;

// Load technology colors
export const technologyColors: { [key: string]: string } = yaml.load(technologyColorsYaml) as { [key: string]: string };

// Extract project arrays
const englishSysProjects = projectsEn.sys_projects || [];
const spanishSysProjects = projectsEs.sys_projects || [];
const englishWebProjects = projectsEn.web_projects || [];
const spanishWebProjects = projectsEs.web_projects || [];
const englishDatasciProjects = projectsEn.datasci_projects || [];
const spanishDatasciProjects = projectsEs.datasci_projects || [];
const englishGameProjects = projectsEn.game_projects || [];
const spanishGameProjects = projectsEs.game_projects || [];

// Import images dynamically based on image names
const imageImports: { [key: string]: string } = {
    gh: new URL("../assets/gh.png", import.meta.url).href,
    truco: new URL("../assets/truco.jpeg", import.meta.url).href,
    alacarta: new URL("../assets/alacarta.png", import.meta.url).href,
    gymchad: new URL("../assets/gymchad.png", import.meta.url).href,
    routine_manager: new URL("../assets/routine.png", import.meta.url).href,
    save_the_galaxy: new URL("../assets/save_the_galaxy.png", import.meta.url).href,
    jazz: new URL("../assets/jazz.jpg", import.meta.url).href,
    ai: new URL("../assets/ai.png", import.meta.url).href,
    etl: new URL("../assets/etl.png", import.meta.url).href,
    nlp: new URL("../assets/nlp.png", import.meta.url).href,
    donkey: new URL("../assets/donkey.jpg", import.meta.url).href,
    concuride: new URL("../assets/concuride.jpg", import.meta.url).href,
    udp: new URL("../assets/udp.jpg", import.meta.url).href,
    classconnect: new URL("../assets/cc.png", import.meta.url).href,
    firewall: new URL("../assets/firewall.jpg", import.meta.url).href,
    dl: new URL("../assets/dl.png", import.meta.url).href
};

// Function to resolve image paths
const resolveImage = (imageName: string) => {
    return imageImports[imageName] || imageImports.gh; // fallback to gh if not found
};

// Process projects to include resolved images
const processProjects = (projects: any[]) => {
    return projects.map(project => ({
        ...project,
        image: resolveImage(project.image)
    }));
};

// Export processed projects
export const english_sys_projects = processProjects(englishSysProjects);
export const spanish_sys_projects = processProjects(spanishSysProjects);
export const english_web_projects = processProjects(englishWebProjects);
export const spanish_web_projects = processProjects(spanishWebProjects);
export const english_datasci_projects = processProjects(englishDatasciProjects);
export const spanish_datasci_projects = processProjects(spanishDatasciProjects);
export const english_game_projects = processProjects(englishGameProjects);
export const spanish_game_projects = processProjects(spanishGameProjects);
