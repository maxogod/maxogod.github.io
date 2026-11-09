import { load } from 'js-yaml';
import languageEnYaml from '../../data/language_en.yaml?raw';
import languageEsYaml from '../../data/language_es.yaml?raw';
import { CategoryId } from '../@types/ProjectType';
import type { Season } from './season';

type Titled = { title: string; text: string };

export type AchievementId =
    | 'bottom'
    | 'firstLog' | 'archivist' | 'ping' | 'bubbles'
    | 'treasures' | 'runner' | 'cheat_code' | 'signal'
    | 'night' | 'polyglot';

export type TreasureId = 'map' | 'compass' | 'pearl' | 'anchor' | 'coins' | 'wheel';

export type SectionId = 'surface' | 'about' | 'projects' | 'contact' | 'abyss';
export type ZoneId = 'surface' | 'sunlight' | 'twilight' | 'midnight' | 'abyss';

/** Shape of data/language_{en,es}.yaml. */
export interface Copy {
    nav: {
        skip: string; settings: string; home: string; logbook: string; toDay: string; toNight: string;
        language: string; languageShort: string; mute: string; unmute: string;
    };
    sections: Record<SectionId, string>;
    zones: Record<ZoneId, string>;
    hud: { pressure: string; sonar: string; sonarKey: string; gauge: string };
    hero: { firstName: string; lastName: string; tagline: string; dive: string; sub: string };
    about: {
        title: string; subtitle: string; text: string; portrait: string;
        toolboxTitle: string; toolbox: { label: string; items: string[] }[];
        photosCaption: string; photos: string[];
    };
    projects: {
        title: string; intro: string; all: string;
        categories: Record<CategoryId, string>; short: Record<CategoryId, string>;
        open: string; loadMore: string; more: string; moreText: string; code: string; video: string;
        close: string; previous: string; next: string; builtWith: string; position: string;
    };
    contact: {
        title: string; text: string; github: string; linkedin: string;
        copyEmail: string; emailCopied: string; cv: string;
    };
    abyss: {
        title: string; text: string; treasures: string; treasuresDone: string;
        treasuresHint: string; ascend: string; footer: string;
    };
    game: {
        title: string; howTo: string; start: string; again: string; resume: string;
        score: string; best: string; over: string; newBest: string; paused: string; label: string;
    };
    logbook: {
        title: string; intro: string; achievements: string; treasures: string;
        bubbles: string; projects: string; best: string; reset: string; resetConfirm: string;
        close: string; unlocked: string; treasureFound: string; tips: string;
    };
    achievements: Record<AchievementId, Titled>;
    treasures: Record<TreasureId, string>;
    /** Greeting toast for each seasonal theme. */
    seasons: Record<Season, string>;
    cvLink: string;
}

type Loose = { [key: string]: unknown };
const isObject = (value: unknown): value is Loose =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

/** Fills keys missing from `override` with the ones in `base`, recursively. */
const withFallback = (base: Loose, override: unknown): Loose => {
    if (!isObject(override)) return base;
    const merged: Loose = { ...base };
    for (const [key, value] of Object.entries(override)) {
        merged[key] = isObject(value) && isObject(base[key]) ? withFallback(base[key] as Loose, value) : value;
    }
    return merged;
};

export const englishCopy = load(languageEnYaml) as Copy;
export const spanishCopy = withFallback(englishCopy as unknown as Loose, load(languageEsYaml)) as unknown as Copy;

/** Replaces `{name}` placeholders in a copy string. */
export const fill = (template: string, values: Record<string, string | number>): string =>
    template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
