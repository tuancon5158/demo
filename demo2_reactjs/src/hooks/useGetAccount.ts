import { useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from './useAuth'
import { userServices } from '../services/user'
import { useNotification } from './useNotification'
import key from '../commons/key'
import CONSTANTS from '../constants'

/* eslint-disable */

export const useGetAccount = (): {
	fetchUser: Function
	isLoadUser: boolean
	setIsLoadUser: Function
} => {
	const { setAuth } = useAuth()
	const [isLoadUser, setIsLoadUser] = useState(true)

	const { error } = useNotification()
	const fetchUser = async (): Promise<any> => {
		const res = (await userServices.userAccount()) as any
		// setIsLoadUser(true)
		if (res.data.rolesId === CONSTANTS.ROLE_ADMIN) {
			setAuth(res.data)
			return true

			// }
		}
		localStorage.removeItem(key.TOKEN)
		error(`Not Admin`)

		// setIsLoadUser(false)
	}

	return { fetchUser, isLoadUser, setIsLoadUser }
}
