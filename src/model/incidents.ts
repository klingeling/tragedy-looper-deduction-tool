import { toRecord } from "../misc";


export type Incident = IncidentInternal & {
    name: IncidentName,

}
type IncidentInternal = {
    name: string,
    effect: string,
}

export type IncidentName = Incidents['incidents'][never]['name'];


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
        {
            name: 'Serial Murder',
            effect: 'One other character in the culprit’s location dies. The same character may be the culprit of teveral Serial Murder Incidents.',
        },
        {
            name: 'Portent',
            effect: '[When determning wether this Incident triggers or not, treat the culprit’s Paranoia limit ats 1 less then its printed limit] Put 1 Paranoia counter on any character in the culprit’s location.',
        },
        {
            name: 'Increasing Unease',
            effect: 'Place 2 Paranoia on any character, then 1 Intrigue on any other character.',
        },
        {
            name: 'Terrorism',
            effect: 'If the City has at least 1 Intrigue, everyone ni the City dies. Also if the City has at least 2 Intrigue, the Protagonists die.',
        },
        {
            name: 'Bestial Murder',
            effect: '[When determinig wether this INcident triggers or not, treat the culprit’s Paranoia limit as 1 more than its printed limit.] Resolve "Serial Murder" and "Increasing Unease" in that order. Then increase the Extra Gauge by 1 more step.',
        },
        {
            name: 'A Suspicious Letter',
            effect: 'Move any character in the culprit’s location to any location. If the character actually changed location, that character cannot be moved the next day.',
        },
        {
            name: 'Faked Suicide',
            effect: 'Set an Extra card on the culprit. Jruing the remainder of the loop, the Protagonists may not play movement cards on characte(s) with an Extra card.',
        },
        {
            name: 'Closed Circle',
            effect: 'Reveal the culprit’s locationto. For 3 days, including the day the  incident occurred, any movement to or from that location is nullified.',
        },
        {
            name: 'The Silver Bullet',
            effect: 'The loop ends after this Incident step (resulting in a Protagonist victory unless any loss condition is fullifilled). This Incident dose not increase the Extra Gauge.',
        },
        {
            name: 'Conspiracies',
            effect: 'Resolve either a Serial Murder or a Missing Person Incident. Check Intrigue instead of Paranoia conters to trigger the Incident.',
        },
        {
            name: 'Uproar',
            effect: 'If there is at least 1 Intrigue conuter on the School, everyone in the School dies. If there is at least 1 Intrigue counter on the City, everyone in the City dies.',
        },
        {
            name: 'Fake Incident',
            effect: 'If there are 2 Intrigue counters on the culprit’s starting location, the Protagonists die.',
        },
        {
            name: 'Breakthrough',
            effect: 'The Protagonist Leader chooses one location or character, and removes 2 Intrigue counters from there.',
        },
        {
            name: 'Confession',
            effect: 'Reveal the culprit and the culprit’s role.',
        },
        {
            name: 'Sacrilegious Murder',
            effect: 'Either kill another charcter in the same location as the culprit, or place an Intrigue on the culprit’s location.',
        },
        {
            name: 'Evil Contamination',
            effect: 'Place 2 Intrigue on the Shrine.',
        },
        {
            name: 'The Executioner',
            effect: 'The leader chooses one character. That charcter is killed.',
        },
        {
            name: 'Dark Rumor',
            effect: 'Attach a Curse on the culprit.',
        },
        {
            name: 'Barricade',
            effect: 'For each other character in cluprit’s location, pick any other location and move the character there.',
        },
        {
            name: 'Night of Madness',
            effect: '[Mob incident:0 (will always occur)] If there are 6 or more zombies when this incident occurs, the Protagonists will die after the day has ended.',
        },
        {
            name: 'Awakened Curse',
            effect: '[Mob incident:1] Place a curse on the culprit’s location.',
        },
        {
            name: 'Fountain of Filth',
            effect: '[Mob incident:2] Place 2 Paranoia on any one character, and an Intrigue on any location.',
        },
        {
            name: 'Evangelium of the Dead',
            effect: '[Mob incident:2] Kull all characters in the culprits location. Then, if that location has 5 or more corpses, the Protagonists are killed.',
        },
        {
            name: 'Insane Murder',
            effect: 'Kill any one character (including culprit) in the same location as the culprit.',
        },
        {
            name: 'Mass Suicide',
            effect: 'If the culprit has at least 1 Intrigue, all characters in the culprit’s location are killed.',
        },
        {
            name: 'Fire of Demise',
            effect: 'The frist time thes incident happens this game session, all characters and the Protagonists are killed.',
        },
        {
            name: 'Hound Dog Scent',
            effect: 'When determinig whether this incident occours or not, count Intrigde instead of Paranoia. For the rest of the loop, if another Incident occours, the Protagonists are killed after the Incident step.',
        },
        {
            name: 'Discovery',
            effect: 'Increase the Extra Gauge 1 step.',
        },
    ] as const satisfies readonly IncidentInternal[];
}

const i = new Incidents();

export function isIncidentName(name: string): name is IncidentName {
    return i.incidents.some(x => x.name == name);
}

export const incidents = toRecord<Incident, IncidentName>((i.incidents).map(x => [x.name, x] as const));