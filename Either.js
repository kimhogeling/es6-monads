const isSomething = a => (a !== null && a !== undefined && typeof a !== 'number') || (typeof a === 'number' && !isNaN(a))

class Either {
    constructor(a, b) {
        // take value out of functors before rewrapping into Left/Right
        if (a && typeof a.value === 'function') {
            a = a.value(null)
        }
        if (b && typeof b.value === 'function') {
            b = b.value(null)
        }
        return isSomething(a) ? new Left(a) : new Right(b)
    }
}

class LeftOrRight {
    constructor(a) {
        this.val = a
    }
    value() {
        return this.val
    }
}

class Left extends LeftOrRight {
    fmap(fn) {
        return new Left(fn(this.val))
    }
}

class Right extends LeftOrRight {
    fmap(fn) {
        return new Right(fn(this.val))
    }
}


/**
 * Prevent the need of the `new` keyword
 *
 * @public
 */
const _Either = (a, b) => new Either(a, b)

module.exports = _Either
