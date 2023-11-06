// Simple Arithmetics Grammar
// ==========================
//
// Accepts expressions like "2 * (3 + 4)" and computes their value.

{{
    import * as Ast from "../ast/mod.ts";
}}

Source = Expr

DefFunc
    = "fn" _ ident:Ident _ "(" _ ")" _ "[" inner:DefFuncInner "]" _ {return new Ast.DefFunc(ident, inner)}

DefFuncInner
    = _ stmts:Stmt|.., _nr "\n"+ _nr | _ { return stmts }

Stmt = Expr

Expr = CallFunc

CallFunc
    = ident:Ident _ "(" args:CallFuncArgs? ")" _nr { return new Ast.CallFunc([ident], args) }

CallFuncArgs
    = args:Expr|..,_ "," _| { return args }

Ident = [a-zA-Z][a-zA-Z0-9]* { return text() }
_nr = [ \t]* { return }
_ = [ \t\n\r]* { return }