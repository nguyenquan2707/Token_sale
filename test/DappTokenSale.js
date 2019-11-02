var DappTokenSale = artifacts.require("./DappTokenSale.sol");

contract('DappTokenSale', function(accounts) {
    let tokenSaleInstance;
    let buyer = accounts[1];
    // 0.001eth = 1000000000000000
    let tokenPrice = 1000000000000000;
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
        let tokenSaleInstance;
        let numberOfTokens = 10;
        return DappTokenSale.deployed().then(function(instance) {
            tokenSaleInstance = instance;
            let value = numberOfTokens * tokenPrice; // total amount of wei
            return tokenSaleInstance.buyTokens(numberOfTokens, {from: buyer, value: value});
        }).then(function(receipt){
            return tokenSaleInstance.tokenSold();
        }).then(function(tokenSold){
            assert.equal(tokenSold, numberOfTokens);
        })
    })

})