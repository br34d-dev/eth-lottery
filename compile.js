const path = require('path')
const fs = require('fs')
const solc = require('solc')

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol')
const source = fs.readFileSync(lotteryPath, 'utf8')

var input = {
  language: 'Solidity',
  sources: {
    'Lottery.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
}

// let temp = JSON.parse(solc.compile(JSON.stringify(input)))
// let temp2 = temp.contracts['Lottery.sol']['Lottery']
// console.log(temp2.abi)

// console.log('bytecode:', temp2.evm.bytecode)
// console.log('interface:', temp2.abi)

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Lottery.sol'][
  'Lottery'
]
