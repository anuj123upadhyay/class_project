export default {
    plugins: {
      'postcss-import': {},
      'postcss-nested': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      'postcss-flexbugs-fixes': {},
      'postcss-preset-env': {
        autoprefixer: {
          flexbox: 'no-2009',
          grid: 'autoplace'
        },
        stage: 3,
        features: {
          'custom-properties': false,
          'nesting-rules': false
        }
      },
      autoprefixer: {}
    }
  }