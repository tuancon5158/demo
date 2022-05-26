import { Button, Table, TablePaginationConfig } from 'antd'
import { FilterValue } from 'antd/lib/table/interface'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
import CONSTANTS, { StatusWorkspace } from '../../constants'
import {
	IGetResponseData,
	IPagination,
	IResponse,
} from '../../interfaces/response'
import { IWorkspace } from '../../interfaces/workspace'
// import { useNotification } from '../../hooks/useNotification'
import { IWorkspaceParams, workspaceServices } from '../../services/workspace'
import { formatDateTime } from '../../utils'
import { Paginator } from '../common/Paginator'
import { useQuery } from '../../hooks/useQuery'

function WorkspaceTable() {
	const navigate = useNavigate()
	// const { error, success } = useNotification()
	const [data, setData] = useState<IWorkspace[]>([])
	const [loading, setLoading] = useState(false)
	const [searchParams] = useSearchParams()
	const [defaultFilteredValue, setDefaultFilteredValue] = useState<any>(null)
	const [pagination, setPagination] = useState<IPagination>({
		page: CONSTANTS.PAGE_DEFAULT,
		limit: CONSTANTS.LIMIT_PAGE_DEFAULT,
	})

	const columns = [
		{
			title: '申請状況',
			render: (_: any, record: IWorkspace) => (
				<div>
					{record.status === StatusWorkspace.Backlog ? (
						<span className='text-rose-400'>未対応</span>
					) : (
						<span className='opacity-50'>対応済</span>
					)}
				</div>
			),
			filters: [
				{
					text: <span>未対応</span>,
					value: StatusWorkspace.Backlog,
				},
				{
					text: <span>対応済</span>,
					value: StatusWorkspace.Closed,
				},
			],
			filteredValue: defaultFilteredValue,
			filterSearch: false,
		},
		{
			title: '申請者',
			dataIndex: 'name',
		},

		{
			title: '申請種別',
			dataIndex: 'content',
		},
		{
			title: '申請日時',
			render: (_: any, record: IWorkspace) => (
				<div>{formatDateTime(record.createdAt)}</div>
			),
		},
		{
			title: '対応者',
			render: (_: any, record: IWorkspace) => (
				<span>{record?.staff?.name ? record?.staff?.name : '-'}</span>
			),
		},
		{
			title: '',
			render: (_: any, record: IWorkspace) => (
				<Button
					onClick={() => navigate(`/workspaces/${record.id}`, { replace: true })}
					type='link'
					icon={<EditOutlined />}
				>
					編集
				</Button>
			),
		},
	]

	const changePage = (page: number, limit: number) => {
		setPagination({ page, limit })
		getWorkspace({ page, limit })
	}

	const handleTableChange = (
		_pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>
	) => {
		const currentParams = Object.fromEntries([...searchParams])
		setDefaultFilteredValue(filters && filters[`0`] ? filters[`0`] : null)
		getWorkspace({
			...currentParams,
			status: filters && filters[`0`]?.length === 1 ? filters[`0`].join(`,`) : '',
		})
	}
	const getWorkspace = async (
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
			const res = (await workspaceServices.getList({
				page,
				limit,
				sort,
				direction,
				status,
			})) as IResponse<IGetResponseData<IWorkspace>>

			setData(
				res.data.list.map((item: IWorkspace) => ({
					...item,
					createdAt: formatDateTime(item.createdAt),
				}))
			)
			setPagination(res.data.pagination)

			const query: { page: string; limit: string; status?: string } = {
				page: `${page}`,
				limit: `${limit}`,
			}
			if (status) {
				query.status = `${status}`
			}
			saveQueryToRouter(query, isSaveQuery)
		} catch (e) {}
		setLoading(false)
	}

	const { saveQuery, saveQueryToRouter } = useQuery(getWorkspace)

	useEffect(() => {
		const currentParams = Object.fromEntries([...searchParams])
		setDefaultFilteredValue(
			Object.fromEntries([...searchParams]).status
				? [parseFloat(Object.fromEntries([...searchParams]).status)]
				: null
		)

		getWorkspace(currentParams)
	}, [])

	saveQuery()

	return (
		<>
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
export default WorkspaceTable
