
import yaml from 'js-yaml';
import languageEnYaml from '../../data/language_en.yaml?raw';
import languageEsYaml from '../../data/language_es.yaml?raw';

// Load language data
const languageEn = yaml.load(languageEnYaml) as any;
const languageEs = yaml.load(languageEsYaml) as any;

// Extract language data
export const englishNavbarLinks = languageEn.navbarLinks || {};
export const spanishNavbarLinks = languageEs.navbarLinks || {};
export const englishNavbarGoBack = languageEn.navbarGoBack || 'Go back';
export const spanishNavbarGoBack = languageEs.navbarGoBack || 'Volver';
export const englishHomePage = languageEn.homePage || {};
export const spanishHomePage = languageEs.homePage || {};
export const englishAboutMe = languageEn.aboutMe || {};
export const spanishAboutMe = languageEs.aboutMe || {};
export const englishTitles = languageEn.titles || {};
export const spanishTitles = languageEs.titles || {};
export const englishCvLink = languageEn.cvLink || '';
export const spanishCvLink = languageEs.cvLink || '';
