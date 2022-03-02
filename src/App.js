import logo from './logo.svg';
import './App.css';
import React from 'react';
import Select from 'react-select'
import { connect } from 'react-redux'
import { fetchProducts } from './store/products'
import subscriptions, { fetchSubscriptions} from './store/subscriptions'

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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubChange = this.handleSubChange.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
    //if value/volume goes over what's allowed, add in something that will prevent that and give the user a pop up message
  };

  handleSubmit(event){
    event.preventDefault();
    //when submitted, we want to update our state to reflect the box order
  }
  //when the minus button is pressed, we want to decrease the product's qty, and increase the current value and volume based on the product we're on
  handleDecrement(event){
    const product = this.props.products[event.target.value]
    console.log(product, "decrement event")
    //potentially add a conditional here that says if button has been pressed but max value/volume are zero, alert user to select a subscription size first
    if(this.state.maxValue === 0){
      alert("Please select a box size before adding items")
    }
    //we need to add a conditional that says, if our product is at 0 we won't do anything
    if(product.qty > 0){
      product.qty--;
      this.setState({
        currentValue: this.state.currentValue - product.points,
        currentVolume: this.state.currentVolume - product.volume
      })
    }
  }

  handleIncrement(event){
    const product = this.props.products[event.target.value];
    console.log(product, "increment event");

    if(this.state.maxValue === 0){
      alert("Please select a box size before adding items")
    }else{
      const newValue = this.state.currentValue + product.points;
      const newVolume = this.state.currentVolume + product.volume
      //check if adding the item would go over the maxValue/volume
      if(newValue > this.state.maxValue || newVolume > this.state.maxVolume){
        alert("Adding that item will exceed the size of your box")
      }else{
        product.qty++;
        this.setState({
          currentValue: this.state.currentValue + product.points,
          currentVolume: this.state.currentVolume + product.volume
        })
      }
    }
    

  }

  handleSubChange(event){
    //subscriptions is an array so we need the index in order to access the object
    const idx = event.target.value;
    // set the max and current values and volumes to the subscriptions selected
    this.setState({
      maxValue: this.props.subscriptions[idx].maxValue,
      maxVolume: this.props.subscriptions[idx].maxVolume,
    })

  }

  componentDidMount(){
    this.props.fetchProducts();
    this.props.fetchSubscriptions();
  }
  render() {
    const subscriptions = this.props.subscriptions;
    const products = this.props.products;
    const subDefault = subscriptions[0];
    console.log(this.state, "this is our current state")
    console.log(subscriptions, "subscriptions in render")

    return (
      <div className="App">
        <div className='subscriptionsContainer'>
          <div className="selection">
            <label htmlFor="subscription">What size subscription would you like?</label>
            {/* When we make our selection, that's when we store the max values */}
            {/* disabled selected is not proper JSX syntax, need to replace later */}
            <select name="subscription"  onChange={this.handleSubChange}>
              <option disabled selected="Size"></option>
              {subscriptions.map((subscription, index) => (
                <option key={subscription.id} value={index}>{subscription.name}</option>
              ))} 
            </select>
          </div>

        </div>
        <div className='productsContainer'>
          {products.map((product, index) => (
            <div className='singleProduct' key={product.id}>
              <h4>Name: {product.name}</h4>
              <p>Description: {product.description}</p>
              <p>Size: {product.volume}</p>
              <p>Cost: ${product.points}</p>
              {/* qty is currently updating for ALL items, not each individual item, so need to fix */}
              {/* <form onSubmit={this.handleSubmit}>
                <label htmlFor='qty'>Quantity</label>
                <input type='number' name='qty' onChange={this.handleChange} step="1" placeholder={this.state.qty} value={this.state.qty}/>
              </form> */}
              <button value={index} onClick={this.handleDecrement}>-</button>
              <span>{product.qty}</span>
              <button value={index} onClick={this.handleIncrement}>+</button>

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
