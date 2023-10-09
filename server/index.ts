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



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

// ! Products-------------------------------------

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


app.post("/api/AddProductToBag", async (req, res) => {
  console.log(req.body)
  const {productID, userId} = req.body;
  const user = await User.findOne({ _id: userId }).then((document) => {
    if (document) {
      document.shopping_bag.push([productID, 1]);

      // Save the changes
      return document.save();
    } else {
      throw new Error('Document not found');
    }
  })
  .then((updatedDocument) => {
    console.log('Document updated:', updatedDocument);
  })
  .catch((error) => {
    console.error('Error updating document:', error);
  });
});

app.get("/api/getShoppingBag/:userId", async (req: any, res: any) => {
  const userId = req.params.userId
  const user = await User.findOne({ _id: userId })
  if(user.shopping_bag){
    res.status(200).send(user.shopping_bag)}
  }
)

app.post("/api/deleteFromBag/", async (req, res) => {
  const { userId, productId } = req.body;

  const user = await User.findOne({ _id: userId });
  if (user) {
    const newShoppingBag = user.shopping_bag.filter((product: any) => {
      return product[0] !== productId;
    });

    try {
      const result = await User.updateOne({ shopping_bag: newShoppingBag });
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(500).send("server error");
  }
});



// ! Users -----------------------------------------------------

const User = mongoose.model<any>("User", {
  email: String,
  password: String,
  shopping_bag: Array,
  address: String,
});


app.post("/api/login", async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ error: "User not found" });
    }

    const isPasswordMatch = password == user.password;
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    } else {
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

app.post("/api/register", async (req: any, res: any) => {
  const { email, password, address } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user){
      var newUser = {
        "password": password, 
        "shopping_bag": [],
        "address": address,
        "email": email
      }
      User.create(newUser)
      res.status(200).send("User created!")
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


app.get("/api/getAllUsers", async (req, res) => {
  try {
    const result = await User.find();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }

})


app.delete("/api/deleteUser/:userId", async (req, res) => {
  const user_id =  req.params.userId
  try {
    const result = await User.deleteOne({_id: user_id});
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }

})


app.post("/api/editUser/:userId", async (req, res) => {
  const user_id =  req.params.userId
  const {email, password, address} = req.body
  try {
    const result = await User.updateOne({_id: user_id}, {email, password, address});
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }

})
//! Banners ---------------------------


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