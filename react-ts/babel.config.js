const presets = [
  [
    '@babel/env',
    {
      useBuiltIns: 'usage',
      corejs: 3
    }
  ],
  '@babel/preset-react',
  '@babel/preset-typescript'
]

const plugins = [
  [
    'import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }
  ]
]

module.exports = {
  presets: presets,
  plugins: plugins
}