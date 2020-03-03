import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import WelcomePage from 'pages/welcome'
import ShopsPage from 'pages/shops'

export default function Routes () {
	return (
		<Router>
			<Redirect exact from='/' to='shops' />
			<Route path='/welcome' exact component={WelcomePage} />
			<Route path='/shops' exact component={ShopsPage} />
		</Router>
	)
}