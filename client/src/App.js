import React, { Component } from 'react';
import Product from './Product';
import './App.css'

class App extends Component {
state = {
    products: [],
    page: 1,
    size: 8,
    length: 0
  };

  componentDidMount() {
    this.callBackendAPI(this.state.page, this.state.size)
  }

  callBackendAPI = async (n, m) => {
    try {
      const query = (n || m) ? `?page=${n}&size=${m}` : ""
      const response = await fetch(`/api/products${query}`);
      const body = await response.json();
      if (response.status !== 200) {
        throw Error(body.message)
      }
      this.setState({ 
        page: this.state.page+1,
        length: body.length,
        products: [...this.state.products, ...body.products ]
      })
    } catch (err) {
      console.log(err)
    }
  };

  onMore = () => {
    this.callBackendAPI(this.state.page, this.state.size)

  }

  render() {
    return (
      <div className="app">
        <div className="all-products">
          {this.state.products.map ( product => {
            return <Product key={product.title} {...product} />
          })}
         </div>

          {
            this.state.products.length === this.state.length 
            ? null
            : <button onClick={this.onMore}>
                SHOW MORE
              </button>
          }
      </div>
    );
  }
}

export default App;