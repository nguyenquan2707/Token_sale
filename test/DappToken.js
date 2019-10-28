var DappToken = artifacts.require("./DappToken.sol");

contract('DappToken', function(accounts) {
    var dappTokenInstance;

    it('initializes with totalSupply', function() {
        return DappToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, "Assert that totalSupply is 1.000.000");
        })
    });
});