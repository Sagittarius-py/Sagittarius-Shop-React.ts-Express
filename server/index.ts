const express =  require("express");
import mongoose, { Schema, Document } from "mongoose";
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require ("multer");
const fs = require("fs")
const session = require('express-session');
const audit =  require('express-requests-logger')
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const encription = require('./encription')


const app = express();
// app.use(audit()) // logging all data transfered thru server
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

app.on('listening', function () {
  if(key == null && iv == null){
    var key = encription.encription().key;
    var iv = encription.encription().iv;
  }
});


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
  const {productID, userId} = req.body;
  await User.findOne({ _id: userId }).then((document) => {
    if (document) {
      document.shopping_bag.push(productID);
      // Save the changes
      return document.save();
    } else {
      throw new Error('Document not found');
    }
  })
  .then(() => {
    console.log('Document updated');
  })
  .catch((error) => {
    console.error('Error updating document:', error);
  });
});

app.get("/api/getShoppingBag/:userId", async (req: any, res: any) => {
  const userId = req.params.userId
  const user = await User.findOne({ _id: userId })
  if(user?.shopping_bag){
    res.status(200).send(user.shopping_bag)}
  }
)

app.delete("/api/deleteFromBag/", async (req, res) => {
  const { userId, productId } = req.body;

  const user = await User.findOne({ _id: userId });
  if (user) {
    const newShoppingBag = user.shopping_bag.filter((product: any) => {
      return product != productId;
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

interface IEncryptionResult extends Document {
  iv: string;
  encryptedData: string;
}

const PasswordSchema = new Schema<IEncryptionResult>({
  iv: String,
  encryptedData: String,
});

function encrypt(text: any) {
  var key = encription.encription().key;
  var iv = encription.encription().iv;
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString(), encryptedData: encrypted.toString('hex') };
}

function decrypt(text: any) {
  var key = encription.encription().key;
  var iv = encription.encription().iv;
  iv = Buffer.from(text.iv);
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

const User = mongoose.model<any>("User", {
  email: String,
  password: PasswordSchema,
  shopping_bag: Array,
  address: String,
  postalCode: String,
});


app.post("/api/login", async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found" );
    }
    const isPasswordMatch = password == decrypt(user.password);
    if (!isPasswordMatch) {
      res.status(406).send("Invalid password" );
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
  const { email, password, address, postalCode } = req.body;
  console.log(req.body)
  console.log(email, password, address, postalCode);

  try {
    const user = await User.findOne({ "email": email });
    if(!user){
      var encryptedPassword = encrypt(password)
      var newUser = {
        "email": email,
        "password": encryptedPassword, 
        "shopping_bag": [],
        "address": address,
        "postalCode": postalCode,
      }
      console.log("tu się sypie")
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

app.get("/api/getUser/:userId", async (req, res) => {
  const user_id =  req.params.userId
  try {
    const user = await User.findOne({ _id: user_id });
    if(user){
      res.status(200).send(user);
    } else {
      res.status(501).send("User not found");
    }
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
  const {email, postalCode, address} = req.body
  try {
    const result = await User.updateOne({_id: user_id}, {email, postalCode, address});
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
      "product_reviews": [],
      "product_description":product_description
    }
    product.create(newProduct)
    .then((insertedProduct) =>  {
      fs.rename( `./public/${req.file.filename}`, `./public/${insertedProduct._id}_0.jpg`, ()=>{} );
    })
  }
);

// !Get all cities ===================================

interface ICity extends Document {
  id: number;
  nazwa: string;
  kod_pocztowy: string;
}

const CitySchema = new Schema<ICity>({
  id: Number,
  nazwa: String,
  kod_pocztowy: String,
});


const City = mongoose.model<ICity>("City", CitySchema);


app.post("/api/getCities", async (req:any, res:any) => {
   try{
      const result = await City.find();
      res.send(result);
   } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
   } 
})

app.get("/api/getOneCity/:postalCode", async (req:any, res:any) => {
  const kodPocz =  req.params.postalCode
  try{
    const city = await City.findOne({ kod_pocztowy: kodPocz });
    res.status(200).send(city)
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
})


// !Order Summary ===================================

const OrderSchema = new mongoose.Schema({
  order_userId: mongoose.Schema.Types.ObjectId,
  order_products: [mongoose.Schema.Types.ObjectId],
  order_shippingName: String,
  order_shippingSurname: String,
  order_Address: String,
  order_PostalCode: String,
  order_City: String,
  order_Country: String,
  order_PhoneNumber: String,
  order_date: String,
  order_finished: Boolean,
});

const order = mongoose.model('Order', OrderSchema);

// Submit order to database
app.post("/api/addOrder/", async (req: any, res:any) => {
  let i = 0;
  const {userId, products, address, postalCode, shippingPrice, sumPrice} = req.body;
  var finalPrice = shippingPrice + sumPrice;
  finalPrice = finalPrice.toFixed(2);

  var newOrder = {
    "order_userId": userId, 
    "order_products": products,
    "order_shippingName": '',
    "order_shippingSurname": '',
    "order_Address": '',
    "order_PostalCode": '',
    "order_City": '',
    "order_Country": '',
    "order_PhoneNumber": '',
    "order_date": new Date().toUTCString().slice(0, 25),
    "order_finished": false,
  }

  order.create(newOrder).then(insertedOrder => {
    return res.send(insertedOrder._id)
  })
})

app.get("/api/getOrder/:orderId", async (req: any, res: any) =>{
  const orderId =  req.params.orderId;
  try{
    if(orderId) {
      const wynik = await order.findOne({_id: orderId})
      res.send(wynik)
    }
  
  } catch (err) {
    console.log(err);
    res.status(501).send("Internal server error");
  }
})


app.get("/api/getAllOrders", async (req: any, res: any) => {
    try{
      const wynik = await order.find()
      console.log(wynik)
      res.send(wynik)
    } catch (err) {
      console.log(err);
      res.status(501).send("Internal server error");
  
    }

})


// !Server ==========================================
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});