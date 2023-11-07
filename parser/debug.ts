import { Show } from "../util/mod.ts";
import { parse } from "./parser.js";

const data = await Deno.readTextFile("./debug.meg")

const a = parse(data)
Show(a)