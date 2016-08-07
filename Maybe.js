/**
 * Take a given value and check if its value is something (not just falsy, because of 0 and empty string)
 *
 * @param {Any} a The var to check
 * @returns {Boolean} True if it is neither null, undefined or NaN
 */
const isSomething = a => (a !== null && a !== undefined && typeof a !== 'number') || (typeof a === 'number' && !isNaN(a))

/**
 * The maybe takes a value, validates it, wrappes it in a Just or a Nothing and returns that
 * 
 * @param {Any} Some value
 * @returns {Just|Nothing} The wrapped value
 */
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

    // I named the Left's and Right's functor .fmap instead of .map to prevent confusion with Array.prototype.map
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
