import React, { useState, useEffect, useRef  } from 'react';
import Landing from './Landing';
import NavBar from './modules/NavBar'
import Footer from "./modules/Footer"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Product from "./components/product_pages/Product"
import {Admin} from "./components/pages_admin/Admin"
import Summary from './components/order_pages/Summary';
import { WindowSizeProvider, useWindowSize } from './WindowSizeProvider';


function App() {

  return (
    <div  className='bg-zinc-900 min-h-screen'>
      <WindowSizeProvider>
      <NavBar />
      <Router>
          <Route path="/admin" exact>
            <Admin/>
          </Route>

          <Route path="/" exact>
            <Landing/>
          </Route>
          
          <Route path="/products/:productID">
            <Product />
          </Route>

          <Route path="/summary">
            <Summary/>
          </Route>
      </Router>
      <Footer/>
      </WindowSizeProvider>
    </div>
  );
}

export default App;
