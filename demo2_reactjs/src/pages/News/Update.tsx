import { Form } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SectionLayoutContent } from '../../components/common/SectionLayoutContent'
import useMainLayout from '../../hooks/useMainLayout'
import { useNews } from '../../hooks/useNews'
import { useNotification } from '../../hooks/useNotification'
import { newsServices } from '../../services/news'
import { cloudFrontServices } from '../../services/cloudFront'
import NewsForm from './components/NewsForm'

function UpdateNews() {
	const { id } = useParams()
	const { getNewsDetail } = useNews()
	const { setLayout } = useMainLayout()

	const [formData, setFormData] = useState<any>({
		title: ``,
		body: ``,
		bodyEn: ``,
		isActive: 1,
		publishedAt: ``,
	})
	const [form] = Form.useForm()
	const { error, success } = useNotification()
	const distributionId = process.env.REACT_APP_DISTRIBUTION_ID || ''

	useEffect(() => {
		setLayout({ title: `ニュース管理`, isIcon: true })
		getNewsDetail(id || '').then((response: any) => {
			setFormData({
				title: response.data.title,
				titleEn: response.data.titleEn,
				body: response.data.body,
				bodyEn: response.data.bodyEn,
				isActive: response.data.isActive,
				publishedAt: moment(response.data.publishedAt),
			})
		})
	}, [])

	const submit = async (values: any) => {
		try {
			await newsServices.update({
				...values,
				id: parseFloat(id || ''),
			})
			// clear /news/_id page cache
			cloudFrontServices.clearCache(distributionId, ['/', `/news/${id}`])

			success('更新しました。')
		} catch (e) {
			error('エラーが発生しました。再度お試しください。')
		}
	}
	return (
		<SectionLayoutContent>
			{formData.title ? (
				<NewsForm
					initialValues={formData}
					submit={submit}
					form={form}
					titleSubmit=' ニュースを保存'
				/>
			) : null}
		</SectionLayoutContent>
	)
}

export default UpdateNews
