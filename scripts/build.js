const execa = require('execa')

execa('rollup', [
  '-c',
  '--environment',
  [
    `FORMAT:es`
  ].join(',')
], {
  stdio: 'inherit'
})

execa('rollup', [
  '-c',
  '--environment',
  [
    `FORMAT:umd`
  ].join(',')
], {
  stdio: 'inherit'
})