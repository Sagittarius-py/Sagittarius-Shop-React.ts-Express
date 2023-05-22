import React from 'react';
import Landing from './Landing';
import {NavBarDesktop} from './modules/NavBar'
import Footer from "./modules/Footer"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Product from "./modules/Product"
import {Admin} from "./pages_admin/Admin"
import Summary from './modules/Summary';

function App() {
  return (
    <div  className='bg-zinc-900 min-h-screen'>
      <Router>
        <Route path="/admin" exact>
            <Admin/>
          </Route>

          <Route path="/" exact>
            <NavBarDesktop />
            <Landing/>
          </Route>
          
          <Route path="/products/:productID">
            <NavBarDesktop />
            <Product />
          </Route>

          <Route path="/summary">
            <NavBarDesktop />
            <Summary/>
          </Route>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
