var CharityDAO = artifacts.require("./CharityDAO.sol");

module.exports = function(deployer) {
	deployer.deploy(CharityDAO);
};