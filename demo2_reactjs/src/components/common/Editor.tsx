/* eslint-disable */

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './Editor.scss'
import axios from '../../commons/axios'
import { useNotification } from '../../hooks/useNotification'
import { useEffect, useMemo } from 'react'

interface OnChangeHandler {
	(e: any): void
}

type Props = {
	value: string
	placeholder?: string
	onChange: OnChangeHandler
	id: string
}
let quillObj: any

function Editor({ value, onChange, placeholder, id }: Props) {
	// reference: https://quilljs.com/docs/modules/toolbar/
	const { error } = useNotification()
	const imageHandler = () => {
		const input = document.createElement('input') as any

		input.setAttribute('type', 'file')
		input.setAttribute('accept', 'image/*')
		input.click()
		input.onchange = async () => {
			var file: any = input.files[0]
			var formData = new FormData()

			formData.append('file', file)
			formData.append('type', '')

			await axios
				.post('/file', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				.then(response => {
					const range = quillObj.getEditorSelection()

					if (range) {
						quillObj
							.getEditor()
							.insertEmbed(
								range && range.index ? range.index : 1,
								'image',
								`${process.env.REACT_APP_FRONT_URL}/${response.data.data.key}`
							)
					}
				})
				.catch(() => {
					error('画像の登録に失敗しました')
				})
		}
	}
	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
					[
						{ header: [1, 2, 3, 4, 5, 6] }, // custom heading values
						{ font: [] }, // custom font values
						{ size: ['small', false, 'large', 'huge'] }, // custom font-size values
						'bold',
						'italic',
						'underline',
						'strike',
						'blockquote',
						{ list: 'ordered' },
						{ list: 'bullet' },
						{ color: [] },
						{ background: [] },
						{ align: [] },
						'link',
						'image',
						'video',
						// 'code-block', // input HTML
						'clean',
					],
				],
				handlers: {
					image: imageHandler,
				},
			},
		}),
		[]
	)

	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
		'color',
		'font',
		'size',
		'background',
	]

	return (
		<ReactQuill
			ref={el => {
				quillObj = el
			}}
			placeholder={placeholder}
			theme='snow'
			value={value || ''}
			onChange={onChange}
			modules={modules}
			formats={formats}
			id={id}
		/>
	)
}

export default Editor
