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

				return shops.map(({ fields }) => ({
					...fields,
					location: fields.location
						.match(/(?<=\().*?(?=\))/g)[0]
						.split(' ')
						.map(l => Number(l))
				}));
			} catch (err) {
				return [];
			}
		}
	},
	options
)