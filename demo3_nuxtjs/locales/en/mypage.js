// mypage page
export default {
  mypage: {
    uploadImage: {
      title: 'Drag and drop Files Here to Upload',
      titleLoading: 'Uploading file...',
      type: 'JPG,PNG,GIF',
      maxSize: 'Max Size: ',
      minBreadth: 'Max Size: ',
      button: 'Change File',
      button2: 'Delete File'
    },
    profile: {
      pageTitle: 'Edit Profile',
      heading: 'Edit Profile',
      subtitle: 'Basic Information',
      link: 'Public Profile',
      form: {
        thumbLabel: 'Profile Image',
        nameLabel: 'Account Name',
        biography: 'Biography',
        title2: 'Company Information',
        companyLabel: 'Company Name',
        companySubtext: '※ appear below the account name',
        companyUrlLabel: 'Company Website URL',
        contactUrlLabel: 'Contact Page URL',
        sns: 'sns',
        facebookContact: 'facebookURL',
        twitterContact: 'twitter URL'
      },
      button: 'Save Profile'
    },
    avatar: {
      pageTitle: 'Avatar Settings',
      heading: 'Avatar Settings',
      subtitle: 'Character settings used in the space.',
      button: 'Save your changes'
    },
    editSpace: {
      heading: 'My Spacial Gallery / Edit',
      heading1: 'Edit spacial',
      button: 'Register Spacial Data',
      table: {
        row1: 'No.',
        row2: 'Thumbnail',
        row3: 'Title',
        row4: 'Public Status'
      },
      contents: {
        row1: 'Model listing',
        row2: 'Edit',
        row3: 'Delete'
      },
      closeButton: 'Close',
      saveButton: 'Save',
      delete: {
        heading: 'Delete your spacial data',
        reconfirm: 'Are you sure you want to delete your spacial data?',
        deleteButton: 'Delete',
        failed: 'Failed to delete.'
      }
    },
    howto: {
      heading: 'Upload your spacial datas',
      subtitle1: 'You can upload your own spatial data using the comony-specific SDK.',
      subtitle2:
        "If this is your first time using the SDK, please refer to the comony SDK user's manual.",
      doc1: 'Instructions for Use',
      doc2: 'Upload Kit',
      subtext: 'If you would like us to do the uploading for you, please contact us.',
      button: 'Click here to visit our contact form'
    },
    registerCompletedModal: {
      heading: 'Registration has been completed',
      subtitle:
        'Please uppload your spatial data from the comony SDK application for the next step.',
      note: '※ Be sure to save the above link for future reference.',
      doc: 'About comony SDK'
    },
    account: {
      pageTitle: 'Account Settings',
      heading: 'Account Settings',
      changeButton: 'Change',
      user: {
        heading: 'Account Settings',
        name: 'Username',
        account: 'User ID',
        email: 'Email address',
        password: 'Password',
        linkedSNS: 'Connections',
        role: 'Account Role',
        roleType5: 'Admin Account',
        roleType4: 'Business Account（free-charging）',
        roleType2: 'Creator Account（free）',
        roleType3: 'Regular Account（free）',
        roleType1: 'Admin Account',
        isSNSLogin: {
          google: 'Google account is linked',
          facebook: 'Facebook account is linked',
          apple: 'Apple account is linked'
        },
        pwModal: {
          heading: 'Change Your Password',
          pwLabel1: 'New Password',
          pwLabel2: 'New Password（Confirmation）',
          submit: 'Submit'
        },
        emailModal: {
          heading: 'Change Your Email Address',
          pwLabel1: 'New Email Address',
          pwLabel2: 'New Email Address（Confirmation）',
          submit: 'Submit'
        },
        membership: {
          heading: 'Cancel the membership',
          text: 'If you delete your account, you will no longer be able to retrieve any content or information you have added to it.',
          link: 'Delete your account',
          modal: {
            heading: 'Delete your account',
            confimText: 'Are you sure you want to delete your account?',
            close: 'Close',
            submit: 'Delete'
          }
        },
        userDelete: {
          heading: 'Cancel the membership',
          content:
            'If you delete your account, you will no longer be able to retrieve any content or information you have added to it.',
          buttonTitle: 'Delete account'
        }
      }
    },
    register: {
      heading: 'Register Spatial Data',
      stepTitle1: 'Detail Settings',
      stepTitle2: 'Public setting',
      stepTitle3: 'Complete',
      stepTitle3Subtext: 'Uploads your spatial data from SDK',
      subtext: 'Enter the details of the space you want to upload on comony.',
      form: {
        spaceLabel: 'Title',
        spacePh: 'Spatial Title',
        categoryLabel: 'Category',
        categorySubtext: 'Please select category',
        tagLabel: 'Tag',
        tagPh: 'Add tags',
        descLabel: 'Description',
        thumbLabel: 'Thumbnail',
        thumbSubtext: "※ It's displayed in space gallery page",
        coverLabel: 'Cover Image',
        coverSubtext: "※ It's displayed in space detail page",
        coverTypeLabel: '1) Select Cover Image Type',
        coverTypeType0: 'Image',
        coverTypeType3: 'Virtual Tour',
        coverImageLabel: '2) Input Cover Image Type',
        coverImageYoutubeLabel: 'Youtube URL',
        coverImageSketchfabLabel: 'Sketchfab URL',
        coverImageVtLabel: 'Virtualtour URL',
        helpTextThumbnail:
          'We recommend creating a thumbnail with an image size of 400px x 280px (10:7 aspect ratio).',
        helpTextCoverImg:
          'We recommend creating a thumbnail with an image size of 1365px x 680px (2:1 aspect ratio).',
        previewButton: 'Preview',
        nextButton: 'Next（Public setting）',
        submit: 'Save',
        validate: {
          title: 'Spatial title is required',
          categoryId: 'Category is required',
          description: 'Description is required',
          thumbnailUrl: 'Thumbnail images are required',
          coverType: 'Cover image type is a required',
          coverDataValue: 'Cover image is a required',
          coverDefaultImageUrl: 'Cover image is a required',
          embedUrl: 'Cover image URL is a required',
          youtube: 'Youtube URL is a required',
          sketchfab: 'Sketchfab URL is a required',
          virtualTour: 'Virtual Tour URL is a required'
        }
      },
      public: {
        heading: 'Publish Settings',
        open: 'Open Upload to the public',
        openText1: 'It is available to all users.',
        openText2:
          'The publication date is automatically set to the date the spacial data uploading is completed.',
        limitation: 'Upload Limitedly',
        limitationText1: 'Only users know the link can see it.',
        limitationText2:
          'The publication date is automatically set to the date the spacial data uploading is completed.',
        privately: 'Upload Privately',
        privatelyText1: 'Only you can see it.',
        backButton: 'Back',
        nextButton: 'Next'
      },
      complete: {
        heading: 'Complete',
        note1: 'Registration has been completed.',
        note2: 'Please uppload your spatial data from the comony SDK application for the next step.'
      }
    },
    publicProfile: {
      followButton: '+ Follow',
      contactButton: 'Contact'
    }
  }
}
