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

module.exports = {
  presets: presets
}