import "./App.css";
import React from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { fetchProducts } from "./store/products";
import { fetchSubscriptions } from "./store/subscriptions";


class App extends React.Component {
  constructor() {
    super();
    //local state below
    this.state = {
      maxValue: 0,
      maxVolume: 0,
      currentValue: 0,
      currentVolume: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubChange = this.handleSubChange.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("One box of delicious meals coming your way!");
  }

  //when the minus button is pressed, we want to decrease the product's qty, and increase the current value and volume based on the product we're on
  handleDecrement(event) {
    const product = this.props.products[event.target.value];
    //if button has been pressed but max value/volume are zero, alert user to select a subscription size first
    if (this.state.maxValue === 0) {
      alert("Please select a box size before adding items");
    }
    //if our product qty is at 0 we won't do anything this way we don't have negative values
    if (product.qty > 0) {
      product.qty--;
      this.setState({
        currentValue: this.state.currentValue - product.points,
        currentVolume: this.state.currentVolume - product.volume,
      });
    }
  }

  handleIncrement(event) {
    const product = this.props.products[event.target.value];
    //check if a subscription has been selected
    if (this.state.maxValue === 0) {
      alert("Please select a box size before adding items");
    } else {
      const newValue = this.state.currentValue + product.points;
      const newVolume = this.state.currentVolume + product.volume;
      //check if adding the item would go over the maxValue/volume
      if (newValue > this.state.maxValue) {
        alert("Adding that item will exceed the value of your box!");
      } else if (newVolume > this.state.maxVolume) {
        alert("Adding that item will exceed the size of your box!");
      } else {
        product.qty++;
        this.setState({
          currentValue: this.state.currentValue + product.points,
          currentVolume: this.state.currentVolume + product.volume,
        });
      }
    }
  }

  handleSubChange(event) {
    //subscriptions is an array so we pass in our index in order to access our object
    const idx = event.target.value;
    // set the max values and volumes to the subscriptions selected
    this.setState({
      maxValue: this.props.subscriptions[idx].maxValue,
      maxVolume: this.props.subscriptions[idx].maxVolume,
    });
  }

  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchSubscriptions();
  }
  render() {
    const subscriptions = this.props.subscriptions;
    const products = this.props.products;

    return (
      <div className="App">
        <h2>Step 1: Select your Box</h2>
        <div className="subscriptionsContainer">
          <label htmlFor="subscription">
            What size subscription would you like?
          </label>
          {/* When we make our selection, that's when we store the max values */}
          {/* disabled selected is not proper JSX syntax, need to replace later */}
          <select name="subscription" onChange={this.handleSubChange}>
            <option disabled selected="Size">Size</option>
            {subscriptions.map((subscription, index) => (
              <option key={subscription.id} value={index}>
                {subscription.name}
              </option>
            ))}
          </select>
        </div>

        <div className="userBoxInfo">
          <p>Current Value Points: {this.state.currentValue}</p>
          <p>Current Volume: {this.state.currentVolume}</p>
          <p>
            {" "}
            You can add {this.state.maxValue - this.state.currentValue} value
            points or {this.state.maxVolume - this.state.currentVolume} volume
            to your box!{" "}
          </p>
        </div>

        <h2>Step 2: Select your meals</h2>
        <div className="productsContainer">
          {products.map((product, index) => (
            <div className="singleProduct" key={product.id}>
              <h4>Name: {product.name}</h4>
              <p>Description: {product.description}</p>
              <p>Size: {product.volume}</p>
              <p>Value Points: {product.points}</p>
              <button value={index} onClick={this.handleDecrement}>
                -
              </button>
              <span>{product.qty}</span>
              <button value={index} onClick={this.handleIncrement}>
                +
              </button>
            </div>
          ))}
        </div>
        <div className="saveBtnBox">
          <button className="saveBtn" onClick={this.handleSubmit}>Save</button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    subscriptions: state.subscriptions,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchSubscriptions: () => dispatch(fetchSubscriptions()),
  };
};

export default connect(mapState, mapDispatch)(App);
