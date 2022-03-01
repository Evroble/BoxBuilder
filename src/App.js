import logo from './logo.svg';
import './App.css';
import React from 'react';
import { connect } from 'react-redux'
import { fetchProducts } from './store/products'
import { fetchSubscriptions} from './store/subscriptions'

//this is the page we'll be working out of

class App extends React.Component {
  constructor(){
    super();
    //local state below
    this.state = {
      maxValue: 0,
      maxVolume: 0,
      currentValue: 0,
      currentVolume: 0,
    }
  }

  componentDidMount(){
    this.props.fetchProducts();
    this.props.fetchSubscriptions();
  }
  render() {
    const subscriptions = this.props.subscriptions;
    const products = this.props.products;
    console.log(products, "This is our products in our render")

    return (
      <div className="App">
        <div className='subscriptionsContainer'>
          <div className="selection">
            <label for="subscription">What size subscription would you like?</label>
            <select name="subscription">
              {subscriptions.map((subscription) => (
                <option value={subscription.name}>{subscription.name}</option>
              ))} 
            </select>
          </div>

        </div>
        <div className='productsContainer'>
          {products.map((product) => (
            <div className='singleProduct' key={product.id}>
              <h4>Name: {product.name}</h4>
              <p>Description: {product.description}</p>
              <p>Size: {product.volume}</p>
              <p>Cost: ${product.points}</p>

            </div>
          ))}
        </div>
      </div>
  );
  }
};

const mapState = (state) => {
  return{
    products: state.products,
    subscriptions: state.subscriptions
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchSubscriptions: () => dispatch(fetchSubscriptions())
  }
  
}

export default connect(mapState, mapDispatch)(App);
