import React, { Component } from 'react';
import Product from './Product';
import './App.css'

class App extends Component {
state = {
    products: []
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ products: res.dataSource.products }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/api/products');
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
            return <Product {...product} />
          })}
         </div>
      </div>
    );
  }
}

export default App;