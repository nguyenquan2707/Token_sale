const DappToken = artifacts.require("DappToken");
const DappTokenSale = artifacts.require("DappTokenSale");

module.exports = function(deployer) {
  deployer.deploy(DappToken, "DappToken", "DAT", 1000000).then(function(){
    //DappToken.address will pass in constructor of DappTokenSale contract
    return deployer.deploy(DappTokenSale, DappToken.address, 1000000000000000);
  })
};
