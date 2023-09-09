import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { deployContracts, getAccounts } from '../Utils.test'

describe('swapper', function () {
  describe('`registerBrokers` Functionality', async function () {
    it("should add a new broker to the 'brokersAdresses' mapping", async function () {
      // arrange
      const { proxy } = await loadFixture(deployContracts)
      const { daoMember1, daoMember5 } = await getAccounts()

      //check if the address is not a broker
      expect(await proxy.brokersAddresses(daoMember5.address)).to.equal(false)
      await proxy.connect(daoMember1).registerBrokers([daoMember5.address])
      //assert
      expect(await proxy.brokersAddresses(daoMember5.address)).to.equal(true)
    })
    it('should revert if msg.sender is not an daoMember in gnosis contract', async function () {
      const { daoMember5, evil } = await getAccounts()
      // arrange
      const { proxy } = await loadFixture(deployContracts)

      //assert
      await expect(proxy.connect(evil).registerBrokers([daoMember5.address])).to.be.revertedWith(
        'ERROR: unauthorized caller'
      )
    })
  })
})
