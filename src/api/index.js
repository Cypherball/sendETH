// Import the crypto getRandomValues shim [Mentioned in Ethers Docs]]
import 'react-native-get-random-values';
// Needed for react native ig?? [Also Mentioned in Docs]
import '@ethersproject/shims';
// Import the ethers library
import {ethers} from 'ethers';

import axios from 'axios';

// my ropsten private key {only for development}
import {ROPSTEN_SK} from '../config';
import {ETHERSCAN_API} from '../config';

const etherscan = axios.create({
  baseURL: 'https://api-ropsten.etherscan.io',
});

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
  return new Promise(async (resolve, reject) => {
    const tx = {
      to: r_pk,
      // Convert currency unit from ether to wei
      value: ethers.utils.parseEther(amnt),
    };
    try {
      const txObj = await wallet.sendTransaction(tx);
      console.log(`tx: ${JSON.stringify(txObj)}`);
      resolve(txObj);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

export const getTransactions = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const txs = await etherscan.get('/api', {
        params: {
          module: 'account',
          action: 'txlist',
          address: '0x819dcf6E3e0665FE45a738Ea43B32Cd0df65f64a',
          startblock: 0,
          endblock: 99999999,
          // page: 1,
          // offset: 10,
          sort: 'desc',
          apikey: ETHERSCAN_API,
        },
      });
      resolve(txs);
    } catch (err) {
      reject(err);
    }
  });
};

export const transactionStatus = txHash => {
  return null;
};
