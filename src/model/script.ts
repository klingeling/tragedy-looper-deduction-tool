import { toRecord } from "../misc";
import { isCharacterName, type CharacterName, type CharactersComesInLaterLoop, type LocationName, isLocationName, type CharactersScriptSpecified, type CharactersScriptSpecifiedData } from "./characters";
import { isIncidentName, type IncidentName, type FakedIncident } from "./incidents";
import type { PlotName } from "./plots";
import type { RoleName } from "./roles";
import type { TragedySetName } from "./tragedySets";


export type ScriptParameter = {
    tragedy: TragedySetName;
    characters: CharacterName[];
    incident: Omit<ScriptIncident, 'culprit'>[];
    spectalRules?: string[];
};


export type ScriptIncident = {
    day: number,
    incident: Exclude<IncidentName, FakedIncident> | readonly [FakedIncident, Exclude<IncidentName, FakedIncident>],
    culprit: CharacterName | readonly [LocationName, number],
};
export type ScriptIncidentPlayer = Omit<Exclude<ScriptIncident, FakedIncident>, 'culprit'>;
export function isScriptIncident(obj: unknown, omitCulprit: true): obj is ScriptIncidentPlayer;
export function isScriptIncident(obj: unknown): obj is ScriptIncident;
export function isScriptIncident(obj: unknown, omitCulprit?: true): obj is ScriptIncident {

    if (typeof obj !== 'object') {
        return false;
    }
    if (!obj) {
        return false;
    }

    if (!('day' in obj)) {
        return false;
    }
    if (typeof obj.day !== 'number') {
        return false;
    }

    if (!('incident' in obj)) {
        return false;
    }
    if (typeof obj.incident !== 'string' || isIncidentName(obj.incident)) {
        return false;
    }

    if (!omitCulprit) {
        if (!('culprit' in obj)) {
            return false;
        }
        if ((typeof obj.culprit !== 'string' || isCharacterName(obj.culprit)) &&
            (!Array.isArray(obj.culprit) || obj.culprit.length != 2 || !isLocationName(obj.culprit[0]) || typeof obj.culprit[1] != 'number')) {
            return false;
        }
    }

    return true;
}

export function isScriptIncidentWithoutCulprit(obj: unknown): obj is Omit<ScriptIncident, 'culprit'> {
    return isScriptIncident(obj, true);
}

export type Script = ScriptInternal & { titel: ScriptName };
type ScriptInternal = {
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
    tragedySet: TragedySetName,
    mainPlot: readonly PlotName[],
    subPlots: readonly PlotName[],
    daysPerLoop: number,
    cast: Partial<Record<Exclude<CharacterName, CharactersComesInLaterLoop | CharactersScriptSpecified>, RoleName | readonly [RoleName, { overideStartLocation: LocationName }]>>

    & Partial<Record<CharactersComesInLaterLoop, readonly [RoleName, { 'loop': number } & { overideStartLocation?: LocationName }]>>
    & Partial<CharactersScriptSpecifiedMapping>,
    incidents: readonly ScriptIncident[],
    specialRules?: string,
    specifics: string,
    story: string,
    mastermindHints: string,
};


type CharactersScriptSpecifiedMapping = {
    [p in CharactersScriptSpecified]: readonly [RoleName, CharactersScriptSpecifiedData<p> & { overideStartLocation?: LocationName }]

};

export type ScriptName = Scripts['scripts'][never]['titel'];

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
                'Godly Being': ['Loved One', { loop: 3 }],
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
                'Godly Being': ['Witch', { loop: 4 }],
                'Office Worker': 'Person',
                'Pop Idol': 'Person',
                'Boss': ['Conspiracy Theorist', {
                    Turf: 'School'
                }],
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
            specialRules: 'Mastermind removes "Forbid Goodwill" from his hand. It cannot be used in any loop',
            specifics: 'See Tragedy Looper Mastermind Handbook',
            story: 'See Tragedy Looper Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper Mastermind Handbook',
        },


        {
            titel: 'Machina Solar Cogwheel',
            creator: 'M.Hydromel',
            set: {
                name: 'Midnight Circle',
                number: 1,
            },
            tragedySet: 'Basic Tragedy',
            mainPlot: ['Change of Future'],
            subPlots: ['A Love Affair', 'Circle of Friends'],
            difficultySets: [
                {
                    numberOfLoops: 5,
                    difficulty: 4
                },
                {
                    numberOfLoops: 4,
                    difficulty: 5
                },
            ],
            daysPerLoop: 6,
            cast: {
                'Rich Man’s Daughter': 'Conspiracy Theorist',
                'Class Rep': 'Person',

                'Alien': 'Frind',
                'Informer': 'Loved One',
                'Forensic Specialist': 'Frind',
                'A.I.': 'Time Traveler',
                'Patient': 'Cultist',
                'Scientist': 'Lover',
            },
            incidents: [
                {
                    day: 3,
                    incident: 'Murder',
                    culprit: 'Informer',
                },
                {
                    day: 4,
                    incident: 'Butterfly Effect',
                    culprit: 'A.I.',
                },
                {
                    day: 5,
                    incident: 'Suicide',
                    culprit: 'Rich Man’s Daughter',
                },
                {
                    day: 6,
                    incident: 'Hospital Incident',
                    culprit: 'Scientist',
                },
            ],
            specifics: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            story: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
        },

        {
            titel: 'Traditonal ensamble murder',
            creator: 'BakaFire',
            set: {
                name: 'Midnight Circle',
                number: 2,
            },
            tragedySet: 'Basic Tragedy',
            mainPlot: ['Change of Future'],
            subPlots: ['A Love Affair', 'Circle of Friends'],
            difficultySets: [
                {
                    numberOfLoops: 5,
                    difficulty: 3
                },
                {
                    numberOfLoops: 4,
                    difficulty: 4
                },
                {
                    numberOfLoops: 3,
                    difficulty: 6
                },
            ],
            daysPerLoop: 7,
            cast: {
                'Boy Student': 'Serial Killer',
                'Girl Student': 'Key Person',
                'Rich Man’s Daughter': 'Killer',
                'Shrine Maiden': 'Frind',
                'Police Officer': 'Brain',

                'Office Worker': 'Person',
                'Informer': 'Paranoiac',
                'Doctor': 'Conspiracy Theorist',
                'Patient': 'Cultist',
            },
            incidents: [
                {
                    day: 2,
                    incident: 'Increasing Unease',
                    culprit: 'Patient',
                },
                {
                    day: 4,
                    incident: 'Hospital Incident',
                    culprit: 'Shrine Maiden',
                },
                {
                    day: 5,
                    incident: 'Missing Person',
                    culprit: 'Boy Student',
                },
                {
                    day: 7,
                    incident: 'Murder',
                    culprit: 'Office Worker',
                },
            ],
            specifics: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            story: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
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
        {
            titel: 'Romance Antithesis',
            creator: 'BakaFire',
            set: {
                name: 'Midnight Circle',
                number: 4,
            },
            tragedySet: 'Midnight Zone',
            mainPlot: ['Male Confrontation'],
            subPlots: ['Unsafe Trigger', 'Love-Hate Spiral'],
            difficultySets: [
                {
                    numberOfLoops: 4,
                    difficulty: 2
                },
                {
                    numberOfLoops: 3,
                    difficulty: 4
                },
            ],
            daysPerLoop: 5,
            cast: {
                'Boy Student': 'Person',
                'Girl Student': 'Obstinate',
                'Rich Man’s Daughter': 'Frind',
                'Shrine Maiden': 'Person',
                'Alien': 'Factor',
                'Police Officer': 'Person',
                'Office Worker': 'Ninja',
            },
            incidents: [
                {
                    day: 2,
                    incident: 'Confession',
                    culprit: 'Rich Man’s Daughter',
                },
                {
                    day: 4,
                    incident: 'Confession',
                    culprit: 'Office Worker',
                },
                {
                    day: 4,
                    incident: 'Increasing Unease',
                    culprit: 'Girl Student',
                },
            ],
            specifics: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            story: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
        },
        {
            titel: 'In the Hands of Evil Fate',
            creator: 'Bodogetta',
            set: {
                name: 'Midnight Circle',
                number: 5,
            },
            tragedySet: 'Midnight Zone',
            mainPlot: ['Secret Record'],
            subPlots: ['Dice of the Gods', 'Unsafe Trigger'],
            difficultySets: [
                {
                    numberOfLoops: 4,
                    difficulty: 3
                },
                {
                    numberOfLoops: 3,
                    difficulty: 5
                },
            ],
            daysPerLoop: 4,
            cast: {
                'Boy Student': 'Obstinate',
                'Rich Man’s Daughter': 'Person',
                'Shrine Maiden': 'Person',
                'Alien': 'Conspiracy Theorist',
                'Godly Being': ['Brain', { loop: 2 }],
                'Police Officer': 'Serial Killer',
                'Office Worker': 'Factor',
                'Doctor': 'Person',
                'Patient': 'Key Person',
            },
            incidents: [
                {
                    day: 2,
                    incident: ['Fake Incident', "Hospital Incident"],
                    culprit: 'Boy Student',
                },
                {
                    day: 3,
                    incident: 'Increasing Unease',
                    culprit: 'Rich Man’s Daughter',
                },
                {
                    day: 4,
                    incident: 'Serial Murder',
                    culprit: 'Doctor',
                },
            ],
            specifics: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            story: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
        },

        {
            titel: 'Singer of the Heretic Idol',
            creator: 'Satoshi Sawamura',
            set: {
                name: 'Midnight Circle',
                number: 6,
            },
            tragedySet: 'Midnight Zone',
            mainPlot: ['The Sealed Item'],
            subPlots: ['Love-Hate Spiral', 'Worshippers of the Apocalypse'],
            difficultySets: [
                {
                    numberOfLoops: 8,
                    difficulty: 4
                },
                {
                    numberOfLoops: 7,
                    difficulty: 5
                },
                {
                    numberOfLoops: 6,
                    difficulty: 6
                },
            ],
            daysPerLoop: 4,
            cast: {
                'Boy Student': 'Obstinate',
                'Class Rep': 'Frind',
                'Mystery Boy': 'Immortal',
                'Shrine Maiden': 'Person',
                'Illusion': 'Brain',
                'Pop Idol': 'Person',
                'Journalist': 'Prophet',
                'Doctor': 'Cultist',
                'Henchman': ['Person', { overideStartLocation: 'City' }],
            },
            incidents: [
                {
                    day: 1,
                    incident: 'Suicide',
                    culprit: 'Pop Idol',
                },
                {
                    day: 2,
                    incident: ['Fake Incident', 'Breakthrough'],
                    culprit: 'Henchman',
                },
                {
                    day: 3,
                    incident: ['Fake Incident', 'Uproar'],
                    culprit: 'Class Rep',
                },
                {
                    day: 4,
                    incident: ['Fake Incident', 'Hospital Incident'],
                    culprit: 'Boy Student',
                },
            ],
            specifics: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            story: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
        },

        {
            titel: 'Spinning Duplicate Spiral',
            creator: 'Gaijin',
            set: {
                name: 'Midnight Circle',
                number: 7,
            },
            tragedySet: 'Midnight Zone',
            mainPlot: ['Fated Connections'],
            subPlots: ['Unanswered Heart', 'Showtime of Death'],
            difficultySets: [
                {
                    numberOfLoops: 4,
                    difficulty: 7
                },
            ],
            daysPerLoop: 6,
            cast: {
                'Boy Student': 'Magician',
                'Rich Man’s Daughter': 'Person',
                'Mystery Boy': 'Prophet',
                'Shrine Maiden': 'Serial Killer',
                'Police Officer': 'Magician',
                'Pop Idol': 'Frind',
                'Journalist': 'Conspiracy Theorist',
                'Doctor': 'Person',
                'Patient': 'Immortal',
            },
            incidents: [
                {
                    day: 3,
                    incident: 'Faked Suicide',
                    culprit: 'Boy Student',
                },
                {
                    day: 4,
                    incident: 'Missing Person',
                    culprit: 'Rich Man’s Daughter',
                },
                {
                    day: 5,
                    incident: 'Uproar',
                    culprit: 'Journalist',
                },
                {
                    day: 6,
                    incident: 'Confession',
                    culprit: 'Patient',
                },
            ],
            specifics: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            story: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
        },

        {
            titel: 'Obsession Tetection',
            creator: 'BakaFire',
            set: {
                name: 'Midnight Circle',
                number: 8,
            },
            tragedySet: 'Mystery Circle',
            mainPlot: ['The Black School'],
            subPlots: ['Tricky Twins', 'Dance of Fools'],
            difficultySets: [
                {
                    numberOfLoops: 4,
                    difficulty: 2
                },
            ],
            daysPerLoop: 5,
            cast: {
                'Boy Student': 'Brain',
                'Rich Man’s Daughter': 'Fool',
                'Shrine Maiden': 'Person',
                'Alien': 'Twin',
                'Police Officer': 'Paranoiac',
                'Office Worker': 'Person',
                'Journalist': 'Person',
                'Patient': 'Frind',
            },
            incidents: [
                {
                    day: 1,
                    incident: 'Portent',
                    culprit: 'Rich Man’s Daughter',
                },
                {
                    day: 2,
                    incident: 'The Silver Bullet',
                    culprit: 'Police Officer',
                },
                {
                    day: 4,
                    incident: 'Hospital Incident',
                    culprit: 'Shrine Maiden',
                },
                {
                    day: 5,
                    incident: 'Serial Murder',
                    culprit: 'Alien',
                },
            ],
            specifics: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            story: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
        },

        {
            titel: 'The Temple of Poisoned Loneliness',
            creator: 'GEnd',
            set: {
                name: 'Midnight Circle',
                number: 9,
            },
            tragedySet: 'Mystery Circle',
            mainPlot: ['A Quilt of Incidents'],
            subPlots: ['An Absolute Will', 'Tricky Twins'],
            difficultySets: [
                {
                    numberOfLoops: 4,
                    difficulty: 3
                },
                {
                    numberOfLoops: 3,
                    difficulty: 5
                },
            ],
            daysPerLoop: 5,
            cast: {
                'Boy Student': 'Paranoiac',
                'Girl Student': 'Person',
                'Rich Man’s Daughter': 'Person',
                'Shrine Maiden': 'Twin',
                'Office Worker': 'Person',
                'Journalist': 'Conspiracy Theorist',
                'Pop Idol': 'Person',
                'Patient': 'Fool',
                'Nurse': 'Obstinate',
            },
            incidents: [
                {
                    day: 1,
                    incident: 'Increasing Unease',
                    culprit: 'Nurse',
                },
                {
                    day: 2,
                    incident: 'Serial Murder',
                    culprit: 'Pop Idol',
                },
                {
                    day: 3,
                    incident: 'Serial Murder',
                    culprit: 'Shrine Maiden',
                },
                {
                    day: 4,
                    incident: 'Serial Murder',
                    culprit: 'Patient',
                },
                {
                    day: 5,
                    incident: 'Serial Murder',
                    culprit: 'Shrine Maiden',
                },
            ],
            specifics: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            story: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
        },

        {
            titel: 'The Unknowns of the Tragedies in the Academic City',
            creator: 'Izayoi',
            set: {
                name: 'Midnight Circle',
                number: 10,
            },
            tragedySet: 'Mystery Circle',
            mainPlot: ['A Drop of Strychnine'],
            subPlots: ['I am a Master Detective', 'The hidden Freak'],
            difficultySets: [
                {
                    numberOfLoops: 4,
                    difficulty: 4
                },
            ],
            daysPerLoop: 7,
            cast: {
                'Girl Student': 'Frind',
                'Rich Man’s Daughter': 'Private Investigator',
                'Shrine Maiden': 'Poisoner',
                'Alien': 'Key Person',
                'Informer': 'Person',
                'Pop Idol': 'Frind',
                'Boss': ['Conspiracy Theorist', { Turf: 'School' }],
                'Doctor': 'Fool',
                'Patient': 'Serial Killer',
            },
            incidents: [
                {
                    day: 2,
                    incident: 'Faked Suicide',
                    culprit: 'Shrine Maiden',
                },
                {
                    day: 3,
                    incident: 'Suicide',
                    culprit: 'Girl Student',
                },
                {
                    day: 5,
                    incident: 'Bestial Murder',
                    culprit: 'Boss',
                },
                {
                    day: 6,
                    incident: 'Serial Murder',
                    culprit: 'Doctor',
                },
            ],
            specifics: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            story: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
        },
        {
            titel: 'The Festival of Fools',
            creator: 'Satoshi Sawamura',
            set: {
                name: 'Midnight Circle',
                number: 11,
            },
            tragedySet: 'Mystery Circle',
            mainPlot: ['A Quilt of Incidents'],
            subPlots: ['Dance of Fools', 'Isolated Institution Psycho'],
            difficultySets: [
                {
                    numberOfLoops: 6,
                    difficulty: 6
                },
            ],
            daysPerLoop: 4,
            cast: {
                'Rich Man’s Daughter': 'Fool',
                'Class Rep': 'Person',
                'Shrine Maiden': 'Paranoiac',
                'Police Officer': 'Therapist',
                'Office Worker': 'Frind',
                'Journalist': 'Person',
                'Doctor': 'Person',
                'Patient': 'Person',
                'Henchman': ['Conspiracy Theorist', { overideStartLocation: 'School' }],
            },
            incidents: [
                {
                    day: 1,
                    incident: 'A Suspicious Letter',
                    culprit: 'Class Rep',
                },
                {
                    day: 2,
                    incident: 'Increasing Unease',
                    culprit: 'Henchman',
                },
                {
                    day: 3,
                    incident: 'Increasing Unease',
                    culprit: 'Patient',
                },
                {
                    day: 4,
                    incident: 'Portent',
                    culprit: 'Rich Man’s Daughter',
                },
            ],
            specifics: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            story: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
        },
        {
            titel: 'Milestone',
            creator: 'AKITAGAWA Detective Bureau',
            set: {
                name: 'Midnight Circle',
                number: 12,
            },
            tragedySet: 'Mystery Circle',
            mainPlot: ['Tightrope Plan'],
            subPlots: ['An Absolute Will', 'I am a Master Detective'],
            difficultySets: [
                {
                    numberOfLoops: 5,
                    difficulty: 6
                },
                {
                    numberOfLoops: 4,
                    difficulty: 8
                },
            ],
            daysPerLoop: 7,
            cast: {
                'Girl Student': 'Conspiracy Theorist',
                'Rich Man’s Daughter': 'Killer',
                'Mystery Boy': 'Poisoner',
                'Alien': 'Obstinate',
                'Police Officer': 'Private Investigator',
                'Informer': 'Person',
                'Pop Idol': 'Frind',
                'Patient': 'Brain',
                'Scientist': 'Person',
                'Henchman': 'Person',
            },
            incidents: [
                {
                    day: 1,
                    incident: 'Hospital Incident',
                    culprit: 'Informer',
                },
                {
                    day: 2,
                    incident: 'Terrorism',
                    culprit: 'Alien',
                },
                {
                    day: 4,
                    incident: 'Portent',
                    culprit: 'Henchman',
                },
                {
                    day: 5,
                    incident: 'Bestial Murder',
                    culprit: 'Girl Student',
                },
                {
                    day: 6,
                    incident: 'The Silver Bullet',
                    culprit: 'Scientist',
                },
                {
                    day: 7,
                    incident: 'Bestial Murder',
                    culprit: 'Rich Man’s Daughter',
                },
            ],
            specifics: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            story: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
            mastermindHints: 'See Tragedy Looper: Midnight Circle Mastermind Handbook',
        },

    ] as const satisfies readonly ScriptInternal[];
}

const s = new Scripts();

export function isScriptName(name: string | undefined | null): name is ScriptName {
    if (!name) {
        return false;
    }
    return s.scripts.some(x => x.titel == name);
}

export const scripts = toRecord<Script, ScriptName>(s.scripts.map(x => [x.titel, x] as const));