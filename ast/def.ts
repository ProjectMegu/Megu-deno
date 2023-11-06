import { Stmt } from "./stmt.ts";
import { Ident } from "./util.ts";

export type Def = DefFunc

export class DefFunc {
    ident: Ident
    inner: Stmt[]
    constructor(ident: Ident, inner: Stmt[]) {
        this.ident = ident
        this.inner = inner
    }
}