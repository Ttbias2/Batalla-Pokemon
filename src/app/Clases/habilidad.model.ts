export class habilidad{
    name: string='';
    accuracy: number=0;
    power: number=0;
    priority: number=0;
    ailment_chance: number=0;
    type: string='';
    ailment: string='';
    damage_class: string='';
    stat_changes: string='';

    constructor(
        name: string,
        accuracy: number,
        power: number,
        priority: number,
        ailment_chance: number,
        type: string,
        ailment: string,
        damage_class: string,
        stat_changes: string
    ){
        this.name = name;
        this.accuracy = accuracy;
        this.power = power;
        this.priority = priority;
        this.ailment_chance = ailment_chance;
        this.type = type;
        this.ailment = ailment;
        this.damage_class = damage_class;
        this.stat_changes = stat_changes;
    }
}



