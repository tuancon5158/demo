import { useEffect } from 'react'
import { SectionLayoutContent } from '../../components/common/SectionLayoutContent'
import WorkspaceAdminTable from '../../components/table/WorkspaceAdminTable'
import useMainLayout from '../../hooks/useMainLayout'

function WorkspaceAdmin() {
	const { setLayout } = useMainLayout()

	useEffect(() => {
		setLayout({ title: `ワークスペース申請`, isIcon: false })
	}, [])

	return (
		<SectionLayoutContent showAction titleAction=''>
			<WorkspaceAdminTable />
		</SectionLayoutContent>
	)
}

export default WorkspaceAdmin
