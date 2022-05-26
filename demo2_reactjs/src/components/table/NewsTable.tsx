import { Button, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CONSTANTS from '../../constants'
import { useNotification } from '../../hooks/useNotification'
import { newsServices } from '../../services/news'
import { formatDateTime } from '../../utils'
import { Paginator } from '../common/Paginator'
import { PopconfirmBase } from '../common/PopconfirmBase'
import { useQuery } from '../../hooks/useQuery'
import { IPagination, IParams } from '../../interfaces/response'

function NewsTable() {
	const navigate = useNavigate()
	const { error, success } = useNotification()
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [searchParams] = useSearchParams()

	const [pagination, setPagination] = useState<IPagination>({
		page: CONSTANTS.PAGE_DEFAULT,
		limit: CONSTANTS.LIMIT_PAGE_DEFAULT,
	})

	const onConfirmDelete = async (record: any) => {
		try {
			await newsServices.remove(record.id)
			success(``)
			await getNews({
				page: pagination.page,
				limit: pagination.limit,
			})
		} catch (e) {
			error(``)
		}
	}

	const columns = [
		{
			title: '公開設定',
			dataIndex: 'isActive',
			render: (_: any, record: any) => (
				<div>{record.isActive === 1 ? '公開' : '非公開'}</div>
			),
		},
		{
			title: 'タイトル',
			dataIndex: 'title',
			width: '50%',
		},
		{
			title: '公開日時',
			dataIndex: 'publishedAt',
		},
		{
			title: '作成日',
			dataIndex: 'createdAt',
		},
		{
			title: '',

			render: (_: any, record: any) => (
				<div>
					<Button
						onClick={() => navigate(`/news/${record.id}`, { replace: true })}
						type='link'
						icon={<EditOutlined />}
					>
						編集
					</Button>
					<PopconfirmBase
						text='本当に削除しますか？'
						onConfirm={() => onConfirmDelete(record)}
					>
						<Button type='link' danger icon={<DeleteOutlined />}>
							削除
						</Button>
					</PopconfirmBase>
				</div>
			),
		},
	]

	const changePage = (page: number, limit: number) => {
		setPagination({ page, limit })
		getNews({ page, limit })
	}

	const getNews = async (
		{
			page = CONSTANTS.PAGE_DEFAULT,
			limit = CONSTANTS.LIMIT_PAGE_DEFAULT,
			sort = 'publishedAt',
			direction = 'DESC',
		}: IParams,
		isSaveQuery: boolean = true
	) => {
		setLoading(true)
		try {
			const res = (await newsServices.getList({
				page,
				limit,
				sort,
				direction,
			})) as any
			setData(
				res.data.list.map((item: any) => ({
					...item,
					createdAt: formatDateTime(item.createdAt),
					publishedAt: formatDateTime(item.publishedAt),
				}))
			)
			setPagination(res.data.pagination)
			const query: {
				page: string
				limit: string
			} = {
				page: `${page}`,
				limit: `${limit}`,
			}
			saveQueryToRouter(query, isSaveQuery)
		} catch (e) {}
		setLoading(false)
	}
	useEffect(() => {
		const currentParams = Object.fromEntries([...searchParams])
		getNews(currentParams)
	}, [])
	const { saveQuery, saveQueryToRouter } = useQuery(getNews)

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
export default NewsTable
