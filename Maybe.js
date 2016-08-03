const isSomething = a => (a !== null && a !== undefined && typeof a !== 'number') || (typeof a === 'number' && !isNaN(a))

class Maybe {
    constructor(a) {
        return isSomething(a) ? new Just(a) : new Nothing()
    }
}

class Just {
    constructor(a) {
        this.val = a
    }

    value() {
        return this.val
    }

    fmap(fn) {
        return new Just(fn(this.val))
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


/**
 * Prevent the need of the `new` keyword
 *
 * @public
 */
const _Maybe = a => new Maybe(a)

module.exports = _Maybe
