{{
    import * as Ast from "../ast/mod.ts";
    import * as Util from "./util.ts";
}}

/// ファイル全体
/// @return {Ast.Source}
Source = _ def:Def|.., _ | _ { return new Ast.Source("",def) }

/// 定義
/// @return {Ast.Def}
Def = DefFunc
    / NameSpace

/// 関数定義
/// @retunr {Ast.DefFunc}
DefFunc
    = "fn" _ ident:Ident _ sig:DefFuncSignature _ "[" inner:DefFuncInner "]" _ {return new Ast.DefFunc(ident,sig,inner)}

/// 関数の処理を書くところ
/// @return {Ast.Stmt[]}
DefFuncInner
    = _ stmts:Stmt|.., _nr "\n"+ _nr | _ { return stmts }

/// 関数シグネチャ
/// @return {Ast.FuncSignature}
DefFuncSignature
    = _ "(" _ args:DefFuncArgs|.., _ "," _| _ ")" _ ret:( ":" _ Type)? _ { 
        if (ret === null) {
            return new Ast.FuncSignature(args, ret) // 返り値がないやつ
        } else {
            return new Ast.FuncSignature(args, ret[2])
        }
    }

/// 関数の引数(name: type)
/// @return {name: Ast.Ident, type: Ast.Type}
DefFuncArgs
    = _ nameV:Ident _ ":" _ typeV:Type _ { return { name:nameV, type: typeV } }

/// 名前空間定義
/// @return {Ast.Def}
NameSpace = NameSpaceBlock / NameSpaceLine

/// ブロックを持たない名前空間  
/// File全体に働く
/// @return {Ast.NameSpaceLine}
NameSpaceLine = "nspace" _ dot:IsDot _ ref:DotRef _ { return new Ast.NameSpaceLine(dot,ref) }

/// ブロックを持つ名前空間
/// @return {Ast.NameSpaceBlock}
NameSpaceBlock = "nspace" _ dot:IsDot _ ref:DotRef _ "[" _ def:Def|.., _| _ "]" _ { return new Ast.NameSpaceBlock(dot,ref, def) }

/// use文
/// @return {Ast.Use}
Use = "use" _ ref:IsDot _ tree:UseTree { return new Ast.Use(ref, tree.intoUseList()) }

/// use文内の名前空間Path
/// @return {Util.UseInternal}
UseTree =
    path:DotRef _ "." _ "[" _ trees:UseTree|..,_ "," _| _ "]" { // A.[B,C]とか
        return new Util.UseInternal(path, trees)
    }
    / path:DotRef { return new Util.UseInternal(path,null) } // A.Bとかリストがないやつ
    

/// ステートメント(変数定義とか)
/// @return {Ast.Stmt}
Stmt = Expr

/// 式
/// @return {Ast.Expr}
Expr = CallFunc / StringLit

/// 関数呼び出し
/// @return {Ast.CallFunc}
CallFunc
    = ident:Ident _ "(" args:CallFuncArgs? ")" _nr { return new Ast.CallFunc([ident], args) }

/// 関数の引数
/// @return {Ast.Expr[]}
CallFuncArgs
    = args:Expr|..,_ "," _| { return args }

/// 名前空間を含む型
/// @return {Ast.Type}
Type
    = ref:DotRef { return ref }

/// .があるかどうか
/// @return {boolean}
IsDot = dot:"."? { if(dot) { return true } else { return false } }

/// A.B.Cなどの名前空間Path
/// @return {Ast.Ident[]}
DotRef = ident:Ident|..,_ "." _| { return ident }

/// 識別子
/// @return {Ast.Ident}
Ident = [a-zA-Z][a-zA-Z0-9]* { return text() }

/// 文字列リテラル
/// @return {string}
StringLit = '"' str:$('\\"'/[^"])* '"' { return str }

/// 無視するもの(改行なし)
/// @return {undefined}
_nr = [ \t]* { return }

/// 無視するもの
/// @return {undefined}
_ = [ \t\n\r]* { return }