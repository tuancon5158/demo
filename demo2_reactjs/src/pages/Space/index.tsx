import { useEffect } from 'react'
import { SectionLayoutContent } from '../../components/common/SectionLayoutContent'
import SpaceTable from '../../components/table/SpaceTable'
import useMainLayout from '../../hooks/useMainLayout'

function Space() {
	const { setLayout } = useMainLayout()

	useEffect(() => {
		setLayout({ title: `空間管理`, isIcon: false })
	}, [])

	return (
		<SectionLayoutContent showAction titleAction=''>
			<SpaceTable />
		</SectionLayoutContent>
	)
}

export default Space
