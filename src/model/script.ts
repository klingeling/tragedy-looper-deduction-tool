import type { CharacterNames } from "./characters";
import type { IncidentNames } from "./incidents";
import type { PlotNames } from "./plots";
import type { RoleNames } from "./roles";
import type { TragedySetNames } from "./tragedySets";


export type Script = {
    titel: string,
    author: string,
    set?: string
    number?: number
    tragedySet: TragedySetNames,
    mainPlot: PlotNames,
    subPlots: readonly PlotNames[],
    numberOfLoops: number | readonly [number, number],
    daysPerLoop: number,
    characters: readonly {
        cast: CharacterNames,
        role: RoleNames
    }[],
    incidents: readonly {
        day: number,
        incident: IncidentNames,
        culprit: CharacterNames,
    }[],
    specialRule: string,
};

class Scripts {
    public readonly scripts = [

        {
            titel: 'The Future Assassin',
            author: 'Official',
            set: 'Midnight Circle',
            number: 3,
            tragedySet: 'Basic Tragedy',
            mainPlot: 'Change of Future',
            subPlots: ['The hidden Freak', 'Circle of Friends'],
            numberOfLoops: [4, 5],
            daysPerLoop: 5,
            characters: [
                {
                    cast: 'Girl Student',
                    role: 'Person'
                },
                {
                    cast: 'Class Rep',
                    role: 'Frind'
                },
                {
                    cast: 'Shrine Maiden',
                    role: 'Frind'
                },
                {
                    cast: 'Alien',
                    role: 'Person'
                },
                {
                    cast: 'Informer',
                    role: 'Conspiracy Theorist'
                },
                {
                    cast: 'Pop Idol',
                    role: 'Cultist'
                },
                {
                    cast: 'Journalist',
                    role: 'Person'
                },
                {
                    cast: 'Doctor',
                    role: 'Serial Killer'
                },
                {
                    cast: 'Patient',
                    role: 'Time Traveler'
                },
            ],
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
            specialRule: 'None'
        }

    ] as const satisfies readonly Script[];
}

export const scripts = new Scripts().scripts;