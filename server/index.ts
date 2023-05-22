const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

var __importDefault:any =
  (this && this.__importDefault) ||
  function (mod:any) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = express();

app.use(express_1.default.json());
app.use((0, cors_1.default)());

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.6hwms.mongodb.net/products")
  .then(console.log("connected!"));

const db = mongoose.connection;
db.once("open", function () {
  console.log("Connected to MongoDB successfully!");
});


const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_category: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  product_stock: {
    type: Number,
    required: true,
  },
  product_rewiews: [
    {
      product_rating: {
        type: Number,
        required: true,
      },
      product_review: {
        type: String,
        required: true,
      },
    },
  ],
  product_description: {
    type: String,
    required: true,
  },
});
const product = mongoose.model("Product", productSchema);

app.get("/api/get", async (req:any, res:any) => {
  try {
    var result = await product.find();
  } catch (err) {
    console.log(err);
  }

  if (result) {
    res.send(result);
  }
});

app.get("/api/getOneProduct/:productID", async (req:any, res:any) => {
  const productID = req.params.productID;
  try {
    var result = await product.find({ _id: productID });
  } catch (err) {
    console.log(err);
  }

  if (result) {
    res.send(result);
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
