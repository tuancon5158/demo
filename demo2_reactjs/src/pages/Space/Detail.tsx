import {
	Button,
	Col,
	Form,
	InputNumber,
	Row,
	Select,
	Switch,
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
import { spaceServices } from '../../services/space'
// import { cloudFrontServices } from '../../services/cloudFront'
import { IResponse } from '../../interfaces/response'
import { formatDateTime } from '../../utils'
import { ISpace, IUserSpaces, SpaceInstances } from '../../interfaces/space'
import { ModalBase } from '../../components/common/ModalBase'
import { OpenNewTab } from '../../components/common/OpenNewTab'
import { coverType, publishStatus } from '../../constants'

const { Text } = Typography

const { Option } = Select

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 19 },
}

function DetailSpace() {
	const { id } = useParams()
	const { setLayout } = useMainLayout()
	const [modal, setModal] = useState({
		recommend: false,
		status: false,
		key: false,
	})
	const [formData, setFormData] = useState<ISpace>({
		isRecommended: 0,
		numViewers: 0,
		publishedStatus: 0,
		publishedDate: '',
		category: { id: '' },
		content: '',
		id: '',
		createdAt: '',
		updatedAt: '',
		thumbnailUrl: '',
		title: '',
		description: '',
		isKey: 0,
		spaceInstances: [],
		creator: '',
		userSpaces: [
			{
				id: '',
				roleId: 1,
				userId: 1,
				user: {
					name: '',
				},
			},
		],
		workspaceSpace: [{ workspace: { name: '' } }],
	})
	const [isLoading, setIsLoading] = useState(false)

	const { error, success } = useNotification()
	// const distributionId = process.env.REACT_APP_DISTRIBUTION_ID || ''

	useEffect(() => {
		loadDetail()
	}, [])

	const loadDetail = async () => {
		setIsLoading(true)
		await spaceServices
			.getDetail(id || '')
			.then((response: IResponse<ISpace>) => {
				const formDefault = response.data as ISpace

				setFormData({
					...formDefault,
					spaceInstances: response.data.spaceInstances.map(
						(item: SpaceInstances) => ({
							...item,
							createdAt: formatDateTime(item.createdAt),
							expiredAt: formatDateTime(item.expiredAt),
						})
					),
					creator: response.data.userSpaces?.find((u: IUserSpaces) => u.roleId === 2)
						?.user.name,
					workspaceSpaceName: response.data?.workspaceSpace
						?.map((w: { workspace: { name: string } }) => w?.workspace?.name)
						.join(','),
				})

				setLayout({ title: `???????????? ???${response.data.title}???`, isIcon: true })
			})
		setIsLoading(false)
	}
	// key
	const updateKey = (value: boolean) => {
		spaceServices
			.updateKey({
				id: formData.id,
				isKey: value ? 1 : 0,
			})
			.then(() => {
				success('??????????????????????????????')
			})
			.catch(e => {
				error(e.data.message || '')
			})
	}
	// Recommend
	const openUpdateRecommend = () => {
		setModal({ ...modal, recommend: true })
	}
	const submitRecommend = () => {
		spaceServices
			.updateRecommend({
				id: formData.id,
				isRecommended: formData.isRecommended,
			})
			.then(() => {
				setModal({ ...modal, recommend: false })
				success('??????????????????????????????')
			})
			.catch(e => {
				error(e.data.message || '')
			})
	}

	// Status

	const openUpdateStatus = () => {
		setModal({ ...modal, status: true })
	}
	const submitStatus = () => {
		spaceServices
			.updatePublicStatus({
				id: formData.id,
				publishedStatus: formData.publishedStatus,
			})
			.then(() => {
				setModal({ ...modal, status: false })
				success('??????????????????????????????')
			})
			.catch(e => {
				error(e.data.message || '')
			})
	}
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: '?????????',
			dataIndex: 'createdAt',
		},
		{
			title: '??????',
			dataIndex: 'expiredAt',
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
								<Form.Item label='???????????????'>
									<OpenNewTab
										value={`${process.env.REACT_APP_FRONT_URL}/${formData.thumbnailUrl}`}
									/>
								</Form.Item>
								<Form.Item label='?????????'>
									<Form.Item label=''>
										{coverType.find(item => item.value === formData.coverType)?.name}
									</Form.Item>
									<Form.Item label=''>
										<OpenNewTab
											value={`${process.env.REACT_APP_FRONT_URL}/${formData.coverDataValue}`}
										/>
									</Form.Item>
								</Form.Item>
								<Form.Item label='?????????'>
									{formData.title ? formData.title : '-'}
								</Form.Item>
								<Form.Item label='????????????'>
									{formData.category?.name ? formData.category.name : '-'}
								</Form.Item>
								<Form.Item label='?????????'>
									<div> {parse(formData.description ? formData.description : '-')} </div>
								</Form.Item>
								<Form.Item label='??????'>
									{formData.tags
										? formData.tags.map((item: { name: string }) => item.name).join(',')
										: '-'}
								</Form.Item>
								<Form.Item label='????????????'>
									<Button type='text' icon={<EditOutlined />} onClick={openUpdateStatus}>
										{
											publishStatus.find(item => item.value === formData.publishedStatus)
												?.name
										}{' '}
									</Button>
								</Form.Item>
								<Form.Item label='?????????'>
									<Switch
										onChange={(value: boolean) => updateKey(value)}
										defaultChecked={formData.isKey === 1}
									/>
								</Form.Item>
								<Form.Item label='????????????'>
									<Button
										type='text'
										icon={<EditOutlined />}
										onClick={openUpdateRecommend}
									>
										{formData?.isRecommended}{' '}
									</Button>
								</Form.Item>
							</div>
							<div className='my-10'>
								<Form.Item className='font-black' colon={false} label='????????????' />
								<Form.Item label='?????????'>
									{formData.creator ? formData.creator : '-'}
								</Form.Item>

								<Form.Item label='?????????????????????'>
									{formData?.workspaceSpaceName ? formData?.workspaceSpaceName : '-'}
								</Form.Item>
								<Form.Item label='????????????'>
									{formatDateTime(formData.createdAt)}
								</Form.Item>
								<Form.Item label='????????????'>
									{formatDateTime(formData.updatedAt)}
								</Form.Item>
								<Form.Item label='?????????'>{formData.numViewers}</Form.Item>
								<Form.Item label='??????????????????'>{formData?.numFavorites}</Form.Item>
							</div>

							<div className='my-10'>
								<Form.Item
									className='font-black'
									colon={false}
									label='??????????????????????????????'
								/>

								<Form.Item label='' style={{ display: 'inline-block', width: '50%' }}>
									<Table
										style={{ maxHeight: '600px' }}
										bordered
										columns={columns}
										dataSource={formData.spaceInstances}
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
				visible={modal.recommend}
				onCancel={() => {
					loadDetail()

					setModal({ ...modal, recommend: false })
				}}
				onOk={submitRecommend}
				title='???????????????????????????'
				disabledOK={
					formData.isRecommended < 0 ||
					formData.isRecommended > 9999 ||
					formData.isRecommended === null
				}
			>
				???????????? :{` `}
				<InputNumber
					className='w-6/12'
					onChange={e => setFormData({ ...formData, isRecommended: e })}
					min={0}
					type='number'
					value={formData.isRecommended}
				/>
				<div>
					<Text type='danger'>
						{formData.isRecommended < 0 ||
						formData.isRecommended > 9999 ||
						formData.isRecommended === null
							? '0???9999?????????????????????????????????????????????'
							: ''}{' '}
					</Text>
				</div>
			</ModalBase>
			<ModalBase
				visible={modal.status}
				onCancel={() => {
					loadDetail()
					setModal({ ...modal, status: false })
				}}
				onOk={submitStatus}
				title='?????????????????????'
			>
				???????????? :{` `}
				<Select
					className='w-6/12'
					placeholder=''
					allowClear
					onChange={e => setFormData({ ...formData, publishedStatus: e })}
					value={formData.publishedStatus}
				>
					{publishStatus.map(item => (
						<Option key={item.name} value={item.value}>
							{item.name}
						</Option>
					))}
				</Select>
			</ModalBase>
		</SectionLayoutContent>
	)
}

export default DetailSpace
