import { useState } from "react";
import { connectWallet, fetchBalance, sendPayment } from "./utils/stellar";

export default function App() {
  // State management for our dApp
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState("0");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleConnect = async () => {
    try {
      setLoading(true);
      const pubKey = await connectWallet();
      setAddress(pubKey);
      await updateBalance(pubKey);
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    setAddress(null);
    setBalance("0");
    setFeedback({ type: "", message: "" });
  };

  const updateBalance = async (pubKey) => {
    try {
      const bal = await fetchBalance(pubKey);
      setBalance(bal);
    } catch (err) {
      setFeedback({ type: "error", message: "Account not funded on Testnet. Use the laboratory faucet!" });
    }
  };

  const handleSendTransaction = async (e) => {
    e.preventDefault(); // Prevent page reload
    setFeedback({ type: "", message: "" });
    setLoading(true);

    try {
      const txHash = await sendPayment(address, destination, amount);
      setFeedback({
        type: "success",
        message: `Success! Tx Hash: ${txHash.slice(0, 8)}...${txHash.slice(-8)}`,
      });
      await updateBalance(address); // Refresh balance to show new amount
      setAmount("");
      setDestination("");
    } catch (err) {
      setFeedback({ type: "error", message: "Transaction failed or rejected by user." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-neutral-200 p-8">
        
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Stellar Pay</h1>
          
        </header>

        {/* Conditional Rendering: Show Connect button if no wallet, else show dashboard */}
        {!address ? (
          <button
            onClick={handleConnect}
            disabled={loading}
            className="w-full bg-black text-white py-4 px-4 rounded-xl font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Connecting to Freighter..." : "Connect Wallet"}
          </button>
        ) : (
          <div className="space-y-6">
            
            {/* Balance Card */}
            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 flex justify-between items-center">
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-1">Available Balance</p>
                <p className="text-3xl font-bold text-neutral-900">{parseFloat(balance).toFixed(2)} XLM</p>
              </div>
              <button
                onClick={handleDisconnect}
                className="text-sm text-red-500 hover:text-red-600 font-semibold transition-colors"
              >
                Disconnect
              </button>
            </div>

            {/* Transaction Form */}
            <form onSubmit={handleSendTransaction} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Send to Address</label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="G..."
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-black focus:outline-none transition-all font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Amount (XLM)</label>
                <input
                  type="number"
                  step="0.0000001"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-black focus:outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading || balance === "0"}
                className="w-full bg-black text-white py-4 px-4 rounded-xl font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50 mt-2"
              >
                {loading ? "Processing..." : "Submit Transaction"}
              </button>
            </form>
          </div>
        )}

        {/* Feedback Messages */}
        {feedback.message && (
          <div
            className={`mt-6 p-4 rounded-xl text-sm font-medium ${
              feedback.type === "success" 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  );
}