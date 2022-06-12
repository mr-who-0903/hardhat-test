/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle')

const ALCHEMY_API_KEY = "Jc1MzSTGkTZ1AzEaMMITE6NID7A-etda";
const RINKEBY_PRIVATE_KEY = "8fb3e50fa527beaa5231c8e6b7850045b78bb81a053905b22b05d1ccb4f42ad7";

module.exports = {
  solidity: "0.8.9",

  networks:{
    rinkeby:{
      url:`https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`]
    }
  }
};
