import { parse as parseToml } from "https://deno.land/std@0.205.0/toml/mod.ts";
// import { walkSync } from "https://deno.land/std@0.205.0/fs/mod.ts"
import { Show } from "../util/mod.ts";
import { Context, Dir, Module } from "../ast/mod.ts";
import { parse } from "../parser/parser.js";

export function MeguCompile(module_path: string) {
    let setting: Record<string, any>;
    try {
        setting = parseToml(Deno.readTextFileSync(module_path + "/Megu.toml"));
    } catch (error) {
        console.log(`File Load Error: ${error}`);
        Deno.exit(1);
    }

    let dependencies: string[] = [];
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
        return res
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

    Show(context)
}

function getExtension(fileName: string): string {
    if (fileName.includes(".")) {
        let index = fileName.indexOf(".");
        return fileName.slice(index);
    } else {
        throw new Error("No extension found");
    }
}

function getDirName(path: string): string {
    if (path.includes("/")) {
        let index = path.lastIndexOf("/");
        return path.slice(index + 1);
    } else {
        throw new Error("No extension found");
    }
}

MeguCompile("/workspace/sand/AModule");
