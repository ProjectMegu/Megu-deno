Print("Hello! This is Megu's Syntax!")

// This is Line Comment
/* This is Multi
 *              -Line Comment 
 */

[
    // This is Block!
]

[
    // Variables

    a = 5 // mutable (for script)
    let a = 5 // immuatable
    mut a = 5 // mutable (for project)

    // This is OK
    let a = [
        mut b = 5
        b += 1
        break b
    ] // a == 6

    // This is very bad
    mut a = 5
    a += 1
]

[
    // Flows
    
    let value = 414

    if value == 414 [
        Print("value is 414")
    ] else [
        Print("value is not 414") // Warn
    ]

    let value = if value == 414 [ 414 ] else [ 0 ]
    // let value = if value == 414 [ break 414 ] else [ break 0 ]

    let value = loop [
        Print("This is LOOOOOOOP!")
        break 414
    ] // value is 414

    let array = [1,2,3,4,5]

    for i in array [
        PrintV(i) // 1 .........
    ]

    mut value = 0

    while value < 5 [
        value += 1
    ]
]

[
    // Type Systems (Type Script)
    let value: Int = 5
    let value: UInt = 5
    let value: I<32> = 5
    let value: U<32> = 5

    let value: Int | Str = "This is Safe Union!"

    fn Test(a, b) [ return a + b ]
    Print(Test(5,10)) // 15
    Print(Test("a","b")) // "ab"
    /*
    @type T1: trait(Sys.Add<T1,T2,T3>) 
    fn Test<T1, T2, T3>(a: T1, b: T2): T3 [ return a + b ]
    */

    struct S1 [a,b,c] // S1<T_a,T_b,T_c>
    mut s = S1[a: 5, b: 10, c: 5.5] // s: S1<Int,Int,Float>
    // s = S1[a: "a", b: "b", c: "c"] // Error! 

    trait I1 [ fn Say(&self) ]

    @impl I1
    fn Say(self: &S1<Int,_,_>) [ PrintV(self) ]
    /*
    
    impl S1<Int,_,_>: I1 [
        fn Say(&self) [
            Print(self)
        ]
    ]

    */

    s.Say() // S1[a: 5, b: 10, c: 5.5]

    enum E1 [
        A,
        B(Int, Float)
        C(a: Int, b: Float)
    ]

    let e = E1.C(a: 5,b: 5.5)
    PrintV(e.a) // 5

    fn UFCS(a,b) [ return a + b ]
    5.UFCS(5) // 10

    @value V1: Int
    struct NumType<V1> [ 
        fn Check(&self, num) [ 
            if num == V1 [ Print("OK!") ]
        ]
    ]

    @type T1: bool(T1 == 5)
    fn Check<T1>(num: T1) [
        if num == 5 [
            return true
        ] else [
            return false
        ]
    ]

    Check(5) // true
    // Check(10) // Error
]