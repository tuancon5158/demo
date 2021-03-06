import {
	Button,
	Col,
	Form,
	InputNumber,
	Row,
	Select,
	Table,
	Typography,
} from 'antd'
import { EditOutlined } from '@ant-design/icons'
import parse from 'html-react-parser'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SectionLayoutContent } from '../../components/common/SectionLayoutContent'
import useMainLayout from '../../hooks/useMainLayout'
import { useNotification } from '../../hooks/useNotification'
import { workspaceAdminServices } from '../../services/workspaceAdmin'
// import { cloudFrontServices } from '../../services/cloudFront'
import { IGetResponseData, IResponse } from '../../interfaces/response'
import { formatDateTime } from '../../utils'
import { ModalBase } from '../../components/common/ModalBase'
import {
	IPlan,
	IWorkspaceAdmin,
	IWorkspaceSpace,
	IWorkspaceUser,
} from '../../interfaces/workspaceAdmin'
import { OpenNewTab } from '../../components/common/OpenNewTab'
import { publishStatus, roles } from '../../constants'

const { Text } = Typography

const { Option } = Select

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 19 },
}

function DetailWorkspaceAdmin() {
	const { id } = useParams()
	const { setLayout } = useMainLayout()
	const [modal, setModal] = useState({
		maxAccount: false,
		addStorage: false,
		basePrice: false,
		plan: false,
	})

	const [plans, setPlans] = useState<IPlan[]>([])
	const [dataUpdate, setDataUpdate] = useState({
		maxAccount: 0,
		addStorage: 0,
		basePrice: 0,
		plan: '',
	})
	const [formData, setFormData] = useState<IWorkspaceAdmin>({
		id: '',
		name: '',
		createdAt: '',
		updatedAt: '',
		invoice: 0,
		thumbnailUrl: '',
		description: '',
		creator: '',
		workspacePlan: {
			addAccount: 0,
			addStorage: 0,
			id: '',
			discount: 0,
		},
		workspaceUser: [
			{
				id: '',
				memberRole: 1,
				user: {
					name: '',
					email: '',
					lastLoginDate: '',
				},
			},
		],
		// workspaceSpace: [{ workspace: { name: '' } }],
	})
	const [isLoading, setIsLoading] = useState(false)

	const { success } = useNotification()
	// const distributionId = process.env.REACT_APP_DISTRIBUTION_ID || ''

	useEffect(() => {
		loadDetail()
		getPlans()
	}, [])

	const loadDetail = () => {
		setIsLoading(true)
		workspaceAdminServices
			.getDetail(id || '')
			.then((response: IResponse<IWorkspaceAdmin>) => {
				const formDefault = response.data as IWorkspaceAdmin

				setFormData({
					...formDefault,
					creator: response.data?.workspaceUser?.find((u: any) => u.memberRole === 1)
						?.user.name,
				})

				setLayout({ title: `${response.data.name}`, isIcon: true })
			})
		setIsLoading(false)
	}

	const getPlans = () => {
		workspaceAdminServices
			.getPlans()
			.then((response: IResponse<IGetResponseData<IPlan>>) => {
				setPlans(response.data.list)
			})
	}

	const submitMaxAccount = () => {
		workspaceAdminServices
			.updateMaxAccount({
				addAccount: dataUpdate.maxAccount,
				id: formData.id,
			})
			.then(() => {
				reload()
			})
	}

	const submitStorage = () => {
		workspaceAdminServices
			.updateStorage({
				addStorage: dataUpdate.addStorage,
				id: formData.id,
			})
			.then(() => {
				reload()
			})
	}
	const submitBasePrice = () => {
		workspaceAdminServices
			.updateBasePrice({
				discount: dataUpdate.basePrice,
				id: formData.id,
			})
			.then(() => {
				reload()
			})
	}
	const reload = () => {
		loadDetail()
		setModal({
			...modal,
			maxAccount: false,
			addStorage: false,
			basePrice: false,
			plan: false,
		})
		success('??????????????????????????????')
	}
	const submitUpdatePlan = () => {
		workspaceAdminServices
			.updatePlan({
				planId: dataUpdate.plan,
				id: formData.id,
			})
			.then(() => {
				reload()
			})
	}
	const columnsUser = [
		{
			title: '??????',
			dataIndex: ['user', 'name'],
		},
		{
			title: '?????????????????????',
			dataIndex: ['user', 'email'],
		},
		{
			title: 'Role',
			render: (_: any, record: IWorkspaceUser) => (
				<div>{roles.find(item => item.value === record?.memberRole)?.name}</div>
			),
			dataIndex: 'memberRole',
		},

		{
			title: 'Last login',
			dataIndex: 'user.lastLoginDate',
			render: (_: any, record: IWorkspaceUser) => (
				<div>{formatDateTime(record.user.lastLoginDate)}</div>
			),
		},
	]
	const columnsWorkspaceSpace = [
		{
			title: '??????????????????',
			render: (_: any, record: IWorkspaceSpace) => (
				<div style={{ width: 200 }}>{record?.space?.title || '-'}</div>
			),
		},
		{
			title: 'ID',
			dataIndex: ['space', 'id'],
		},
		{
			title: '?????????',
			render: (_: any, record: IWorkspaceSpace) => (
				<div>{record?.space?.userSpaces[0]?.user?.name || '-'}</div>
			),
		},
		{
			title: '????????????',
			dataIndex: 'memberRole',
			render: (_: any, record: IWorkspaceSpace) => (
				<div>
					{record?.space?.createdAt ? formatDateTime(record.space.createdAt) : '-'}
				</div>
			),
		},
		{
			title: '????????????',
			render: (_: any, record: IWorkspaceSpace) => (
				<div>
					{
						publishStatus.find(item => item.value === record.space?.publishedStatus)
							?.name
					}
				</div>
			),
		},
	]
	return (
		<SectionLayoutContent>
			{!isLoading ? (
				<Row className='flex justify-center'>
					<Col span={20}>
						<Form name='wrap' {...layout} labelAlign='left' labelWrap>
							<div className='my-10'>
								<Form.Item className='font-black' colon={false} label='????????????' />
								<Form.Item label='ID'>{formData.id}</Form.Item>
								<Form.Item label='?????????????????????'>
									{formData.name ? formData.name : '-'}
								</Form.Item>
								<Form.Item label='?????????'>
									<Button
										type='text'
										icon={<EditOutlined />}
										onClick={() => {
											setDataUpdate({
												...dataUpdate,
												plan: formData?.workspacePlan?.plan?.id || '',
											})
											setModal({ ...modal, plan: true })
										}}
									>
										{formData.workspacePlan?.plan?.name || '-'}
									</Button>
								</Form.Item>
								<Form.Item label='????????????(??????)'>
									<Button
										type='text'
										icon={<EditOutlined />}
										onClick={() => {
											setDataUpdate({
												...dataUpdate,
												maxAccount: formData.workspacePlan.addAccount,
											})
											setModal({ ...modal, maxAccount: true })
										}}
									>
										{' '}
										{(formData.workspacePlan?.plan?.maxAccount || 0) +
											formData.workspacePlan.addAccount || '-'}{' '}
										???
									</Button>
								</Form.Item>
								<Form.Item label='????????????(??????)'>
									<Button
										type='text'
										icon={<EditOutlined />}
										onClick={() => {
											setDataUpdate({
												...dataUpdate,
												addStorage: formData.workspacePlan.addStorage / 1024,
											})
											setModal({ ...modal, addStorage: true })
										}}
									>
										{formData.workspacePlan?.plan?.maxStorage &&
										formData.workspacePlan.addStorage
											? (formData.workspacePlan.plan.maxStorage +
													formData.workspacePlan.addStorage) /
											  1024
											: formData.workspacePlan?.plan?.maxStorage}
										GB
									</Button>
								</Form.Item>
								<Form.Item label='??????????????????'>
									<Button
										type='text'
										icon={<EditOutlined />}
										onClick={() => {
											setDataUpdate({
												...dataUpdate,
												basePrice: formData.workspacePlan.discount,
											})
											setModal({ ...modal, basePrice: true })
										}}
									>
										??{formData.invoice.toLocaleString() || '-'}
									</Button>
								</Form.Item>
								<Form.Item label='????????????'>
									{' '}
									{formData.creator ? formData.creator : '-'}
								</Form.Item>
								<Form.Item label='?????????'>
									<div> {parse(formData.description ? formData.description : '-')} </div>
								</Form.Item>

								<Form.Item label='????????????'>
									<OpenNewTab
										value={`${process.env.REACT_APP_FRONT_URL}/${formData.thumbnailUrl}`}
									/>
								</Form.Item>

								<Form.Item label='?????????'>
									{formData.companyName ? formData.companyName : '-'}
								</Form.Item>
								<Form.Item label='web?????????URL'>
									{formData.companyUrl ? formData.companyUrl : '-'}
								</Form.Item>
								<Form.Item label='?????????????????????'>
									{formData.contactUrl ? formData.contactUrl : '-'}
								</Form.Item>
							</div>

							<div className='my-10'>
								<Form.Item className='font-black' colon={false} label='??????????????????' />

								<Form.Item label='' wrapperCol={{ span: 24 }}>
									<Table
										style={{ maxHeight: '600px' }}
										bordered
										columns={columnsUser}
										dataSource={formData.workspaceUser}
										pagination={false}
										rowKey='id'
									/>
								</Form.Item>
							</div>
							<div className='my-10'>
								<Form.Item className='font-black' colon={false} label='????????????' />

								<Form.Item label='' wrapperCol={{ span: 24 }}>
									<Table
										style={{ maxHeight: '600px' }}
										bordered
										columns={columnsWorkspaceSpace}
										dataSource={formData.workspaceSpace}
										pagination={false}
										rowKey='id'
									/>
								</Form.Item>
							</div>
						</Form>
					</Col>
				</Row>
			) : null}
			<ModalBase
				visible={modal.maxAccount}
				onCancel={() => {
					loadDetail()

					setModal({ ...modal, maxAccount: false })
				}}
				onOk={submitMaxAccount}
				title='?????????????????????????????????(???)'
				disabledOK={!dataUpdate.maxAccount}
			>
				{formData.workspacePlan?.plan?.maxAccount}??? {'      '} +{'  '}
				<InputNumber
					className='w-6/12'
					onChange={e => setDataUpdate({ ...dataUpdate, maxAccount: e })}
					min={0}
					type='number'
					value={dataUpdate.maxAccount}
				/>
				???
				<div>
					<Text type='danger'>
						{/* {formData.isRecommended < 0 ||
						formData.isRecommended > 9999 ||
						formData.isRecommended === null
							? '0???9999?????????????????????????????????????????????'
							: ''}{' '} */}
					</Text>
				</div>
			</ModalBase>
			<ModalBase
				visible={modal.addStorage}
				onCancel={() => {
					loadDetail()

					setModal({ ...modal, addStorage: false })
				}}
				onOk={submitStorage}
				title='?????????????????????????????????(Gbyte )'
				disabledOK={!dataUpdate.addStorage}
			>
				{(formData.workspacePlan?.plan?.maxStorage || 0) / 1024}GB {'      '} +
				{'  '}
				<InputNumber
					className='w-6/12'
					onChange={e => setDataUpdate({ ...dataUpdate, addStorage: e })}
					min={0}
					type='number'
					value={dataUpdate.addStorage}
				/>
				GB
				<div>
					<Text type='danger'>
						{/* {formData.isRecommended < 0 ||
						formData.isRecommended > 9999 ||
						formData.isRecommended === null
							? '0???9999?????????????????????????????????????????????'
							: ''}{' '} */}
					</Text>
				</div>
			</ModalBase>
			<ModalBase
				visible={modal.basePrice}
				onCancel={() => {
					loadDetail()

					setModal({ ...modal, basePrice: false })
				}}
				onOk={submitBasePrice}
				title='?????????????????????(???)'
				disabledOK={!dataUpdate.basePrice}
			>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					{formData.workspacePlan?.plan?.basePrice
						? (formData.invoice - formData.workspacePlan.discount).toLocaleString()
						: formData.invoice.toLocaleString()}
					{'      '} +{'  '}
					<InputNumber
						className='w-6/12'
						onChange={e => setDataUpdate({ ...dataUpdate, basePrice: e })}
						min={0}
						type='number'
						value={dataUpdate.basePrice}
					/>
					???
					<div>
						<Text type='danger'>
							{/* {formData.isRecommended < 0 ||
						formData.isRecommended > 9999 ||
						formData.isRecommended === null
							? '0???9999?????????????????????????????????????????????'
							: ''}{' '} */}
						</Text>
					</div>
				</div>
			</ModalBase>
			<ModalBase
				visible={modal.plan}
				onCancel={() => {
					loadDetail()
					setModal({ ...modal, plan: false })
				}}
				onOk={submitUpdatePlan}
				title='?????????????????????'
			>
				???????????? :{` `}
				<Select
					className='w-6/12'
					placeholder=''
					allowClear
					onChange={e => setDataUpdate({ ...dataUpdate, plan: e })}
					value={dataUpdate.plan}
				>
					{plans.map(item => (
						<Option key={item.name} value={item.id}>
							{item.name}
						</Option>
					))}
				</Select>
			</ModalBase>
		</SectionLayoutContent>
	)
}

export default DetailWorkspaceAdmin
