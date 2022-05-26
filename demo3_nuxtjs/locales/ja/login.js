// ログイン page
// 新規アカウント登録 page
// パスワードリセット page
// パスワード再設定 page
export default {
  bktohome: {
    home: 'トップページに戻る',
    login: 'ログインページに戻る'
  },
  login: {
    heading: 'ログイン',
    subtext1: '初めてお使いですか？',
    subtext2: 'アカウントを作成してください',
    save: 'ログイン状態を保存する',
    button: 'ログイン',
    resetting: 'パスワードを忘れた方はこちらから',
    withEmail: 'または、メールアドレスでログイン',
    sns: {
      withSNS: 'SNSアカウントでログイン',
      withFacebook: 'Facebookでログイン',
      withGoogle: 'Googleでログイン'
    }
  },
  signup: {
    pageTitle: '新規アカウント登録',
    heading: '新規アカウント作成',
    headingModalText1: 'この空間に入室するには</br>無料の会員登録が必要です',
    confirmHeading: '登録内容確認',
    note1: 'すでにアカウントをお持ちですか？',
    note2: 'ログイン',
    accept1: 'アカウントを作成することで',
    accept2: '利用規約',
    accept3: 'に同意したことになります。',
    confirmButton: '確認画面へ',
    backButton: '入力画面へ戻る',
    submitButton: '登録する',
    confirm: {
      pageTitle: '登録内容確認'
    },
    withEmail: 'または、メールアドレスで新規登録',
    sns: {
      withSNS: 'SNSアカウントで新規登録',
      withFacebook: 'Facebookで新規登録',
      withGoogle: 'Googleで新規登録'
    }
  },
  temporary: {
    heading: '仮登録完了',
    text1: 'ご登録いただいた',
    text2: 'に認証メールをお送りしました。',
    text3: 'メールに記載された認証URLをクリックして、新規アカウント登録を完了させてください。',
    text4: 'メールが届かない場合',
    text5: '「迷惑メールフォルダ」に振り分けられていないかご確認ください。',
    text6:
      'メールアドレスが間違っていた場合は、再度アカウント登録フォームから手続きをお願い致します。',
    link: 'サイトトップへ'
  },
  completeSignup: {
    heading: 'アカウント登録完了',
    text1: 'アカウント登録が完了いたしました。',
    text2: 'ログインしてcomonyをお楽しみください。',
    link: 'ログインページへ',
    headingError: 'アカウント本登録エラー',
    text1Error: 'アカウント本登録に失敗しました。',
    text2Error: '新規会員登録より再度登録手続きをお願いいたします。',
    linkError: '新規登録ページへ'
  },
  reminds: {
    heading: 'パスワードリセット',
    leadtext1: 'パスワードを再発行するためのメールをお送りします。',
    leadtext2: 'ご登録されているメールアドレスを入力してください。',
    button: 'パスワードリセット',
    link: 'ログインページに戻る',
    successed: {
      heading: 'メール送信完了',
      leadtext1: 'パスワードを再発行するためのメールをお送りしました。',
      leadtext2: 'お送りしたメールに記載されているURLから再登録をお願いします。'
    }
  },
  resetpw: {
    heading: 'パスワード再設定',
    button: '送信',
    completeText: 'メールアドレスのパスワードの再設定が完了しました。',
    successed: {
      heading: 'パスワード再設定完了',
      leadtext1: 'パスワードの再設定が完了しました。',
      leadtext2: '新しいパスワードで再度ログインしてください。'
    }
  },
  forcePwReset: {
    heading: 'パスワードが有効期限切れです',
    text: 'お使いのパスワードの有効期限が切れました。<br />パスワード再設定を行い、再度ログインしてください。',
    button: 'パスワード再設定',
    backLink: 'サイトトップへ'
  },
  authenticationCode: {
    successed: {
      heading: '認証コード送信完了',
      text1: '認証コードが記載されたメールをお送りしました。',
      text2: '認証コードの有効期限は1時間です。',
      text3: 'メールに記載のURLをクリックし、パスワード再設定をお願いします。'
    },
    failed: {
      heading1: '認証コードの有効期限が切れています。',
      heading2: '確認メール再送信しました。',
      text1: '認証コードの有効期限は1時間です。',
      text2: '再送信したメールに記載のURLをクリックし、',
      text3: 'パスワード再設定をお願いします。'
    }
  },
  cautionNotMainSended: {
    heading: 'メールが届かない場合',
    text1: '「迷惑メールフォルダ」に振り分けられていないかご確認ください。',
    text2:
      'メールアドレスが間違っていた場合は、再度アカウント登録フォームから手続きをお願い致します。'
  }
}
