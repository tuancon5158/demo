export default {
  spaceNew: {
    title: 'Register a new space',
    form: {
      title1: 'Basic information',
      title2: 'Tags',
      title3: 'Thumbnail',
      title4: 'Cover',
      label: {
        name: 'Title',
        category: 'Category',
        subCategory1: 'Subcategory1',
        subCategory2: 'Subcategory2',
        description: 'Descriptions',
        imageTitle: 'Title',
        imageDescription: 'Descriptions',
        thumbnail: 'Thumbnail Image',
        coverType: 'Cover type',
        coverImage: 'Cover Image',
        coverDescription: 'Cover Description',
        coverImageYoutube: 'Youtube URL',
        coverImageSketchfab: 'Sketchfab URL',
        coverImageVt: 'Virtualtour URL',
        WysiwygEditorCodeBlock: 'Input HTML'
      },
      placeHolder: {
        name: 'Insert a text',
        category: 'Select a category',
        subCategory1: 'Select a sub category 1',
        subCategory2: 'Select a sub category 2',
        description: 'Insert a text',
        imageTitle: 'Insert a text',
        imageDescription: 'Insert a text',
        coverType: 'Select',
        WysiwygEditorCodeBlock: 'Input HTML'
      },
      explanation: {
        text: 'What is this?',
        coverImage: {
          title: 'What is a cover image?',
          subTitle:
            'It is the image that displays on the top of the spatial detail page. *Red frame part'
        },
        coverUrl: {
          title: 'What is the inquiry URL?',
          subTitle:
            'You can set the URL of the contact information that is specified in the public profile page. *Red frame part'
        }
      }
    },
    dialogueSave: {
      title: 'Would you save your space',
      backButton: 'Cancel',
      confirmButton: 'Save'
    },
    tags: {
      label1: 'Architecture',
      label2: 'Design',
      label3: 'Real estate',
      label4: 'Urban planning',
      label5: 'Smart city',
      label6: 'Digital archive',
      label7: 'Digital twin',
      label8: 'Metaverse',
      placeHolder: 'Input hash tags',
      frequentlyAdded: 'Frequently added '
    },
    privacySettings: {
      title: 'Publish Settings',
      previewButton: 'Preview',
      saveButton: 'Save',
      open: 'Public',
      openText: 'Available to all users.',
      limited: 'Limited',
      limitedText: 'Only users know the link can view',
      privately: 'Private',
      privatelyText: 'Only users in your workspace can view'
    },
    notify: {
      thumbnail:
        '※ Thumbnail images used for comony’s galleries cannot be decorated with text. If you upload an image that contains text, we may set that space to private.'
    }
  }
}
