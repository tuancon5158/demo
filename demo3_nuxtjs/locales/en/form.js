// register page
// mypage page
// contact page
export default {
  form: {
    label: {
      email: 'Email',
      password: 'Password',
      passwordConfirm: 'Password (Confirmation)',
      newPassword: 'New Password',
      newPasswordConfirm: 'New Password（Confirmation）',
      name: 'Account Name',
      username: 'Account Name',
      mailAddress: 'Mail Address',
      phoneNumber: 'Phone Number',
      companyName: 'Company Name',
      department: 'Department',
      inquiryDetaill: 'Inquiry detail',
      inquiryDetailsOptions: {
        aboutServiceUsage: 'About service usage（Demo version）',
        documentRequest: 'Document request / Counseling-related consultation',
        other: 'Other'
      },
      contactDetails: 'Contact details',
      confirmCode: 'Authorization code',
      required: 'Required'
    },
    placeHolder: {
      name: 'Ex.Taro Yamada',
      username: 'YamadaTaro_123',
      email: 'lastmile@comony.net',
      phone: '09012345678',
      department: 'Marketing',
      inquiry: 'Inquiry detail',
      detail: 'Please fill in the form',
      company: 'LASTMILE WORKS Co., Ltd.',
      companyUrl: 'https://comony.net/',
      contactUrl: 'https://comony.net/contact',
      facebookUrl: 'https://facebook.com/comony_JP',
      twitterUrl: 'https://twitter.com/comony_JP'
    },
    successMessage: {
      updated: 'Updated successfully',
      title: 'Aplication is completed',
      description: 'Your application for issuing a new space has been completed.',
      subDescription: 'Please wait for an email from comony support team.',
      createdWorkspce: 'Updated successfully. A new workspace has been registered.',
      applyWorkspce:
        'We got your request of space upload authority successfully.<br />Please wait a while until approval is granted.',
      emailChanged: 'Email has beed changed. Please sign-in again.',
      deleted: 'Deleted successfully',
      inviteMember: {
        alreadyRegistered: 'The user you invited is already registered.',
        invited: 'users have been invited successfully.'
      }
    },
    errorMessage: {
      updated: 'Please try again',
      resendVerifyEmail:
        'The registration process has not been completed. We have sent you an email for this registration.',
      expiredVerifyCode:
        'The authentication email has expired. We re-sended this registration email',
      limitExceeded: 'Attempt limit exceeded, please try after some time.',
      userNotFoundException: 'The email address you entered is not registered or unauthorized.',
      notAuthorizedException: 'Your password was incorrect.',
      alreadyExistEmail: 'Email is already exists',
      forceLoginToApp: 'please sign-in to comony to use the application.',
      forceLogin: 'please sign-in to comony.',
      unFilledFormInput: 'There is an error in the input content',
      normal: 'An unexpected error has occurred. Please try again',
      badRequest: 'There is an error in your input.',
      alert: 'Please check and fill fields',
      name: 'Name is required',
      nameLimit: 'Name must be shorter than or equal to 255 characters',
      url: 'URL is not in the correct format',
      urlLimit: 'Url must be shorter than or equal to 255 characters',
      usersCount: 'UsersCount is required',
      usersCountNumber: 'Please enter a number only.',
      usersCountMaxNumber: 'Please enter less than 1000 people.',
      reason: 'Reason is required',
      email: 'Email is required',
      title: 'Title is required',
      password: 'Password is required',
      username: 'Account Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email',
      emailUnconfirm: 'Please confirm all email addresses that you entered',
      emailConfirm: 'Email does not match',
      emailLimit: 'This limits the total number of registration is 20',
      emailDuplicated: 'This email has already been added',
      phoneRequired: 'Phone is required',
      phoneInvalid: 'Invalid phone number (9-11 digits or symbol)',
      company: 'Company is required',
      companyLimit: 'name must be shorter than or equal to 255 characters',
      department: 'Department is required',
      optionRadio: 'Inquiry content is required',
      contactDetails: 'Detail is required',
      detail: 'Detail is required',
      passwordInvalid: 'Please enter a password of at least 8 characters include number',
      passwordConfirm: 'Password does not match',
      confirmCode: 'Authorization code is required',
      fileSize: {
        line1: 'The file size is too large.',
        line2: 'Please upload a file that is less than 1MB.'
      },
      fileType: 'The extension of the file that is not supported.',
      biography: 'Biography is required',
      facebook: 'Facebook is required',
      twitter: 'Twitter is required',
      workSpaceName: 'Work Space Name is required',
      description: 'Description is required',
      workSpaceIcon: 'Work Space Icon is required',
      organizationName: 'Organization Name is required',
      websiteUrl: 'Site Url is required',
      inquiryForm: 'Inquiry Form is required',
      userIsNotFound: 'There are no users in the workspace you selected.',
      introductionLimit: 'Introduction must be shorter than or equal to 255 characters',
      space: {
        unPermission: 'You do not have permission to register / change spaces.',
        common: {
          notFound:
            'Space is not found. If you have any questions, please contact your administrator.'
        }
      },
      common: {
        error: 'System error.',
        notFound: 'Not found. If you have any questions, please contact your administrator.',
        notFoundResource:
          '{resource} is not found. If you have any questions, please contact your administrator.',
        notPermission: "Don't have permission.",
        isExists: 'Already exists.',
        changed: 'Already change.',
        approved: 'Already approved'
      },
      workspaceUser: {
        isLimit: {
          text1: 'The maximum number of accounts that can be invited is',
          text2: '. You have exceeded the limit by',
          text3: 'user.',
          common: {
            notFound:
              'Space is not found. If you have any questions, please contact your administrator.'
          }
        },
        notToOwner: 'Cannot change role to owner.',
        notOwnerPermission: "You don't have Owner permission.",
        needAdminHigher: "It's requires admin or higher privileges.",
        notChangeHigher: 'You do not have permission to make changes.',
        notChangeOwner: 'Cannot change owner role.'
      },
      workspaceSpaces: {
        notVolume: 'workspace not enough data volume.'
      },
      spaceInstance: {
        notFound: 'spaceInstance not found.',
        isExpired: 'instanceId is Expired.'
      },
      user: {
        notMine: 'This user is not mine.',
        notFound: 'user not found.'
      }
    },
    button: {
      back: 'Back Input Form',
      send: 'Send',
      save: 'Save'
    }
  },
  formContact: {
    language: 'en',
    inquiryFormHeading: 'Job Request・Inquiry Form',
    inquiryFormSubHeading: 'We will contact you back within 3 business days.',
    inquiryResponse: {
      heading: 'Job Request・Inquiry Form',
      subHeading: 'Thank you for your contacting us.'
    },
    options: {
      individual: 'Individual',
      corporation: 'Corporation'
    },
    stepper: {
      step1: 'INPUT',
      step2: 'CONFIRM',
      step3: 'COMPLETE'
    },
    content: {
      label: 'What can I help you ?',
      heading: 'Contact'
    },
    label: {
      option: 'Corporation/Individual',
      name: 'Name',
      mailAddress: 'Mail Address',
      phoneNumber: 'Phone Number',
      companyName: 'Company Name',
      department: 'Department',
      companyNameAndDepartment: 'Company name or department name',
      inquiryDetaill: 'Inquiry detail',
      inquiryDetailsOptions: {
        aboutServiceUsage: 'About service usage（Demo version）',
        documentRequest: 'Document request / Counseling-related consultation',
        other: ' Other',
        aboutContractDetail: 'About contract detail'
      },
      contactDetails: 'Contact details'
    },
    placeHolder: {
      name: 'Ex. Taro Yamada',
      email: 'info@lastmile-worls.com',
      phone: '09012345678',
      companyName: 'LASTMILE WORKS Co., Ltd.',
      department: 'Marketing',
      inquiry: 'Inquiry detail',
      detail: 'Please fill in the form.'
    },
    message: {
      policy: 'If you agree to our privacy policy, please click the confirm button below.',
      success: 'Thank you for your inquiry.<br/>We will get in touch with you again shortly'
    },
    buttonMsg: {
      confirm: 'Agree and Confirm the entered infomation',
      back: 'Return to input page',
      send: 'Send'
    },
    link: {
      backToMenu: 'Back To Top Page',
      policy: '「 Privacy Policy 」'
    },
    notice: 'There are missing required fields or input has errors.',
    note: '*It is a required field'
  },
  addressBar: {
    japanTitle: 'Tokyo Development Office',
    japanAddress: 'Shinkawa ST Building 2F, 1-25-2 Shinkawa, Chuo-ku, Tokyo (Future Tech Hub)',
    cambodiaTitle: 'Cambodia Development Office',
    vietnamTitle: 'Vietnam Development Office'
  },
  notification: {
    return: 'return'
  },
  fixedRequest: {
    contactDetailsRadioOptions: 'Inquiry from Service Page'
  }
}
