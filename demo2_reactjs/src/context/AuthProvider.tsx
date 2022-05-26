import React, { createContext, useMemo, useState } from 'react'

const AuthContext = createContext<any | null>(null)

interface Props {
	children?: React.ReactNode
}

export function AuthProvider({ children }: Props) {
	const [auth, setAuth] = useState(null)
	const value = useMemo(
		() => ({
			auth,
			setAuth,
		}),
		[auth]
	)
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
