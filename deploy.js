const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const { abi, evm } = require('./compile')

const provider = new HDWalletProvider({
  mnemonic:
    'warm tattoo rigid lucky label name fresh element disorder destroy spare draft',
  providerOrUrl: 'https://rinkeby.infura.io/v3/c70a6e3994cf41e3a6a63ecb6fc448fa',
})

const web3 = new Web3(provider)

console.log(abi)

// Declaring a function solely to use async await
const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  console.log('Trying to deploy from:', accounts[0])

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: '0x' + evm.bytecode.object })
    .send({ from: accounts[0], gas: '1000000' })

  console.log('Contract deployed to', result.options.address)
}
deploy()
