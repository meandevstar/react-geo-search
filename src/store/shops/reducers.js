import { handleActions } from 'redux-actions'
import { shopActions } from 'store/shops/actions'

export const shopReducer = handleActions(
	new Map([
		[
			shopActions.setLoading,
			(state, action) => ({
				...state,
				loading: true,
				error: null	
			})
		],
		[
			shopActions.setFailure,
			(state, action) => ({
				...state,
				loading: false,
				error: action.payload
			})
		],
		[
			shopActions.getShops,
			(state, action) => ({
				...state,
				loading: false,
				data: action.payload
			})
		]
	]),
	{
		loading: false,
		error: null,
		data: []
	}
)

export default shopReducer