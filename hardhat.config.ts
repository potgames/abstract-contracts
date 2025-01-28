import { HardhatUserConfig } from "hardhat/config";
import "@matterlabs/hardhat-zksync";

const config: HardhatUserConfig = {
  zksolc: {
    version: "latest",
    settings: {
      // Note: This must be true to call NonceHolder & ContractDeployer system contracts
      enableEraVMExtensions: true,
    },
  },
  defaultNetwork: "abstractTestnet",
  networks: {
    abstractTestnet: {
      url: "https://abstract-testnet.blastapi.io/84dce9fb-77e3-43cf-aada-0e7c363c261d",
      ethNetwork: "sepolia",
      zksync: true,
      verifyURL:
        "https://api-explorer-verify.testnet.abs.xyz/contract_verification",
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.24",
      },
      {
        version: "0.8.23",
      },
    ],
  },
};

export default config;
