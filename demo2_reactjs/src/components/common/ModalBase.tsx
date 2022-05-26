import { Button } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import Title from 'antd/lib/typography/Title'
import React from 'react'
import { useLanguage } from '../../hooks'

type ModalProps = {
	title: string
	visible: boolean
	onOk: () => void
	onCancel: () => void
	wrapClassName?: string
	children?: React.ReactNode
	disabledOK?: boolean
}

export function ModalBase({
	title,
	visible,
	onOk,
	children,
	wrapClassName,
	onCancel,
	disabledOK = false,
}: ModalProps) {
	const { t } = useLanguage()

	return (
		<Modal
			key={title}
			title={<Title level={5}>{title}</Title>}
			centered
			visible={visible}
			onOk={onOk}
			width={600}
			onCancel={onCancel}
			wrapClassName={wrapClassName}
			footer={[
				<Button key={title + 1} onClick={onCancel}>
					{t(`Cancel`)}
				</Button>,
				<Button key={title + 2} disabled={disabledOK} type='primary' onClick={onOk}>
					{t(`Ok`)}
				</Button>,
			]}
		>
			{children}
		</Modal>
	)
}
