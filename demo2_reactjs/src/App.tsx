import { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthLayout, MainLayout } from './layouts'
import { Page404 } from './pages'

import './i18n'
import './App.scss'
import 'antd/dist/antd.min.css'
import './theme/variables.less'
import { privateRoutes, publicRoutes } from './routes'
import { useLanguage } from './hooks'

function App() {
	const { t } = useLanguage()

	useEffect(() => {
		document.title = t(`meta_title`)
	}, [])
	return (
		<Router>
			<Routes>
				<Route path='/' element={<AuthLayout />}>
					{publicRoutes.map(({ Component, path }) => (
						<Route
							key={path}
							path={path}
							element={
								<Suspense fallback={<>.</>}>
									<Component />
								</Suspense>
							}
						/>
					))}
				</Route>

				<Route path='/' element={<MainLayout />}>
					{privateRoutes.map(({ Component, path }) => (
						<Route
							key={path}
							path={path}
							element={
								<Suspense fallback={<>.</>}>
									<Component />
								</Suspense>
							}
						/>
					))}
				</Route>

				{/* catch  all */}

				<Route path='*' element={<Page404 />} />
			</Routes>
		</Router>
	)
}

export default App
