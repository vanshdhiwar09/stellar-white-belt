import { requestAccess, signTransaction } from "@stellar/freighter-api";
import * as StellarSdk from "@stellar/stellar-sdk";

const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");
const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET;

export const connectWallet = async () => {
  // In the new API, requestAccess() handles both the connection check and user prompt
  const result = await requestAccess();
  
  if (result.error) {
    throw new Error(result.error);
  }
  
  // It now returns the public key under the 'address' property
  return result.address; 
};

export const fetchBalance = async (publicKey) => {
  try {
    const account = await server.loadAccount(publicKey);
    const nativeBalance = account.balances.find((b) => b.asset_type === "native");
    return nativeBalance ? nativeBalance.balance : "0.0000000";
  } catch (error) {
    throw new Error("Account not funded.");
  }
};

export const sendPayment = async (senderPublicKey, destinationPublicKey, amount) => {
  try {
    const account = await server.loadAccount(senderPublicKey);
    const fee = await server.fetchBaseFee();

    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee,
      networkPassphrase: NETWORK_PASSPHRASE,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: destinationPublicKey,
          asset: StellarSdk.Asset.native(),
          amount: amount.toString(),
        })
      )
      .setTimeout(30)
      .build();

    // THE FIX: Explicitly pass the full network passphrase and the sender address
    // instead of relying on the "TESTNET" shorthand string.
    const result = await signTransaction(transaction.toXDR(), { 
      networkPassphrase: NETWORK_PASSPHRASE,
      address: senderPublicKey
    });
    
    if (result.error) {
      throw new Error(result.error);
    }

    const signedTxXdr = result.signedTxXdr || result;
    const signedTx = StellarSdk.TransactionBuilder.fromXDR(signedTxXdr, NETWORK_PASSPHRASE);
    const response = await server.submitTransaction(signedTx);
    
    return response.hash;
  } catch (error) {
    throw error;
  }
};