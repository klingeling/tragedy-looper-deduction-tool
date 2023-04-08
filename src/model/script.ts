import { toRecord } from "../misc";
import type { CharacterNames, CharactersComesInLaterLoop, CharactersScriptSpecifiedLocation, Locations } from "./characters";
import type { IncidentNames } from "./incidents";
import type { PlotNames } from "./plots";
import type { RoleNames } from "./roles";
import type { TragedySetNames } from "./tragedySets";


export type ScriptParameter = {
    tragedy: TragedySetNames;
    characters: CharacterNames[];
    incident: Omit<ScriptIncident, 'culprit'>[];
    spectalRules?: string[];
};

export type ScriptIncident = {
    day: number,
    incident: IncidentNames,
    culprit: CharacterNames,
};

export type Script = {
    titel: string,
    creator: string,

    set?: {
        name: string,
        number: number
    },
    difficultySets: readonly {
        numberOfLoops: number,
        difficulty: number,
    }[],
    tragedySet: TragedySetNames,
    mainPlot: readonly PlotNames[],
    subPlots: readonly PlotNames[],
    daysPerLoop: number,
    cast: Partial<Record<Exclude<Exclude<CharacterNames, CharactersComesInLaterLoop>, CharactersScriptSpecifiedLocation>, RoleNames>>
    & Partial<Record<CharactersComesInLaterLoop, readonly [RoleNames, number]>>
    & Partial<Record<CharactersScriptSpecifiedLocation, readonly [RoleNames, Locations]>>,
    incidents: readonly ScriptIncident[],
    specialRules?:string,
    specifics: string,
    story: string,
    mastermindHints: string,
};



export type ScriptNames = Scripts['scripts'][never]['titel'];

class Scripts {
    public readonly scripts = [

        {
            titel: 'The frist Script',
            creator: 'BakaFire',
            set: {
                name: 'Tragedy Looper',
                number: 1,
            },
            tragedySet: 'Frist Steps',
            daysPerLoop: 4,
            difficultySets: [
                {
                    numberOfLoops: 3,
                    difficulty: 1,
                }
            ],
            mainPlot: ['Murder Plan'],
            subPlots: ['Shadow of the Ripper'],
            cast: {
                'Boy Student': 'Person',
                'Girl Student': 'Key Person',
                'Shrine Maiden': 'Serial Killer',
                'Police Officer': 'Conspiracy Theorist',
                'Doctor': 'Brain',
            },
            incidents: [
                {
                    day: 2,
                    incident: "Murder",
                    culprit: "Office Worker"
                },
                {
                    day: 3,
                    incident: "Suicide",
                    culprit: "Girl Student"
                },
            ],
            specifics: 'See Tragedy Looper Mastermind Handbook',
            story: 'See Tragedy Looper Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper Mastermind Handbook',
        },
        {
            titel: 'Prevailing Secrecy',
            creator: 'BakaFire',
            set: {
                name: 'Tragedy Looper',
                number: 2,
            },
            tragedySet: 'Frist Steps',
            daysPerLoop: 5,
            difficultySets: [
                {
                    numberOfLoops: 4,
                    difficulty: 1,
                },
                {
                    numberOfLoops: 3,
                    difficulty: 3,
                }
            ],
            mainPlot: ['A Place to Protect'],
            subPlots: ['An Unsettling Rumor'],
            cast: {
                'Boy Student': 'Cultist',
                'Girl Student': 'Person',
                'Shrine Maiden': 'Conspiracy Theorist',
                'Office Worker': 'Person',
                'Doctor': 'Key Person',
                'Patient': 'Person',
            },
            incidents: [
                {
                    day: 1,
                    incident: "Increasing Unease",
                    culprit: "Shrine Maiden"
                },
                {
                    day: 3,
                    incident: "Hospital Incident",
                    culprit: "Boy Student"
                },
                {
                    day: 5,
                    incident: "Faraway Murder",
                    culprit: "Patient"
                },
            ],
            specifics: 'See Tragedy Looper Mastermind Handbook',
            story: 'See Tragedy Looper Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper Mastermind Handbook',
        },
        {
            titel: 'Young Women’s Battlefield',
            creator: 'Gayusu',
            set: {
                name: 'Tragedy Looper',
                number: 3,
            },
            tragedySet: 'Basic Tragedy',
            daysPerLoop: 6,
            difficultySets: [
                {
                    numberOfLoops: 4,
                    difficulty: 2,
                },
                {
                    numberOfLoops: 3,
                    difficulty: 4,
                }
            ],
            mainPlot: ['Sign with me!'],
            subPlots: [
                'A Love Affair',
                'The hidden Freak'
            ],
            cast: {
                'Boy Student': 'Person',
                'Girl Student': 'Frind',
                'Class Rep': 'Loved One',
                'Shrine Maiden': 'Key Person',
                'Police Officer': 'Person',
                'Office Worker': 'Lover',
                'Informer': 'Serial Killer',
                'Patient': 'Person',
                'Nurse': 'Person',
            },
            incidents: [
                {
                    day: 3,
                    incident: "Foul Evil",
                    culprit: "Office Worker"
                },
                {
                    day: 4,
                    incident: "Increasing Unease",
                    culprit: "Class Rep"
                },
                {
                    day: 6,
                    incident: "Suicide",
                    culprit: "Girl Student"
                },
            ],
            specifics: 'See Tragedy Looper Mastermind Handbook',
            story: 'See Tragedy Looper Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper Mastermind Handbook',
        },

        {
            titel: 'Lesser of two Evils',
            creator: 'GEnd',
            set: {
                name: 'Tragedy Looper',
                number: 4,
            },
            tragedySet: 'Basic Tragedy',
            daysPerLoop: 7,
            difficultySets: [
                {
                    numberOfLoops: 4,
                    difficulty: 3,
                },
                {
                    numberOfLoops: 3,
                    difficulty: 4,
                }
            ],
            mainPlot: ['The Sealed Item'],
            subPlots: [
                'The hidden Freak',
                'Unknown Factor X'
            ],
            cast: {
                'Boy Student': 'Person',
                'Girl Student': 'Person',
                'Rich Man’s Daughter': 'Brain',
                'Shrine Maiden': 'Frind',
                'Office Worker': 'Serial Killer',
                'Informer': 'Person',
                'Journalist': 'Factor',
                'Patient': 'Person',
                'Nurse': 'Cultist',
            },
            incidents: [
                {
                    day: 2,
                    incident: "Increasing Unease",
                    culprit: "Rich Man’s Daughter"
                },
                {
                    day: 4,
                    incident: "Missing Person",
                    culprit: "Nurse"
                },
                {
                    day: 5,
                    incident: "Missing Person",
                    culprit: "Boy Student"
                },
                {
                    day: 7,
                    incident: "Suicide",
                    culprit: "Journalist"
                },
            ],
            specifics: 'See Tragedy Looper Mastermind Handbook',
            story: 'See Tragedy Looper Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper Mastermind Handbook',
        },

        {
            titel: 'Ihe Secret that was keept',
            creator: 'BakaFire',
            set: {
                name: 'Tragedy Looper',
                number: 5,
            },
            tragedySet: 'Basic Tragedy',
            daysPerLoop: 7,
            difficultySets: [
                {
                    numberOfLoops: 4,
                    difficulty: 3,
                },
                {
                    numberOfLoops: 3,
                    difficulty: 5,
                }
            ],
            mainPlot: ['Giant Time Bomb'],
            subPlots: [
                'Threads of Fate',
                'Circle of Friends'
            ],
            cast: {
                'Rich Man’s Daughter': 'Witch',
                'Class Rep': 'Person',
                'Shrine Maiden': 'Person',
                'Alien': 'Frind',
                'Office Worker': 'Frind',
                'Informer': 'Conspiracy Theorist',
                'Pop Idol': 'Person',
                'Journalist': 'Person',
                'Patient': 'Person',
            },
            incidents: [
                {
                    day: 2,
                    incident: "Suicide",
                    culprit: "Rich Man’s Daughter"
                },
                {
                    day: 3,
                    incident: "Missing Person",
                    culprit: "Office Worker"
                },
                {
                    day: 4,
                    incident: "Hospital Incident",
                    culprit: "Journalist"
                },
                {
                    day: 6,
                    incident: "Spreading",
                    culprit: "Shrine Maiden"
                },
                {
                    day: 7,
                    incident: "Foul Evil",
                    culprit: "Pop Idol"
                },
            ],
            specifics: 'See Tragedy Looper Mastermind Handbook',
            story: 'See Tragedy Looper Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper Mastermind Handbook',
        },
        {
            titel: 'The Future of the Goods',
            creator: 'Nightly Moonfire group',
            set: {
                name: 'Tragedy Looper',
                number: 6,
            },
            tragedySet: 'Basic Tragedy',
            daysPerLoop: 7,
            difficultySets: [
                {
                    numberOfLoops: 4,
                    difficulty: 4,
                },
            ],
            mainPlot: ['Change of Future'],
            subPlots: [
                'The hidden Freak',
                'A Love Affair'
            ],
            cast: {
                'Boy Student': 'Time Traveler',
                'Rich Man’s Daughter': 'Person',
                'Shrine Maiden': 'Cultist',
                'Godly Being': ['Loved One', 3],
                'Police Officer': 'Person',
                'Office Worker': 'Serial Killer',
                'Pop Idol': 'Lover',
                'Patient': 'Person',
                'Nurse': 'Frind',
            },
            incidents: [
                {
                    day: 2,
                    incident: "Suicide",
                    culprit: "Pop Idol"
                },
                {
                    day: 4,
                    incident: "Increasing Unease",
                    culprit: "Shrine Maiden"
                },
                {
                    day: 5,
                    incident: "Butterfly Effect",
                    culprit: "Police Officer"
                },
                {
                    day: 7,
                    incident: "Foul Evil",
                    culprit: "Patient"
                },
            ],
            specifics: 'See Tragedy Looper Mastermind Handbook',
            story: 'See Tragedy Looper Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper Mastermind Handbook',
        },
        {
            titel: 'Mirror Passcode',
            creator: 'M. Hydromel',
            set: {
                name: 'Tragedy Looper',
                number: 7,
            },
            tragedySet: 'Basic Tragedy',
            daysPerLoop: 7,
            difficultySets: [
                {
                    numberOfLoops: 4,
                    difficulty: 4,
                },
                {
                    numberOfLoops: 3,
                    difficulty: 6,
                },
            ],
            mainPlot: ['Sign with me!'],
            subPlots: [
                'Unknown Factor X',
                'Paranoia Virus'
            ],
            cast: {
                'Boy Student': 'Person',
                'Girl Student': 'Key Person',
                'Rich Man’s Daughter': 'Factor',
                'Mystery Boy': 'Cultist',
                'Office Worker': 'Person',
                'Informer': 'Conspiracy Theorist',
                'Journalist': 'Person',
                'Patient': 'Person',
                'Nurse': 'Person',
            },
            incidents: [
                {
                    day: 3,
                    incident: "Missing Person",
                    culprit: "Rich Man’s Daughter"
                },
                {
                    day: 4,
                    incident: "Increasing Unease",
                    culprit: "Journalist"
                },
                {
                    day: 5,
                    incident: "Hospital Incident",
                    culprit: "Mystery Boy"
                },
                {
                    day: 7,
                    incident: "Murder",
                    culprit: "Boy Student"
                },
            ],
            specifics: 'See Tragedy Looper Mastermind Handbook',
            story: 'See Tragedy Looper Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper Mastermind Handbook',
        },
        {
            titel: 'Those with Antibodies',
            creator: 'Satoshi Sawamura',
            set: {
                name: 'Tragedy Looper',
                number: 8,
            },
            tragedySet: 'Basic Tragedy',
            daysPerLoop: 4,
            difficultySets: [
                {
                    numberOfLoops: 5,
                    difficulty: 5,
                },
                {
                    numberOfLoops: 4,
                    difficulty: 6,
                },
            ],
            mainPlot: ['Change of Future'],
            subPlots: [
                'Threads of Fate',
                'Paranoia Virus'
            ],
            cast: {
                'Girl Student': 'Person',
                'Rich Man’s Daughter': 'Conspiracy Theorist',
                'Class Rep': 'Person',
                'Shrine Maiden': 'Cultist',
                'Police Officer': 'Person',
                'Office Worker': 'Person',
                'Informer': 'Conspiracy Theorist',
                'Doctor': 'Person',
                'Patient': 'Person',
                'Henchman': 'Time Traveler',
            },
            incidents: [
                {
                    day: 1,
                    incident: "Butterfly Effect",
                    culprit: "Rich Man’s Daughter"
                },
                {
                    day: 2,
                    incident: "Foul Evil",
                    culprit: "Henchman"
                },
                {
                    day: 3,
                    incident: "Spreading",
                    culprit: "Doctor"
                },
                {
                    day: 4,
                    incident: "Missing Person",
                    culprit: "Police Officer"
                },
            ],
            specifics: 'See Tragedy Looper Mastermind Handbook',
            story: 'See Tragedy Looper Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper Mastermind Handbook',
        },
        {
            titel: 'Prologue',
            creator: 'BakaFrie',
            set: {
                name: 'Tragedy Looper',
                number: 9,
            },
            tragedySet: 'Basic Tragedy',
            daysPerLoop: 7,
            difficultySets: [
                {
                    numberOfLoops: 5,
                    difficulty: 5,
                },
                {
                    numberOfLoops: 4,
                    difficulty: 7,
                },
            ],
            mainPlot: ['Murder Plan'],
            subPlots: [
                'Circle of Friends',
                'A Love Affair'
            ],
            cast: {
                'Boy Student': 'Lover',
                'Girl Student': 'Loved One',
                'Rich Man’s Daughter': 'Killer',
                'Shrine Maiden': 'Key Person',
                'Police Officer': 'Conspiracy Theorist',
                'Office Worker': 'Person',
                'Informer': 'Frind',
                'Doctor': 'Brain',
                'Patient': 'Frind',
            },
            incidents: [
                {
                    day: 2,
                    incident: "Increasing Unease",
                    culprit: "Office Worker"
                },
                {
                    day: 4,
                    incident: "Suicide",
                    culprit: "Girl Student"
                },
                {
                    day: 5,
                    incident: "Hospital Incident",
                    culprit: "Boy Student"
                },
                {
                    day: 7,
                    incident: "Murder",
                    culprit: "Police Officer"
                },
            ],
            specifics: 'See Tragedy Looper Mastermind Handbook',
            story: 'See Tragedy Looper Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper Mastermind Handbook',
        },
        {
            titel: 'Neverending Happy & Sad Story',
            creator: 'BF + 3G',
            set: {
                name: 'Tragedy Looper',
                number: 10,
            },
            tragedySet: 'Basic Tragedy',
            daysPerLoop: 6,
            difficultySets: [
                {
                    numberOfLoops: 4,
                    difficulty: 8,
                },
            ],
            mainPlot: ['Giant Time Bomb'],
            subPlots: [
                'An Unsettling Rumor',
                'A Love Affair'
            ],
            cast: {
                'Girl Student': 'Person',
                'Rich Man’s Daughter': 'Loved One',
                'Class Rep': 'Person',
                'Mystery Boy': 'Brain',
                'Alien': 'Person',
                'Godly Being': ['Witch', 4],
                'Office Worker': 'Person',
                'Pop Idol': 'Person',
                'Boss': ['Conspiracy Theorist', 'School'],
                'Patient': 'Lover',
                'Nurse': 'Person',
            },
            incidents: [
                {
                    day: 2,
                    incident: "Butterfly Effect",
                    culprit: "Class Rep"
                },
                {
                    day: 3,
                    incident: "Increasing Unease",
                    culprit: "Alien"
                },
                {
                    day: 4,
                    incident: "Missing Person",
                    culprit: "Office Worker"
                },
                {
                    day: 5,
                    incident: "Missing Person",
                    culprit: "Nurse"
                },
                {
                    day: 6,
                    incident: "Missing Person",
                    culprit: "Patient"
                },
            ],
            specialRules:'Mastermind removes "Forbid Goodwill" from his hand. It cannot be used in any loop',
            specifics: 'See Tragedy Looper Mastermind Handbook',
            story: 'See Tragedy Looper Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper Mastermind Handbook',
        },


        {
            titel: 'The Future Assassin',
            creator: 'unun',
            set: {
                name: 'Midnight Circle',
                number: 3,
            },
            tragedySet: 'Basic Tragedy',
            mainPlot: ['Change of Future'],
            subPlots: ['The hidden Freak', 'Circle of Friends'],
            difficultySets: [
                {
                    numberOfLoops: 5,
                    difficulty: 3
                },
                {
                    numberOfLoops: 4,
                    difficulty: 5
                },
            ],
            daysPerLoop: 5,
            cast: {
                'Girl Student': 'Person',
                'Class Rep': 'Frind',
                'Shrine Maiden': 'Frind',
                'Alien': 'Person',
                'Informer': 'Conspiracy Theorist',
                'Pop Idol': 'Cultist',
                'Journalist': 'Person',
                'Doctor': 'Serial Killer',
                'Patient': 'Time Traveler',
            },
            incidents: [
                {
                    day: 2,
                    incident: 'Butterfly Effect',
                    culprit: 'Class Rep',
                },
                {
                    day: 4,
                    incident: 'Faraway Murder',
                    culprit: 'Doctor',
                },
                {
                    day: 5,
                    incident: 'Hospital Incident',
                    culprit: 'Informer',
                },
            ],
            specifics: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            story: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
        },

    ] as const satisfies readonly Script[];
}

const s = new Scripts();

export function isScriptName(name: string): name is ScriptNames {
    return s.scripts.some(x => x.titel == name);
}

export const scripts = toRecord<Script & { titel: ScriptNames }, ScriptNames>(s.scripts.map(x => [x.titel, x] as const));