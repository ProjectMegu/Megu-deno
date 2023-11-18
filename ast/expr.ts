import { Ident } from "./util.ts";

// Stmts

/**
 * 関数内に書かれる式
 */
export type Expr = CallFunc | string /** 変数 */

/**
 * 関数呼び出し
 */
export class CallFunc {
    /** 関数参照名 */
    ref: Ident[]
    /** 引数 */
    args: Expr[]
    constructor(ref: Ident[], args: Expr[]) {
        this.ref = ref
        this.args = args
    }
}