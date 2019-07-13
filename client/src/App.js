import React, { Component } from 'react';
import Product from './Product';
import './App.css'

class App extends Component {
state = {
    products: [],
    page: 1,
    size: 10,
    length: 0
  };

  componentDidMount() {
    this.callBackendAPI(this.state.page, this.state.size)
    // if called with no arguments/queries, then it will return all products:
    // this.callBackendAPI()
  }

  callBackendAPI = async (n, m) => {
    try {
      if (n || m ) {
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
      } else {
        const response = await fetch(`/api/products`);
        const body = await response.json();
        if (response.status !== 200) {
          throw Error(body.message)
        }
        this.setState({ 
          page: 1,
          length: body.length,
          products: body.products
        })
      }

    } catch (err) {
      console.log(err)
    }
  };

  onMore = () => {
    this.callBackendAPI(this.state.page, this.state.size)
  }
  
  showAll = () => {
    console.log("SHOW ALL?")
    this.callBackendAPI()
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
            : <>
                <button onClick={this.onMore}>
                  SHOW MORE
                </button>
                <button onClick={this.showAll}>
                  SHOW ALL
                </button>
              </>
          }
      </div>
    );
  }
}

export default App;