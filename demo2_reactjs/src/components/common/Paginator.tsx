import { Pagination } from 'antd'

type PaginatorProps = {
	total: number
	onChange: (e: number, e1: number) => void
	pageSize: number
	defaultCurrent?: number
}

export function Paginator({
	total = 1,
	onChange,
	pageSize = 10,
	defaultCurrent = 1,
}: PaginatorProps) {
	return (
		<div className='mt-6 flex justify-center pagination-table'>
			<Pagination
				defaultCurrent={defaultCurrent}
				pageSize={pageSize}
				total={total}
				showSizeChanger
				showTotal={number => `Total ${number} items`}
				onChange={onChange}
			/>
		</div>
	)
}
