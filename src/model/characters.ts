import { toRecord2 } from "../misc";
import type { ScriptSpecified } from "./core";



export type LocationName = 'Hospital' | 'Shirne' | 'City' | 'School';
export const locations = ['Hospital', 'Shirne', 'City', 'School'] as const;
export type Tag = 'boy' | 'girl' | 'student' | "man" | "woman" | "adult" | 'construct' | 'animal';


export type Character = Characters[keyof Characters];
export type Characters = (typeof characters);
export type CharacterName = Character['name'];



type CharacterscomesInLaterHelper<T> = T extends { 'comesInLater': true } ? T : never;
export type CharacterscomesInLater = CharacterscomesInLaterHelper<Character>['name'];



type CharacterIntern = {
    name: string,
    paranoiaLimit: number,
    tags: readonly Tag[],
    abilitys: readonly Ability[],
    startLocation: LocationName;
    forbiddenLocation?: readonly LocationName[],
    comesInLater?: true,

} & ScriptSpecified;

export type Ability = {
    type: 'active'
    goodwillRank: number,
    timesPerLoop?: number,
    immuneToGoodwillRefusel?: true,
    restrictedToLocation?: readonly LocationName[],
    description: string

} | {
    type: 'passive',
    description: string
}




export const characters = toRecord2([
    {
        name: 'Boy Student',
        paranoiaLimit: 2,
        tags: ['student', "boy"],
        startLocation: 'School',
        abilitys: [
            {
                type: 'active',
                goodwillRank: 2,
                description: '-1 Paranoia on student in same location.'
            }
        ],
    },
    {
        name: 'Girl Student',
        paranoiaLimit: 3,
        tags: ['student', "girl"],
        startLocation: 'School',
        abilitys: [
            {
                type: 'active',
                goodwillRank: 2,
                description: '-1 Paranoia on student in same location.'
            }
        ],
    },
    {
        name: 'Rich Man’s Daughter',
        paranoiaLimit: 1,
        tags: ['student', "girl"],
        startLocation: 'School',
        abilitys: [
            {
                type: 'active',
                goodwillRank: 3,
                restrictedToLocation: ['School', 'City'],
                description: '+1 Goodwill on character in same location.'
            }
        ],
    },
    {
        name: 'Class Rep',
        paranoiaLimit: 2,
        tags: ['student', "girl"],
        startLocation: 'School',
        abilitys: [
            {
                type: 'active',
                goodwillRank: 2,
                timesPerLoop: 1,
                description: 'Leader gets one (1×∞) card back.'
            }
        ],
    },
    {
        name: 'Mystery Boy',
        paranoiaLimit: 3,
        tags: ['student', "boy"],
        startLocation: 'School',
        abilitys: [
            {
                type: 'passive',
                description: 'Always has arole not associated with current plot.',
            },
            {
                type: 'active',
                goodwillRank: 3,
                immuneToGoodwillRefusel: true,
                description: 'Reveal own role.'
            }
        ],
    },
    {
        name: 'Shrine Maiden',
        paranoiaLimit: 2,
        tags: ['student', "girl"],
        startLocation: 'Shirne',
        abilitys: [
            {
                type: 'active',
                goodwillRank: 3,
                restrictedToLocation: ['Shirne'],
                description: '-1 Intrigue on Shrine.'
            },
            {
                type: 'active',
                goodwillRank: 5,
                timesPerLoop: 1,
                description: 'Reveal role of character in same location'
            }
        ],
    },
    {
        name: 'Alien',
        paranoiaLimit: 2,
        tags: ["girl"],
        startLocation: 'Shirne',
        abilitys: [
            {
                type: 'active',
                goodwillRank: 4,
                timesPerLoop: 1,
                description: 'Kill one character in same location.'
            },
            {
                type: 'active',
                goodwillRank: 5,
                timesPerLoop: 1,
                description: 'Revive one corpse in same location.'
            }
        ],
    },
    {
        name: 'Godly Being',
        paranoiaLimit: 3,
        tags: ["man", "woman"],
        startLocation: 'Shirne',
        comesInLater: true,
        scriptSpecified: [{
            name: 'enters on loop',
            type: 'number',
        }],
        abilitys: [
            {
                type: 'passive',
                description: 'Enters game on predefined loop',
            },
            {
                type: 'active',
                goodwillRank: 3,
                timesPerLoop: 1,
                description: 'Reveal culprit for 1 incident.'
            },
            {
                type: 'active',
                goodwillRank: 5,
                description: '-1 Intrigue on same location or Character in same location.'
            }
        ],
    },
    {
        name: 'Police Officer',
        paranoiaLimit: 3,
        tags: ["man", "adult"],
        startLocation: 'City',
        abilitys: [
            {
                type: 'active',
                goodwillRank: 4,
                timesPerLoop: 1,
                description: 'Reveal culprit for former incident.'
            },
            {
                type: 'active',
                goodwillRank: 5,
                timesPerLoop: 1,
                description: 'Put an Extra marker on another character in same location. Remove that marker to prevent that character from dying.'
            }
        ],
    },
    {
        name: 'Office Worker',
        paranoiaLimit: 3,
        tags: ["man", "adult"],
        startLocation: 'City',
        abilitys: [
            {
                type: 'active',
                goodwillRank: 3,
                description: 'Reveal own role.'
            },
        ],
    },
    {
        name: 'Informer',
        paranoiaLimit: 3,
        tags: ["woman", "adult"],
        startLocation: 'City',
        abilitys: [
            {
                type: 'active',
                goodwillRank: 5,
                timesPerLoop: 1,
                description: 'Leader names the title of any Subplot. Then, the Mastermind must name the title of any other active subplot.'
            },
        ],
    },
    {
        name: 'Pop Idol',
        paranoiaLimit: 2,
        tags: ["girl", "student"],
        startLocation: 'City',
        abilitys: [
            {
                type: 'active',
                goodwillRank: 3,
                description: '-1 Paranoia on character in same location.'
            },
            {
                type: 'active',
                goodwillRank: 4,
                description: '+1 Goodwill on character in same location.'
            },
        ],
    },
    {
        name: 'Journalist',
        paranoiaLimit: 2,
        tags: ["adult", "man"],
        startLocation: 'City',
        abilitys: [
            {
                type: 'active',
                goodwillRank: 2,
                description: '+1 Paranoia on character in same location.'
            },
            {
                type: 'active',
                goodwillRank: 2,
                description: '+1 Goodwill on character in same location.'
            },
        ],
    },
    {
        name: 'Boss',
        paranoiaLimit: 4,
        tags: ["adult", "man"],
        startLocation: 'City',
        scriptSpecified: [{ name: 'Turf', type: 'location' }],
        abilitys: [
            {
                type: 'passive',
                description: 'May be regarded as in his turf.',
            },
            {
                type: 'active',
                goodwillRank: 5,
                timesPerLoop: 1,
                description: 'Reveal role of character in his turf.'
            },
        ],
    },
    {
        name: 'Doctor',
        paranoiaLimit: 2,
        tags: ["adult", "man"],
        startLocation: 'City',
        abilitys: [
            {
                type: 'active',
                goodwillRank: 2,
                description: '+/-1 Paranoia on character in same location.'
            },
            {
                type: 'active',
                goodwillRank: 3,
                description: 'revoke location restirction for Patient.'
            },
        ],
    },
    {
        name: 'Patient',
        paranoiaLimit: 2,
        tags: ["boy"],
        startLocation: 'Hospital',
        forbiddenLocation: ['City', 'School', 'Shirne'],
        abilitys: [
        ],
    },
    {
        name: 'Nurse',
        paranoiaLimit: 3,
        tags: ["adult", 'woman'],
        startLocation: 'Hospital',
        abilitys: [
            {
                type: 'active',
                goodwillRank: 2,
                immuneToGoodwillRefusel: true,
                description: '-1 Paranoia on panicked character in same location.'
            }
        ],
    },
    {
        name: 'Henchman',
        paranoiaLimit: 1,
        tags: ["adult", 'man'],
        startLocation: 'City',
        abilitys: [
            {
                type: 'passive',
                description: 'Mastermind chooses start location each loop',
            },
            {
                type: 'active',
                goodwillRank: 3,
                description: 'Dose not trigger incidents.'
            }
        ],
    },
    {
        name: 'Scientist',
        paranoiaLimit: 2,
        tags: ["adult", 'man'],
        startLocation: 'City',
        abilitys: [
            {
                type: 'passive',
                description: 'At the start of a loop, place either a Paranoia counter, a Goodwill counter or an Intrigue counter on this character.',
            },
            {
                type: 'active',
                goodwillRank: 3,
                description: 'Remove all counters from this character. Then, if you use the Extra gauge, increase or decrease this gauge.'
            },
        ],
    },
    {
        name: 'Forensic Specialist',
        paranoiaLimit: 3,
        tags: ["adult", 'man'],
        startLocation: 'City',
        abilitys: [
            {
                type: 'active',
                goodwillRank: 2,
                timesPerLoop: 1,
                description: 'Move any one counter between any two other characters in this location.'
            },
            {
                type: 'active',
                goodwillRank: 5,
                timesPerLoop: 1,
                description: 'Reveal the role of any one corpse.'
            },
        ],
    },
    {
        name: 'A.I.',
        paranoiaLimit: 4,
        tags: ["construct"],
        startLocation: 'City',
        abilitys: [
            {
                type: 'passive',
                description: 'At script creation, this character cannot be a Person.'
            },
            {
                type: 'passive',
                description: 'When determining wether an Incident triggers, to which this character is the culprit, all conters on this character conut as Paranoia conuters.'
            },
            {
                type: 'active',
                goodwillRank: 3,
                timesPerLoop: 1,
                description: 'Resolve one of the incidents noted in the open information. The culprit is considered to be the A.I., but ahh the choices are not done by the Mastermind, but the Protagonist Leader. (This does not conut as triggering an Event.)'
            },
        ],
    },
    {
        name: 'Illusion',
        paranoiaLimit: 3,
        tags: ["construct", "woman"],
        startLocation: 'City',
        abilitys: [
            {
                type: 'passive',
                description: 'No action cards can be placed on this characte. All cards palced on this location are also applied to this character.'
            },
            {
                type: 'active',
                goodwillRank: 3,
                timesPerLoop: 1,
                description: 'Move any character from this location to any other location.'
            },
            {
                type: 'active',
                goodwillRank: 4,
                timesPerLoop: 1,
                description: 'Remove thsi character from the board for the rest of the loop.'
            },
        ],
    },
    {
        name: 'Teacher',
        paranoiaLimit: 2,
        tags: ["adult", "man"],
        startLocation: 'City',
        abilitys: [
            {
                type: 'active',
                goodwillRank: 3,
                description: 'Pick a Student in this location, and add or remove a Paranoia from that student.'
            },
            {
                type: 'active',
                goodwillRank: 4,
                timesPerLoop: 1,
                description: 'Reveal the role of one Student in this location.'
            },
        ],
    },
    {
        name: 'Transfer Student',
        paranoiaLimit: 2,
        tags: ["student", "girl"],
        comesInLater: true,
        scriptSpecified: [{
            name: 'enters on day',
            type: 'number'
        }],
        startLocation: 'School',
        abilitys: [
            {
                type: 'passive',
                description: 'This character does not appear on the board until the start of the day specified by the script.'
            },
            {
                type: 'active',
                goodwillRank: 2,
                description: 'Change an Intrigue conuter on any other character in this location to a Goodwill counter.'
            },
        ],
    },
    {
        name: 'Soldier',
        paranoiaLimit: 3,
        tags: ["adult", "man"],
        startLocation: 'School',
        abilitys: [
            {
                type: 'active',
                goodwillRank: 2,
                timesPerLoop: 1,
                description: 'Place 2 Paranoia on another character in this location.'
            },
            {
                type: 'active',
                goodwillRank: 5,
                timesPerLoop: 1,
                description: 'The Protagonists cannot die for the reminder of the loop.'
            },
        ],
    },
    {
        name: 'Black Cat',
        paranoiaLimit: 0,
        tags: ["animal"],
        startLocation: 'School',
        abilitys: [
            {
                type: 'passive',
                description: 'At the start of each loop, place an Intrigue on the Shrine.'
            },
            {
                type: 'passive',
                description: 'Incidents of which this character is the culprit, change their effect into "no effect". (rule-wise they occur)'
            },
        ],
    },


] as const satisfies readonly CharacterIntern[], 'name');

export const characterscomesInLater = Object.values(characters).filter(x => (x as { comesInLater?: true })['comesInLater']).map(x => x.name) as readonly CharacterscomesInLater[];
export function isCharacterName(name: string): name is CharacterName {
    return name in characters;
}
export function isLocationName(name: string): name is LocationName {
    return locations.some(x => x == name);
}



// export const characters = toRecord<Character, CharacterName>(c.characters.map(x => [x.name, x] as const));

