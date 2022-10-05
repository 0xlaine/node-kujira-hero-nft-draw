'use strict'

module.exports = {
    exit: true,
    bail: true,
    slow: 2000,
    recursive: true,
    extension: ['mjs', 'js'],
    "package": "./package.json",
    ui: 'bdd',
    spec: ['./**/__tests__/*.spec.mjs']
}
