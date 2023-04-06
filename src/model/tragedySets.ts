import { toRecord } from "../misc"
import type { IncidentNames } from "./incidents"
import type { PlotNames } from "./plots"

export type TragedySet = {
    name: string,
    mainPlots: readonly PlotNames[]
    subPlots: readonly PlotNames[]
    numberOfSubPlots: number,
    incidents: readonly IncidentNames[],
    extraRules: readonly string[],
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
    ] as const satisfies readonly TragedySet[];
}

export const tragedySets = toRecord(new TragedySets().tragedySets.map(x => [x.name, x] as const));