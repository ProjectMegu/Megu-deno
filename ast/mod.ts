// exports
export * from "./def.ts";
export * from "./expr.ts";
export * from "./util.ts";
export * from "./stmt.ts";

// (imports)
import { Def } from "./def.ts";

/** すべての依存関係を含めた､コンパイル全体 */
export class Context {
    /** コンパイルするモジュール群 */
    mod: Module[];
    constructor(mod: Module[]) {
        this.mod = mod;
    }

    AddModule(mod: Module) {
        this.mod.push(mod);
    }
}

/**
 * 依存関係の単位
 * Rustで言うCrate
 */
export class Module {
    name: string;
    /**
     * 含まれるディレクトリ群
     * Rootに含まれるものは"__ROOT__"に含まれる
     */
    dir: Dir[];
    constructor(name: string, dir: Dir[]) {
        this.name = name;
        this.dir = dir;
    }

    AddDir(dir: Dir) {
        this.dir.push(dir);
    }
}

/**
 * ディレクトリ
 */
export class Dir {
    /** ディレクトリ名 */
    name: string;
    /** 含まれているソースファイル */
    source: Source[];
    /** 含まれるディレクトリ */
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
        this.dir.push(dir);
    }
}

/**
 * ソースファイル
 */
export class Source {
    name: string;
    /** 含まれる定義 */
    defs: Def[];
    constructor(name: string, defs: Def[]) {
        this.name = name;
        this.defs = defs;
    }
}
