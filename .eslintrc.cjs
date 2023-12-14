module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'prettier',
    ],
    rules: {
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        'no-restricted-properties': [
            'error',
            {
                object: 'debug',
                message: 'Debug calls should be removed from production.',
            },
        ],
    },
}
