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
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
