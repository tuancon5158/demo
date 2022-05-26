import React from 'react'
import CreateNews from '../pages/News/Create'
import UpdateNews from '../pages/News/Update'
import Space from '../pages/Space'
import DetailWorkspace from '../pages/Workspace/Detail'
import WorkspaceAdmin from '../pages/WorkspaceAdmin'
import DetailSpace from '../pages/Space/Detail'
import DetailWorkspaceAdmin from '../pages/WorkspaceAdmin/Detail'

const Login = React.lazy(() => import('../pages/Auth/Login'))
const User = React.lazy(() => import('../pages/User'))
const News = React.lazy(() => import('../pages/News'))
const Workspaces = React.lazy(() => import('../pages/Workspace'))

export interface IRoute {
	Component: any
	path: string
	from?: string
	to?: string
	exact?: boolean
}

export const publicRoutes: IRoute[] = [
	{
		Component: Login,
		exact: true,
		path: '',
	},
]

export const privateRoutes: IRoute[] = [
	{
		Component: User,
		exact: true,
		path: 'users',
	},
	{
		Component: News,
		exact: true,
		path: 'news',
	},
	{
		Component: Workspaces,
		exact: true,
		path: 'workspaces',
	},
	{
		Component: WorkspaceAdmin,
		exact: true,
		path: 'workspaces-admin',
	},
	{
		Component: DetailWorkspaceAdmin,
		exact: true,
		path: 'workspaces-admin/:id',
	},
	{
		Component: Space,
		exact: true,
		path: 'space',
	},
	{
		Component: DetailSpace,
		exact: true,
		path: 'space/:id',
	},
	{
		Component: DetailWorkspace,
		exact: true,
		path: 'workspaces/:id',
	},
	{
		Component: CreateNews,
		exact: true,
		path: 'news/add',
	},
	{
		Component: UpdateNews,
		exact: true,
		path: 'news/:id',
	},
]
