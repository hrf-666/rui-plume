import eslintConfig from '@pengzhanbo/eslint-config'

export default eslintConfig({
    regexp: false,
    ignores: [],
}, {
    files: ['**/*.md/**/*.{ts,js,vue,jsx,tsx}'],
    rules: {
        "no-unused-vars": "off",
        'prefer-regex-literals': 'off',
        'prefer-const': 'off',
        'no-proto': 'off',
        'no-restricted-properties': 'off',
        'ts/no-unsafe-function-type': 'off',
        'no-debugger': 'off',
        'no-new-func': 'off',
        'ts/no-empty-object-type': 'off',
        'ts/ban-ts-comment': 'off',
        '@typescript-eslint/prefer-literal-enum-member': 'off',
    },
})
