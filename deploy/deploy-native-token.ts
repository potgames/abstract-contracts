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
  const nativeTokenArtifact = await deployer.loadArtifact("MoonOrDoomNativeToken");
  const deployedNativeToken = await deployer.deploy(nativeTokenArtifact,
    [
      "0x1A0a4c1D44982c25Fc51709Dbc433Fa0339d37d7",  // Oracle address
      "0x5af78CC17C30aD6D8113C77454ed55DEA4A60EFb",    // Admin address
      "0x69D327cdaf93e9C776D7a2F8a4ced57F811082Af",    // Operator address
      60,                          // intervalSeconds (1 minute)
      30,                           // bufferSeconds (30 seconds)
      Number(ethers.parseEther("0.0001")),     // minEntry
      30,                           // oracleUpdateAllowance
      200                            // treasuryFee (2%)
  ]);

  console.log(`✅ Deployed MoonOrDoomNativeToken at ${await deployedNativeToken.getAddress()}`);
}
