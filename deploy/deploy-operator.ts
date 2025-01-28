import { Deployer } from "@matterlabs/hardhat-zksync";
import { Wallet } from "zksync-ethers";
import { vars } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { randomBytes, ethers } from "ethers";
import { TransactionReceipt } from "zksync-ethers/build/types";

/**
 * An example of using the hardhat-zksync plugin to deploy smart contracts.
 *  1. Deploys the MyContractFactory contract.
 *    - Since the factory can also deploy the MyContract contract, it also requires the bytecode of the MyContract contract in factoryDeps.
 *    - However, the zksolc compiler detects it automatically, and populates it in the factoryDeps field of the factory artifact.
 *       - See the /artifacts-zk/contracts/MyContractFactory.sol/MyContractFactory.json - factoryDeps field.
 *    - The Deployer from @matterlabs/hardhat-zksync reads this and includes the factoryDeps in the EIP-712 deployment transaction.
 * 
 *  2. Using the factory, deploy an new instance of MyContract via the 4 different methods.
 */

export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script... 👨‍🍳`);

  const wallet = new Wallet(vars.get("DEPLOYER_PRIVATE_KEY"));
  const deployer = new Deployer(hre, wallet);
  
  // Deploy the factory and first adapter instance
  const operatorArtifact = await deployer.loadArtifact("MoonOrDoomOperator");
  const deployedOperator = await deployer.deploy(operatorArtifact,
    [
      "0x5af78CC17C30aD6D8113C77454ed55DEA4A60EFb",
      "0x5af78CC17C30aD6D8113C77454ed55DEA4A60EFb",
    ]);

  console.log(`✅ Deployed MoonOrDoomOperator at ${await deployedOperator.getAddress()}`);
}
