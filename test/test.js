const { expect } = require("chai");
require("solidity-coverage");

describe("Token contract", function () {
  beforeEach(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    Token = await ethers.getContractFactory("ERC20");
    ERC20Instance = await Token.deploy();
    amount = 100;
    ownerTokens = await ERC20Instance.balanceOf(owner.address);
  });

  describe("Deployment", () => {
    it("Has a valid decimal", async () => {
      expect((await ERC20Instance.decimals()).toString()).to.equal("18");
    });

    it("Creates a token with a name", async function () {
      expect(await ERC20Instance.name()).to.exist;
    });

    it("Creates a token with a symbol", async function () {
      expect(await ERC20Instance.symbol()).to.exist;
    });

    it("Should total supply is equls to expected supply", async () => {
      expect((await ERC20Instance.totalSupply()).toString()).to.equal("1000");
    });

    it("Should deployer hold's all tokens", async () => {
      expect(await ERC20Instance.totalSupply()).to.equal(ownerTokens);
    });
  });

  describe("Transfer", () => {
    it("Should transferTokens", async () => {
      await ERC20Instance.transfer(addr1.address, amount);
      expect(await ERC20Instance.balanceOf(owner.address)).to.equal(
        ownerTokens - amount
      );
    });

    it("Should receive Tokens", async () => {
      await ERC20Instance.transfer(addr1.address, amount);
      expect(await ERC20Instance.balanceOf(addr1.address)).to.equal(amount);
    });

    it("Should fail if sender not have enough tokens", async () => {
      await expect(
        ERC20Instance.transfer(owner.address, ownerTokens + 1)
      ).to.be.revertedWith("Not enough tokens");
    });

    it("Should Emits a transfer event with the right arguments", async function () {
      await expect(ERC20Instance.transfer(addr1.address, amount))
        .to.emit(ERC20Instance, "Transfer")
        .withArgs(owner.address, addr1.address, amount);
    });
  });

  describe("approve", () => {
    it("Should let you give another address the approval to send on your behalf", async () => {
      await ERC20Instance.approve(addr1.address, amount);
      await ERC20Instance.connect(addr1).transferFrom(
        owner.address,
        addr2.address,
        amount
      );
      expect(await ERC20Instance.balanceOf(owner.address)).to.equal(
        ownerTokens - amount
      );
      expect(await ERC20Instance.balanceOf(addr2.address)).to.equal(amount);
    });

    it("Should Emits an approval event with the right arguments", async function () {
      await expect(ERC20Instance.approve(addr1.address, amount))
        .to.emit(ERC20Instance, "Approval")
        .withArgs(owner.address, addr1.address, amount);
    });
  });
});
