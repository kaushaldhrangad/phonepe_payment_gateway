const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

let merchant_id = process.env.MERCHANT_ID;
let salt_key = process.env.SALT_KEY;

if (!merchant_id || !salt_key) {
  throw new Error("MERCHANT_ID or SALT_KEY is not defined.");
}

app.post("/payment", async (req, res) => {
  try {
    console.log(req.body);

    let merchantTransactionId = req.body.transactionId;
    const data = {
      merchantId: merchant_id,
      merchantTransactionId: merchantTransactionId,
      name: req.body.name,
      merchantUserId: req.body.MID,
      amount: req.body.amount * 100,
      redirectUrl: `http://localhost:8000/status/?id=${merchantTransactionId}`,
      redirectMode: "POST",
      mobileNumber: req.body.number,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
      //payload, payloadMain, keyindex, string, sha256, checksum
    };
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyindex = 1;
    const string = payloadMain + "/pg/v1/pay" + salt_key;
    // const sha256 = create.createHash('sha256').update(string).digest('hex').toString()
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyindex;

    const prod_url =  "https://api.phonepe.com/apis/hermes/pg/v1/pay"; //=> this is the production URL
    // const test_url = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay`

    const options = {
      method: "POST",
      // url: test_url,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
      timeout: 10000, // Timeout after 10 seconds
    };
     axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        return res.json(response.data);
      })
      .catch(function (err) {
        console.error(
          "Axios Error:",
          err.response ? err.response.data : err.message
        );
        return res
          .status(500)
          .json({ error: "Payment request failed", details: err.message });
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false
  })
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
