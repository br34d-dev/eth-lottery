const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const { abi, evm } = require('../compile')

let lottery
let accounts

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()

  lottery = await new web3.eth.Contract(abi)
    .deploy({ data: '0x' + evm.bytecode.object })
    .send({ from: accounts[0], gas: '1000000' })
})

describe('Lottery Contract', () => {
  it('Deploys a contract', () => {
    assert.ok(lottery.options.address)
  })

  it('allows one account to enter', async () => {
    await lottery.methods.register().send({
      from: accounts[0],
      value: web3.utils.toWei('0.1', 'ether'),
    })

    const players = await lottery.methods.getParticipants().call({
      from: accounts[0],
    })

    assert.strictEqual(accounts[0], players[0])
    assert.strictEqual(1, players.length)
  })

  it('allows only manager to draw winner', async () => {
    try {
      await lottery.methods.pickWinner.send({
        from: accounts[1],
      })
      assert(false)
    } catch (e) {
      assert(e)
    }
  })

  it('sends money to winner and reset the participants', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether'),
    })

    const initialBalance = await web3.eth.getBalance(accounts[0])
    await lottery.methods.drawWinner().call()
  })
})
