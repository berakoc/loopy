import { While, DoWhile, defaultMorphics, For } from '../src/loopy'

describe('Test Suite For Loopy', () => {
    it('should run a While loop properly', () => {
        const i = 0
        const arr = [1, -1, 1, -1]
        While<number>(
            (i) => i < 4,
            (i) => {
                arr[i] = arr[i] + i
                return i++
            },
            [i]
        )
        expect(arr).toStrictEqual([1, 0, 3, 2])
    })

    it('should run a DoWhile loop properly', () => {
        const shouldContinue = true
        let number = 1
        DoWhile<boolean>(
            (b) => b,
            (b) => {
                number = number + number
                return number === 8 ? !b : b
            },
            [shouldContinue]
        )
        expect(number).toBe(8)
    })

    it('should run a For loop properly', () => {
        const arr = [7, 7, 7]
        For<number>(
            {
                initial: 0,
                predicate: (i) => i < 3,
                morphic: defaultMorphics.increment(1),
            },
            (i) => {
                arr[i] = Math.floor(Math.pow(arr[i], i))
            },
            []
        )
        expect(arr).toStrictEqual([1, 7, 49])
    })
})
