import React from 'react';
import Landing from './Landing';
import {NavBarDesktop} from './modules/NavBar'
import Footer from "./modules/Footer"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Product from "./modules/Product"


function App() {
  return (
    <div  className='bg-zinc-900 min-h-screen'>
      <NavBarDesktop />
      <Router>

          <Route path="/" exact>
            <Landing/>
          </Route>
          <Route path="/products/:productID">
            <Product />
          </Route>

      </Router>
      <Footer/>
    </div>
  );
}

export default App;
