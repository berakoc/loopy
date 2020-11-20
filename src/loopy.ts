type Predicate<T> = (t: T) => boolean
type Resolver<T> = (...args: any[]) => T
type VoidResolver = (...args: any[]) => void
type Functor<T, U> = (t: T) => U
type Morphic<T> = Functor<T, T>
interface PredicateSet<T> {
    initial: T
    predicate: Predicate<T>
    morphic: Morphic<T>
}

export const While = <T>(
    predicate: Predicate<T>,
    resolver: Resolver<T>,
    args: any[]
) => {
    let f: Function
    ;(f = () => {
        if (!predicate(args[0])) return
        args[0] = resolver(...args)
        f()
    })()
}

export const DoWhile = <T>(
    predicate: Predicate<T>,
    resolver: Resolver<T>,
    args: any[]
) => {
    args[0] = resolver(...args)
    While<T>(predicate, resolver, args)
}

export const defaultMorphics = {
    increment: (incrementer: number = 1) => (i: number) => i + incrementer,
    decrement: (decrementer: number = 1) => (i: number) => i - decrementer,
    multiply: (multiplier: number = 2) => (i: number) => i * multiplier,
    divide: (divider: number = 2) => (i: number) => i / divider,
    mod: (modulo: number = 2) => (i: number) => i % modulo,
}

export const For = <T>(
    predicateSet: PredicateSet<T>,
    resolver: VoidResolver,
    args?: any[]
) => {
    let f: Function
    let index: T = predicateSet.initial
    const predicate: Predicate<T> = predicateSet.predicate
    const morphic: Morphic<T> = predicateSet.morphic
    ;(f = () => {
        const updatedArgs = [index, ...(args || [])]
        if (!predicate(index)) return
        resolver(...updatedArgs)
        index = morphic(index)
        f()
    })()
}
