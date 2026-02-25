function generate() {
    return `${Date.now()}`.slice(-5)
}

const Code = Object.freeze({
    generate,
})

module.exports = Code