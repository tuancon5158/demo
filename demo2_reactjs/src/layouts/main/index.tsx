import React, { useEffect, useState } from 'react'
import {
	Navigate,
	NavLink,
	Outlet,
	useLocation,
	useNavigate,
} from 'react-router-dom'
import { Button, Dropdown, Layout, Menu } from 'antd'
import { SettingOutlined, ReadOutlined, DownOutlined } from '@ant-design/icons'
import SubMenu from 'antd/lib/menu/SubMenu'
import { authServices } from '../../services/auth'
import './index.scss'
import useAuth from '../../hooks/useAuth'
import { AppLogo } from '../../components/common/AppLogo'
import { useLanguage } from '../../hooks'
import eventBus from '../../commons/EventBus'
import { useGetAccount } from '../../hooks/useGetAccount'
import key from '../../commons/key'
import { MainProvider } from '../../context/MainProvider'
import HeaderCustom from '../../components/common/layout/Header'

const { Sider, Content } = Layout

export function MainLayout() {
	const { auth } = useAuth()
	const { t } = useLanguage()

	const [defaultOpenKeys] = useState(['sub1', `sub2`])
	const jwt = localStorage.getItem('jwt')
	const navigate = useNavigate()
	const location = useLocation()
	const [defaultSelectedKeys] = useState([location.pathname])
	const { fetchUser } = useGetAccount()
	const [theme] = useState<`light` | `dark`>(`dark`)
	const [collapsed, setCollapsed] = useState(false)

	const handleMenuClick = async () => {
		try {
			localStorage.removeItem(key.TOKEN)
			await authServices.logout()
			navigate(`/`, { replace: true })
		} catch (error) {}
	}

	const menu = (
		<Menu onClick={() => handleMenuClick()}>
			<Menu.Item key='1'>ログアウト</Menu.Item>
		</Menu>
	)

	useEffect(() => {
		if (localStorage.getItem(key.TOKEN)) {
			fetchUser()
		}
	}, [])

	useEffect(() => {
		localStorage.removeItem(key.TO_PATH)
		if (!auth && !jwt && location.pathname !== '/') {
			localStorage.setItem(key.TO_PATH, `${location.pathname}${location.search}`)
		}
		eventBus.on('logout', () => {
			navigate(`/`, { replace: true })
		})
		return () => {
			eventBus.remove('logout')
		}
	}, [])

	return auth || jwt ? (
		<MainProvider>
			<Layout className='main-layout'>
				<Sider
					theme={theme}
					width='272'
					onCollapse={() => setCollapsed(!collapsed)}
					collapsible
					collapsed={collapsed}
				>
					{!collapsed ? (
						<div className='logo flex'>
							<AppLogo color={theme === 'light' ? `#222` : `#ffff`} />
						</div>
					) : null}
					<Menu
						theme={theme}
						mode='inline'
						defaultOpenKeys={defaultOpenKeys}
						defaultSelectedKeys={defaultSelectedKeys}
					>
						{/* <div className='p-1 mt-8'> */}
						<SubMenu
							key='sub1'
							icon={<ReadOutlined />}
							title={t(`contents_management`)}
						>
							<Menu.Item key='/news'>
								<NavLink to='/news'>{t(`news_management`)}</NavLink>
							</Menu.Item>
							<Menu.Item key='/workspaces'>
								<NavLink to='/workspaces'>{t(`ワークスペース申請`)}</NavLink>
							</Menu.Item>
							<Menu.Item key='/space'>
								<NavLink to='/space'>{t(`空間管理`)}</NavLink>
							</Menu.Item>
							<Menu.Item key='/workspaces-admin'>
								<NavLink to='/workspaces-admin'>{t(`ワークスペース管理`)}</NavLink>
							</Menu.Item>
						</SubMenu>
						<SubMenu key='sub2' icon={<SettingOutlined />} title={t(`basic_setting`)}>
							<Menu.Item key='/users'>
								<NavLink to='/users'>{t(`admin_users`)}</NavLink>
							</Menu.Item>
						</SubMenu>
						{/* </div> */}
					</Menu>
				</Sider>
				<Layout className='site-layout'>
					<HeaderCustom>
						<Dropdown overlay={menu}>
							<Button type='primary'>
								{auth?.name} <DownOutlined />
							</Button>
						</Dropdown>
					</HeaderCustom>

					<Content
						className='site-layout-background'
						style={{
							margin: '24px 16px',
							padding: 24,
							overflow: 'auto',
						}}
					>
						{/* {theme} */}
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</MainProvider>
	) : (
		<Navigate to='/' />
	)
}
