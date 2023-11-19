import { Ident, UseList } from "../ast/mod.ts";

/**
 * use文のPath構造を表します｡
 * 一時的にParse処理で使うものです｡
 * @example
 * const input = "Test.[A,B]"
 * const output = new UseInternal(
 *     ["Test"],
 *     [new UseInternal(["A"],null),
 *      new UseInternal(["B"],null)]
 * )
 * assertEquals(output, parse(input))
 * @description
 * これをparser-module以外で使わないでください｡
 */
export class UseInternal {
    /** List構造になる手前までのPath
     * use A.B.[C,D]
     * のA.Bを格納する
     */
    path: Ident[];
    /** List構造の中身
     * pathに格納するもの以外
     */
    treeList: UseInternal[] | null;

    constructor(path: Ident[], treeList: UseInternal[] | null) {
        this.path = path;
        this.treeList = treeList;
    }

    /**
     * Parser内部のものをAST上の表現に変換します｡
     * @example
     * const input = new UseInternal(
     *     ["Test"],
     *     [new UseInternal(["A"],null),
     *      new UseInternal(["B"],null)]
     * )
     * const output: UseList = [["Test","A"],["Test","B"]]
     * assertEquals(output, input.intoUseList())
     * @returns ASTで使われるPath表記({@link UseList})
     */
    intoUseList(): UseList {
        if (this.treeList === null) {
            // use A.B.C
            // などのList構造の無いもの
            return [this.path];
        } else {
            const list: Ident[][] = [];
            for (const item of this.treeList) {
                const itemList = item.intoUseList();
                for (const item2 of itemList) {
                    list.push(this.path.concat(item2));
                }
            }
            return list;
        }
    }
}
