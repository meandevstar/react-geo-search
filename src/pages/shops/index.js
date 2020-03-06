import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { shopActions } from 'store/shops/actions'
import styles from './index.module.scss'

export default function Shops () {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(shopActions.getShops())
	}, [dispatch])

	return (
		<div className={styles.root}>
			<h3>Shops Page</h3>
		</div>
	)
}