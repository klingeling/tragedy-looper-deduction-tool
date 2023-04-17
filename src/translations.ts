import { characters } from './model/characters';
import { incidents } from './model/incidents';
import { plots } from './model/plots';
import { roles } from './model/roles';
import { tragedySets } from './model/tragedySets';
import { translations as data } from './data-translations';

const toCheck = [characters, incidents, plots, roles, tragedySets,
    ...[
        "Missing Translations",
        "Key",
        "Translation"
    ],
    ...[
        "For your Language there are missing translations, if you have time and fun you can help and add some localisations using the below. And post them on Github.",
        "Translation Overview"
    ],
    ...[
        "Main Plot",
        "Characters",
        "Goodwill Refusel",
        "Once per {type}",
        "(Immortal)",
        "Day {day}",
        "Goodwill refusal"
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


    params?.forEach(e => {
        translated = translated.replaceAll(`{${e.name}}`, `${e.value}`);
    })

    return translated;


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
