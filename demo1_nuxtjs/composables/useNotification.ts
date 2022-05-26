import { notification } from 'ant-design-vue'

export const useNotification = () => {
  const error = (description: string, message = 'Lỗi') => {
    notification.error({
      message,
      description,
    })
  }

  const success = (description: string, message = 'Thành công') => {
    notification.success({
      message,
      description,
    })
  }

  return { error, success }
}
