export default {
  workSpaceSettings: {
    title: 'ワークスペース基本設定',
    subtitle: 'ワークスペース名や説明、その他の基本的な設定を行います。',
    form: {
      title1: '基本情報',
      title2: '会社情報',
      label: {
        workSpaceName: 'ワークスペース名',
        description: '説明文',
        thumbnailUrl: 'アイコン',
        organizationName: '会社名',
        websiteUrl: 'WebサイトURL'
      },
      placeHolder: {
        workSpaceName: 'ワークスペース名を入力',
        description: '説明文を入力',
        organizationName: '会社名を入力',
        websiteUrl: 'https://comony.net'
      },
      submitButton: '保存',
      errorPermission: 'ワークスペースの変更権限がありません。'
    },
    deleteForm: {
      heading: 'ワークスペースの削除',
      content: 'ワークスペースを削除すると、これまでに追加した全てのコンテンツの情報が失われます。',
      buttonText: 'ワークスペースを削除',
      dialogue: {
        title: 'ワークスペースを削除しますか?',
        deleteButton: '削除',
        cancelButton: 'キャンセル'
      }
    }
  }
}
