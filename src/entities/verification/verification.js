const { InvalidPropertyError } = require('../../shared/errors')

module.exports = function buildMakeVerification({ Id, Code }) {
    return function makeVerification({
        id = Id.makeId(),
        code = Code.generate(),
        email,
        created_at = new Date()
    }) {

        if (!Id.isValidId(id)) {
            throw new InvalidPropertyError("Tasdiqlash uchun yaroqli id bo'lishi kk")
        }

        if (!code) {
            throw new InvalidPropertyError(
                "Tasdiqlash uchun yaroqli kod bo'lishi kerak"
            )
        }

        if (!(created_at instanceof Date)) {
            throw new InvalidPropertyError(
                'Tasdiqlash uchun yaroqli sana(created_at) shart.'
            )
        }

        if (!email) {
            throw new InvalidPropertyError(
                "Tasdiqlash uchun yaroqli email bo'lishi shart."
            )
        }

        return Object.freeze({
            getId: () => id,
            getCode: () => code,
            getCreatedAt: () => created_at,
            getEmail: () => email,
            isExpired,
            matchesCode,
            verify
        })

        function isExpired() {
            const fiveMin = 5 * 60000
            const validTill = new Date(created_at).getTime() + fiveMin

            if (new Date().getTime() > validTill) {
                return true
            }

            false
        }

        function verify(otherCode) {
            if (!matchesCode(otherCode)) return false

            if (isExpired()) {
                return false
            }

            return true
        }

        function matchesCode(otherCode) {
            return otherCode == code
        }

    }


}