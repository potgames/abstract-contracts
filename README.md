# Pot Games AbstractContract Deployment

### Hardhat

1. Install the dependencies.

   ```bash
   npm install
   ```

   This is the setup instructions for the smart contracts of this repository.

2. Compiling the contracts.

   ```bash
   npx hardhat compile
   ```

3. Create a new [Hardhat configuration variable](https://hardhat.org/hardhat-runner/docs/guides/configuration-variables) for your wallet private key.

   When prompted, enter the private key of the wallet you want to use to deploy the contract.
   It is strongly recommended to use a new wallet for this purpose.

   ```bash
   npx hardhat vars set WALLET_PRIVATE_KEY
   ```

4. Run the [deploy script](./hardhat/deploy/deploy-account.ts) to deploy the smart contract account factory and create a smart account via the factory.

   _Note: The `defaultNetwork` inside [hardhat.config.ts](./contracts/hardhat.config.ts) is set to `abstractTestnet`. You will need [testnet ETH from a faucet](https://docs.abs.xyz/ecosystem/faucets) in your wallet to deploy the contract to Abstract._

   ```bash
   npx hardhat deploy-zksync --script deploy-mycontract.ts
   npx hardhat deploy-zksync --script deploy-account.ts
   npx hardhat deploy-zksync --script deploy-pyth-adapter.ts
   npx hardhat deploy-zksync --script deploy-operator.ts
   npx hardhat deploy-zksync --script deploy-native-token.ts
   npx hardhat deploy-zksync --script deploy-moon-doom.ts
   ```

## Useful Links

- [Docs](https://docs.abs.xyz/)
- [Official Site](https://abs.xyz/)
- [GitHub](https://github.com/Abstract-Foundation)
- [X](https://x.com/AbstractChain)
- [Discord](https://discord.com/invite/abstractchain)

## Deployer Private Key
npx hardhat vars set DEPLOYER_PRIVATE_KEY

## Verify Contract
npx hardhat verify --network abstractTestnet {contract_address} --constructor-args {constructor_args}