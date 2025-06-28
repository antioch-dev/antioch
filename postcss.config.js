
export default { 
  plugins: {
    'postcss-preset-env': {
      features: {
        'custom-selectors': true,
        'custom-properties': true,
        'nesting': true
      }
    },
    '@tailwindcss/postcss': {}, 
  },
};