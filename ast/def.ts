import { Stmt } from "./stmt.ts";
import { Ident, Type } from "./util.ts";

export type Def = DefFunc | NameSpaceLine | NameSpaceBlock;

export class DefFunc {
    ident: Ident;
    signature: FuncSignature;
    inner: Stmt[];
    constructor(ident: Ident, signature: FuncSignature, inner: Stmt[]) {
        this.ident = ident;
        this.signature = signature;
        this.inner = inner;
    }
}

export class FuncSignature {
    args: {name: string, type: Type}[];
    returnVal: Type | null;
    constructor(args: {name: string, type: Type}[], returnVal: Type | null) {
        this.args = args;
        this.returnVal = returnVal;
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
