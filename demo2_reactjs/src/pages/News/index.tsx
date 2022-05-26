import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionLayoutContent } from '../../components/common/SectionLayoutContent'
import NewsTable from '../../components/table/NewsTable'
import useMainLayout from '../../hooks/useMainLayout'

function News() {
	const navigate = useNavigate()
	const { setLayout } = useMainLayout()

	const handleAction = () => {
		navigate(`/news/add`, { replace: true })
	}

	useEffect(() => {
		setLayout({ title: `ニュース管理`, isIcon: false })
	}, [])

	return (
		<SectionLayoutContent
			handleAction={handleAction}
			showAction
			titleAction='ニュースを新規作成'
		>
			<NewsTable />
		</SectionLayoutContent>
	)
}

export default News
