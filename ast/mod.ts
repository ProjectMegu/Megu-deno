// exports
export * from "./def.ts";
export * from "./expr.ts";
export * from "./util.ts";
export * from "./stmt.ts";

// (imports)
import { Def } from "./def.ts";

export class Context {
    mod: Module[];
    constructor(mod: Module[]) {
        this.mod = mod;
    }

    AddModule(mod: Module) {
        this.mod.push(mod);
    }
}

export class Module {
    name: string;
    dir: Dir[];
    constructor(name: string, dir: Dir[]) {
        this.name = name;
        this.dir = dir;
    }

    AddDir(dir: Dir) {
        this.dir.push(dir);
    }
}

export class Dir {
    name: string;
    source: Source[];
    dir: Dir[];
    constructor(name: string, source: Source[], dir: Dir[]) {
        this.name = name;
        this.source = source;
        this.dir = dir;
    }

    AddSource(source: Source) {
        this.source.push(source);
    }

    AddDir(dir: Dir) {
        this.dir.push(dir)
    }
}

export class Source {
    name: string;
    defs: Def[];
    constructor(name: string, defs: Def[]) {
        this.name = name;
        this.defs = defs;
    }
}
