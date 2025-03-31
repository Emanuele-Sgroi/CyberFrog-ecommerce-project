require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const main_url = process.env.REACT_APP_PUBLIC_URL;

const app = express();

// Define allowed origins
// const allowedOrigins = [
//   "https://emanuele-sgroi.github.io",
//   "https://emanuele-sgroi.github.io/CyberFrog-ecommerce-project",
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps, curl, etc.)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// // Specify allowed origin
const corsOptions = {
  origin: "https://emanuele-sgroi.github.io",
};

// Enable CORS with options
app.use(cors(corsOptions));

app.use(express.json());

const path = require("path");

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "build", "index.html"));
//   });
// }

app.get("/", (req, res) => {
  res.send("Welcome! This is the backend server of Cyber Frog!");
});

const array = [];

const calculateOrderAmount = (items) => {
  items.map((item) => {
    const { price, cartQuantity } = item;
    const cartItemAmount = price * cartQuantity;
    return array.push(cartItemAmount);
  });
  const totalAmount = array.reduce((a, b) => {
    return a + b;
  }, 0);

  return totalAmount * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items, shipping, description } = req.body;
  //const { items, shipping, description, receipt_email } = req.body; --> receipt email is not used here because I am using a test account on stripe

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "gbp",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        line1: shipping.line1,
        line2: shipping.line2,
        city: shipping.city,
        country: shipping.country,
        postal_code: shipping.postal_code,
      },
      name: shipping.name,
      phone: shipping.phone,
    },
    // receipt_email: customerEmail --> valid only if payment is activated on stripe website
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));
