// @flow
type Predicate<T> = (t: T) => boolean
type Resolver<T> = (...args: any[]) => T
type VoidResolver = (...args: any[]) => void
type Functor<T, U> = (t: T) => U
type Morphic<T> = Functor<T, T>
type PredicateSet<T> = [initial: T, predicate: Predicate<T>, morphic: Morphic<T, T>]

export const While = <T>(predicate: Predicate<T>, resolver: Resolver<T>, args: any[]) => {
    let f: Function
    (f = () => {
        if (!predicate(args[0])) return
        args[0] = resolver(...args)
        f()
    })()
}

export const DoWhile = <T>(predicate: Predicate<T>, resolver: Resolver<T>, args: any[]) => {
    args[0] = resolver(...args)
    While<T>(predicate, resolver, args)
}

export const defaultMorphics = {
    increment: (incrementer: number = 1) => (i) => i + incrementer,
    decrement: (decrementer: number = 1) => (i) => i - decrementer,
    multiply: (multiplier: number = 2) => (i) => i * multiplier,
    divide: (divider: number = 2) => (i) => i / divider,
    mod: (modulo: number = 2) => (i) => i % modulo
}

export const For = <T>(predicateSet: PredicateSet<T>, resolver: VoidResolver, args?: any[]) => {
    let f: Function
    let index: number = predicateSet[0]
    const predicate: Predicate<T> = predicateSet[1]
    const morphic: Morphic<T> = predicateSet[2];
    (f = () => {
        const updatedArgs = [index, ...(args||[])]
        if (!predicate(index)) return
        resolver(...updatedArgs)
        index = morphic(index)
        f()
    })()
}

export const Foreach = <T>(iterable: Iterable<T>, resolver: VoidResolver, args?: any[]) => {
    let f: Function
    let result: T = iterable.next()
    (f = () => {
        if (result.done) return
        const updatedArgs = [result.value, ...(args||[])]
        resolver(...updatedArgs)
        result = iterable.next()
        f()
    })()
}
