import axios from 'axios'

//Action Types:
const SET_PRODUCTS = 'SET_PRODUCTS';

//Action Creators:
const setProducts = (products) => {
    return {
        type: SET_PRODUCTS,
        products,
    };
};

//Thunks
export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('https://mystifying-spence-dc3bda.netlify.app/build-a-box/products.json');
            //to add qty to each item, loop through and add, then dispatch
            data.products.forEach((product) => (
                product.qty = 0
            ))
            dispatch(setProducts(data.products))
        } catch (error) {
            console.log(error, "Error in fetchProducts")
        }
    };
};

//Reducer
export default function products(state = [], action){
    switch(action.type){
        case SET_PRODUCTS:
            return action.products;
        default:
            return state;
    }
}