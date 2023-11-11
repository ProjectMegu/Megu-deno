export class Context {
}

export class Module {
    name: string;
    def: Def[];

    constructor(name: string, def: Def[]) {
        this.name = name;
        this.def = def;
    }
}

export type Def = DefFunc;
export class DefFunc {
    name: string[];
    // inner
    where: string[];

    constructor(name: string[], where: string[]) {
        this.name = name;
        this.where = where;
    }
}
