import { EditOutlined } from '@ant-design/icons'
import {
	Button,
	Image,
	InputNumber,
	Select,
	Switch,
	Table,
	Typography,
	TablePaginationConfig,
} from 'antd'
import { FilterValue } from 'antd/lib/table/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CONSTANTS, { publishStatus } from '../../constants'
import {
	IGetResponseData,
	IPagination,
	IResponse,
} from '../../interfaces/response'
import { ISpace, IUserSpaces } from '../../interfaces/space'
import { spaceServices } from '../../services/space'
import { useNotification } from '../../hooks/useNotification'
import { IWorkspaceParams } from '../../services/workspace'
import { formatDateTime } from '../../utils'
import { ModalBase } from '../common/ModalBase'
import { Paginator } from '../common/Paginator'
import { useQuery } from '../../hooks/useQuery'

const { Text } = Typography

const { Option } = Select

function SpaceTable() {
	const navigate = useNavigate()
	const { error, success } = useNotification()

	const [data, setData] = useState<ISpace[]>([])
	const [itemSelected, setItemSelected] = useState<ISpace>({
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
	const [loading, setLoading] = useState(false)
	const [searchParams] = useSearchParams()
	const [pagination, setPagination] = useState<IPagination>({
		page: CONSTANTS.PAGE_DEFAULT,
		limit: CONSTANTS.LIMIT_PAGE_DEFAULT,
	})

	const [modal, setModal] = useState({
		recommend: false,
		status: false,
		key: false,
	})

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: '空間名',
			dataIndex: 'title',
		},
		{
			title: '作成者',
			render: (_: string, record: ISpace) => (
				<div style={{ minWidth: '150px' }}>{record.creator}</div>
			),
		},
		{
			title: 'ワークスペース名',
			dataIndex: 'workspaceSpaceName',
			// width: '150px',
			render: (_: string, record: ISpace) => (
				<div style={{ minWidth: '150px' }}>{record.workspaceSpaceName}</div>
			),
		},
		{
			title: '作成日時',
			dataIndex: 'createdAt',
		},
		{
			title: '更新日時',
			dataIndex: 'updatedAt',
		},
		{
			title: '公開設定',
			render: (_: string, record: ISpace) => (
				<div>
					<Button
						onClick={() => openUpdateStatus(record)}
						type='text'
						icon={<EditOutlined />}
					>
						{publishStatus.find(item => item.value === record.publishedStatus)?.name}{' '}
					</Button>
				</div>
			),
		},
		{
			title: 'サムネイル',
			dataIndex: 'thumbnail',
			render: (_: string, record: ISpace) => (
				<div>
					<Image
						preview={false}
						width={100}
						src={`${process.env.REACT_APP_FRONT_URL}/${record.thumbnailUrl}?w=200`}
						alt=''
					/>
				</div>
			),
		},

		{
			title: '鍵',
			sorter: true,
			dataIndex: 'isKey',
			render: (_: string, record: ISpace) => (
				<span>
					<Switch
						onChange={(value: boolean) => updateKey(value, record)}
						defaultChecked={record.isKey === 1}
					/>
				</span>
			),
		},

		{
			title: 'おすすめ',
			sorter: true,
			dataIndex: 'isRecommended',
			render: (_: string, record: ISpace) => (
				<div>
					<Button
						onClick={() => openUpdateRecommend(record)}
						type='text'
						icon={<EditOutlined />}
					>
						{record?.isRecommended}{' '}
					</Button>
				</div>
			),
		},
		{
			title: '',
			render: (_: string, record: ISpace) => (
				<Button
					onClick={() => navigate(`/space/${record.id}`, { replace: true })}
					type='link'
					icon={<EditOutlined />}
				>
					詳細
				</Button>
			),
		},
	]

	// key
	const updateKey = (value: boolean, record: ISpace) => {
		spaceServices
			.updateKey({
				id: record.id,
				isKey: value ? 1 : 0,
			})
			.then(() => {
				success('更新に成功しました。')
			})
			.catch(e => {
				error(e.data.message || '')
			})
	}
	// Recommend
	const openUpdateRecommend = (record: ISpace) => {
		setItemSelected(record)
		setModal({ ...modal, recommend: true })
	}
	const submitRecommend = () => {
		spaceServices
			.updateRecommend({
				id: itemSelected.id,
				isRecommended: itemSelected.isRecommended,
			})
			.then(() => {
				const currentParams = Object.fromEntries([...searchParams])
				getSpace({ ...currentParams })
				setModal({ ...modal, recommend: false })
				success('更新に成功しました。')
			})
			.catch(e => {
				console.log(e)
				error(e.data.message || '')
			})
	}

	// Status

	const openUpdateStatus = (record: ISpace) => {
		setItemSelected(record)
		setModal({ ...modal, status: true })
	}
	const submitStatus = () => {
		spaceServices
			.updatePublicStatus({
				id: itemSelected.id,
				publishedStatus: itemSelected.publishedStatus,
			})
			.then(() => {
				const currentParams = Object.fromEntries([...searchParams])
				getSpace({ ...currentParams })
				setModal({ ...modal, status: false })
				success('更新に成功しました。')
			})
			.catch(e => {
				error(e.data.message || '')
			})
	}

	const changePage = (page: number, limit: number) => {
		const currentParams = Object.fromEntries([...searchParams])
		setPagination({ page, limit })
		getSpace({ ...currentParams, page, limit })
	}
	// SorterResult<> | SorterResult<any>[]
	const handleTableChange = (
		_pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: any
	) => {
		const currentParams = Object.fromEntries([...searchParams])

		if (sorter?.field) {
			if (sorter?.order) {
				getSpace({
					...currentParams,
					sort: `${sorter?.field}`,
					direction: `${sorter?.order === 'ascend' ? 'ASC' : 'DESC'}`,
				})
			} else {
				getSpace({
					...currentParams,
					sort: 'createdAt',
					direction: 'DESC',
				})
			}
		}
	}
	const getSpace = async (
		{
			page = CONSTANTS.PAGE_DEFAULT,
			limit = CONSTANTS.LIMIT_PAGE_DEFAULT,
			sort = 'createdAt',
			direction = 'DESC',
			status = '',
		}: IWorkspaceParams,
		isSaveQuery: boolean = true
	) => {
		setLoading(true)
		try {
			const res = (await spaceServices.getList({
				page,
				limit,
				sort,
				direction,
				status,
			})) as IResponse<IGetResponseData<ISpace>>

			setData(
				res.data.list.map((item: ISpace) => ({
					...item,
					createdAt: formatDateTime(item.createdAt),
					updatedAt: formatDateTime(item.updatedAt),
					creator: item.userSpaces.find((u: IUserSpaces) => u.roleId === 2)?.user
						.name,
					workspaceSpaceName: item.workspaceSpace
						?.map((w: { workspace: { name: string } }) => w?.workspace.name)
						.join(','),
				}))
			)
			setPagination(res.data.pagination)

			const query: {
				page: string
				limit: string
				status?: string
				direction?: string
				sort?: string
			} = {
				page: `${page}`,
				limit: `${limit}`,
			}
			if (direction) {
				query.direction = `${direction}`
			}
			if (sort) {
				query.sort = `${sort}`
			}
			// if (direction) {
			// 	query.direction = `${status}`
			// }

			saveQueryToRouter(query, isSaveQuery)
		} catch (e) {}
		setLoading(false)
	}

	const { saveQuery, saveQueryToRouter } = useQuery(getSpace)

	useEffect(() => {
		const currentParams = Object.fromEntries([...searchParams])
		// setDefaultFilteredValue(
		// 	Object.fromEntries([...searchParams]).status
		// 		? [parseFloat(Object.fromEntries([...searchParams]).status)]
		// 		: null
		// )

		getSpace(currentParams)
	}, [])

	saveQuery()
	return (
		<>
			<ModalBase
				visible={modal.recommend}
				onCancel={() => setModal({ ...modal, recommend: false })}
				onOk={submitRecommend}
				title='おすすめの値を編集'
				disabledOK={
					itemSelected.isRecommended < 0 ||
					itemSelected.isRecommended > 9999 ||
					itemSelected.isRecommended === null
				}
			>
				おすすめ :{` `}
				<InputNumber
					className='w-6/12'
					onChange={e => setItemSelected({ ...itemSelected, isRecommended: e })}
					min={0}
					type='number'
					value={itemSelected.isRecommended}
				/>
				<div>
					<Text type='danger'>
						{itemSelected.isRecommended < 0 ||
						itemSelected.isRecommended > 9999 ||
						itemSelected.isRecommended === null
							? '0〜9999までの数値で入力してください。'
							: ''}{' '}
					</Text>
				</div>
			</ModalBase>
			<ModalBase
				visible={modal.status}
				onCancel={() => setModal({ ...modal, status: false })}
				onOk={submitStatus}
				title='公開設定を編集'
			>
				公開設定 :{` `}
				<Select
					className='w-6/12'
					placeholder=''
					allowClear
					onChange={e => setItemSelected({ ...itemSelected, publishedStatus: e })}
					value={itemSelected.publishedStatus}
				>
					{publishStatus.map(item => (
						<Option key={item.value} value={item.value}>
							{item.name}
						</Option>
					))}
				</Select>
			</ModalBase>
			<Table
				loading={loading}
				bordered
				columns={columns}
				dataSource={data}
				pagination={false}
				rowKey='id'
				onChange={handleTableChange}
			/>
			{!loading ? (
				<Paginator
					defaultCurrent={pagination.page}
					pageSize={pagination.limit}
					total={pagination.totalRecords || 1}
					onChange={changePage}
				/>
			) : null}
		</>
	)
}
export default SpaceTable
