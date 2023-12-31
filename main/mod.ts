import { parse as parseToml } from "https://deno.land/std@0.208.0/toml/mod.ts";
// import { walkSync } from "https://deno.land/std@0.208.0/fs/mod.ts"
import { Show } from "../util/mod.ts";
import { Context, Dir, Module } from "../ast/mod.ts";
import { parse } from "../parser/parser.js";
import { MeguModuleSetting } from "./settingType.ts";

/**
 * Meguのコンパイルを開始する
 * エントリーポイント
 * @param module_path main-moduleのパス
 */
export function MeguCompile(module_path: string) {
    let setting: MeguModuleSetting;
    try {
        setting = parseToml(
            Deno.readTextFileSync(module_path + "/Megu.toml"),
        ) as MeguModuleSetting;
    } catch (error) {
        console.log(`File Load Error: ${error}`);
        Deno.exit(1);
    }

    // 1次依存のロード
    // 2次依存の検出はいつか
    const dependencies: string[] = [];
    for (const item of setting.dependencies) {
        switch (item.place) {
            case "local":
                dependencies.push(`${module_path}/../${item.url}`);
                break;

            default:
                console.log(
                    `Where is ${item.place}? Can use "local" | "git" | "repo"`,
                );
                break;
        }
    } // TODO: 流石に依存先の依存もロードする....

    // Create AST
    // メモリ上にコードをすべて載せるのは流石にあれなので､
    // TODO: 分割コンパイルを実装する
    dependencies.push(module_path); // 仮

    function dir_s(path: string): Dir {
        const res = new Dir(getDirName(path), [], []);
        for (const file of Deno.readDirSync(path)) {
            if (file.isFile && getExtension(file.name) === ".meg") {
                const source = parse(
                    Deno.readTextFileSync(`${path}/${file.name}`),
                );
                res.AddSource(source);
            } else if (file.isDirectory) {
                res.AddDir(dir_s(`${path}/${file.name}`));
            } else {
                continue;
            }
        }
        return res;
    }

    const context = new Context([]);
    for (const path of dependencies) {
        Show(path);
        const module = new Module(getDirName(path), []);
        const root = new Dir("__ROOT__", [], []);
        for (const file of Deno.readDirSync(path)) {
            if (file.isFile && getExtension(file.name) === ".meg") {
                const source = parse(
                    Deno.readTextFileSync(`${path}/${file.name}`),
                );
                root.AddSource(source);
            } else if (file.isDirectory) {
                module.AddDir(dir_s(`${path}/${file.name}`));
            } else {
                continue;
            }
        }

        module.AddDir(root);
        context.AddModule(module);
    }

    // ToHir -> GenLLVM
}

/**
 * 拡張子と思わしきもののすべてを抜き出す
 * @param fileName 拡張子を含むファイルの名前
 * @returns 拡張子(.d.ts)とか
 */
function getExtension(fileName: string): string {
    if (fileName.includes(".")) {
        const index = fileName.indexOf(".");
        return fileName.slice(index);
    } else {
        return "";
    }
}

/**
 * パスの中からディレクトリ名を抜き出す
 * @param path path/aなどの/で繋がれたパス
 * @returns path/aのとき､a
 */
function getDirName(path: string): string {
    if (path.includes("/")) {
        const index = path.lastIndexOf("/");
        return path.slice(index + 1);
    } else {
        return path;
    }
}
