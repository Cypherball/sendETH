// Import the crypto getRandomValues shim [Mentioned in Ethers Docs]]
import 'react-native-get-random-values';
// Needed for react native ig?? [Also Mentioned in Docs]
import '@ethersproject/shims';
// Import the ethers library
import {ethers} from 'ethers';

// my ropsten private key {only for development}
import {ROPSTEN_SK} from '../config';
import {ETHERSCAN_API} from '../config';

const network = 'ropsten';
const provider = ethers.getDefaultProvider(network, {
  etherscan: ETHERSCAN_API,
});
// Create a new wallet instance
const wallet = new ethers.Wallet(ROPSTEN_SK, provider);

export const getBalance = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const bal_wei = await wallet.getBalance();
      const bal = ethers.utils.formatEther(bal_wei.toString());
      resolve(bal);
    } catch (err) {
      reject(err);
    }
  });
};

export const sendTransaction = async (amnt, r_pk) => {
  const tx = {
    to: r_pk,
    // Convert currency unit from ether to wei
    value: ethers.utils.parseEther(amnt),
  };
  let txObj = null;
  try {
    txObj = await wallet.sendTransaction(tx);
    console.log(`tx: ${JSON.stringify(txObj)}`);
  } catch (err) {
    console.log(err);
  }
  return txObj;
};

export const transactionStatus = txHash => {
  return null;
};
