module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
        'prettier',
        'plugin:prettier/recommended' // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    plugins: ['import'],

    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        }
    },
    rules: {
        'react/react-in-jsx-scope': 'off',

        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/no-use-before-define': ['off'],
        '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: false }],
        'react/prop-types': 'off',
        'prefer-const': [
            'warn',
            {
                destructuring: 'any',
                ignoreReadBeforeAssign: false
            }
        ],
        'prettier/prettier': ['warn', { endOfLine: 'auto', singleQuote: true }],
        '@typescript-eslint/naming-convention': [
            'warn',
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^[A-Z]',
                    match: true,
                    message: 'thing'
                }
            }
        ],
        'no-restricted-imports': [
            'error',
            {
                paths: ['lodash'],
                patterns: ['lodash/*']
            }
        ]
    },
    settings: {
        react: {
            version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    }
};
