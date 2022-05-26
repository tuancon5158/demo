import { Form } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../hooks'
import { SectionLayoutContent } from '../../components/common/SectionLayoutContent'
import useMainLayout from '../../hooks/useMainLayout'
import { useNotification } from '../../hooks/useNotification'
import { newsServices } from '../../services/news'
import { cloudFrontServices } from '../../services/cloudFront'
import NewsForm from './components/NewsForm'

function CreateNews() {
	const { t } = useLanguage()
	const { setLayout } = useMainLayout()
	const navigate = useNavigate()
	const [form] = Form.useForm()
	const [formData] = useState({
		title: ``,
		body: `<p> </p>`,
		bodyEn: `<p> </p>`,
		isActive: 1,
		publishedAt: ``,
	})
	const { error, success } = useNotification()
	const distributionId = process.env.REACT_APP_DISTRIBUTION_ID || ''

	const submit = async (values: any) => {
		try {
			await newsServices.create({ ...values, type: 1 })
			navigate(`/news`, { replace: true })

			// clear /news/_id page cache
			cloudFrontServices.clearCache(distributionId, ['/'])

			success('登録しました。')
		} catch (e) {
			error(t('error'))
		}
	}
	useEffect(() => {
		setLayout({ title: `ニュース管理`, isIcon: true })
	}, [])
	return (
		<SectionLayoutContent>
			<NewsForm
				initialValues={formData}
				submit={submit}
				form={form}
				titleSubmit='ニュースを新規作成'
			/>
		</SectionLayoutContent>
	)
}

export default CreateNews
