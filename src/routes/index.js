import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import WelcomePage from 'pages/welcome'

export default function Routes () {
	return (
		<Router>
			<Redirect exact from='/' to='welcome' />
			<Route path='/welcome' exact component={WelcomePage} />
		</Router>
	)
}