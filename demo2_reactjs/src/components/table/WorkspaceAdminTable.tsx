import { Button, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
import CONSTANTS from '../../constants'
import { IPagination, IResponse } from '../../interfaces/response'
// import { useNotification } from '../../hooks/useNotification'
import {
	IGetResponseWSData,
	IWorkspaceAdminParams,
	workspaceAdminServices,
} from '../../services/workspaceAdmin'
import { formatDateTime } from '../../utils'
import { Paginator } from '../common/Paginator'
import { IWorkspaceAdmin } from '../../interfaces/workspaceAdmin'
import { useNotification } from '../../hooks/useNotification'
import { useQuery } from '../../hooks/useQuery'

function WorkspaceAdminTable() {
	const navigate = useNavigate()
	const { error } = useNotification()
	const [data, setData] = useState<IWorkspaceAdmin[]>([])
	const [loading, setLoading] = useState(false)
	const [searchParams] = useSearchParams()

	const [pagination, setPagination] = useState<IPagination>({
		page: CONSTANTS.PAGE_DEFAULT,
		limit: CONSTANTS.LIMIT_PAGE_DEFAULT,
	})

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: 'ワークスペース名',
			dataIndex: 'name',
		},

		{
			title: 'プラン',
			render: (_: string, record: IWorkspaceAdmin) => (
				<div style={{ minWidth: '200px' }}>{record.planName}</div>
			),
		},
		{
			title: '参加ユーザー数',
			dataIndex: 'account',
		},

		{
			title: 'データ容量',
			dataIndex: 'storage',
		},
		{
			title: '空間数',
			render: (_: string, record: IWorkspaceAdmin) => <div>{record.spaces}</div>,
		},
		{
			title: '利用料金',
			dataIndex: 'invoice',
			render: (_: any, record: IWorkspaceAdmin) => (
				<div>¥{record.invoice.toLocaleString()}</div>
			),
		},

		{
			title: 'オーナー',
			dataIndex: 'userName',
		},
		{
			title: '',
			render: (_: any, record: IWorkspaceAdmin) => (
				<Button
					onClick={() =>
						navigate(`/workspaces-admin/${record.id}`, { replace: true })
					}
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
		getWorkspaceAdmin({ page, limit })
	}

	const getWorkspaceAdmin = async (
		{
			page = CONSTANTS.PAGE_DEFAULT,
			limit = CONSTANTS.LIMIT_PAGE_DEFAULT,
			sort = 'createdAt',
			direction = 'DESC',
			status = '',
		}: IWorkspaceAdminParams,
		isSaveQuery: boolean = true
	) => {
		setLoading(true)
		try {
			const res = (await workspaceAdminServices.getList({
				page,
				limit,
				sort,
				direction,
				status,
			})) as IResponse<IGetResponseWSData<IWorkspaceAdmin>>

			setData(
				res.data.workspaceList.map((item: IWorkspaceAdmin) => ({
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
		} catch (e: any) {
			error(e?.data?.message || 'error')
		}
		setLoading(false)
	}
	const { saveQuery, saveQueryToRouter } = useQuery(getWorkspaceAdmin)

	useEffect(() => {
		const currentParams = Object.fromEntries([...searchParams])
		getWorkspaceAdmin(currentParams)
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
export default WorkspaceAdminTable
