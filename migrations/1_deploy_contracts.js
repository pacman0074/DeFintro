// 1_deploy_contracts.js
const Dai = artifacts.require("Dai");
const MyDeFiProject = artifacts.require("MyDeFiProject");
 
module.exports = async function(deployer, _network, accounts) {
	await deployer.deploy(Dai);
	const dai = await Dai.deployed();
	await deployer.deploy(MyDeFiProject, dai.address);
	const myDeFiProject = await MyDeFiProject.deployed();
	await dai.faucet(myDeFiProject.address, 100);
	await myDeFiProject.foo("0xFbb3c5D54cAf9A34C56A6B84fcd9D501f868aBa6", 100);

	const balance0 = await dai.balanceOf(myDeFiProject.address);
	const balance1 = await dai.balanceOf("0xFbb3c5D54cAf9A34C56A6B84fcd9D501f868aBa6");

	console.log(balance0.toString());
	console.log(balance1.toString());
};
