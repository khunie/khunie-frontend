module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'prettier',
    ],
    settings: {
        'import/resolver': {
            node: {
                moduleDirectory: ['node_modules', 'src/']
            }
        }
    },
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        curly: 0,
        radix: 0,
        'arrow-parens': 0,
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': 0,
        'react/jsx-curly-newline': 0,
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 'off',
        'import/extensions': 0,
        'import/no-unresolved': 0,
        'import/no-cycle': 0,
        'import/prefer-default-export': 0,
        'import/no-absolute-path': 0,
        'no-prototype-builtins': 0,
        'prettier/prettier': 'error',
        'no-case-declarations': 0,
        'no-param-reassign': 0,
        'no-underscore-dangle': 0,
        // TODO - Get team preferences on below rules
        'nonblock-statement-body-position': 0,
        'no-trailing-spaces': 0,
        'no-unused-vars': ['warn', { argsIgnorePattern: '_' }],
        'operator-linebreak': 0,
        'no-shadow': 0,
        'max-len': 0,
        'comma-dangle': 0,
        'no-console': 0,
        'function-paren-newline': 0,
        'implicit-arrow-linebreak': 0,
        'arrow-body-style': 0,
        'one-var': 0,
        'consistent-return': 0,
        'jsx-a11y/accessible-emoji': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'object-curly-newline': 0,
        'react/no-array-index-key': 0,
        'react/no-unescaped-entities': 0,
        'no-use-before-define': 0,
        'no-alert': 0,
        'react/style-prop-object': 0,
        'no-nested-ternary': 0,
        'no-fallthrough': 0,
        camelcase: 0,
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-props-no-spreading': 0,
    },
};
