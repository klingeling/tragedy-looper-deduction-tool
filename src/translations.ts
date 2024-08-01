import { characters } from './model/characters';
import { incidents } from './model/incidents';
import { plots } from './model/plots';
import { roles } from './model/roles';
import { tragedySets } from './model/tragedySets';
import { translations as data } from './data-translations';
import { browser } from '$app/environment';
import { getLocalisatio } from './storage';

const toCheck = [characters, incidents, plots, roles, tragedySets,
    ...[
        "Missing Translations",
        "Key",
        "Translation",
        "Language",
        "Home",
        "Only show Missing",
        "Github Reposetory",
        "Print View",
        "Tablet View",
        "Compakt View",
        "Tragedy Looper Deduction overview",
        "Touch optimized View",
        "Rendering",
        "Roles",
        "Day",
        "Incidents",

        "For your Language there are missing translations, if you have time and fun you can help and add some localisations using the below. And post them on Github.",
        "Translation Overview",

        "Main Plot",
        "Sub Plot",
        "Characters",
        "Goodwill Refusel",
        "Special Rule",
        "Mastermind removes \"Forbid Goodwill\" from his hand. It cannot be used in any loop",
        "Over all Roles",
        "Once per {type}",
        "(Immortal)",
        "Day {day}",
        "Goodwill refusal",
        "If You translated somthing please open an issue on Github, and post the exported text, or if you know how to do it directly open a pull request.",
        "This shoould list all texts used and not yet translated in your language. However it's not applied everywhere yet. Player Aid should be colpletly set, but others are missing.",
        'After I inculdede your text, everyone should see your texts online. Currently your translations are stored in your borwesr, so you can check if it works like expocted. Those are marked with `«»` .',
    ],
];

const missingInToCheck: Set<string> = new Set();

const translation: Record<string, Record<string, string>> = data;




export function getString(key: string | undefined, lang: string | undefined, ...params: { name: string, value: unknown }[]) {
    if (!key) {
        return "";
    }


    key = key.trim()
    const toTest = getAllStrings(toCheck);
    if (!toTest.includes(key)) {
        missingInToCheck.add(key);
        console.info('Missing Translations', [...missingInToCheck]);
    }

    if (!lang) {
        return key;
    }
    let translated = translation[lang]?.[key] ?? key;

    const localTranslation =
        (browser && getLocalisatio(lang) && getLocalisatio(lang)[key]) ? getLocalisatio(lang)[key] : undefined;

    if (localTranslation && localTranslation != translated)
        translated = '«' + localTranslation + '»';


    params?.forEach(e => {
        translated = translated.replaceAll(`{${e.name}}`, `${e.value}`);
    })

    return translated;


}

export function getAllTranslationsForLanguage(lang: string) {
    const currentTranslation = { ...translation[lang], ...((browser && getLocalisatio(lang)) ? getLocalisatio(lang) : undefined) } ?? {};


    if (lang == 'en') {
        getAllStrings(toCheck).filter(x => x.length > 0).forEach(key => {
            if (currentTranslation[key] == undefined || currentTranslation[key].length == 0) {
                currentTranslation[key] = key;
            }
        });
    }
    return currentTranslation;
}
export function getMissingForLanguage(lang: string) {
    if (lang == 'en') {
        return [];
    }
    const currentTranslation = translation[lang] ?? {};

    const alreadyTranslated = Object.keys(currentTranslation ?? {}).filter(key => currentTranslation[key]?.length ?? 0 > 0);
    const neededKeys = getAllStrings(toCheck).filter(x => x.length > 0);

    return neededKeys.filter(x => !alreadyTranslated.includes(x));
}

export function getAllKeys(): string[] {
    return getAllStrings(toCheck).filter(x => x.length > 0);
}
function getAllStrings(obj: unknown): string[] {
    if (typeof obj === 'string') {
        return [obj.trim()];
    } else if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
            return obj.flatMap(getAllStrings);
        } else {
            return Object.values(obj).flatMap(getAllStrings);
        }
    }
    return [];
}
