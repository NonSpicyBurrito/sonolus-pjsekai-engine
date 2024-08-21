import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import tsEslint from 'typescript-eslint'

export default tsEslint.config(
    {
        ignores: [
            '**/*.*',

            '!lib/src/**/*.*',

            '!shared/src/**/*.*',

            '!play/src/**/*.*',

            '!watch/src/**/*.*',

            '!preview/src/**/*.*',

            '!tutorial/src/**/*.*',
        ],
    },

    eslint.configs.recommended,

    ...tsEslint.configs.strictTypeChecked,
    ...tsEslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            '@typescript-eslint/restrict-template-expressions': 'off',
            'no-restricted-properties': [
                'error',
                {
                    object: 'debug',
                    message: 'Debug calls should be removed from production.',
                },
            ],
        },
    },

    eslintConfigPrettier,

    {
        files: ['lib/src/**/*.*'],
        rules: {
            '@typescript-eslint/explicit-module-boundary-types': 'error',
        },
    },
)
