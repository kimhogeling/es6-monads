# es6-monads
Maybe, Just, Nothing and Either, Left, Right

This helps to prevent bugs during runtime. Inspired by Elm ;)

### Playing around with it:
```javascript
// Using require instead of import, because it is supported in
// my atom editor with the script plugin, which allows me
// to simply press cmd i to run all of this without babel etc
const Maybe = require('./Maybe.js')
const Either = require('./Either.js')

// some random functions, which are not important
// and are just here to play around with them below
const times = nums => nums.reduce((a, b) => a * b, 1)
const double = a => a * 2
const quarter = a => a / 4
const pretty = a => `The value is ${a}!`

// Imagine that because of some bug our array is broken,
// but the code still runs fine, and simply uses the Nothing functor.
// I called it .fmap instead of .map, to prevent confusion with Array.prototype.map.
const try1 =
    Maybe(times([1,2,'x',3,4])) // Nothing
        .fmap(double) // Nothing
        .fmap(quarter) // Nothing
        .fmap(pretty) // Nothing

const try2 =
    Maybe(times([1,2,3,4])) // Just 24
        .fmap(double) // Just 48
        .fmap(quarter)  // Just 12
        .fmap(pretty) // Just 'The value is 12!'

// And here we can simply use Either to pick the valid one
// Either returns the Left or Right functor which both have the .value method
Either(try1, try2).value()  // 'The value is 12!'

```
