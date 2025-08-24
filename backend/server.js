require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/verify-signature', async (req, res) => {
  try {
    const { message, signature } = req.body || {};
    if (typeof message !== 'string' || typeof signature !== 'string') {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const signer = ethers.verifyMessage(message, signature);
    return res.json({
      isValid: true,
      signer,
      originalMessage: message
    });
  } catch (err) {
    return res.json({
      isValid: false,
      signer: null,
      originalMessage: req.body?.message ?? null,
      error: err?.message || 'Verification failed'
    });
  }
});

const PORT = process.env.BACKEND_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Signature verifier listening on http://localhost:${PORT}`);
});
