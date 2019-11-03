var DappToken = artifacts.require("./DappToken.sol");
var DappTokenSale = artifacts.require("./DappTokenSale.sol");

contract('DappTokenSale', function(accounts) {
    let tokenInstance;
    let tokenSaleInstance;
    let admin = accounts[0];
    let buyer = accounts[1];
    // 0.001eth = 1000000000000000
    let tokenPrice = 1000000000000000;
    let tokenAvailable = 7500000; // 75%
    let numberOfTokens;
    it('initializes the contract with the correct values', function() {
        return DappTokenSale.deployed().then(function(instance) {
            tokenSaleInstance = instance;
            return tokenSaleInstance.address;
        }).then(function(address){
            assert.notEqual(address, 0x0, "have address");
            return tokenSaleInstance.tokenContract();
        }).then(function(address) {
            assert.notEqual(address, 0x0, "have address");
            return tokenSaleInstance.tokenPrice();
        }).then(function(price) {
            assert.equal(price, tokenPrice, "check price");
        })
    })

    it('test buyToken function', function(){
        return DappToken.deployed().then(function(instance) {
            //grab token first
            tokenInstance = instance;
            return DappTokenSale.deployed();
        }).then(function(instance){
            //grab tokenSale instance
            tokenSaleInstance = instance;
            //Provision token for this contract
            return tokenInstance.transfer(tokenSaleInstance.address, tokenAvailable, {from: admin});
            numberOfTokens = 10;
            let value = numberOfTokens * tokenPrice; // total amount of wei
            return tokenSaleInstance.buyTokens(numberOfTokens, {from: buyer, value: value});
        }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, "an event was triggered");
            assert.equal(receipt.logs[0].event, "buyTokensEvent", "Event name");
            assert.equal(receipt.logs[0].args._amount, 10, "number of Tokens");
            assert.equal(receipt.logs[0].args._buyer, "0xbF6AaD669Dc721196b1BdA011d524c2374D6aB3b", "buyer address");
            return tokenSaleInstance.tokenSold();
        }).then(function(tokenSold){
            assert.equal(tokenSold, numberOfTokens);
            return tokenSaleInstance.buyTokens(numberOfTokens, {from: buyer, value: 1}); // buy 10 tokens for 1 wei
        }).then(assert.fail).catch(function(error) {
           assert(error.message.indexOf('revert' >= 0));
        })
    })
})