var DappToken = artifacts.require("./DappToken.sol");

contract('DappToken', function(accounts) {
    var tokenInstance;

    it('initializes with name and symbol', function() {
        return DappToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name){
            assert.equal(name, "DappToken", "same name");
            return tokenInstance.symbol();
        }).then(function(symbol) {
            assert.equal(symbol, "DAT", "same symbol");
            return tokenInstance.standard();
        }).then(function(standard){
            assert.equal(standard, "Dapp Token v1.0");
        })
    })


    it('initializes with totalSupply', function() {
        return DappToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, "Assert that totalSupply is 1.000.000");
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance) {
            assert.equal(adminBalance.toNumber(), 1000000);
        })
    });

    it('test transfer function', function() {
        return DappToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.transfer(accounts[1], 10, {from: accounts[0]});
        }).then(function(receipt){
            //test event
            assert.equal(receipt.logs.length, 1, "an event was triggered");
            assert.equal(receipt.logs[0].event, "Transfer", "Event name");
            assert.equal(receipt.logs[0].args._from, accounts[0], "address from");
            assert.equal(receipt.logs[0].args._to, accounts[1], "address to");
            assert.equal(receipt.logs[0].args._value, 10, "amount");
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance){
            assert.equal(balance, 10, "same balance");
            return tokenInstance.transfer(accounts[1], 999999999999999);
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0);
        })
    })

    it('test approve function', function() {
        return DappToken.deployed().then(function(instance){
            tokenInstance = instance;
            //call: create transaction without writing into the blockchain,  so it is not
            // cost the gas
            return tokenInstance.approve.call(accounts[1], 100);
        }).then(function(success) {
            assert.equal(success, true, "return true!");
            return tokenInstance.approve(accounts[1], 100);
        }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, "an event was triggered");
            assert.equal(receipt.logs[0].event, "Approval", "Event name");
            assert.equal(receipt.logs[0].args._owner, accounts[0], "address from");
            assert.equal(receipt.logs[0].args._spender, accounts[1], "address to");
            assert.equal(receipt.logs[0].args._value, 100, "amount");

            return tokenInstance.allowance(accounts[0], accounts[1]); // map of map
        }).then(function(allowance) {
            assert.equal(allowance.toNumber(), 100, "account0 accept account1 to transfer 100 tokens");
        })
    })

    it('handle delegated token transfers', function() {
        return DappToken.deployed().then(function(instance) {
            tokenInstance = instance;
            fromAccount = accounts[2];
            toAccount = accounts[3];
            spendingAccount = accounts[4];

            //transfer some tokens to fromAccount
            //accounts[0] will call "transfer" function
            tokenInstance.transfer(fromAccount, 100, {from: accounts[0]});
        }).then(function(receipt) {
            //Approve spendingAccount to spend 5 tokens from fromAccount
            // fromAcount will call "approve" function
            return tokenInstance.approve(spendingAccount, 10, {from: fromAccount});
        }).then(function(receipt) {
            //try to transfer something larger than the  sender's balance
            //// spendingAccount will call "transferFrom" function 
            //tokenInstance.transferFrom(fromAccount, toAccount, 9999, {from: spendingAccount});
        }).then(assert.fail).catch(function(error) {
            //assert(error.message.indexOf('revert') >= 0, "cannot transfer more than balance");
            
            //Try to transfer larger than approve amount
            return tokenInstance.transferFrom(fromAccount, toAccount, 11, {from: spendingAccount});
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'cannot transfer larger than approve amount');
            return tokenInstance.transferFrom.call(fromAccount, toAccount, 10, {from: spendingAccount});
        }).then(function(success) {
            assert.equal(success, true);
            //this time we actually write change to blockchain by removing call
            return tokenInstance.transferFrom(fromAccount, toAccount, 10, {from: spendingAccount});
        }).then(function(receipt){
             assert.equal(receipt.logs.length, 1, "an event was triggered");
             assert.equal(receipt.logs[0].event, "Transfer", "Event name");
             assert.equal(receipt.logs[0].args._from, accounts[2], "address from");
             assert.equal(receipt.logs[0].args._to, accounts[3], "address to");
             assert.equal(receipt.logs[0].args._value, 10, "amount");
             return tokenInstance.balanceOf(fromAccount);
        }).then(function(fromAccount){
            assert.equal(fromAccount, 90, "fromAccount decrease by 10");
            return tokenInstance.balanceOf(toAccount);
        }).then(function(toAccount){
            assert.equal(toAccount, 10, "toAccount increase by 10");
            //spendingAccount allowed to spend some amounts from fromAccount
            return tokenInstance.allowance(fromAccount, spendingAccount);
        }).then(function(allowance){
            assert.equal(allowance, 0, "deducts the amount from the allowance");
        })
    })
});