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

// Function to resolve image paths from config
const resolveImage = (imagePath: string) => {
    return new URL(`../${imagePath}`, import.meta.url).href;
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
