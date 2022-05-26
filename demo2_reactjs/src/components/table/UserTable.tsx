/* eslint-disable */
import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { userServices } from '../../services/user'
import { formatDateTime } from '../../utils'
import { Paginator } from '../common/Paginator'
import CONSTANTS from '../../constants'
import { IPagination, IParams } from '../../interfaces/response'
import { useQuery } from '../../hooks/useQuery'

function UserTable({ childFunc }: any) {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [searchParams] = useSearchParams()

	const [pagination, setPagination] = useState<IPagination>({
		page: CONSTANTS.PAGE_DEFAULT,
		limit: CONSTANTS.LIMIT_PAGE_DEFAULT,
	})

	const columns = [
		{
			title: 'ユーザーID',
			dataIndex: 'id',
		},
		{
			title: '名前',
			dataIndex: 'name',
		},
		{
			title: 'メールアドレス',
			dataIndex: 'email',
		},
		{
			title: 'comony登録日',
			dataIndex: 'createdAt',
			render: (_: any, record: any) => (
				<div>{formatDateTime(record.createdAt)}</div>
			),
		},
	]

	const changePage = (page: number, limit: number) => {
		setPagination({ page, limit })
		getUser({ page, limit })
	}

	const getUser = async (
		{
			page = CONSTANTS.PAGE_DEFAULT,
			limit = CONSTANTS.LIMIT_PAGE_DEFAULT,
			direction = `DESC`,
		}: IParams,
		isSaveQuery: boolean = true
	) => {
		try {
			setLoading(true)
			const res = (await userServices.getList({
				page,
				limit,
				direction,
			})) as any

			setData(res.data.userList)
			setPagination(res.data.pagination)

			const query: {
				page: string
				limit: string
			} = {
				page: `${page}`,
				limit: `${limit}`,
			}
			saveQueryToRouter(query, isSaveQuery)
		} catch (error) {}
		setLoading(false)
	}

	useEffect(() => {
		childFunc.current = getUser
	}, [])

	useEffect(() => {
		const currentParams = Object.fromEntries([...searchParams])
		getUser(currentParams)
	}, [])
	const { saveQuery, saveQueryToRouter } = useQuery(getUser)

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
export default UserTable
