const execa = require('execa')

execa('rollup', [
  '-wc',
  '--environment',
  [
    `FORMAT:global`
  ].join(',')
], {
  stdio: 'inherit'
})