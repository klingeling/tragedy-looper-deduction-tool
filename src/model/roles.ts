import { toRecord } from "../misc";
import type { ScriptSpecified } from "./core";

export type timing = 'Always' | 'Day End' | 'Mastermind Ability' | 'Card resolve' | 'Loop End' | 'Loop Start'
    | 'Last Day' | 'Script creation' | 'Incident step' | 'Incident trigger' | 'On character death' | 'When this role is to be reveald'
    | 'Mastermind Action step' | 'Goodwill ablility step';


type RoleInternal = {
    name: string,
    max?: number,
    unkillable?: true,
    goodwillRefusel?: 'optional' | 'mandatory',
    abilities: readonly Abilities[]
} & ScriptSpecified;
export type Abilities = {
    description: string,
    type: 'optional' | 'mandatory' | 'loss condition',
    timing: readonly (timing)[]
}

export type Role = Roles[keyof Roles];
export type Roles = typeof roles;
export type RoleName = Role['name'];




export const roles = toRecord([

    {
        name: 'Person',
        abilities: []
    },

    {
        name: 'Key Person',
        abilities: [
            {
                type: 'mandatory',
                timing: ['Always'],
                description: 'When this character dies the Protagonists lose and the loop ends immediately.'
            }
        ]
    },
    {
        name: 'Curmudgeon',
        goodwillRefusel: 'optional',
        abilities: [],
    },
    {
        name: 'Killer',
        goodwillRefusel: 'optional',
        abilities: [
            {
                type: 'optional',
                timing: ['Day End'],
                description: 'If the Key Person has at least 2 Intrigue and is in this char acter‘s location: You may kill the Key Person'
            },
            {
                type: 'optional',
                timing: ['Day End'],
                description: 'If this character has at least 4 Intrigue: You may kill the Protagonists'
            }
        ]
    },
    {
        name: 'Brain',
        goodwillRefusel: 'optional',
        abilities: [
            {
                type: 'optional',
                timing: ['Mastermind Ability'],
                description: 'You may place 1 Intrigue on this location or on any character in this location.'
            }
        ]
    },
    {
        name: 'Cultist',
        goodwillRefusel: 'mandatory',
        abilities: [
            {
                type: 'optional',
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
                type: 'mandatory',
                timing: ['Card resolve'],
                description: 'Ignore Forbid Goodwill on this character.'
            },
            {
                type: 'optional',
                timing: ['Day End', 'Last Day'],
                description: 'If there is 2 or less Goodwill on this character: Protagonists lose, loop ends.'
            },
        ]
    },
    {
        name: 'Witch',
        goodwillRefusel: 'mandatory',
        abilities: [],
    },
    {
        name: 'Frind',
        max: 2,
        abilities: [
            {
                type: 'loss condition',
                timing: ['Loop End'],
                description: 'If this character is dead, reveal its role: The Protagonists lose.'
            },
            {
                type: 'mandatory',
                timing: ['Loop Start'],
                description: 'If this role has been revealed, this char acter gets 1 Goodwill.'
            },
        ],
    },
    {
        name: 'Conspiracy Theorist',
        max: 1,
        abilities: [
            {
                type: 'optional',
                timing: ['Mastermind Ability'],
                description: 'You may place 1 Paranoia on any character in this location.'
            },
        ],
    },
    {
        name: 'Lover',
        abilities: [
            {
                type: 'mandatory',
                timing: ['Always'],
                description: 'If the Loved One dies, this character gets 6 Paranoia.'
            },
        ],
    },
    {
        name: 'Loved One',
        abilities: [
            {
                type: 'mandatory',
                timing: ['Always'],
                description: 'If the Lover dies, this character gets 6 Paranoia.'
            },
            {
                type: 'optional',
                timing: ['Day End'],
                description: 'If this character has at least 3 Paranoia and at least 1 Intrigue: You may kill the Protagonists.'
            },
        ],
    },
    {
        name: 'Serial Killer',
        abilities: [
            {
                type: 'mandatory',
                timing: ['Day End'],
                description: 'If there is exactly 1 other char acter in this location: That char acter dies (corpses are not characters).'
            },
        ],
    },
    {
        name: 'Factor',
        goodwillRefusel: 'optional',
        abilities: [
            {
                type: 'mandatory',
                timing: ['Always'],
                description: 'If there is at least 2 Intrigue on the School: This character gains the Conspiracy Theorist‘s ability, but not its role.'
            },
            {
                type: 'mandatory',
                timing: ['Always'],
                description: 'If there is at least 2 Intrigue on the City: This character gains the Key Person’s ability, but not its role.'
            },
        ],
    },
    {
        name: 'Poisoner',
        goodwillRefusel: 'optional',
        abilities: [
            {
                type: 'mandatory',
                timing: ['Day End'],
                description: 'If the Extra Gauge is on 2 or more, one charcters in the same location dies. (Onec per loop)'
            },
            {
                type: 'mandatory',
                timing: ['Day End'],
                description: 'If the Extra Gauge is on 4 or more, the Protagonists die.'
            },
        ],
    },
    {
        name: 'Fool',
        max: 1,
        abilities: [
            {
                type: 'mandatory',
                timing: ['Script creation'],
                description: 'This character must be the culprit of an Incident'
            },
            {
                type: 'mandatory',
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
                type: 'mandatory',
                timing: ['Always'],
                description: 'This character can never be a culprit.'
            },
            {
                type: 'mandatory',
                timing: ['Incident step'],
                description: 'If the Extra Gauge is 0, and the culprit is in this location, the Incident triggers regardless of the number of Paranoia counters on the culprit.'
            },
        ],
    },
    {
        name: 'Paranoiac',
        goodwillRefusel: 'mandatory',
        abilities: [
            {
                type: 'optional',
                timing: ['Mastermind Ability'],
                description: 'You may place 1 Intrigue counter on this location or an any character in this location.'
            },
        ],
    },
    {
        name: 'Twin',
        abilities: [
            {
                type: 'mandatory',
                timing: ['Script creation'],
                description: 'This character must be the culprit of an Incident.'
            },
            {
                type: 'mandatory',
                timing: ['Incident trigger'],
                description: 'When this character triggers an Incident, it is considered as being on the diagonally opposit location.'
            },
        ],
    },
    {
        name: 'Obstinate',
        goodwillRefusel: 'mandatory',
        abilities: [
            {
                type: 'mandatory',
                timing: ['Script creation'],
                description: 'This character must be the culprit of an Incident.'
            },
            {
                type: 'mandatory',
                timing: ['Incident step'],
                description: 'This character amways triggers its Incidents (if alive), regardless of the amount of Paranoia counters on it.'
            },
        ],
    },
    {
        name: 'Therapist',
        abilities: [
            {
                type: 'mandatory',
                timing: ['Mastermind Ability'],
                description: 'If the Extra Gauge is 1 or above, remove 1 Paranoia counter from any other character in this location.'
            },
        ],
    },
    {
        name: 'Magician',
        abilities: [
            {
                type: 'optional',
                timing: ['Mastermind Ability'],
                description: 'You may move one character with at least one Paranoia counter frmo this location to an adjacent location (not diagonal). (Only once per loop, for all magicians combined.)'
            },
            {
                type: 'mandatory',
                timing: ['On character death'],
                description: 'When this character dies, remove all Paranoia counters from its corpse'
            },
        ],
    },
    {
        name: 'Ninja',
        goodwillRefusel: "optional",
        abilities: [
            {
                type: 'optional',
                timing: ['When this role is to be reveald'],
                description: 'You may, insead of saying the truth, state any other non-Person role that is in this script'
            },
            {
                type: 'optional',
                timing: ['Day End'],
                description: 'If there is any charcter with at least 2 Intrigue Counters in this location, you may kill that character.'
            },
        ],
    },
    {
        name: 'Prophet',
        abilities: [
            {
                type: 'mandatory',
                timing: ['Mastermind Action step'],
                description: 'The Mastermind cannot place cards on this character.'
            },
            {
                type: 'mandatory',
                timing: ['Incident step'],
                description: 'When determing whether an Incident triggers, and the culprit is in another location, that incident does not trigger, regardless of the number of Paranoia conters on the culprit.'
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
                type: 'optional',
                timing: ['Day End'],
                description: 'If this character has at least 2 Intrigue and at least 2 Paranoia, you may kill all characters and the Protagonists.'
            },
            {
                type: 'mandatory',
                timing: ['Incident step'],
                description: 'When determining whether an Incident, for which this character is the culprit, will occour or not, also treat Intrigue as Paranoia.'
            },
            {
                type: 'mandatory',
                timing: ['Script creation'],
                description: 'This character must be the culprit of an incident.'
            },
        ],
    },
    {
        name: 'Deep One',
        max: 1,
        goodwillRefusel: 'optional',
        abilities: [
            {
                type: 'optional',
                timing: ['Mastermind Ability'],
                description: 'You may place 1 Intruge on this location or on any character in this location.'
            },
            {
                type: 'mandatory',
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
                type: 'mandatory',
                timing: ['Loop End'],
                description: 'If this character is dead, the Protagonists lose.'
            },
            {
                type: 'mandatory',
                timing: ['Goodwill ablility step'],
                description: 'When this character’s Goodwill ability is used, reveal this role after resolution. Then, the leader may increase the Extra Gauge one step.'
            },
        ],
    },
    {
        name: 'Witness',
        abilities: [
            {
                type: 'mandatory',
                timing: ['Day End'],
                description: 'If this character has 4 or more Paranoia, this charcter dies, and the Extra Gauge increases with 1 step.'
            },
        ],
    },
    {
        name: 'Faceless',
        goodwillRefusel: 'optional',
        unkillable: true,
        abilities: [
            {
                type: 'mandatory',
                timing: ['Always'],
                description: 'If the Extra Gauge is 1 or less, this character gains the abilities of a Conspiracy Theorist.'
            },
            {
                type: 'mandatory',
                timing: ['Always'],
                description: 'If the Extra Gauge is 2 or more, this character gains the abilities of a Deep One.'
            },
        ],
    },
    {
        name: 'Vampire',
        goodwillRefusel: 'optional',
        unkillable: true,
        abilities: [
            {
                type: 'optional',
                timing: ['Day End'],
                description: 'If the Key Person has at least 2 Intrigue and is in this character’s location, you may kill the Key Person.'
            },
            {
                type: 'optional',
                timing: ['Day End'],
                description: 'If there are at least 2 corpses in this character’s starting location, you may kill the Protagonists.'
            },
        ],
    },
    {
        name: 'Werwolf',
        goodwillRefusel: 'optional',
        abilities: [
            {
                type: 'optional',
                timing: ['Day End'],
                description: 'If Night of Madness occurred this day, you may kill the Protagonists.'
            },
            {
                type: 'mandatory',
                timing: ['Mastermind Action step'],
                description: 'The Mastermind cannot place cards on this character.'
            },
        ],
    },
    {
        name: 'Nightmare',
        goodwillRefusel: 'optional',
        unkillable: true,
        abilities: [
            {
                type: 'optional',
                timing: ['Day End'],
                description: 'You may kill one character who is in this location.'
            },
            {
                type: 'optional',
                timing: ['Day End'],
                description: 'If there are 3 ore more Intrigue on all corpses in total, you may kill the Protagonists.'
            },
        ],
    },
    {
        name: 'Ghost',
        max: 1,
        abilities: [
            {
                type: 'mandatory',
                timing: ['Mastermind Ability'],
                description: 'Ifh this card is a corpse, palce 1 Paranoia on any character in this location, or any character in the Ghost’s starting location.'
            },
        ],
    },
    {
        name: 'Show-Off',
        unkillable: true,
        abilities: [
            {
                type: 'mandatory',
                timing: ['Always'],
                description: 'If this charcter has more then 2 Paranoia, (s)he hoses the Unkillable aspect and gains Mandatory Goodwill Refusal.'
            },
        ],
    },
    {
        name: 'Coward',
        abilities: [
            {
                type: 'mandatory',
                timing: ['Mastermind Ability'],
                description: 'If this charcter has 2 or more Paranoia, pick a neigboring location, and move the charcter there.'
            },
        ],
    },
    {
        name: 'Zombie',
        abilities: [
            {
                type: 'mandatory',
                timing: ['Day End'],
                description: 'If there is a location where there are more zombies than non-zombies, kill one character in that location (only once per day, for all zombies)(reminder: a corpse is no longer considered as a character).'
            },
            {
                type: 'optional',
                timing: ['Day End'],
                description: 'You may move one zombie corpse to a neighboring location (only once per day, for all zombies).'
            }
        ],
    },
] as const satisfies readonly RoleInternal[], 'name');





export function isRoleName(name: string): name is RoleName {
    return name in roles;
}


