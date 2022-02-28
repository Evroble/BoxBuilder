import axios from 'axios'

//Action Types:
const SET_SUBSCRIPTIONS = 'SET_SUBSCRIPTIONS';

//Action Creators:
const setSubscriptions = (subscriptions) => {
    return {
        type: SET_SUBSCRIPTIONS,
        subscriptions,
    };
};

//Thunks
export const fetchSubsciptions = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('https://mystifying-spence-dc3bda.netlify.app/build-a-box/subscriptions.json');
            dispatch(setSubscriptions(data))
        } catch (error) {
            console.log(error, "Error in fetchSubscriptions")
        }
    };
};

//Reducer
export default function subscriptions(state = [], action){
    switch(action.type){
        case SET_SUBSCRIPTIONS:
            return action.subscriptions;
        default:
            return state;
    }
}