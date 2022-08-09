import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {
  Home, ProductsPage, AuthWrapper, SingleProduct, Cart, Privite, About, Error, Checkout
} from "./pages"
function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/home"><Home /></Route>
          <Route exact path="/about"><About /></Route>
          <Route exact path="/cart"><Cart /></Route>
          <Route exact path="/products"><ProductsPage /></Route>
          <Route exact path="/products/:id" children={<SingleProduct />}></Route>
          <Privite exact path="/checkout"><Checkout /></Privite>
          <Route exact path="/*"><Error /></Route>
        </Switch>
        <Footer />
      </Router>
    </AuthWrapper>
  )
}

export default App
