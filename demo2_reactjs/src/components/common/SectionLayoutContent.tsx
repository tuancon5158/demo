import { Button, Col, Row } from 'antd'
import React from 'react'
import './SectionLayoutContent.scss'

interface Props {
	children?: React.ReactNode
	showAction?: boolean
	titleAction?: string
	handleAction?: () => void
}
export function SectionLayoutContent({
	children,
	showAction = false,
	titleAction = '',
	handleAction,
}: Props) {
	return (
		<Row gutter={[8, 8]} className='main-layout'>
			{showAction && titleAction ? (
				<Col span={24} className='justify-end	action'>
					<Button onClick={handleAction} type='primary' ghost>
						{titleAction}
					</Button>
				</Col>
			) : null}
			<Col
				className={
					titleAction ? 'content relative' : 'content content-full relative'
				}
				span={24}
			>
				{children}
			</Col>
		</Row>
	)
}
