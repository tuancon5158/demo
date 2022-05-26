import { ArrowLeftOutlined } from '@ant-design/icons'
import { Layout, Typography } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import key from '../../../commons/key'
import useMainLayout from '../../../hooks/useMainLayout'

const { Header } = Layout
const { Title } = Typography

interface Props {
	children?: React.ReactNode
}
export function HeaderCustom({ children }: Props) {
	const navigate = useNavigate()

	const { layout } = useMainLayout()
	const goBack = () => {
		if (localStorage.getItem(key.BACK_ROUTE)) {
			navigate(localStorage.getItem(key.BACK_ROUTE) as string)
			localStorage.removeItem(key.BACK_ROUTE)
		} else {
			navigate(-1)
		}
	}
	window.onpopstate = () => {
		// goBack()
	}
	return (
		<Header className='site-layout-background' style={{ padding: 0 }}>
			<div className='flex justify-between ml-4'>
				<span className='flex items-center'>
					{layout.isIcon ? <ArrowLeftOutlined onClick={goBack} size={30} /> : null}
					{layout.title ? (
						<Title level={5} className='mt-2 inline-bock ml-2'>
							{layout.title}
						</Title>
					) : null}
				</span>
				<span className='mr-8'>{children}</span>
			</div>
		</Header>
	)
}

export default HeaderCustom
