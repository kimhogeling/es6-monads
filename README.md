# es6-monads
Playing around with the monads `Maybe` and `Either` and their functors `Just`, `Nothing`, `Left` and `Right`. This might help to prevent bugs during runtime. As some of you might already guess, this is inspired by Erlang and Elm ;)

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

// Composing the functions together
const timesDoubleQuarterPretty = arr => 
    Maybe(times(arr))
        .fmap(double)
        .fmap(quarter)
        .fmap(pretty)

// Imagine because of some bug our input array is broken,
// but the code still runs fine, the Maybe returned a Nothing wrapper
const broken = [1, 2, 'x', 3, 4]
const result1 = timesDoubleQuarterPretty(broken) // Nothing

// The second input array is intact and the Maybe returns a Just wrapper
const intact = [1, 2, 3, 4]
const result2 = timesDoubleQuarterPretty(intact) // Just 'The value is 12!'

// And here we can simply use Either to pick the valid one
// Either returns the Left or Right functor which both have the .value method
const result = Either(result1, result2) // Right 'The value is 12!'
result.value() // 'The value is 12!'
```

I would love feedback! Please tell me if I'm not correctly understanding this stuff by writing an issue or sending me a [tweet @KimHogeling](https://twitter.com/KimHogeling)
