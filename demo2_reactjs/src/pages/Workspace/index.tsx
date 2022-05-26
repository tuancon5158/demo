import { useEffect } from 'react'
import { SectionLayoutContent } from '../../components/common/SectionLayoutContent'
import WorkspaceTable from '../../components/table/WorkspaceTable'
import useMainLayout from '../../hooks/useMainLayout'

function Workspace() {
	const { setLayout } = useMainLayout()

	useEffect(() => {
		setLayout({ title: `ワークスペース申請`, isIcon: false })
	}, [])

	return (
		<SectionLayoutContent showAction titleAction=''>
			<WorkspaceTable />
		</SectionLayoutContent>
	)
}

export default Workspace
