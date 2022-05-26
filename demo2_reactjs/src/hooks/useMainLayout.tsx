import { useContext } from 'react'
import MainContext from '../context/MainProvider'

function useMainLayout() {
	return useContext(MainContext)
}

export default useMainLayout
