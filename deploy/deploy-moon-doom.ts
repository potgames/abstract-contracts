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
  const pythAdapterFactoryArtifact = await deployer.loadArtifact("PythAdapterFactory");
  const deployedFactory = await deployer.deploy(pythAdapterFactoryArtifact);

  console.log(`Deployed PythAdapterFactory at ${await deployedFactory.getAddress()}`);

  // Common parameters for both deployments
  const pythContract = "0x47F2A9BDAd52d65b66287253cf5ca0D2b763b486";
  const priceFeedId = "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace";
  const description = "pyth adapter on abstractTestnet";
  const owner = "0x5af78CC17C30aD6D8113C77454ed55DEA4A60EFb";

  // Deploy using both methods
  const createAssemblyTx = await (await deployedFactory.createPythAdapter(
    pythContract,
    priceFeedId,
    description,
    owner
  )).wait();

  // Log results
  console.log(`
    ✅ Deployed PythAdapter instance at: ${createAssemblyTx.contractAddress}
  `);

    // Deploy the factory and first adapter instance
    const operatorArtifact = await deployer.loadArtifact("MoonOrDoomOperator");
    const deployedOperator = await deployer.deploy(operatorArtifact,
      [
        "0x5af78CC17C30aD6D8113C77454ed55DEA4A60EFb",
        "0x5af78CC17C30aD6D8113C77454ed55DEA4A60EFb",
      ]);
  
    console.log(`✅ Deployed MoonOrDoomOperator at ${await deployedOperator.getAddress()}`);


      // Deploy the factory and first adapter instance
  const nativeTokenArtifact = await deployer.loadArtifact("MoonOrDoomNativeToken");
  const deployedNativeToken = await deployer.deploy(nativeTokenArtifact,
    [
      createAssemblyTx.contractAddress,  // Oracle address
      "0x5af78CC17C30aD6D8113C77454ed55DEA4A60EFb",    // Admin address
      await deployedOperator.getAddress(),    // Operator address
      60,                          // intervalSeconds (60 seconds)
      30,                           // bufferSeconds (30 seconds)
      Number(ethers.parseEther("0.0001")),     // minEntry
      60,                           // oracleUpdateAllowance
      200                            // treasuryFee (2%)
  ]);

  console.log("Native token constructor args: ", [
    createAssemblyTx.contractAddress,  // Oracle address
    "0x5af78CC17C30aD6D8113C77454ed55DEA4A60EFb",    // Admin address
    await deployedOperator.getAddress(),    // Operator address
    60,                          // intervalSeconds (60 seconds)
    30,                           // bufferSeconds (30 seconds)
    Number(ethers.parseEther("0.0001")),     // minEntry
    60,                           // oracleUpdateAllowance
    200                            // treasuryFee (2%)
]);

  console.log(`✅ Deployed MoonOrDoomNativeToken at ${await deployedNativeToken.getAddress()}`);
}
