const { inputToConfig } = require('@ethereum-waffle/compiler');
const {expect} = require('chai');

describe("Token Contract", function(){
    let tokenInstance;
    let deployedTokenContract;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function(){
        tokenInstance = await ethers.getContractFactory('Token');   // instance of contract, Token is contract name
        [owner,addr1,addr2,...addrs] = await ethers.getSigners();   // FROM HARDHAT LOCAL NODE
        console.log("Signer: ", addr1);
        deployedTokenContract = await tokenInstance.deploy();       // deploy contract 
    });

    

    describe("Deployment function", function(){
        it("Should set the right owner", async function(){
            expect(await deployedTokenContract.owner()).to.equal(owner.address);
        })


        it("Should assign the total token supply to the owner", async function(){
            const ownerBalance = await deployedTokenContract.balanceOf(owner.address);
            expect(await deployedTokenContract.totalSupply()).to.equal(ownerBalance);
        })
    })



    describe("Transactions", function(){
        it("Should transfer tokens between contracts", async function(){
            // owner account to addr1 address
            await deployedTokenContract.transfer(addr1.address, 5);
            const addr1_bal = await deployedTokenContract.balanceOf(addr1.address);
            expect(addr1_bal).to.equal(5);

            //addr1 account to addr2 account
            await deployedTokenContract.connect(addr1).transfer(addr2.address, 5);
            const addr2_bal = await deployedTokenContract.balanceOf(addr2.address);
            expect(addr2_bal).to.equal(5);
        })


        it("Should fail if sender does not have enough tokens", async function(){
            const initialOwnerBalace = await deployedTokenContract.balanceOf(owner.address); // 10000
            await expect( 
                deployedTokenContract.connect(addr1).transfer(owner.address,1) 
            ).to.be.revertedWith("Not enough tokens");

            expect(await deployedTokenContract.balanceOf(owner.address)).to.equal(initialOwnerBalace);
        })


        it("Should update balances after transfer", async function(){

            const initialOwnerBalace = await deployedTokenContract.balanceOf(owner.address); // 10000
            await deployedTokenContract.transfer(addr1.address, 5);
            await deployedTokenContract.transfer(addr2.address, 10);

            expect(await deployedTokenContract.balanceOf(owner.address)).to.equal(initialOwnerBalace-15);

            const addr1_bal = await deployedTokenContract.balanceOf(addr1.address);
            const addr2_bal = await deployedTokenContract.balanceOf(addr2.address);

            expect(addr1_bal).to.equal(5);
            expect(addr2_bal).to.equal(10);
        })
    })
})