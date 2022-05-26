import React from 'react'

interface Props {
	children?: React.ReactNode
	width?: string
	height?: string
	viewBox?: string
	color?: string
}

export function IconBase({
	width = `18`,
	height = `18`,
	children,
	viewBox = '0, 0, 50, 50',
	color = '#222',
}: Props) {
	return (
		<svg
			width={width}
			height={height}
			xmlns='http://www.w3.org/2000/svg'
			role='presentation'
			viewBox={viewBox}
		>
			<g fill={color}>{children}</g>
		</svg>
	)
}
