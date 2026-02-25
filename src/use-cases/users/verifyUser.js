const makeUser = require('../../entities/user')
const makeVerification = require('../../entities/verification')
const {
    NotFoundError,
    ConflictError,
    ForbiddenError,
} = require('../../shared/errors')

/**
 * @param {object} deps
 * @param {import('../../data-access/verificationDb')} deps.verificationDb
 * @param {import('../../data-access/usersDb')} deps.userDb
 * @param {import('../../adapters/Jwt')} deps.Jwt
 */
module.exports = function makeVerifyClient({
    verificationDb,
    userDb,
    Jwt,
}) {
    return async function verifyClient({ email, code }) {
        const verificationInfo = await verificationDb.findLatestOne({
            email,
        })

        if (!verificationInfo) {
            throw new ForbiddenError(
                `${email} emaliga tasqidlash kodi yuborilmagan.`
            )
        }

        const verification = makeVerification(verificationInfo)

        if (verification.isExpired(code)) {
            throw new ForbiddenError('Tasdiqlash kodining muddati tugagan.')
        }

        if (!verification.matchesCode(code)) {
            throw new ForbiddenError('Tasdiqlash kodi xato.')
        }

        const userInfo = await userDb.findOne({ email})

        if (!userInfo) {
            throw new NotFoundError('Mijoz topilmadi.')
        }

        const user = makeUser(userInfo)

        const payload = {
            user: {
                id: user.getId(),
                role: user.getRole(),
            },
        }

        const token = Jwt.generateToken(payload)

        return {
            token,
            role:user.getRole()
        }
    }
}
