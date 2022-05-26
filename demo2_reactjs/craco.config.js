const path = require('path')

const CracoLessPlugin = require('craco-less')

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: path.join(__dirname, './src/theme/variables.less'),
						javascriptEnabled: true,
					},
				},
			},
		},
	],
}
