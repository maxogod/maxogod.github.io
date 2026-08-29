
import { load } from 'js-yaml';
import languageEnYaml from '../../data/language_en.yaml?raw';
import languageEsYaml from '../../data/language_es.yaml?raw';

// Shapes of data/language_*.yaml
export type NavbarLinks = Record<string, string>;

export interface HomePageText {
    title: string;
    subTitle: string;
    about: string;
}

export interface AboutMeText {
    title: string;
    text: string;
}

export interface ProjectTitles {
    sys: string;
    web: string;
    datasci: string;
    games: string;
}

interface LanguageData {
    navbarLinks?: NavbarLinks;
    navbarGoBack?: string;
    homePage?: HomePageText;
    aboutMe?: AboutMeText;
    titles?: ProjectTitles;
    cvLink?: string;
}

const emptyHomePage: HomePageText = { title: '', subTitle: '', about: '' };
const emptyAboutMe: AboutMeText = { title: '', text: '' };
const emptyTitles: ProjectTitles = { sys: '', web: '', datasci: '', games: '' };

// Load language data
const languageEn = load(languageEnYaml) as LanguageData;
const languageEs = load(languageEsYaml) as LanguageData;

// Extract language data
export const englishNavbarLinks = languageEn.navbarLinks || {};
export const spanishNavbarLinks = languageEs.navbarLinks || {};
export const englishNavbarGoBack = languageEn.navbarGoBack || 'Go back';
export const spanishNavbarGoBack = languageEs.navbarGoBack || 'Volver';
export const englishHomePage = languageEn.homePage || emptyHomePage;
export const spanishHomePage = languageEs.homePage || emptyHomePage;
export const englishAboutMe = languageEn.aboutMe || emptyAboutMe;
export const spanishAboutMe = languageEs.aboutMe || emptyAboutMe;
export const englishTitles = languageEn.titles || emptyTitles;
export const spanishTitles = languageEs.titles || emptyTitles;
export const englishCvLink = languageEn.cvLink || '';
export const spanishCvLink = languageEs.cvLink || '';
