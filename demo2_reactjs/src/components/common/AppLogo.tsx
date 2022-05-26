import { Typography } from 'antd'
import { IconComony, IconLogo, IconBase } from '../icons'

const { Text } = Typography

export function AppLogo({ color = '#222' }: { color: string }) {
	return (
		<div className='flex items-center'>
			<div className='flex items-center mr-2'>
				<div className='mr-1'>
					<IconBase color={color} width='23' height='24' viewBox='0, 0, 50, 50'>
						<IconLogo />
					</IconBase>
				</div>
				<IconBase color={color} width='95' height='23' viewBox='0, 0, 197, 31'>
					<IconComony />
				</IconBase>
			</div>
			<Text
				className='text-xs mt-1'
				style={color === '#ffff' ? { color: 'rgb(218 217 217 / 100%)' } : {}}
			>
				管理画面
			</Text>
		</div>
	)
}
