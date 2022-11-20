# dapp-react-erc20
Dapp developed with Solidity, React, Ganache and Truffle in Ethereum blockchain 

How to run?
--

1. Install dependencies

   `npm i package.json`

2. Compile and migrate Smart Contract

   `truffle migrate --reset`

3. Start server

   `npm start`

4. Open App in browser

   localhost:3000

Deploy contracts in Binance Smart Chain Testnet (BSC)
--

1. Edit file ".secret" with secret key wallet in Root folder

2. Compile and migrate Smart Contract

   `truffle migrate --reset --network bsc`

Deploy contracts in Polygon Testnet (MATIC)
--
1. Edit file ".secret" with secret key wallet in Root folder

2. Compile and migrate Smart Contract

   `truffle migrate --reset --network polygon`

Testing
--
1. Testing Smart Contracts

   `truffle test`