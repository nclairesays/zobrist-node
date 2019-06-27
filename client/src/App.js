import React, { Component } from 'react';
import Product from './Product';
import './App.css'

class App extends Component {
state = {
    products: []
  };

  componentDidMount() {
    this.callBackendAPI(1,8)
      .then(res => this.setState({ products: res.products }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async (n, m) => {
    const query = (n || m) ? `?page=${n}&size=${m}` : ""
    const response = await fetch(`/api/products${query}`);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div className="app">
        <div className="all-products">
          {this.state.products.map ( product => {
            return <Product key={product.title} {...product} />
          })}
         </div>
      </div>
    );
  }
}

export default App;