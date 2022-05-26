import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import key from '../commons/key'

export const useQuery = (func?: Function) => {
	const location = useLocation()
	const [searchParams, setSearchParams] = useSearchParams()
	// const navigate = useNavigate()

	const saveQuery = (): void => {
		localStorage.setItem(key.BACK_ROUTE, `${location.pathname}${location.search}`)
	}

	const saveQueryToRouter = (
		query: { [key: string]: string },
		isSaveQuery: boolean = true
	): void => {
		if (isSaveQuery) {
			setSearchParams(query)
		}
	}
	useEffect(() => {
		saveQuery()
	}, [searchParams])
	useEffect(() => {
		saveQuery()
	}, [])
	window.onpopstate = () => {
		if (func) {
			func(Object.fromEntries([...searchParams]), false)
		}
	}
	return { saveQuery, saveQueryToRouter }
}
