import { get } from 'api/api-helper'

const getShops = (params) => get('/shops', params)

export default {
	getShops
}