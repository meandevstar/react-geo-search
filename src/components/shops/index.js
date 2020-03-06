import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './index.module.scss'

export default function ShopList ({ data }) {
    return (
        <div class={styles.root}>
            <div class={cx(styles.single, styles.category)}>
                <h3 class={styles.title}>Nearby Shops ({data.length})</h3>
                <ul class="list-unstyled">
                    {data.map((shop, i) => (
                        <li key={`shop_${i}`}>
                            <a href="/">
                                {shop.name}
                                {shop.distance.km >= 1 &&
                                    <span class="pull-right">{shop.distance.km} km</span>
                                }
                                {shop.distance.km < 1 &&
                                    <span class="pull-right">{shop.distance.m} m</span> 
                                }
                            </a>
                        </li>
                    ))}
                </ul>
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