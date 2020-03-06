import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'
import { shopActions, shopSelector } from 'store/shops'
import ShopList from 'components/shop-list'
import ShopMap from 'components/shop-map'
import styles from './index.module.scss'

export default function Shops() {
	const dispatch = useDispatch()
  const { data } = useSelector(shopSelector.shops)

	useEffect(() => {
		dispatch(shopActions.getShops())
	}, [dispatch])

  const onPosChange = useCallback((pos, limit) => {
    dispatch(shopActions.getShops(pos, limit))
  }, [dispatch])

	return (
    <div className={styles.root}>
      <div className={styles.mapContainer}>
        <ShopMap data={data} onPosChange={onPosChange} />
      </div>
      <div className={styles.shopContainer}>
        <ShopList data={data} />
       </div>
    </div>
	)
}