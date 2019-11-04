App = {
    web3Provider: null,
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
    }
};

$(function(){
    $(window).load(function(){
        App.init();
    });
});