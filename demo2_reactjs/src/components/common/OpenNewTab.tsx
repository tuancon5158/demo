type OpenNewTabProps = {
	value: string
}

export function OpenNewTab({ value }: OpenNewTabProps) {
	return (
		<a target='_blank' rel='noopener noreferrer' href={value}>
			{value}
		</a>
	)
}
