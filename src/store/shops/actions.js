import { createActions } from 'redux-actions'

const options = {
	prefix: 'SHOP'
}

export const shopActions = createActions(
	{
		SET_LOADING: undefined,
		SET_FAILURE: undefined,
		SET_SHOPS: undefined
	},
	options
)