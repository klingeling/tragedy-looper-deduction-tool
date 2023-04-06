import { toRecord } from "../misc";

export type timing = 'Always' | 'Day End' | 'Mastermind Ability' | 'Card resolve' | 'Loop End' | 'Loop Start' | 'Last Day' | 'Script creation';


export type Role = {
    name: string,
    max?: number,
    goodwillRefusel?: 'optional' | 'mandatory',
    abilities: readonly Abilities[]
}
export type Abilities = {
    description: string,
    type: 'optional' | 'mandatory' | 'loss condition',
    timing: readonly (timing)[]
}

export type RoleNames = Roles['roles'][never]['name'];


class Roles {
    public readonly roles = [

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
            abilities: [
                {
                    type: 'mandatory',
                    timing: ['Always'],
                    description: 'This character cannot die.'
                },
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
    ] as const satisfies readonly Role[];
}

export const roles = toRecord(new Roles().roles.map(x => [x.name, x] as const)) as Record<string,Role>;