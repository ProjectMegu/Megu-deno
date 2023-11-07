import { Stmt } from "./stmt.ts";
import { Ident } from "./util.ts";

export type Def = DefFunc | NameSpaceLine | NameSpaceBlock

export class DefFunc {
    ident: Ident
    inner: Stmt[]
    constructor(ident: Ident, inner: Stmt[]) {
        this.ident = ident
        this.inner = inner
    }
}

export class NameSpaceLine {
    ref: string[]
    constructor(ref: string[]) {
        this.ref = ref
    }
}

export class NameSpaceBlock {
    ref: string[]
    defs: Def[]
    constructor(ref: string[], defs: Def[]) {
        this.ref = ref
        this.defs = defs
    }
}