module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        camelcase: 'off',
        indent: ['error', 4],
        'classs-methods-use-this': 'off',
        'comma-dangle': ['error', 'never'],
        'no-param-reassign': 'off',
        'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
        'prettier/prettier': 'error',
    },
};
