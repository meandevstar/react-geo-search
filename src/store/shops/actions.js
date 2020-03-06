import { createActions } from 'redux-actions'
import { shopAPI } from 'api'

const options = {
	prefix: 'SHOP'
}

export const shopActions = createActions(
	{
		SET_LOADING: undefined,
		SET_FAILURE: undefined,
		GET_SHOPS: shopAPI.getShops
	},
	options
)