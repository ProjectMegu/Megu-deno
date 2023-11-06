// exports
export * from "./def.ts";
export * from "./expr.ts";
export * from "./util.ts";
export * from "./stmt.ts"

// (imports)
import { Def } from "./def.ts";

export class Source {
    defs: Def[];
    constructor(defs: Def[]) {
        this.defs = defs;
    }
}
