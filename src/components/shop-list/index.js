import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { formatDistance } from 'utils/number'
import styles from './index.module.scss'

export default function ShopList ({ data }) {
  return (
    <div className={cx('col-sm-8', styles.root)}>
      <div className="jumbotron p-3 justify-content-center my-2">
        <h1 className="display-4 text-center mb-3">FIND SHOPS NEAR ME</h1>
        <div className={cx('category', styles.single)}>
          <h3 className={styles.title}>Nearby Shops ({data.length})</h3>
          <ul className="list-unstyled">
            {data.map((shop, i) => (
              <li key={`shop_${i}`}>
                <a href="/">
                {shop.name}
                {shop.distance.km >= 1 &&
                  <span className="pull-right">{formatDistance(shop.distance.km, 2)} km</span>
                }
                {shop.distance.km < 1 &&
                  <span className="pull-right">{formatDistance(shop.distance.m, 2)} m</span> 
                }
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

ShopList.defaultProps = {
    data: []
}

ShopList.propTypes = {
    data: PropTypes.array
}