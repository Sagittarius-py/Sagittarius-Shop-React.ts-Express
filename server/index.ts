const express =  require("express");
import mongoose, { Schema, Document } from "mongoose";
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const multer = require ("multer");
const fs = require("fs")
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.static("public"));
app.use(session({
  secret: 'my-secret-key', // a secret key for session signature
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // session timeout (in milliseconds)
    sameSite: true,
    secure: false // set it to true if your app uses HTTPS
  }
}));

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.6hwms.mongodb.net/products")
  .then(() => {
    console.log("connected!");
  });

const db = mongoose.connection;
db.once("open", function () {
  console.log("Connected to MongoDB successfully!");
});
db.on("error", function (err) {
  console.log(err);
});

interface IProductReview {
  product_rating: number;
  product_review: string;
}

interface IProduct extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  product_name: string;
  product_category: string;
  product_price: number;
  product_stock: number;
  product_reviews: IProductReview[];
  product_description: string;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

const productSchema = new Schema<IProduct>({
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
  product_reviews: [
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
const product = mongoose.model<IProduct>("Product", productSchema);

app.get("/api/get", async (req, res) => {
  try {
    const result = await product.find();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

app.get("/api/getOneProduct/:productID", async (req, res) => {
  const productID = req.params.productID;
  try {
    const result = await product.find({ _id: productID });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});



const User = mongoose.model<any>("User", {
  username: String,
  password: String,
  shopping_bag: Array,
  address: String,
});

// Middleware
app.use(bodyParser.json());

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ error: "User not found" });
    }

    // Compare the password
    const isPasswordMatch = password == user.password;
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    } else {
      // Login successful
      user.password = "";
      req.session.user = { id: user._id, email: email};
      res.cookie('userId', user._id); 
      res.cookie('email', email);
      res.status(200).send('Login successful');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err)
    }
    res.clearCookie('connect.sid')
    res.clearCookie('email')
    res.clearCookie('userId')
    res.status(200).send("Logged out successfully!")
  });
});

interface IBanner extends Document {
  banner_title: string;
  banner_href: string;
  banner_desc: string;
}

const BannerSchema = new Schema<IBanner>({
  banner_title: String,
  banner_href: String,
  banner_desc: String,
});

const banner = mongoose.model<IBanner>("Banner", BannerSchema);

app.get("/api/getBanners", async (req, res) => {
  try {
    const result = await banner.find();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});


// !Create Product ======================================
app.post("/api/addProduct", upload.single("product_photos"), (req:any, res:any) => {
    var{ product_name, product_quantity, product_price, product_category, product_description} = req.body;
    var newProduct = {
      "product_name": product_name, 
      "product_category": product_category,
      "product_price": product_price,
      "product_stock": product_quantity,
      "product_rewiews": [],
      "product_description":product_description
    }
    product.create(newProduct)
    .then((insertedProduct) =>  {
      fs.rename( `./public/${req.file.filename}`, `./public/${insertedProduct._id}_0.jpg`, ()=>{} );
    })
  }
);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});