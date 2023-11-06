import { parse } from "./parser.js";
import * as Ast from "../ast/mod.ts";
import * as Assert from "https://deno.land/std@0.205.0/assert/mod.ts";

/*

Deno.test("Some test", () => {
    const expect = "Some" ;
    const input = "Some";
    Assert.assertEquals(expect, parse(input, { startRule: "Some" }));
});

*/

Deno.test("DefFunc", () => {
    const expect = new Ast.DefFunc("Main", []);
    const input = "fn Main() [ ]";
    Assert.assertEquals(expect, parse(input, { startRule: "DefFunc" }));
});

Deno.test("DefFunc with Inner", () => {
    const expect = new Ast.DefFunc("Main", [new Ast.CallFunc(["Test"], []), new Ast.CallFunc(["Test"], [])]);
    const input = "fn Main() [ Test() \n Test()]";
    Assert.assertEquals(expect, parse(input, { startRule: "DefFunc" }));
});

Deno.test("CallFunc", () => {
    const expect = new Ast.CallFunc(["Test"], []);
    const input = "Test()";
    Assert.assertEquals(expect, parse(input, { startRule: "CallFunc" }));
});

Deno.test("CallFunc and Arg", () => {
    const expect = new Ast.CallFunc(
        ["Test"],
        [new Ast.CallFunc(["Test2"], []), new Ast.CallFunc(["Test3"], [])],
    );
    const input = "Test(Test2(), Test3())";
    Assert.assertEquals(expect, parse(input, { startRule: "CallFunc" }));
});
