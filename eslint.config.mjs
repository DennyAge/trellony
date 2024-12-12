// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    {
        "rules": {
            "indent": ["error", 2],
            "semi": ["error", "always"],
            "quotes": ["error", "single"],
            "curly": "error",
            "keyword-spacing": "error",
            "array-bracket-spacing": ["error", "always"],
            "space-in-parens": ["error", "always"],
            "template-curly-spacing": ["error", "always"],
            "arrow-spacing": "error",
            "object-curly-spacing": ["error", "always"]
        }
    }
)
