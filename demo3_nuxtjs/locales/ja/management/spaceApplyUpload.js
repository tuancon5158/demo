export default {
  spaceApplyUpload: {
    title: '空間アップロード権申請',
    subtitle: 'comony運営に空間アップロード権を申請します。',
    form: {
      title1: '申請者情報',
      title2: '申請内容詳細',
      label: {
        name: '申請者氏名',
        email: 'メールアドレス',
        company: '会社名',
        website: ' WebサイトURL',
        numberOfUser: '使用予定人数',
        reason: '申請理由'
      },
      placeHolder: {
        name: '氏名を入力',
        email: 'メールアドレスを入力',
        company: '会社名を入力',
        website: 'https://comony.net',
        numberOfUser: '使用人数を入力',
        reason: '説明文を入力'
      },
      exitButton: '破棄して終了',
      submitButton: '申請',
      errorPermission: 'ワークスペース申請権限がありません。'
    },
    dialogue: {
      title: '空間アップロード権申請を終了しますか',
      backButton: '破棄して終了',
      confirmButton: 'キャンセル'
    }
  }
}
