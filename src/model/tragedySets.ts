import { toRecord } from "../misc"
import type { IncidentNames } from "./incidents"
import type { PlotNames } from "./plots"

export type TragedySet = {
    name: string,
    mainPlots: readonly PlotNames[]
    subPlots: readonly PlotNames[]
    numberOfSubPlots: number,
    incidents: readonly IncidentNames[],
    extraRules: readonly {
        name: string,
        description: string
    }[],
}

export type TragedySetNames = TragedySets['tragedySets'][never]['name'];

class TragedySets {
    public readonly tragedySets = [
        {
            name: 'Frist Steps',
            mainPlots: ['Murder Plan', 'Light of the Avenger', 'A Place to Protect'],
            subPlots: ['Shadow of the Ripper', 'An Unsettling Rumor', 'A Hideous Script'],
            numberOfSubPlots: 1,
            incidents: [
                'Murder',
                'Increasing Unease',
                'Suicide',
                'Hospital Incident',
                "Faraway Murder",
                'Missing Person',
                'Spreading',
            ],
            extraRules: [],
        },
        {
            name: 'Basic Tragedy',
            mainPlots: ['Murder Plan', 'The Sealed Item', 'Sign with me!', 'Change of Future', 'Giant Time Bomb'],
            subPlots: ['Circle of Friends', 'A Love Affair', 'The hidden Freak', 'An Unsettling Rumor', 'Paranoia Virus', 'Threads of Fate', 'Unknown Factor X'],
            numberOfSubPlots: 2,
            extraRules: [],
            incidents: [
                'Butterfly Effect',
                "Faraway Murder",
                'Foul Evil',
                'Hospital Incident',
                'Increasing Unease',
                'Missing Person',
                'Murder',
                'Spreading',
                'Suicide',
            ],
        },
        {
            name: 'Prime Evil',
            mainPlots: [
                'The Noble Bloodline',
                'Moonlight Beast',
                'Night Mist Nightmare',
                'The Ones from the Grave',
                'The Cursed Land',
            ],
            subPlots: [
                'Those with Habits',
                'A Love Affair',
                'Witch’s Curse',
                'The Key Girl',
                'Monster Intrigue',
                'Panic and Obsession',
                'People Who Don’t Listen',
            ],
            incidents: [
                'Sacrilegious Murder',
                'Increasing Unease',
                'Missing Person',
                'Evil Contamination',
                'The Executioner',
                'Dark Rumor',
                'Barricade',
                'Night of Madness',
                'Awakened Curse',
                'Fountain of Filth',
                'Evangelium of the Dead',
            ],
            numberOfSubPlots: 2,
            extraRules: [
                {
                    name: 'Victims',
                    description: 'Every Inrigue on locations counts as a corpse with the role Person. If such a corpse is revived by the power of the Alien, is is simply removed from the board.'
                },
                {
                    name: 'Mob Incidents',
                    description: 'These Incidents do not specify a character as a culprit, but a location. If there are enough corpses (specified by the incident) on the specific location, the incident happens.'
                },
                {
                    name: 'Curse cards',
                    description: 'Extra cards are treated as Curse cards. They can be placed on a location or be attached to characters and corpses. At the end of Day, before everything else, each curse is handeld. On a location the mastermind attaches a curse to any character in that location. Characters may have more than one curse. Characters with curses are killed (at the same time so a character that got a curse this step is not killed.) and the curse moves to the location. At the end of each loop, all Curses are removed.'
                },
            ],
        },
        {
            name: 'Cosmic Mythology',
            mainPlots: [
                'Choir to the Outside God',
                'The Sacred Wrods of Dagon',
                'The King in Yellow',
                'Giant Time Bomb Again',
                'Bloody Rites',
            ],
            subPlots: [
                'An Unsettling Rumor',
                'The Resistacne',
                'People Who Saw',
                'The Profound Race',
                'Whispers from the Deep',
                'The Faceless God',
                'Twisted Truth',
            ],
            incidents: [
                'Insane Murder',
                'Mass Suicide',
                'Missing Person',
                'Increasing Unease',
                'Evil Contamination',
                'Hospital Incident',
                'Uproar',
                'Fire of Demise',
                'Hound Dog Scent',
                'Discovery',
                'The Executioner',
            ],
            numberOfSubPlots: 2,
            extraRules: [
                {
                    name: 'Extra Gauge: Mythos knowlege',
                    description: '1. The Extra gauge starts on zero and dose not reset between loops. 2. Every time Goodwill ability is refused, immediately increase the Extra Gauge. 3. The Extra Gauge unlooks spells for the characters (Level in parenthises behind the spell name).'
                },
                {
                    name: 'Spell of Sympathy (1)',
                    description: 'At the start of the first day, the Leader may place 2 Goodwill on any one character of his choice.'
                },
                {
                    name: 'Reminiscence of the Forefathers (2)',
                    description: 'At the end of the loop, the Protagonists get to know the first subplot.'
                },
                {
                    name: 'Ancient Seal (3)',
                    description: 'The Protagonist’s "Forbid Intrigue" cards are no longer nullified if more then one of them are played in the same day.'
                },
                {
                    name: 'Madness (4)',
                    description: 'At the end of the Day the Protagonists die. This happens after everything else. No more loops can be played. Go to Final Guess.'
                },
            ],
        },
        {
            name: 'Mystery Circle',
            mainPlots: [
                'Murder Plan',
                'Tightrope Plan',
                'A Drop of Strychnine',
                'A Quilt of Incidents',
                'The Black School',
            ],
            subPlots: [
                'The hidden Freak',
                'Dance of Fools',
                'Isolated Institution Psycho',
                'An Absolute Will',
                'Tricky Twins',
                'Smell of Gunpowder',
                'I am a Master Detective',
            ],
            incidents: [
                'Serial Murder',
                'Hospital Incident',
                'Portent',
                'Increasing Unease',
                'Terrorism',
                'Bestial Murder',
                'Suicide',
                'A Suspicious Letter',
                'Faked Suicide',
                'Closed Circle',
                'The Silver Bullet',
            ],
            numberOfSubPlots: 2,
            extraRules: [
                {
                    name: 'Extra Gauge: Number of Incidents',
                    description: 'During "removal and placment of counters" set the Extra Gauge to 0. For each Incident that occurse, increase the Extra Gauge by 1. This is done regardless of whether the Event itself has any effect or not.'
                },
                {
                    name: 'Extra Cads',
                    description: 'During the "removal and placement of counters" stap during Loop start also remove all Extra cards. Then, place the cards according to plot rules (if applicable).'
                },

            ],
        },
        {
            name: 'Midnight Zone',
            mainPlots: [
                'The Sealed Item',
                'Secret Record',
                'The Devil’s Hand',
                'Male Confrontation',
                'Fated Connections',
            ],
            subPlots: [
                'Love-Hate Spiral',
                'Showtime of Death',
                'Witches Tea Time',
                'Dice of the Gods',
                'Unanswered Heart',
                'Unsafe Trigger',
                'Worshippers of the Apocalypse',
            ],
            incidents: [
                'Serial Murder',
                'Missing Person',
                'Suicide',
                'Conspiracies',
                'Increasing Unease',
                'Hospital Incident',
                'Uproar',
                'Fake Incident',
                'Breakthrough',
                'Faked Suicide',
                'Confession',

            ],
            numberOfSubPlots: 2,
            extraRules: [
                {
                    name: 'Extra Cads',
                    description: 'During the "removal and placement of counters" stap during Loop start also remove all Extra cards. Then, place the cards according to plot rules (if applicable).'
                },
            ],
        },
    ] as const satisfies readonly TragedySet[];
}

export const tragedySets = toRecord(new TragedySets().tragedySets.map(x => [x.name, x] as const));