import logo from './logo.svg';
import './App.css';
import React from 'react';
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
      qty: 0,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubChange = this.handleSubChange.bind(this);
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

  handleSubChange(event){
    //subscriptions is an array so we need the index in order to access the object
    const id = event.target.value
    console.log(this.subscriptions[id], "this is our event")
    // this.setState({
    //   maxValue: this.subscriptions[id].maxValue,
    //   maxVolume: this.subsciptions[id].maxVolume,
    // })

  }

  componentDidMount(){
    this.props.fetchProducts();
    this.props.fetchSubscriptions();

    //setting the default value to first sub, which is what displays in our list
    this.setState({
      maxValue:this.props.subscriptions[0].maxValue,
      maxVolume:this.props.subscriptions[0].maxVolume,
    })
  }
  render() {
    const subscriptions = this.props.subscriptions;
    const products = this.props.products;
    console.log(this.state, "this is our current state")

    return (
      <div className="App">
        <div className='subscriptionsContainer'>
          <div className="selection">
            <label htmlFor="subscription">What size subscription would you like?</label>
            {/* When we make our selection, that's when we store the max values */}
            <select name="subscription" onChange={this.handleSubChange}>
              {subscriptions.map((subscription) => (
                <option key={subscription.id} value={subscription.id}>{subscription.name}</option>
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
              {/* qty is currently updating for ALL items, not each individual item, so need to fix */}
              <form onSubmit={this.handleSubmit}>
                <label htmlFor='qty'>Quantity</label>
                <input type='number' name='qty' onChange={this.handleChange} step="1" placeholder={this.state.qty} value={this.state.qty}/>
              </form>

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
