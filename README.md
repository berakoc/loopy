# Loopy
A functional implementation of loops.
## `While`
```js
// Classic Implementation
const arr1 = [1, -1, 1, -1]
let i = 0
while (i < 4) {
    arr1[i] = arr1[i] + i
}
// Functional Implementation
const { While } = require('@berakocc/loopy')

const arr2 = [1, -1, 1, -1]
While((i) => i < 4, (i) => {
    arr[i] = arr[i] + i
    return i++
}, [i])
```
## `DoWhile`
```js
// Classic Implementation
let shouldContinue1 = true
let number1 = 1
do {
    number1 += number1
    shouldContinue1 = number1 === 8 ? false : true
} while (shouldContinue1)
// Functional Implementation
const { DoWhile } = require('@berakocc/loopy')

const shouldContinue2 = true
let number2 = 1
DoWhile((b) => b, (b) => {
    number2 += number2
    return number2 === 8 ? !b : b
}, [shouldContinue2])
```
## `For`
```js
// Classic Implementation
const arr1 = [7, 7, 7]
for (let i = 0; i < 3; ++i) {
    arr[i] = Math.floor(Math.pow(arr[i], i))
}
// Functional Implementation
const { For, defaultMorphics } = require('@berakocc/loopy')

const arr2 = [7, 7, 7]
For({
        initial: 0,
        predicate: (i) => i < 3,
        morphic: defaultMorphics.increment(1),
    },
    (i) => {
        arr[i] = Math.floor(Math.pow(arr[i], i))
    },
    []
)
```