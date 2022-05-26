export default {
  workSpaceApply: {
    title: 'Apply for a new workspace',
    subtitle: 'Apply to the comony support team for the issuance of new space.',
    iconTitle: 'Back',
    form: {
      title1: 'Applicant Information',
      title2: 'Aplication detail',
      label: {
        name: 'Applicant name',
        email: 'Email adress',
        company: 'Company',
        website: 'Website URL',
        numberOfUser: 'Number of user',
        reason: 'Reason for the application'
      },
      placeHolder: {
        name: 'Insert name',
        email: 'Insert email',
        company: 'Insert company name',
        website: 'https://comony.net',
        numberOfUser: 'Insert a potential capacity of users in a workspace',
        reason: 'Insert texts'
      },
      exitButton: 'Discard and Exit',
      submitButton: 'Submit',
      errorPermission: 'You do not have the permission to apply workspace.'
    },
    dialogue: {
      title: 'Would you like to close the space issuance application',
      backButton: 'Discard and Exit',
      confirmButton: 'Cancel'
    }
  }
}
