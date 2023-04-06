import { toRecord } from "../misc";


export type Locations = 'Hospital' | 'Shirne' | 'City' | 'School';
export type Tag = 'boy' | 'girl' | 'student' | "man" | "woman" | "adult";

export type Character = {
    name: string,
    paranoiaLimit: number,
    tags: readonly Tag[],
    goodwill: readonly GoodwillSkill[],
    passive?: string
    startLocation: Locations;
    forbiddenLocation?: readonly Locations[]
};

export type GoodwillSkill = {
    goodwillRank: number,
    onesPerLoop?: true,
    immuneToGoodwillRefusel?: true,
    restrictedToLocation?: readonly Locations[],
    description: string

}

export type CharacterNames = Characters['characters'][never]['name'];

class Characters {




    public readonly characters = [
        {
            name: 'Boy Student',
            paranoiaLimit: 2,
            tags: ['student', "boy"],
            startLocation: 'School',
            goodwill: [
                {
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
            goodwill: [
                {
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
            goodwill: [
                {
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
            goodwill: [
                {
                    goodwillRank: 2,
                    onesPerLoop: true,
                    description: 'Leader gets one (1×∞) card back.'
                }
            ],
        },
        {
            name: 'Mystery Boy',
            paranoiaLimit: 3,
            tags: ['student', "boy"],
            startLocation: 'School',
            passive: 'Always has arole not associated with current plot.',
            goodwill: [
                {
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
            goodwill: [
                {
                    goodwillRank: 3,
                    restrictedToLocation: ['Shirne'],
                    description: '-1 Intrigue on Shrine.'
                },
                {
                    goodwillRank: 5,
                    onesPerLoop: true,
                    description: 'Reveal role of character in same location'
                }
            ],
        },
        {
            name: 'Alien',
            paranoiaLimit: 2,
            tags: ["girl"],
            startLocation: 'Shirne',
            goodwill: [
                {
                    goodwillRank: 4,
                    onesPerLoop: true,
                    description: 'Kill one character in same location.'
                },
                {
                    goodwillRank: 5,
                    onesPerLoop: true,
                    description: 'Revive one corpse in same location.'
                }
            ],
        },
        {
            name: 'Godly Being',
            paranoiaLimit: 3,
            tags: ["man", "woman"],
            startLocation: 'Shirne',
            passive: 'Enters game on predefined loop',
            goodwill: [
                {
                    goodwillRank: 3,
                    onesPerLoop: true,
                    description: 'Reveal culprit for 1 incident.'
                },
                {
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
            goodwill: [
                {
                    goodwillRank: 4,
                    onesPerLoop: true,
                    description: 'Reveal culprit for former incident.'
                },
                {
                    goodwillRank: 5,
                    onesPerLoop: true,
                    description: 'Put an Extra marker on another character in same location. Remove that marker to prevent that character from dying.'
                }
            ],
        },
        {
            name: 'Office Worker',
            paranoiaLimit: 3,
            tags: ["man", "adult"],
            startLocation: 'City',
            goodwill: [
                {
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
            goodwill: [
                {
                    goodwillRank: 5,
                    onesPerLoop: true,
                    description: 'Leader names the title of any Subplot. Then, the Mastermind must name the title of any other active subplot.'
                },
            ],
        },
        {
            name: 'Pop Idol',
            paranoiaLimit: 2,
            tags: ["girl", "student"],
            startLocation: 'City',
            goodwill: [
                {
                    goodwillRank: 3,
                    description: '-1 Paranoia on character in same location.'
                },
                {
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
            goodwill: [
                {
                    goodwillRank: 2,
                    description: '+1 Paranoia on character in same location.'
                },
                {
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
            passive: 'May be regarded as in his turf.',
            goodwill: [
                {
                    goodwillRank: 5,
                    onesPerLoop: true,
                    description: 'Reveal role of character in his turf.'
                },
            ],
        },
        {
            name: 'Doctor',
            paranoiaLimit: 2,
            tags: ["adult", "man"],
            startLocation: 'City',
            goodwill: [
                {
                    goodwillRank: 2,
                    description: '+/-1 Paranoia on character in same location.'
                },
                {
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
            goodwill: [
            ],
        },
        {
            name: 'Nurse',
            paranoiaLimit: 3,
            tags: ["adult", 'woman'],
            startLocation: 'Hospital',
            goodwill: [
                {
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
            passive: 'Mastermind chooses start location each loop',
            goodwill: [
                {
                    goodwillRank: 3,
                    description: 'Dose not trigger incidents.'
                }
            ],
        },
    ] as const satisfies readonly Character[];
}

export const characters = toRecord(new Characters().characters.map(x => [x.name, x] as const));
