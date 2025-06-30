const config = {
  plugins: {
    'postcss-preset-env': {
      features: {
        'custom-selectors': true,
        'custom-properties': true,
        'nesting-rules': true, // Use 'nesting-rules' instead of 'nesting'
        'is-pseudo-class': false, // Disable problematic :is() transformation
      },
    },
    '@tailwindcss/postcss': {},
  },
}

export default config
