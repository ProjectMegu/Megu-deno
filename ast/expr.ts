import { Ident } from "./util.ts";

// Stmts

export type Expr = CallFunc | string

export class CallFunc {
    ref: Ident[]
    args: Expr[]
    constructor(ref: Ident[], args: Expr[]) {
        this.ref = ref
        this.args = args
    }
}