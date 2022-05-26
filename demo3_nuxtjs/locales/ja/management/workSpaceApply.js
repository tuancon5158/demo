export default {
  workSpaceApply: {
    title: '新規ワークスペースの発行申請',
    subtitle: 'comony運営に新規ワークスペースの発行を申請します。',
    iconTitle: '戻る',
    form: {
      title1: '申請者情報',
      title2: '申請内容詳細',
      label: {
        name: '申請者氏名',
        email: 'メールアドレス',
        company: '会社名',
        website: 'WebサイトURL',
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
      submitButton: '完了',
      errorPermission: 'ワークスペース申請権限がありません。'
    },
    dialogue: {
      title: 'ワークスペース作成を終了しますか',
      backButton: '破棄して終了',
      confirmButton: 'キャンセル'
    }
  }
}
