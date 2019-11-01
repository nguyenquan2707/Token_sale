const DappToken = artifacts.require("DappToken");
const DappTokenSale = artifacts.require("DappTokenSale");

module.exports = function(deployer) {
  deployer.deploy(DappToken, "DappToken", "DAT", 1000000);
  deployer.deploy(DappTokenSale);
};
