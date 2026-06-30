

```markdown
# 🌟 Stellar Pay - Journey of Rise (White Belt)

> **A premium, minimalist Web3 dashboard built on the Stellar blockchain for Level 1 completion.**

This application provides a highly polished user experience for connecting a browser wallet, tracking asset liquidity, and executing decentralized payments instantly over the Stellar network.

[![Stellar](https://img.shields.io/badge/Stellar-Testnet-blue)](https://stellar.org)
[![Vite](https://img.shields.io/badge/Vite-5.x-646cff)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.0-38bdf8)](https://tailwindcss.com)

## 🎯 Project Overview

This dApp was engineered from scratch to fulfill the core requirements of the **Stellar Journey of Rise: White Belt** specification. 

The primary architectural goal of this project was to implement strict **separation of concerns**. All low-level blockchain infrastructure, state management hooks, and cryptographic operations are kept independent of the UI layer, laying down a production-grade template for future scale.

---

## ✨ Features

### ⚡ Core Capabilities
- **Freighter Wallet Integration** — Asynchronous handshake utilizing the modern `requestAccess` API standard to retrieve user account addresses securely.
- **Real-Time Balance Ingestion** — Queries Stellar Horizon Testnet endpoints directly to extract, isolate, and accurately parse native XLM asset values.
- **Secure Transaction Lifecycle** — Bundles data payloads, dynamically fetches network base fees, establishes strict expiration windows (`setTimeout`), requests cryptographic signatures via Freighter, and broadcasts operations to the ledger.
- **Graceful Error Handling** — Catch blocks manage rejected operations, closed ledger windows, or un-funded accounts safely without breaking the user experience.
- **Premium Design Aesthetic** — Clean UI leveraging strict layout grids, uniform borders, high-contrast action states, and responsive scaling.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** installed locally.
- **[Freighter Wallet Extension](https://www.freighter.app/)** installed in your web browser.

### Local Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/stellar-white-belt.git](https://github.com/your-username/stellar-white-belt.git)
   cd stellar-white-belt

```

2. **Install project dependencies:**
```bash
npm install

```


3. **Spin up the local development server:**
```bash
npm run dev

```


4. **Launch the application:** Open `http://localhost:5173` in your web browser.

### Interactive Sandbox Provisioning

1. Launch the Freighter browser extension, access Settings (gear icon), select **Network**, and ensure it is set to **Testnet**.
2. Copy your public key address.
3. Head over to the [Stellar Laboratory Friendbot Faucet](https://laboratory.stellar.org/#account-creator?network=test).
4. Paste your public address into the field and click **Get test network XLM** to fund your wallet with test liquidity.
5. Return to the dApp and click **Connect Wallet**.

---

## 📁 Project Architecture

```
stellar-white-belt/
├── src/
│   ├── utils/
│   │   └── stellar.js    # 🔐 Blockchain Engine (Horizon interactions & wallet communication)
│   ├── App.jsx           # 🎨 UI Presentation Layer & State Controller
│   ├── index.css         # 🚀 Tailwind v4 Global Style Config
│   └── main.jsx          # ⚙️ Application Root Entrypoint
├── README.md             # 📝 Documentation Portfolio
└── vite.config.js        # 🛠️ Build and Plugin Configurations

```

---

## 🛠️ The Blockchain Engine Deep-Dive

All decentralized operations are housed directly inside `src/utils/stellar.js`.

### Available Methods:

```javascript
import { connectWallet, fetchBalance, sendPayment } from './utils/stellar';

// Requests wallet permissions and returns the authenticated public address
const address = await connectWallet();

// Loads structural account data from the Testnet Horizon cluster
const balance = await fetchBalance(address);

// Assembles a payment operation, signs the XDR stream, and broadcasts to ledger
const txHash = await sendPayment(senderPublicKey, destinationPublicKey, amount);

```

---

## 📸 Proof of Completion

### 1. Active Connection State & Balance Retrieval
> Shows the successful handshake with the Freighter wallet browser interface, displaying accurate balance states retrieved directly from the network.
<img width="1587" height="764" alt="image" src="https://github.com/user-attachments/assets/6b47e7d5-c24b-4ab0-bb18-9957b3cb7aa4" />
<img width="1578" height="806" alt="Screenshot 2026-06-30 112954" src="https://github.com/user-attachments/assets/5207ea38-60ad-4be9-9a49-b957f0ba4a4a" />
<img width="1599" height="760" alt="Screenshot 2026-06-30 113057" src="https://github.com/user-attachments/assets/307e5f88-3698-4fcc-ac7c-aacd1e4b4768" />

### 2. Validated Ledger Invalidation & Hash Response

> Confirms successful transaction assembly, client-side signature acquisition, and response parsing containing the irreversible transaction hash sequence.
<img width="1599" height="761" alt="Screenshot 2026-06-30 113605" src="https://github.com/user-attachments/assets/e2e7b8bd-b0e8-42d1-938c-8685c71e7f7c" />
<img width="1599" height="756" alt="Screenshot 2026-06-30 113804" src="https://github.com/user-attachments/assets/70e21cfa-96c0-4e57-bc4f-801bc15e617d" />

---

## 📊 Technical Alignment Matrix

| Challenge Criteria | Project Resolution Strategy | Verified Status |
| --- | --- | --- |
| **Multi-State Rendering** | Toggles cleanly between Connection Prompts and Main Dashboards via conditional state workflows. | ✅ Compliant |
| **Decoupled Architecture** | Presentation structures are kept completely clean of underlying SDK setup. | ✅ Compliant |
| **Robust Validation** | Form validation handles floating-point number limits and format-checks asset requirements. | ✅ Compliant |
| **Visual Architecture** | Built on modern design layouts prioritizing high scannability and accessibility. | ✅ Compliant |

---



```

```
