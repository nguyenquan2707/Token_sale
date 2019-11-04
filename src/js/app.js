import { isUserEthereumAddressInBloom } from "web3-utils";
import Web3 from "web3";

App = {
    init: function() {
        return App.initWeb3();
    },
    initWeb3: function() {
        if(typeof web3 !== 'undefined') {
           App.provider = web3.currentProvider;
           ethereum.enable();
           web3 = new Web3(web3.currentProvider);
        } else {
            
        }
    }
};

$(function(){
    $(window).load(function(){
        App.init();
    });
});