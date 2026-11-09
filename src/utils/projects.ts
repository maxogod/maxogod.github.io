import { load } from 'js-yaml';
import ProjectType, { CategoryId, Project, ProjectsByCategory, ProjectsData } from '../@types/ProjectType';
import projectsEnYaml from '../../data/projects_en.yaml?raw';
import projectsEsYaml from '../../data/projects_es.yaml?raw';
import technologyColorsYaml from '../../data/technology_colors.yaml?raw';

export const technologyColors = load(technologyColorsYaml) as Record<string, string>;

const assetUrls = import.meta.glob('../assets/*', {
    eager: true,
    query: '?url',
    import: 'default',
}) as Record<string, string>;

/** Resolves an `assets/x.jpg` path from YAML to its bundled URL. */
export const resolveImage = (imagePath: string): string => assetUrls[`../${imagePath}`] ?? imagePath;

export const slugify = (text: string): string =>
    text
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

const sectionKeys: Record<CategoryId, keyof ProjectsData> = {
    sys: 'sys_projects',
    web: 'web_projects',
    datasci: 'datasci_projects',
    games: 'game_projects',
};

const processProjects = (data: ProjectsData): ProjectsByCategory => {
    const result = {} as ProjectsByCategory;
    for (const category of Object.keys(sectionKeys) as CategoryId[]) {
        const list: ProjectType[] = data[sectionKeys[category]] || [];
        result[category] = list.map(project => ({
            ...project,
            image: resolveImage(project.image),
            technologies: project.technologies || [],
            slug: slugify(project.name),
            category,
        }));
    }
    return result;
};

export const englishProjects: ProjectsByCategory = processProjects(load(projectsEnYaml) as ProjectsData);
export const spanishProjects: ProjectsByCategory = processProjects(load(projectsEsYaml) as ProjectsData);

/** Projects for one category, or all categories deduplicated by name (first occurrence wins). */
export const listProjects = (projects: ProjectsByCategory, category: CategoryId | 'all'): Project[] => {
    if (category !== 'all') return projects[category].filter(p => !p.more);
    const seen = new Set<string>();
    const all: Project[] = [];
    for (const list of Object.values(projects)) {
        for (const project of list) {
            if (project.more || seen.has(project.slug)) continue;
            seen.add(project.slug);
            all.push(project);
        }
    }
    return all;
};

/** The trailing "more on GitHub" card, if the data has one. */
export const findMoreCard = (projects: ProjectsByCategory): Project | undefined =>
    Object.values(projects).flat().find(p => p.more);

/** Projects shown per page; "Load more" adds this many. Desktop is a multiple of 3 so the 3-column grid stays full. */
export const PROJECTS_PER_PAGE = { desktop: 9, mobile: 4 };

export type Filter = CategoryId | 'all';

/** Hash route for a project filter, optionally with an open project. */
export const projectPath = (filter: Filter, slug?: string) => {
    if (slug) return `/projects/${filter}/${slug}`;
    return filter === 'all' ? '/' : `/projects/${filter}`;
};
