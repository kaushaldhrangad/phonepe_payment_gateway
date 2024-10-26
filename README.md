# PhonePe Payment Integration

This project is a Node.js server application that integrates with the PhonePe API for processing payments. It uses Express.js, Axios, and crypto for checksum generation and handles both payment initiation and status checks.

## 🌱 What I learned from this Project?
This project taught me How to integrate a PhonePe payment integration. Also, this project taught me how to solve the error with the help of Google and Stack Overflow.

## 👍Features

- **Payment Initialization**: Starts a payment process with PhonePe API.
- **Transaction Status Check**: Verifies the status of a transaction.
- **Checksum Generation**: Ensures secure transactions by generating and verifying checksums.

## ✅ Prerequisites

- Node.js installed
- PhonePe API credentials (MERCHANT_ID and SALT_KEY)
- PhonePe sandbox environment enabled for testing

## 💻 Technology Used
- React.js
- Node.js
- Express.js
- Tailwind CSS
- NPM


## 🌟 Setup

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
2. Install dependencies:
   ```bash
   npm install
3. Create a .env file in the root directory and add your PhonePe API credentials:
   ```bash
   MERCHANT_ID=<your_merchant_id>
   SALT_KEY=<your_salt_key>
   PORT=8000
PORT=8000

4. Start the Server and Client:

   - **For the server**:
     ```bash
     npm run test
     ```
   - **For the client**:
     ```bash
     npm run dev
     ```
