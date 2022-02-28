//this is where our reducer will go
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import products from './products';
import subscriptions from './subscriptions';

const reducer = combineReducers({
    products,
    subscriptions
});

//allows us to use chrome devTools to see how our state is being changed.
//thunkMiddleware lets us dispatch thunk async actions which can allow us to chain calls if needed
//createLogger logs our redux actions and state
const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;