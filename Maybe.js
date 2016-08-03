
class Just {
    constructor(a) {
        this._value = a
    }

    value() {
        return this._value
    }

    fmap(fn) {
        return new Just(fn(this._value))
    }
}

class Nothing {
    value(fallbackValue) {
        return fallbackValue
    }

    fmap(fn) {
        return this
    }
}


class Maybe {
    constructor(a) {
        return (
            (a !== null && a !== undefined && typeof a !== 'number')
            || (typeof a === 'number' && !isNaN(a))
        ) ? new Just(a) : new Nothing()
    }
}

/**
 * Prevent the need of the `new` keyword
 *
 * @public
 */
const _Maybe = a => new Maybe(a)

// Export Just and Nothing too for unwrapping in Either.
// Although, I'm not sure yet if I should even do the unwrapping..
module.exports = _Maybe
