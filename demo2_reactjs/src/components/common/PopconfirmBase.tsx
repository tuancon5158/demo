import { Popconfirm } from 'antd'
import React from 'react'

interface ModalProps {
	text?: string
	onConfirm: () => void
	okText?: string
	cancelText?: string
	children?: React.ReactNode
}

export function PopconfirmBase({
	text,
	onConfirm,
	children,
	okText = 'Yes',
	cancelText = 'No',
}: ModalProps) {
	return (
		<Popconfirm
			placement='rightTop'
			title={text}
			onConfirm={onConfirm}
			okText={okText}
			okType='danger'
			cancelText={cancelText}
		>
			{children}
		</Popconfirm>
	)
}
