import { toRecord, type RequireAtLeastOne } from "../misc";
import type { ScriptSpecified } from "./core";
import type { DoseNotTriggerIncident } from "./incidents";

export type AbilityType = AbilityTypeLose | AbilityTypeCreation | AbilityTypeDefault;
export type AbilityTypeLose = typeof loseTypes[number];
export type AbilityTypeCreation = 'Script creation';
export type AbilityTypeDefault = 'Optional' | 'Mandatory';

export const loseTypes = [
    'Mandatory Loss condition: Character Death',
    'Mandatory Loss condition: Character Death',
    'Optional Loss condition: Character Death',
    'Delayed Loss condition: Character Death',
    'Loss condition: Tragedy'
] as const;

export type timing = 'Always' | 'Day End' | 'Mastermind Ability' | 'Card resolve' | 'Loop End' | 'Loop Start'
    | 'Last Day' | 'First Day' | 'Incident step' | 'Incident trigger' | 'On character death' | 'When this role is to be reveald'
    | 'Mastermind Action step' | 'Goodwill ablility step';


type RoleInternal = {
    name: string,
    max?: number,
    unkillable?: true,
    afterDeath?: true,
    goodwillRefusel?: 'Optional' | 'Mandatory',
    abilities: readonly Abilitie<{ 'Over all Roles'?: true }>[]
} & ScriptSpecified & DoseNotTriggerIncident;

export type OncePer<Text extends string, Constraints extends Object | void = void, T = object> = T &
    {
        [k in `timesPer${Capitalize<Text>}`]?: Constraints extends void ? number : number | readonly [number, RequireAtLeastOne<Constraints>]
    };

export type Abilitie<Constraints extends Object | void = void> = OncePer<'Loop' | 'day', Constraints, {
    description: string,
    prerequisite?: string,
    type: AbilityTypeDefault,
    // timesPerLoop?: Constraints extends void ? number : number | readonly [number, RequireAtLeastOne<Constraints>],
    // timesPerDay?: Constraints extends void ? number : number | readonly [number, RequireAtLeastOne<Constraints>],
    timing: readonly (timing)[]
} | {
    description?: string,
    prerequisite: string,
    type: AbilityTypeLose,
    // timesPerLoop?: Constraints extends void ? number : number | readonly [number, RequireAtLeastOne<Constraints>],
    // timesPerDay?: Constraints extends void ? number : number | readonly [number, RequireAtLeastOne<Constraints>],
    timing: readonly (timing)[]
}> | {
    description: string,
    type: AbilityTypeCreation,
}

export type Role = rolesInternal[keyof rolesInternal];
export type rolesInternal = typeof rolesInternal;
export type RoleName = Role['name'];





export const rolesInternal = toRecord([
    {
        name: 'Person',
        abilities: []
    },

    {
        name: 'Key Person',
        abilities: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Always'],

                prerequisite: 'This character dies.',
                description: 'The loop ends immediately.'
            }
        ]
    },
    {
        name: 'Curmudgeon',
        goodwillRefusel: 'Optional',
        abilities: [],
    },
    {
        name: 'Killer',
        goodwillRefusel: 'Optional',
        abilities: [
            {
                type: 'Optional',
                timing: ['Day End'],
                prerequisite: 'The Key Person has at least 2 Intrigue and is in this char acter‘s location',
                description: 'Kill the Key Person'
            },
            {
                type: 'Optional Loss condition: Character Death',
                timing: ['Day End'],
                prerequisite: 'This character has at least 4 Intrigue'
            }
        ]
    },
    {
        name: 'Brain',
        goodwillRefusel: 'Optional',
        abilities: [
            {
                type: 'Optional',
                timing: ['Mastermind Ability'],
                description: 'You may place 1 Intrigue on this location or on any character in this location.'
            }
        ]
    },
    {
        name: 'Cultist',
        goodwillRefusel: 'Mandatory',
        abilities: [
            {
                type: 'Optional',
                timing: ['Card resolve'],
                description: 'You may ignore all Forbid Intrigue effects on this location and on all characters in this location.'
            }
        ]
    },
    {
        name: 'Time Traveler',
        unkillable: true,
        abilities: [
            {
                type: 'Mandatory',
                timing: ['Card resolve'],
                description: 'Ignore Forbid Goodwill on this character.'
            },
            {
                type: 'Loss condition: Tragedy',
                timing: ['Day End', 'Last Day'],
                prerequisite: 'There is 2 or less Goodwill on this character.',
                description: 'Loop ends'
            },
        ]
    },
    {
        name: 'Witch',
        goodwillRefusel: 'Mandatory',
        abilities: [],
    },
    {
        name: 'Frind',
        max: 2,
        abilities: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],

                prerequisite: 'This character is dead.',
                description: 'Reveal its role.'
            },
            {
                type: 'Mandatory',
                timing: ['Loop Start'],
                prerequisite: 'This role has been revealed',
                description: 'This character gets 1 Goodwill.'
            },
        ],
    },
    {
        name: 'Conspiracy Theorist',
        max: 1,
        abilities: [
            {
                type: 'Optional',
                timing: ['Mastermind Ability'],
                description: 'You may place 1 Paranoia on any character in this location.'
            },
        ],
    },
    {
        name: 'Lover',
        abilities: [
            {
                type: 'Mandatory',
                timing: ['Always'],
                prerequisite: 'The Loved One dies',
                description: 'This character gets 6 Paranoia.'
            },
        ],
    },
    {
        name: 'Loved One',
        abilities: [
            {
                type: 'Mandatory',
                timing: ['Always'],
                prerequisite: 'The Lover dies',
                description: 'This character gets 6 Paranoia.'
            },
            {
                type: 'Optional Loss condition: Character Death',
                timing: ['Day End'],
                prerequisite: 'This character has at least 3 Paranoia and at least 1 Intrigue.',
            },
        ],
    },
    {
        name: 'Serial Killer',
        abilities: [
            {
                type: 'Mandatory',
                timing: ['Day End'],
                prerequisite: 'There is exactly 1 other (living) character in this location',
                description: 'That character dies.'
            },
        ],
    },
    {
        name: 'Factor',
        goodwillRefusel: 'Optional',
        abilities: [
            {
                type: 'Mandatory',
                timing: ['Always'],
                prerequisite: 'There is at least 2 Intrigue on the School',
                description: 'This character gains the Conspiracy Theorist‘s ability, but not its role.'
            },
            {
                type: 'Mandatory',
                timing: ['Always'],
                prerequisite: 'There is at least 2 Intrigue on the City',
                description: 'This character gains the Key Person’s ability, but not its role.'
            },
        ],
    },
    {
        name: 'Poisoner',
        goodwillRefusel: 'Optional',
        abilities: [
            {
                type: 'Mandatory',
                timing: ['Day End'],
                prerequisite: 'the Extra Gauge is on 2 or more',
                timesPerLoop: 1,
                description: 'One charcters in the same location dies.'
            },
            {
                type: 'Mandatory Loss condition: Character Death',
                timing: ['Day End'],
                prerequisite: 'The Extra Gauge is on 4 or more.'
            },
        ],
    },
    {
        name: 'Fool',
        max: 1,
        abilities: [
            {
                type: 'Script creation',
                description: 'This character must be the culprit of an Incident'
            },
            {
                type: 'Mandatory',
                timing: ['Incident step'],
                description: 'After this character has triggered an Incident, remove all Paranoia counters from this card.'
            },
        ],
    },
    {
        name: 'Private Investigator',
        unkillable: true,
        abilities: [
            {
                type: 'Mandatory',
                timing: ['Always'],
                description: 'This character can never be a culprit.'
            },
            {
                type: 'Mandatory',
                timing: ['Incident step'],
                prerequisite: 'the Extra Gauge is 0, and the culprit is in this location',
                description: 'The Incident triggers regardless of the number of Paranoia counters on the culprit.'
            },
        ],
    },
    {
        name: 'Paranoiac',
        goodwillRefusel: 'Mandatory',
        abilities: [
            {
                type: 'Optional',
                timing: ['Mastermind Ability'],
                description: 'You may place 1 Intrigue counter on this location or an any character in this location.'
            },
        ],
    },
    {
        name: 'Twin',
        abilities: [
            {
                type: 'Script creation',
                description: 'This character must be the culprit of an Incident.'
            },
            {
                type: 'Mandatory',
                timing: ['Incident trigger'],
                description: 'When this character triggers an Incident, it is considered as being on the diagonally opposit location.'
            },
        ],
    },
    {
        name: 'Obstinate',
        goodwillRefusel: 'Mandatory',
        abilities: [
            {
                type: 'Script creation',
                description: 'This character must be the culprit of an Incident.'
            },
            {
                type: 'Mandatory',
                timing: ['Incident step'],
                description: 'This character amways triggers its Incidents (if alive), regardless of the amount of Paranoia counters on it.'
            },
        ],
    },
    {
        name: 'Therapist',
        abilities: [
            {
                type: 'Mandatory',
                timing: ['Mastermind Ability'],
                prerequisite: 'The Extra Gauge is 1 or above',
                description: 'Remove 1 Paranoia counter from any other character in this location.'
            },
        ],
    },
    {
        name: 'Magician',
        abilities: [
            {
                type: 'Optional',
                timing: ['Mastermind Ability'],
                timesPerLoop: [1, { 'Over all Roles': true }],
                description: 'You may move one character with at least one Paranoia counter from this location to an adjacent location (not diagonal).'
            },
            {
                type: 'Mandatory',
                timing: ['On character death'],
                description: 'Remove all Paranoia counters from its corpse.'
            },
        ],
    },
    {
        name: 'Ninja',
        goodwillRefusel: 'Optional',
        abilities: [
            {
                type: 'Optional',
                timing: ['When this role is to be reveald'],
                description: 'You may, insead of saying the truth, state any other non-Person role that is in this script'
            },
            {
                type: 'Optional Loss condition: Character Death',
                timing: ['Day End'],
                prerequisite: 'There is any charcter with at least 2 Intrigue Counters in this location',
            },
        ],
    },
    {
        name: 'Prophet',
        abilities: [
            {
                type: 'Mandatory',
                timing: ['Mastermind Action step'],
                description: 'The Mastermind cannot place cards on this character.'
            },
            {
                type: 'Mandatory',
                timing: ['Incident step'],
                prerequisite: 'The culprit of an incident that would trigger is in another location',
                description: 'That incident does not trigger, regardless of the number of Paranoia conters on the culprit.'
            },
        ],
    },
    {
        name: 'Immortal',
        unkillable: true,

        abilities: [
        ],
    },
    {
        name: 'Sacrifice',
        unkillable: true,
        abilities: [
            {
                type: 'Optional Loss condition: Character Death',
                timing: ['Day End'],
                prerequisite: 'This character has at least 2 Intrigue and at least 2 Paranoia',
                description: 'You may kill all characters and the Protagonists.'
            },
            {
                type: 'Mandatory',
                timing: ['Incident step'],
                description: 'When determining whether an Incident, for which this character is the culprit, will occour or not, also treat Intrigue as Paranoia.'
            },
            {
                type: 'Script creation',
                description: 'This character must be the culprit of an incident.'
            },
        ],
    },
    {
        name: 'Deep One',
        max: 1,
        goodwillRefusel: 'Optional',
        abilities: [
            {
                type: 'Optional',
                timing: ['Mastermind Ability'],
                description: 'You may place 1 Intruge on this location or on any character in this location.'
            },
            {
                type: 'Mandatory',
                timing: ['Always'],
                description: 'When this charcter dies, reveal the role and increast the Extra Gauge 1 step.'
            },
        ],
    },
    {
        name: 'Wizard',
        max: 1,
        abilities: [
            {
                type: 'Loss condition: Tragedy',
                timing: ['Loop End'],
                prerequisite: 'This character is dead'
            },
            {
                type: 'Mandatory',
                timing: ['Goodwill ablility step'],
                description: 'When this character’s Goodwill ability is used, reveal this role after resolution. Then, the leader may increase the Extra Gauge one step.'
            },
        ],
    },
    {
        name: 'Witness',
        abilities: [
            {
                type: 'Mandatory',
                timing: ['Day End'],
                prerequisite: 'This character has 4 or more Paranoia',
                description: 'This charcter dies, and the Extra Gauge increases with 1 step.'
            },
        ],
    },
    {
        name: 'Faceless',
        goodwillRefusel: 'Optional',
        unkillable: true,
        abilities: [
            {
                type: 'Mandatory',
                timing: ['Always'],
                prerequisite: 'The Extra Gauge is 1 or less',
                description: 'This character gains the abilities of a Conspiracy Theorist.'
            },
            {
                type: 'Mandatory',
                timing: ['Always'],
                prerequisite: 'the Extra Gauge is 2 or more',
                description: 'This character gains the abilities of a Deep One.'
            },
        ],
    },
    {
        name: 'Vampire',
        goodwillRefusel: 'Optional',
        unkillable: true,
        abilities: [
            {
                type: 'Optional',
                timing: ['Day End'],
                prerequisite: 'The Key Person has at least 2 Intrigue and is in this character’s location',
                description: 'You may kill the Key Person.'
            },
            {
                type: 'Optional Loss condition: Character Death',
                timing: ['Day End'],
                prerequisite: 'If there are at least 2 corpses in this character’s starting location.'
            },
        ],
    },
    {
        name: 'Werwolf',
        goodwillRefusel: 'Optional',
        abilities: [
            {
                type: 'Optional Loss condition: Character Death',
                timing: ['Day End'],
                prerequisite: 'Night of Madness occurred this day'
            },
            {
                type: 'Mandatory',
                timing: ['Mastermind Action step'],
                description: 'The Mastermind cannot place cards on this character.'
            },
        ],
    },
    {
        name: 'Nightmare',
        goodwillRefusel: 'Optional',
        unkillable: true,
        abilities: [
            {
                type: 'Optional',
                timing: ['Day End'],
                description: 'You may kill one character who is in this location.'
            },
            {
                type: 'Optional Loss condition: Character Death',
                timing: ['Day End'],
                prerequisite: 'There are 3 ore more Intrigue on all corpses in total'
            },
        ],
    },
    {
        name: 'Ghost',
        max: 1,
        abilities: [
            {
                type: 'Mandatory',
                timing: ['Mastermind Ability'],
                prerequisite: 'This card is a corpse',
                description: 'Palce 1 Paranoia on any character in this location, or any character in the Ghost’s starting location.'
            },
        ],
    },
    {
        name: 'Show-Off',
        unkillable: true,
        abilities: [
            {
                type: 'Mandatory',
                timing: ['Always'],
                prerequisite: 'This charcter has more then 2 Paranoia',
                description: 'This Character loses the Unkillable aspect.'
            },
            {
                type: 'Mandatory',
                timing: ['Goodwill ablility step'],
                prerequisite: 'This charcter has more then 2 Paranoia',
                description: 'This Character gains Mandatory Goodwill Refusal.'
            },
        ],
    },
    {
        name: 'Coward',
        abilities: [
            {
                type: 'Mandatory',
                timing: ['Mastermind Ability'],
                prerequisite: 'this charcter has 2 or more Paranoia',
                description: 'Pick a neigboring location, and move the charcter there.'
            },
        ],
    },
    {
        name: 'Zombie',
        abilities: [
            {
                type: 'Mandatory',
                timing: ['Day End'],
                timesPerDay: [1, { "Over all Roles": true }],
                description: 'If there is a location where there are more zombies than non-zombies, kill one character in that location (reminder: a corpse is no longer considered as a character).'
            },
            {
                type: 'Optional',
                timing: ['Day End'],
                timesPerDay: [1, { "Over all Roles": true }],
                description: 'You may move one zombie corpse to a neighboring location.'
            }
        ],
    },

    //Haunted Stage
    {
        name: 'Nightmare (Haunted Stage)',
        goodwillRefusel: 'Mandatory',
        abilities: [
            {
                type: 'Mandatory',
                timing: ['Day End'],
                description: 'Kill any other character in this location. If there is no other character, kill this character.'
            },
        ],
    },
    {
        name: 'Curse God',
        afterDeath: true,
        abilities: [
            {
                type: 'Optional Loss condition: Character Death',
                timing: ['Day End'],
                prerequisite: 'Character is dead & At least 2 Intrigue on this corpse',
            },
        ],
    },
    {
        name: 'Human Doll',
        afterDeath: true,
        abilities: [
            {
                type: 'Optional Loss condition: Character Death',
                timing: ['Mastermind Ability'],
                prerequisite: 'If there are at least 2 Intrigue in this location, and at least 1 Paranoia on this card',
            },
            {
                type: 'Optional Loss condition: Character Death',
                timing: ['On character death'],
                prerequisite: 'When this character dies: Put 1 Intrigue in this location.',
            },
        ],
    },
    {
        name: 'Werwolf (Haunted Stage)',
        goodwillRefusel: 'Mandatory',
        abilities: [
            {
                type: 'Optional Loss condition: Character Death',
                timing: ['Day End'],
                prerequisite: 'Day end on the fifth day',
            },
            {
                type: 'Mandatory',
                timing: ['Mastermind Action step'],
                description: 'The Mastermind cannot set an action card on this card.',
            },
        ],
    },
    {
        name: 'Vampire (Haunted Stage)',
        afterDeath: true,
        abilities: [
            {
                type: 'Optional',
                timing: ['Day End'],
                description: 'Kill one character of the opposite sex in this location who has at least 1 Paranoia and 1 Intrigue.',
            },
            {
                type: 'Optional Loss condition: Character Death',
                timing: ['Day End'],
                prerequisite: 'If there are 3 or more corpses of the opposite sex in this location',
            },
        ],
    },
    {
        name: 'Ghost (Haunted Stage)',
        afterDeath: true,
        max: 2,
        abilities: [
        ],
    },
    {
        name: 'Monster',
        unkillable: true,
        abilities: [
            {
                type: 'Mandatory',
                timing: ['When this role is to be reveald'],
                description: 'Increase the Extra Gauge by 2.'
            }
        ],
    },
    {
        name: 'Spellcaster',
        goodwillRefusel: 'Optional',
        abilities: [
            {
                type: 'Optional',
                timing: ['Mastermind Ability'],
                description: 'Place 1 Intrigue or Paranoia on one corpse in this location.'
            }
        ],
    },
    {
        name: 'Spellcaster',
        goodwillRefusel: 'Optional',
        abilities: [
            {
                type: 'Optional',
                timing: ['Mastermind Ability'],
                description: 'Place 1 Intrigue or Paranoia on one corpse in this location.'
            }
        ],
    },
    {
        name: 'Zombie (Haunted Stage)',
        afterDeath: true,
        goodwillRefusel: 'Mandatory',
        abilities: [
            {
                type: 'Mandatory',
                timing: ['Day End'],
                timesPerDay: [1, { "Over all Roles": true }],
                description: 'If there is a location where there are more zombies than non-zombies, kill one character in that location, then increase the Extra Gauge by 1 (reminder: a corpse is no longer considered as a character).'
            },
        ],
    },
    {
        name: 'Poltergeist',
        max: 1,
        goodwillRefusel: 'Mandatory',
        abilities: [
            {
                type: 'Optional',
                timing: ['Mastermind Ability'],
                timesPerDay: 1,
                description: 'Move any card in this location to any location.'
            },
        ],
    },
    {
        name: 'Horror',
        max: 1,
        afterDeath: true,
        abilities: [
            {
                type: 'Optional',
                timing: ['Mastermind Ability'],
                description: 'You may place 1 Paranoia on any character in this location.'
            },
        ],
    },
    {
        name: 'Overlorad',
        afterDeath: true,
        abilities: [
            {
                type: 'Optional',
                timing: ['Mastermind Ability'],
                prerequisite: 'This character is dead',
                description: 'Choose any other card in this location. If it is a corpse, it will be revived, If it is a character, it will be killed.'
            },
        ],
    },


] as const satisfies readonly RoleInternal[], 'name');

export const roles = rolesInternal as Record<RoleName, RoleInternal & { name: RoleName }>;


export function isRoleName(name: string): name is RoleName {
    return name in rolesInternal;
}


