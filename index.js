const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const app = express();
const port = 4000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use(cors());
app.use(express.json())

//ok
app.post("/login", async (req, res) => {
  axios
    .post("https://project.ewallet.vn/e-wallet/public/api/login", {
      phone_number: req.body.phone_number,
      password: req.body.password,
    })
    .then((response) => {
      return res.json(response.data);
    })
    .catch((error) => {
      return res.json(error);
    });
});

app.post("/signup", async (req, res) => {
  axios
    .post("https://project.ewallet.vn/e-wallet/public/api/register", {
      "name": req.body.name,
      "phone_number": req.body.phone_number,
      "checked": true,
      "password": req.body.password,
      "password_confirmation": req.body.password_confirmation,
      "address": req.body.address,
      "dob": req.body.dob
    })
    .then((response) => {
      return res.json(response.data.data);
    })
    .catch((error) => {
      return res.json(error);
    });
});

app.post("/getOtp", async (req, res) => {
  axios
    .post("https://project.ewallet.vn/e-wallet/public/api/fake-otp", {
      "phone_number": req.body.phone_number,
    })
    .then((response) => {
      return res.json(response.data);
    })
    .catch((error) => {
      return res.json(error);
    });
});

//ok
app.post("/payments/deposit", async (req, res) => {
  axios
    .post("https://project.ewallet.vn/e-wallet/public/api/payments/deposit-money", {
      "linked_id": req.body.linked_id,
      "money": req.body.money,
      "phone_number_des": req.body.phone_number_des,
      "note": req.body.note
    }, {
      headers: {
        'Authorization': req.headers.authorization,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      return res.json(response.data);
    })
    .catch((error) => {
      return res.json(error);
    });
});


//ok
app.post("/payments/transfer", async (req, res) => {
  axios
    .post("https://project.ewallet.vn/e-wallet/public/api/payments/transfer-to-bank-account", {
      "phone_number_source": req.body.phone_number_source,
      "money": req.body.money,
      "bank_id": req.body.bank_id,
      "bank_account_des": req.body.bank_account_des,
      "note": req.body.note
    }, {
      headers: {
        'Authorization': req.headers.authorization,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      return res.json(response.data);
    })
    .catch((error) => {
      return res.json(error);
    });
});

app.post("/search-account-bank", async (req, res) => {
  axios
    .post("https://project.ewallet.vn/e-wallet/public/api/payments/search-bank-account", {
      "bank_id": req.body.bank_id,
      "bank_account_number": req.body.bank_account_number,
    }, {
      headers: {
        'Authorization': req.headers.authorization,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response.data)
      return res.json(response.data);
    })
    .catch((error) => {
      console.log(error)
      return res.json(error);
    });
});

app.post("/payments/transfer-to-ewallet", async (req, res) => {
  axios
    .post("https://project.ewallet.vn/e-wallet/public/api/payments/transfer-another-ewallet", {
      "phone_number_source": req.body.phone_number_source,
      "phone_number_des": req.body.phone_number_des,
      "money": req.body.money,
      "note": req.body.note
    }, {
      headers: {
        'Authorization': req.headers.authorization,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      return res.json(response.data);
    })
    .catch((error) => {
      return res.json(error);
    });
});



//ok
app.get("/all-linked-bank/:phone_number", async (req, res) => {
  axios
    .get("https://project.ewallet.vn/e-wallet/public/api/link-bank-account/" + req.params.phone_number, {
      headers: {
        'Accept': 'application/json',
        'Authorization': req.headers.authorization
      }
    })
    .then((response) => {
      return res.json(response.data);
    })
    .catch((error) => {
      return res.json(error);
    });
});
//ok
app.get("/all-payments/:phone_number", async (req, res) => {
  axios
    .get("https://project.ewallet.vn/e-wallet/public/api/payments/get-payments/" + req.params.phone_number, {
      headers: {
        'Accept': 'application/json',
        'Authorization': req.headers.authorization
      }
    })
    .then((response) => {
      return res.json(response.data);
    })
    .catch((error) => {
      return res.json(error);
    });
});
//ok
app.get("/get-banks", async (req, res) => {
  axios
    .get("https://project.ewallet.vn/e-wallet/public/api/get-banks", {
      headers: {
        'Accept': 'application/json',
        'Authorization': req.headers.authorization
      }
    })
    .then((response) => {
      return res.json(response.data);
    })
    .catch((error) => {
      return res.json(error);
    });
});

//ok
app.post("/add-bank/", async (req, res) => {

  axios
    .post("https://project.ewallet.vn/e-wallet/public/api/link-bank-account", {
      "phone_number": req.body.phone_number,
      "bank_account_number": req.body.bank_account_number,
      "bank_id": req.body.bank_id
    }, {
      headers: {
        'Accept': 'application/json',
        'Authorization': req.headers.authorization,
        'Content-type': 'application/json'
      }
    })
    .then((response) => {

      return res.json(response.data);
    })
    .catch((error) => {

      return res.json(error);
    });
});

//ok
app.post("/del-bank/:id", async (req, res) => {

  axios
    .delete("https://project.ewallet.vn/e-wallet/public/api/link-bank-account/" + req.params.id, {
      headers: {
        'Accept': 'application/json',
        'Authorization': req.headers.authorization
      }
    })
    .then((response) => {

      return res.json(response.data);
    })
    .catch((error) => {

      return res.json(error);
    });
});


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
