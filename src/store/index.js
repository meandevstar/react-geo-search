import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import configureStore from 'store/config'
import history from 'store/history'

import welcomeReducer from 'store/welcome/reducers'
import shopsReducer from 'store/shops/reducers'

const rootReducer = combineReducers({
	welcome: welcomeReducer,
	shops: shopsReducer,
	router: connectRouter(history)
})

const initialState = window.initialReduxState
const { store } = configureStore(history, initialState, rootReducer)

export default {
	store,
	history
}