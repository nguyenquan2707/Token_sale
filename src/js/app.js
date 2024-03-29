App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    loading: false,
    tokenPrice: 1000000000000000, 
    tokenSold: 0,
    tokenAvailable: 750000,
    init: function() {
        console.log('Loanding init function...........');
        return App.initWeb3();
    },
    initWeb3: function() {
        if(typeof web3 !== 'undefined') {
            //if web3 is provided by metamask
           App.web3Provider = web3.currentProvider;
           ethereum.enable();
           web3 = new Web3(web3.currentProvider);
        } else {
            // Specify default instance of web3 if no web3 is provided
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            ethereum.enable();
            web3 = new Web3(App.web3Provider);
        }
        return App.initContract();
    },

    initContract: function() {
        $.getJSON("DappTokenSale.json", function(dappTokenSale) {
            App.contracts.DappTokenSale = TruffleContract(dappTokenSale);//TruffleContract allow us to read the contract
            App.contracts.DappTokenSale.setProvider(App.web3Provider);
            App.contracts.DappTokenSale.deployed().then(function(instance){
                console.log('DappTokenSale address: ' + instance.address);
            });
        }).done(function(){
            $.getJSON("DappToken.json",function(dappToken){
                App.contracts.DappToken = TruffleContract(dappToken);//TruffleContract allow us to read the contract
                App.contracts.DappToken.setProvider(App.web3Provider);
                App.contracts.DappToken.deployed().then(function(dappToken){
                    console.log('DappToken address: ' + dappToken.address);
                });
            });
            App.render();
        });
    },

    render: function() {
        var loader = $('#loader');
        var content = $('#content');
        var accountAddress = $('#accountAddress');
        if(App.loading){
            return;
        }
        loading = true;
        loader.show();
        content.hide();
        //load account data
        web3.eth.getCoinbase(function(error, account){
            if(error === null) {
                App.account= account;
                accountAddress.html("your account: " + account);
                console.log("your account " + account);
            }
        })

        App.contracts.DappTokenSale.deployed().then(function(instance){
            dappTokenSaleInstance = instance;
            return dappTokenSaleInstance.tokenPrice();
        }).then(function(tokenPrice){
            App.tokenPrice = tokenPrice;
            console.log('Token price: ' + web3.fromWei(App.tokenPrice,'ether'));
            //class 'token-price'
            $('.token-price').html(web3.fromWei(App.tokenPrice, 'ether').toNumber());
            return dappTokenSaleInstance.tokenSold();
        }).then(function(tokensSold){
            App.tokensSold = tokensSold.toNumber();
            //App.tokensSold = 200000;
            console.log('Token sold: ' + App.tokensSold);
            $('.tokens-sold').html(App.tokensSold);
            $('.tokens-available').html(App.tokenAvailable);

            var progressPercent = (App.tokensSold / App.tokenAvailable)*100;
            console.log('progressPercent: ' + progressPercent);
            $('#progress').css('width', progressPercent + '%');

            App.contracts.DappToken.deployed().then(function(instance){
                dappToken = instance;
                return dappToken.balanceOf(App.account);
            }).then(function(balance){
                console.log('balance: ' + balance);
                $('.dapp-balance').html(balance.toNumber());

                App.loading = false;
                loader.hide();
                content.show();
            })
        })
    },

    buyTokens: function() {
        var loader = $('#loader');
        var content = $('#content');
        loader.show();
        content.hide();

        var numberOfToken = $('#numberOfToken').val();
        App.contracts.DappTokenSale.deployed().then(function(instance) {
            dappTokenSaleInstance = instance;
            console.log('number of tokens: ' + numberOfToken*App.tokenPrice);
            return dappTokenSaleInstance.buyTokens(numberOfToken,
                { from:App.account, 
                  value: numberOfToken * App.tokenPrice,
                  gas: 500000 });
        }).then(function(result){
            $('form').trigger('reset');
            loader.hide();
            content.show();
            App.listenForBuytokens();
        })

    },
    //Listen for events emitted from the contract
    listenForBuytokens: function() {
        App.contracts.DappTokenSale.deployed().then(function(instance){
            dappTokenSaleInstance = instance;
            var numberOfToken = $('#numberOfToken').val();
            return dappTokenSaleInstance.buyTokensEvent({}, 
                { 
                    fromBlock: 0,
                    toBlock: 'latest',
                }).watch(function(err, event){
                    console.log('event trigger: ' + event);
                    App.render();
                })
        })
    }
};

$(function(){
    $(window).load(function(){
        App.init();
    });
});