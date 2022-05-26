import { Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../../hooks'
import { ModalBase } from '../../components/common/ModalBase'
import { SectionLayoutContent } from '../../components/common/SectionLayoutContent'
import UserTable from '../../components/table/UserTable'
import useMainLayout from '../../hooks/useMainLayout'
import { roleServices } from '../../services/role'

function UserList() {
	const { t } = useLanguage()
	const [visible, setVisible] = useState(false)
	const { setLayout } = useMainLayout()
	const childFunc = React.useRef<any>(null)
	const [searchParams] = useSearchParams()
	const currentParams = Object.fromEntries([...searchParams])
	const [email, setEmail] = useState(``)
	const handleAction = () => {
		setEmail(``)
		setVisible(true)
	}

	const handleSubmit = async () => {
		try {
			const res = await roleServices.reqAdmin({ email, rolesId: 5 })
			if (res?.data?.httpStatusCode === 200) {
				message.success(`アドミンユーザーが追加されました。`)
				childFunc.current(currentParams)
				setVisible(false)
			}
		} catch (e: any) {
			if (e.data.httpStatusCode === 404) {
				message.error('登録に失敗しました。ユーザーが存在しません。')
			} else if (e.data.httpStatusCode === 403) {
				message.error(
					'登録に失敗しました。@lastmile-works.com外のアドレスは登録出来ません。'
				)
			} else {
				message.error(t('error'))
			}
		}
	}
	useEffect(() => {
		setLayout({ title: `アドミンユーザー管理`, isIcon: false })
	}, [])
	return (
		<SectionLayoutContent
			handleAction={handleAction}
			showAction
			titleAction='アドミンユーザーを追加'
		>
			<UserTable childFunc={childFunc} />
			<ModalBase
				visible={visible}
				onCancel={() => setVisible(false)}
				onOk={handleSubmit}
				title='アドミンユーザーを追加'
			>
				<Input
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder='メールアドレスを入力してください'
				/>
			</ModalBase>
		</SectionLayoutContent>
	)
}
export default UserList
