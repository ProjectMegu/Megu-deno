{{
    import * as Ast from "../ast/mod.ts";
}}

Source = _ def:Def|.., _ | _ { return new Ast.Source("",def) }

Def = DefFunc
    / NameSpace

DefFunc
    = "fn" _ ident:Ident _ sig:DefFuncSignature _ "[" inner:DefFuncInner "]" _ {return new Ast.DefFunc(ident,sig,inner)}

DefFuncInner
    = _ stmts:Stmt|.., _nr "\n"+ _nr | _ { return stmts }

DefFuncSignature
    = _ "(" _ args:DefFuncArgs|.., _ "," _| _ ")" _ ret:( ":" _ Type)? _ { 
        if (ret === null) {
            return new Ast.FuncSignature(args, ret)
        } else {
            return new Ast.FuncSignature(args, ret[2])
        }
    }
DefFuncArgs
    = _ nameV:Ident _ ":" _ typeV:Type _ { return { name:nameV, type: typeV } }

NameSpace = NameSpaceBlock / NameSpaceLine
NameSpaceLine = "nspace" _ dot:IsDot _ ref:DotRef _ { return new Ast.NameSpaceLine(dot,ref) }
NameSpaceBlock = "nspace" _ dot:IsDot _ ref:DotRef _ "[" _ def:Def|.., _| _ "]" _ { return new Ast.NameSpaceBlock(dot,ref, def) }

Stmt = Expr

Expr = CallFunc / StringLit

CallFunc
    = ident:Ident _ "(" args:CallFuncArgs? ")" _nr { return new Ast.CallFunc([ident], args) }

CallFuncArgs
    = args:Expr|..,_ "," _| { return args }

Type
    = ref:DotRef { return ref }
IsDot = dot:"."? { if(dot) { return true } else { return false } }
DotRef = ident:Ident|..,_ "." _| { return ident }
Ident = [a-zA-Z][a-zA-Z0-9]* { return text() }
StringLit = '"' str:$('\\"'/[^"])* '"' { return str }
_nr = [ \t]* { return }
_ = [ \t\n\r]* { return }