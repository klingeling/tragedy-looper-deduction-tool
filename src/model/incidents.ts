import { toRecord } from "../misc";


export type Incident = {
    name: string,
    effect: string,
}

export type IncidentNames = Incidents['incidents'][never]['name'];


class Incidents {
    public readonly incidents = [
        {
            name: 'Murder',
            effect: 'One (1) other character in culprit’s Location dies',
        },
        {
            name: 'Increasing Unease',
            effect: 'Place 2 Paranoia on any character and 1 Intrigue on another',
        },
        {
            name: 'Foul Evil',
            effect: 'Place 2 Intrigue on the Shrine.',
        },
        {
            name: 'Suicide',
            effect: 'The culprit dies.',
        },
        {
            name: 'Hospital Incident',
            effect: 'If at least 1 Intrigue on the Hospital: Everyone in the Hospital dies. If at least 2 Intrigue on the Hospital: The Protagonists die.',
        },
        {
            name: 'Faraway Murder',
            effect: 'One character with at least 2 Intrigue dies.',
        },
        {
            name: 'Missing Person',
            effect: 'Move culprit to any Location. Put 1 Intrigue on that Location.',
        },
        {
            name: 'Spreading',
            effect: 'Move 2 Goodwill from any character to any other character.',
        },
        {
            name: 'Butterfly Effect',
            effect: 'Put any counter on any character in culprit’s Location.',
        },
    ] as const satisfies readonly Incident[];
}

export const incidents = toRecord((new Incidents().incidents).map(x => [x.name, x] as const));