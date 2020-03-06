import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { shopActions, shopSelector } from 'store/shops'
import ShopList from 'components/shops'

export default function Shops() {
	const dispatch = useDispatch()
  const { data } = useSelector(shopSelector.shops)

	useEffect(() => {
		dispatch(shopActions.getShops())
	}, [dispatch])

	return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-8">
          <div class="jumbotron p-3 justify-content-center my-5">
            <h1 class="display-4 text-center mb-3">FIND SHOPS NEAR ME</h1>
            <ShopList data={data} />
          </div>
        </div>
       </div>
    </div>
	)
}