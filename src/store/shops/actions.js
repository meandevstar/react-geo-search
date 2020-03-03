import { createActions } from 'redux-actions'
import { shopAPI } from 'api'

const options = {
	prefix: 'SHOP'
}

export const shopActions = createActions(
	{
		SET_LOADING: undefined,
		SET_FAILURE: undefined,
		GET_SHOPS: async (params = {}) => {
			try {
				const shops = await shopAPI.getShops(params);

				console.log(shops);

				return shops
			} catch (err) {
				console.log(err)
			}
		}
	},
	options
)