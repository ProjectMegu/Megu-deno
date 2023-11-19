import { Stmt } from "./stmt.ts";
import { Ident, Type } from "./util.ts";

/**
 * Top-Scopeに置かれる､定義系のもの
 * 関数・ネームスペース・Useなど
 */
export type Def = DefFunc | NameSpaceLine | NameSpaceBlock | Use;

/**
 * 関数定義
 */
export class DefFunc {
    /** 関数名 */
    ident: Ident;
    /** 関数シグネチャ */
    signature: FuncSignature;
    /** 関数内の実装 */
    inner: Stmt[];
    constructor(ident: Ident, signature: FuncSignature, inner: Stmt[]) {
        this.ident = ident;
        this.signature = signature;
        this.inner = inner;
    }
}

/**
 * 関数シグネチャ
 * (引数・返り値など)
 */
export class FuncSignature {
    /** 引数(名前､型) */
    args: { name: string; type: Type }[];
    /** 返り値 */
    returnVal: Type | null;
    constructor(args: { name: string; type: Type }[], returnVal: Type | null) {
        this.args = args;
        this.returnVal = returnVal;
    }
}

/**
 * ファイル全体に働く､名前空間定義(1つのみ)
 */
export class NameSpaceLine {
    /** 相対的な名前空間定義かどうか */
    isRelative: boolean;
    /** 名前空間Path */
    ref: string[];
    constructor(isRelative: boolean, ref: string[]) {
        this.isRelative = isRelative;
        this.ref = ref;
    }
}

/**
 * 一定の範囲に働く名前空間
 */
export class NameSpaceBlock {
    /** 相対的な名前空間定義かどうか */
    isRelative: boolean;
    /** 名前空間Path */
    ref: string[];
    /** 定義たち */
    defs: Def[];
    constructor(isRelative: boolean, ref: string[], defs: Def[]) {
        this.isRelative = isRelative;
        this.ref = ref;
        this.defs = defs;
    }
}

/**
 * use文
 * スコープに引き込む構文
 */
export class Use {
    /** 相対的な名前空間定義かどうか */
    isRelative: boolean;
    /** そのUse文に含まれるPath */
    tree: UseList;
    constructor(isRelative: boolean, tree: UseList) {
        this.isRelative = isRelative;
        this.tree = tree;
    }
}

/**
 * Useに含まれるPath
 */
export type UseList = Ident[][];
