import { Ident, UseList } from "../ast/mod.ts";

export class UseInternal {
    path: Ident[];
    treeList: UseInternal[] | null;
    constructor(path: Ident[], treeList: UseInternal[] | null) {
        this.path = path
        this.treeList = treeList
    }

    intoUseList(): UseList {
        if (this.treeList === null) {
            return [this.path]
        } else {
            const list: Ident[][] = []
            for (const item of this.treeList) {
                const itemList = item.intoUseList()
                for (const item2 of itemList) {
                    list.push(this.path.concat(item2))
                }
            }
            return list
        }
    }
}