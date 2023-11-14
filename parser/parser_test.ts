import { parse } from "./parser.js";
import * as Ast from "../ast/mod.ts";
import * as Assert from "https://deno.land/std@0.205.0/assert/mod.ts";

/*

Deno.test("Some test", () => {
    const expect = "Some" ;
    const input = "Some";
    // @ts-ignore: startRuleの部分により安全
    Assert.assertEquals(expect, parse(input, { startRule: "Some" }));
});

*/

Deno.test("DefFunc", () => {
    const expect = new Ast.DefFunc("Main", new Ast.FuncSignature([], null), []);
    const input = "fn Main() [ ]";
    // @ts-ignore: startRuleの部分により安全
    Assert.assertEquals(expect, parse(input, { startRule: "DefFunc" }));
});

Deno.test("DefFunc with Inner", () => {
    const expect = new Ast.DefFunc("Main", new Ast.FuncSignature([], null), [
        new Ast.CallFunc(["Test"], []),
        new Ast.CallFunc(["Test"], []),
    ]);
    const input = "fn Main() [ Test() \n Test()]";
    // @ts-ignore: startRuleの部分により安全
    Assert.assertEquals(expect, parse(input, { startRule: "DefFunc" }));
});

Deno.test("NameSpaceLine", () => {
    const expect = new Ast.NameSpaceLine(false, ["A", "B", "C"]);
    const input = "nspace A.B  . C";
    // @ts-ignore: startRuleの部分により安全
    Assert.assertEquals(expect, parse(input, { startRule: "NameSpaceLine" }));
});

Deno.test("NameSpaceBlock", () => {
    const expect = new Ast.NameSpaceBlock(false, ["A", "B", "C"], [
        new Ast.DefFunc("Test", new Ast.FuncSignature([], null), []),
    ]);
    const input = "nspace A.B.C [ fn Test() [] ]";
    // @ts-ignore: startRuleの部分により安全
    Assert.assertEquals(expect, parse(input, { startRule: "NameSpace" }));
});

Deno.test("NameSpaceLine isRelative", () => {
    const expect = new Ast.NameSpaceLine(true, ["a", "b"]);
    const input = "nspace .a.b";
    // @ts-ignore: startRuleの部分により安全
    Assert.assertEquals(expect, parse(input, { startRule: "NameSpace" }));
});

Deno.test("Use", () => {
    const expect = new Ast.Use(false, [["A", "B", "C"], [
        "A",
        "B",
        "D",
        "E",
        "F",
    ]]);
    const input = "use A.B.[C,D.E.F]";
    // @ts-ignore: startRuleの部分により安全
    Assert.assertEquals(expect, parse(input, { startRule: "Use" }));
});

Deno.test("Use isRelative === true", () => {
    const expect = new Ast.Use(true, [["Test"]]);
    const input = "use .Test";
    // @ts-ignore: startRuleの部分により安全
    Assert.assertEquals(expect, parse(input, { startRule: "Use" }));
});

Deno.test("CallFunc", () => {
    const expect = new Ast.CallFunc(["Test"], []);
    const input = "Test()";
    // @ts-ignore: startRuleの部分により安全
    Assert.assertEquals(expect, parse(input, { startRule: "CallFunc" }));
});

Deno.test("CallFunc and Arg", () => {
    const expect = new Ast.CallFunc(
        ["Test"],
        [new Ast.CallFunc(["Test2"], []), new Ast.CallFunc(["Test3"], [])],
    );
    const input = "Test(Test2(), Test3())";
    // @ts-ignore: startRuleの部分により安全
    Assert.assertEquals(expect, parse(input, { startRule: "CallFunc" }));
});

Deno.test("StringLit", () => {
    const expect = 'test\\"\\n';
    const input = '"test\\"\\n"';
    // @ts-ignore: startRuleの部分により安全
    Assert.assertEquals(expect, parse(input, { startRule: "StringLit" }));
});
