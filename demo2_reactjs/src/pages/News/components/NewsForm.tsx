import {
	Form,
	Input,
	Button,
	DatePicker,
	TimePicker,
	Select,
	Col,
	Row,
} from 'antd'
import Editor from '../../../components/common/Editor'
import { useLanguage } from '../../../hooks'

const { Option } = Select
interface FormValue {
	title: string
	body?: string
	isActive: number
	publishedAt?: string
}
interface PropsNewsForm {
	titleSubmit?: string
	form: any
	initialValues: FormValue
	submit: (values: any) => void
}

function NewsForm({
	titleSubmit,
	form,
	submit,
	initialValues = {
		title: '',
		isActive: 1,
	},
}: PropsNewsForm) {
	const onFinish = (values: any) => {
		submit(values)
	}
	const { t } = useLanguage()
	return (
		<Row className='flex justify-center'>
			<Col span={22}>
				<Form
					onFinish={onFinish}
					layout='vertical'
					form={form}
					initialValues={initialValues}
				>
					<Form.Item
						name='title'
						label='タイトル'
						rules={[{ required: true, message: t('enter_input') }]}
					>
						<Input placeholder='' />
					</Form.Item>
					<Form.Item name='titleEn' label='タイトル (En)'>
						<Input placeholder='' />
					</Form.Item>
					<Form.Item
						name='body'
						label='本文'
						rules={[{ required: true, message: t('enter_input') }]}
					>
						{/* @ts-ignore */}
						<Editor id='1' />
					</Form.Item>
					<Form.Item name='bodyEn' label='本文(En)'>
						{/* @ts-ignore */}
						<Editor id='2' />
					</Form.Item>
					<Form.Item label='公開日:' style={{ marginBottom: 0 }} required>
						{/* {initialValues.publishedAt} */}

						<Form.Item
							name='publishedAt'
							style={{ display: 'inline-block', width: '30%' }}
							rules={[{ required: true, message: t('enter_input') }]}
						>
							<DatePicker format='YYYY/MM/DD' style={{ width: '100%' }} />
						</Form.Item>

						<Form.Item
							name='publishedAt'
							className='!inline-block !pl-3'
							rules={[{ required: true, message: t('enter_input') }]}
						>
							<TimePicker />
						</Form.Item>
					</Form.Item>
					<Form.Item
						name='isActive'
						label='公開設定:'
						style={{ display: 'inline-block', width: '30%' }}
						rules={[{ required: true, message: t('enter_input') }]}
					>
						<Select placeholder='公開'>
							<Option value={0}>非公開</Option>
							<Option value={1}>公開</Option>
						</Select>
					</Form.Item>
					<Form.Item>
						<div className='flex justify-center'>
							<Button ghost type='primary' htmlType='submit'>
								{titleSubmit}
							</Button>
						</div>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	)
}
export default NewsForm
