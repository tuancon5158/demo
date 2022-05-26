import { notification } from 'antd'

export const useNotification = (): { error: Function; success: Function } => {
	const error = (description: string, message = 'Error'): void => {
		notification.error({
			message,
			description,
		})
	}

	const success = (description: string, message = `Success`): void => {
		notification.success({
			message,
			description,
		})
	}

	return { error, success }
}
