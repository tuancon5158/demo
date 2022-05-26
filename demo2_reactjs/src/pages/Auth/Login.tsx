import { useEffect, useState } from 'react'

import { Typography, Button, Col, Divider, Form, Input, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AppLogo } from '../../components/common/AppLogo'

import { useNotification } from '../../hooks/useNotification'
import { ILoginRequest } from '../../interfaces/auth'
import { authServices } from '../../services/auth'
import TokenService from '../../services/token'
import './Login.scss'
import { useGetAccount } from '../../hooks/useGetAccount'
import { useLanguage } from '../../hooks'
import key from '../../commons/key'

const { Title } = Typography

function Login() {
	const [loading, setLoading] = useState(false)

	const { error } = useNotification()
	const { fetchUser, isLoadUser, setIsLoadUser } = useGetAccount()
	const navigate = useNavigate()
	const { t } = useLanguage()
	const onFinish = async (values: ILoginRequest) => {
		setLoading(true)
		try {
			const res = (await authServices.login(values)) as any

			if (res?.data?.httpStatusCode === 200) {
				TokenService.setToken(res?.data.data.AuthenticationResult.IdToken)

				const checkAdmin = await fetchUser()
				if (checkAdmin) {
					if (localStorage.getItem(key.TO_PATH)) {
						navigate(localStorage.getItem(key.TO_PATH) as string)
					} else {
						navigate(`/news`)
					}
				}
			} else {
				error(res.data.message)
			}
			// api turn off
		} catch (e) {}
		setLoading(false)
	}

	useEffect(() => {
		if (localStorage.getItem(key.TOKEN)) {
			fetchUser().then((response: any) => {
				if (response) {
					navigate(`/users`)
				}
			})
		} else {
			setIsLoadUser(false)
		}
	}, [])
	// }
	return !isLoadUser ? (
		<div className='login-page h-full'>
			<div className='header p-3'>
				<AppLogo color='' />
			</div>
			<Row
				className='h-full'
				justify='center'
				align='middle'
				style={{ backgroundColor: `#f0f2f5`, height: `calc(100% - 50px)` }}
			>
				<Col className='bg-white mx-4' style={{ width: 600 }}>
					<div className='form-login'>
						<div className='mx-8 py-4 flex justify-between'>
							<Title level={4} className='!mb-0'>
								{t(`sign_in`)}
							</Title>
						</div>
						<Divider className='!mt-0' />
						<Form
							name='signin'
							layout='vertical'
							wrapperCol={{ span: 24 }}
							onFinish={onFinish}
							autoComplete='off'
						>
							<div className='px-8'>
								<Form.Item
									name='email'
									label={t(`label_email`)}
									rules={[
										{
											type: 'email',
											message: '無効なメールアドレスです。',
										},
										{
											required: true,
											message: 'メールアドレスを入力してください。',
										},
									]}
								>
									<Input placeholder='info@lastmile-works.com' />
								</Form.Item>

								<Form.Item
									name='password'
									label={t(`label_password`)}
									rules={[{ required: true, message: 'パスワードを入力してください。' }]}
								>
									<Input.Password placeholder='・・・・・・・・・' />
								</Form.Item>
							</div>
							<Divider className='!mb-0' />
							<div className='flex justify-end'>
								<Button
									loading={loading}
									className='mx-8 my-4'
									type='primary'
									htmlType='submit'
								>
									{t(`sign_in`)}
								</Button>
							</div>
						</Form>
					</div>
				</Col>
			</Row>
		</div>
	) : null
}

export default Login
