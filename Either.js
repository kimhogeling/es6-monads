
class Either {
    constructor(a, b) {
        // unwrap Just/Nothing/Left/Right before rewrapping into Left/Right
        if (a && typeof a.value === 'function') {
            a = a.value(null)
        }
        if (b && typeof b.value === 'function') {
            b = b.value(null)
        }
        return (
            (a !== null && a !== undefined && typeof a !== 'number')
            || (typeof a === 'number' && !isNaN(a))
        ) ? new Left(a) : new Right(b)
    }
}


class LeftOrRight {
    constructor(a) {
        this._value = a
    }
    value() {
        return this._value
    }
}

class Left extends LeftOrRight {
    fmap(fn) {
        return new Left(fn(this._value))
    }
}

class Right extends LeftOrRight {
    fmap(fn) {
        return new Right(fn(this._value))
    }
}


/**
 * Prevent the need of the `new` keyword
 *
 * @public
 */
const _Either = (a, b) => new Either(a, b)

module.exports = _Either
