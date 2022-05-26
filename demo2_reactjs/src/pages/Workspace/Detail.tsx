import { Button, Col, Form, InputNumber, Row, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SectionLayoutContent } from '../../components/common/SectionLayoutContent'
import useMainLayout from '../../hooks/useMainLayout'
import { useNotification } from '../../hooks/useNotification'
import { workspaceServices } from '../../services/workspace'
// import { cloudFrontServices } from '../../services/cloudFront'
import { IWorkspace } from '../../interfaces/workspace'
import { useLanguage } from '../../hooks'
import { IResponse } from '../../interfaces/response'
import { formatDateTime } from '../../utils'
import { TypeWorkspace } from '../../constants'

const { Option } = Select

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 19 },
}

enum Status {
	Approved = 1,
	Not_Approved = 0,
}
function DetailWorkspace() {
	const { id } = useParams()
	const { setLayout } = useMainLayout()
	const { t } = useLanguage()

	const [formData, setFormData] = useState<IWorkspace>({
		createdAt: '',
		staff: {
			name: '',
		},
		id: 0,
		type: 11,
		status: 0,
	})
	const [isLoading, setIsLoading] = useState(false)
	const [plans] = useState([
		{
			value: 1,
			name: 'エンタープライズプラン',
		},
		{
			value: 2,
			name: 'ビジネスプラン',
		},
		{
			value: 3,
			name: 'プロプラン',
		},
	])
	const { error, success } = useNotification()
	// const distributionId = process.env.REACT_APP_DISTRIBUTION_ID || ''

	useEffect(() => {
		loadDetail()
	}, [])

	const onFinish = async (values: {
		addAccount: number
		addStorage: number
		planId: number
	}) => {
		try {
			if (formData.type === TypeWorkspace.Approved_Not_Plan) {
				await workspaceServices.update({ id: formData.id, status: Status.Approved })
				success('承認しました。')
				loadDetail()
			}
			if (formData.type === TypeWorkspace.Approved_Plan) {
				await workspaceServices.updatePlan({
					id: formData.workspaceId,
					planId: values.planId,
				})
				await workspaceServices.update({
					id: formData.id,
					status: Status.Approved,
					addStorage: values.addStorage,
					addAccount: values.addAccount,
				})
				success('承認しました。')
				loadDetail()
			}
		} catch (e) {
			error('エラーが発生しました。再度お試しください。')
		}
	}
	const loadDetail = async () => {
		setIsLoading(true)
		await workspaceServices
			.getDetail(id || '')
			.then((response: IResponse<IWorkspace>) => {
				const formDefault = response.data as IWorkspace
				if (
					formData.type === TypeWorkspace.Approved_Plan &&
					response.data.workspace?.workspacePlan
				) {
					formDefault.addAccount = response.data.workspace.workspacePlan.addAccount
					formDefault.addStorage = response.data.workspace.workspacePlan.addStorage
					formDefault.planId = response.data.workspace.workspacePlan.planId
				}
				setFormData({
					...formDefault,
				})

				setLayout({ title: `空間管理「${response.data.content}」`, isIcon: true })
			})
		setIsLoading(false)
	}
	return (
		<SectionLayoutContent>
			{!isLoading ? (
				<Row className='flex justify-center'>
					<Col span={20}>
						<Form
							onFinish={onFinish}
							name='wrap'
							{...layout}
							labelAlign='left'
							labelWrap
						>
							<div className='my-10'>
								<Form.Item className='font-black' colon={false} label='申請者情報' />
								<Form.Item label='申請者氏名'>{formData.name}</Form.Item>
								<Form.Item label='メールアドレス'>{formData.email}</Form.Item>
								<Form.Item label='会社名'>
									{formData.companyName ? formData.companyName : '-'}
								</Form.Item>
								<Form.Item label='WebサイトURL'>
									{formData.department ? formData.department : '-'}
								</Form.Item>
							</div>
							<div className='my-10'>
								<Form.Item className='font-black' colon={false} label='申請内容詳細' />
								<Form.Item label='ワークスペースID'>{formData.workspaceId}</Form.Item>
								{formData.type === TypeWorkspace.Approved_Plan ? (
									<Form.Item label='使用予定人数'>{formData.usersCount}人</Form.Item>
								) : null}
								<Form.Item label='申請理由'>{formData.reason}</Form.Item>
								<Form.Item label='申請種別'>{formData.content}</Form.Item>
								<Form.Item label='申請日時'>
									{formatDateTime(formData.createdAt)}
								</Form.Item>
								<Form.Item label='対応者'>
									{formData.staff?.name ? formData.staff?.name : '-'}
								</Form.Item>
							</div>
							<div className='my-10'>
								{formData.type === TypeWorkspace.Approved_Plan ? (
									<>
										<Form.Item className='font-black' colon={false} label='プラン内容' />
										<Form.Item
											name='addAccount'
											label='追加人数'
											rules={[{ required: true, message: t('enter_input') }]}
										>
											{formData.status === Status.Not_Approved ? (
												<InputNumber min={0} placeholder='' />
											) : (
												<span>{formData.addAccount}人</span>
											)}
										</Form.Item>
										<Form.Item
											name='addStorage'
											label='追加容量'
											rules={[{ required: true, message: t('enter_input') }]}
										>
											{formData.status === Status.Not_Approved ? (
												<InputNumber min={0} placeholder='' />
											) : (
												<span>{(formData.addStorage || 0) / 1024}GB</span>
											)}
										</Form.Item>

										<Form.Item
											name='planId'
											label='プラン'
											wrapperCol={{ span: 12 }}
											rules={[{ required: true, message: t('enter_input') }]}
										>
											{formData.status === Status.Not_Approved ? (
												<Select placeholder='エンタープライズプラン' allowClear>
													{plans.map(item => (
														<Option key={item.value} value={item.value}>
															{item.name}
														</Option>
													))}
												</Select>
											) : (
												<span>
													{plans.find(item => item.value === formData.planId)?.name}
												</span>
											)}
										</Form.Item>
									</>
								) : null}
							</div>
							<Form.Item wrapperCol={{ span: 24 }}>
								<div className='flex justify-center my-10'>
									<Button
										disabled={formData.status === Status.Approved}
										type='primary'
										ghost
										htmlType='submit'
									>
										{formData.status === Status.Approved ? `対応済` : `申請を承認`}
									</Button>
								</div>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			) : null}
		</SectionLayoutContent>
	)
}

export default DetailWorkspace
