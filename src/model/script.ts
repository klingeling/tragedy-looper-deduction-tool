import { toRecord } from "../misc";
import type { CharacterNames } from "./characters";
import type { IncidentNames } from "./incidents";
import type { PlotNames } from "./plots";
import type { RoleNames } from "./roles";
import type { TragedySetNames } from "./tragedySets";


export type ScriptParameter = {
    tragedy: TragedySetNames;
    characters: CharacterNames[];
    incident: Omit<ScriptIncident, 'culprit'>[];
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
    cast: Partial<Record<CharacterNames, RoleNames>>,
    incidents: readonly ScriptIncident[],
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
        }

    ] as const satisfies readonly Script[];
}

const s = new Scripts();

export function isScriptName(name: string): name is ScriptNames {
    return s.scripts.some(x => x.titel == name);
}

export const scripts = toRecord<Script & { titel: ScriptNames }, ScriptNames>(s.scripts.map(x => [x.titel, x] as const));