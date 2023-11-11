import { Stmt } from "./stmt.ts";
import { Ident } from "./util.ts";

export type Def = DefFunc | NameSpaceLine | NameSpaceBlock;

export class DefFunc {
    ident: Ident;
    inner: Stmt[];
    constructor(ident: Ident, inner: Stmt[]) {
        this.ident = ident;
        this.inner = inner;
    }
}

export class NameSpaceLine {
    isRelative: boolean;
    ref: string[];
    constructor(isRelative: boolean, ref: string[]) {
        this.isRelative = isRelative;
        this.ref = ref;
    }
}

export class NameSpaceBlock {
    isRelative: boolean;
    ref: string[];
    defs: Def[];
    constructor(isRelative: boolean, ref: string[], defs: Def[]) {
        this.isRelative = isRelative;
        this.ref = ref;
        this.defs = defs;
    }
}
