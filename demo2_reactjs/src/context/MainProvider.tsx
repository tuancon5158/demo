import React, { createContext, useMemo, useState } from 'react'

const MainContext = createContext<any>(null)

interface Props {
	children?: React.ReactNode
}
type LayoutProps = {
	isIcon?: Boolean
	title?: string
}

export function MainProvider({ children }: Props) {
	const [layout, setLayout] = useState<LayoutProps>({ isIcon: false, title: '' })
	const value = useMemo(
		() => ({
			layout,
			setLayout,
		}),
		[layout]
	)
	return <MainContext.Provider value={value}>{children}</MainContext.Provider>
}

export default MainContext
