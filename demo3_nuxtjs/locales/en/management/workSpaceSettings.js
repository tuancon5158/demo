export default {
  workSpaceSettings: {
    title: 'Workspace settings',
    subtitle: 'Configure the workspace name, description, and other basic settings.',
    form: {
      title1: 'Basic information',
      title2: 'Organization',
      label: {
        workSpaceName: 'Workspace name',
        description: 'Description',
        thumbnailUrl: 'Workspace icon',
        organizationName: 'Organization name ',
        websiteUrl: 'Website URL'
      },
      placeHolder: {
        workSpaceName: 'Insert texts',
        description: 'Insert descriptions',
        organizationName: 'LASTMILE WORKS',
        websiteUrl: 'https://comony.net'
      },
      submitButton: 'Save',
      errorPermission: 'You do not have the permission to change workspace information.'
    },
    deleteForm: {
      heading: 'Delete workspace',
      content:
        'Deleting a workspace will erase all information about the content you have added so far.',
      buttonText: 'Delete workspace',
      dialogue: {
        title: 'Are you sure you want to delete this workspace?',
        deleteButton: 'Delete',
        cancelButton: 'Cancel'
      }
    }
  }
}
