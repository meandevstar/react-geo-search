import { get } from 'lodash'

export const shops = state => get(state, 'shops', {})