// register page
// mypage page
// contact page
export default {
  form: {
    label: {
      email: 'メールアドレス',
      password: 'パスワード',
      passwordConfirm: 'パスワード（確認用）',
      newPassword: '新しいパスワード',
      newPasswordConfirm: '新しいパスワード（確認用）',
      name: 'アカウント名',
      username: 'アカウント名',
      mailAddress: 'メールアドレス',
      phoneNumber: '電話番号',
      companyName: '会社名',
      department: '部署名',
      inquiryDetaill: 'お問い合わせ内容',
      inquiryDetailsOptions: {
        aboutServiceUsage: ' サービスご利用について（デモのご利用）',
        documentRequest: '資料請求 協業関連のご相談',
        other: 'その他'
      },
      contactDetails: 'お問い合わせ詳細',
      confirmCode: '認証コード',
      required: '必須'
    },
    placeHolder: {
      name: '山田 太郎',
      username: '山田Taro_123',
      email: 'lastmile@comony.net',
      phone: '09012345678',
      companyName: 'ラストマイルワークス株式会社',
      department: '営業部',
      inquiry: 'お問い合わせ内容',
      detail: 'お問い合わせ内容をご記入ください。',
      companyUrl: 'https://comony.net/',
      contactUrl: 'https://comony.net/contact',
      facebookUrl: 'https://facebook.com/comony_JP',
      twitterUrl: 'https://twitter.com/comony_JP'
    },
    successMessage: {
      updated: '更新しました。',
      title: '申請が完了しました',
      description: '新規ワークスペース発行の申請が完了しました。',
      subDescription: 'comony運営からのメールをお待ちください。',
      createdWorkspce: '新規ワークスペースを登録しました。',
      applyWorkspce: '空間アップロード申請を受け付けました。<br />承認が下りるまでお待ちください。',
      emailChanged: 'メールアドレスを更新しました。再度ログインしてください。',
      deleted: '削除されました。',
      inviteMember: {
        alreadyRegistered: '招待したユーザーは既に登録されています。',
        invited: '名のユーザーが招待されました。'
      }
    },
    errorMessage: {
      updated: '更新に失敗しました。再度お試しください。',
      resendVerifyEmail: '本登録用のメールを再送しました。登録手続きを完了して下さい。',
      expiredVerifyCode: '認証メールの有効期限切れです。本登録用のメールを再送しました。',
      limitExceeded: 'パスワード試行回数が上限に達しました。時間をおいて再度お試しください。',
      userNotFoundException: 'ご入力いただいたメールアドレスは未登録または、未認証です。',
      notAuthorizedException: 'パスワードが間違っています。',
      alreadyExistEmail: 'ご入力いただいたメールアドレスは既に使用されています。',
      unauthorized: 'Unauthorized',
      normal: 'エラーが発生しました。再度お試しください。',
      badRequest: '入力内容に誤りがあります。',
      forceLoginToApp: 'アプリを使用するためには、comonyへのログインが必要です。',
      forceLogin: 'comonyへのログインが必要です。',
      unFilledFormInput: '入力内容に誤りがあります。',
      name: 'アカウント名は入力必須項目です。',
      nameLimit: '255字以内で入力してください。',
      url: 'URLの形式が正しくありません。',
      urlLimit: '255字以内で入力してください。',
      usersCount: '使用予定人数は必須項目です。',
      usersCountNumber: '半角数値で入力してください。',
      usersCountMaxNumber: '1000人以下で入力してください。',
      reason: '申請理由は必須項目です。',
      email: 'メールアドレスは入力必須項目です。',
      title: 'タイトルは必須項目です。',
      password: 'パスワードは入力必須項目です。',
      username: 'アカウント名は入力必須項目です。',
      emailRequired: 'メールアドレスは入力必須項目です。',
      emailInvalid: 'メールアドレスの形式が正しくありません。',
      emailUnconfirm: '全てのメールアドレスを確定してください。',
      emailConfirm: 'メールアドレスが一致しません。',
      emailLimit: '一度に登録できるメールアドレスの上限は20件です',
      emailDuplicated: '既に追加済みのメールアドレスです。',
      phoneRequired: '電話番号は入力必須項目です。',
      phoneInvalid: '9〜11文字の半角数字、または記号で入力してください。',
      company: '会社名は入力必須項目です。',
      companyLimit: '255字以内で入力してください。',
      department: '部署名は入力必須項目です。',
      optionRadio: 'お問い合わせ内容は入力必須項目です。',
      contactDetails: 'お問い合わせ詳細は入力必須項目です。',
      detail: 'お問い合わせ詳細は入力必須項目です。',
      passwordInvalid: 'パスワードは半角英数字8文字以上で入力してください。',
      passwordConfirm: 'パスワードが一致しません。',
      confirmCode: '認証コードは入力必須項目です。',
      fileSize: {
        line1: 'ファイルサイズが大きすぎます。',
        line2: '以下のファイルをアップロードしてくだいさい。'
      },
      fileType: '対応していないファイルの拡張子です。',
      biography: '伝記は必須のエントリです。',
      facebook: 'Facebookは入力必須項目です。',
      twitter: 'Twitterは入力必須項目です。',
      workSpaceName: 'ワークスペース名は入力必須項目です',
      description: '説明文は入力必須項目です',
      workSpaceIcon: 'ワークスペースアイコンは入力必須項目です',
      organizationName: '会社名は入力必須項目です',
      websiteUrl: 'URLは入力必須項目です',
      inquiryForm: '問い合わせフォームリンクを入力は入力必須項目です',
      userIsNotFound: '選択中のワークスペース内にユーザーが存在しません。',
      introductionLimit: '255字以内で入力してください。',
      space: {
        unPermission: 'ワークスペースを登録/変更する権限がありません。',
        common: {
          notFound:
            '空間が存在しません。<br />不明な点がございましたら、管理者までお問合せください。'
        }
      },
      common: {
        error: 'システムエラー',
        notFound: '存在しません。不明な点がございましたら、管理者までお問合せください。',
        notFoundResource:
          '{resource} が存在しません。不明な点がございましたら、管理者までお問合せください',
        notPermission: '権限がありません。',
        isExists: 'データがすでに存在してます。',
        changed: 'すでに変更されました。',
        approved: 'すでに許可されてます。'
      },
      workspaceUser: {
        isLimit: {
          text1: '招待できる最大アカウント数は',
          text2: '名です。',
          text3: '名が招待枠を超えています。'
        },
        notToOwner: 'オーナーにロールチェンジできません。',
        notOwnerPermission: 'オーナー権限のみ操作が可能です。',
        needAdminHigher: 'アドミン以上の権限が必要です。',
        notChangeHigher: '変更する権限がありません。',
        notChangeOwner: '更新対象がオーナー権限のため変更できません。',
        common: {
          notFound:
            '空間が存在しません。<br />不明な点がございましたら、管理者までお問合せください。'
        }
      },
      workspaceUsers: {
        common: {
          notFound:
            '空間が存在しません。<br />不明な点がございましたら、管理者までお問合せください。'
        }
      },
      workspaceSpaces: {
        notVolume: 'ワークスペースの容量が足りません。'
      },
      spaceInstance: {
        notFound: 'ワークスペースが見つかりません。',
        isExpired: 'ワークスペース インスタンスの有効期限が過ぎました。'
      },
      user: {
        notMine: '本人ではありません。',
        notFound: 'ユーザーが見つかりません。'
      }
    },
    button: {
      back: '戻る',
      send: '送信',
      save: '確定'
    }
  },
  formContact: {
    language: 'jp',
    inquiryFormHeading: 'お仕事依頼・お問合せフォーム',
    inquiryFormSubHeading: '3営業日以内にこちらから折り返し連絡いたします。',
    inquiryResponse: {
      heading: 'お仕事依頼・お問合せフォーム',
      subHeading: 'お問合せありがとうございます。'
    },
    stepper: {
      step1: 'お問い合わせ情報の入力',
      step2: 'お問い合わせ内容の確認',
      step3: 'お問い合わせ完了'
    },
    content: {
      label: 'What can I help you ?',
      heading: 'お問い合わせ'
    },
    options: {
      individual: '個人',
      corporation: '法人'
    },
    label: {
      option: '個人/法人',
      name: 'お名前',
      mailAddress: 'メールアドレス',
      phoneNumber: '電話番号',
      companyName: '会社名',
      department: '部署名',
      companyNameAndDepartment: '会社または所属',
      inquiryDetaill: 'お問い合わせ内容',
      inquiryDetailsOptions: {
        aboutServiceUsage: 'サービスご利用について（デモのご利用）',
        documentRequest: '資料請求 協業関連のご相談',
        other: 'その他',
        aboutContractDetail: 'ご利用中の契約内容について'
      },
      contactDetails: 'お問い合わせ詳細'
    },
    placeHolder: {
      name: '例）山田 太郎',
      email: '例）info@lastmile-worls.com',
      phone: '例）09012345678',
      companyName: '例）ラストマイルワークス株式会社',
      department: '例）営業部',
      inquiry: 'お問い合わせ内容',
      detail: 'お問い合わせ内容をご記入ください。'
    },
    message: {
      policy: 'に関して、よろしければ「同意して確認へ進む」ボタンを押してください。',
      success:
        'お問い合わせいただき、ありがとうございます。<br />ご入力いただいたメールアドレスに、追ってご連絡させていただきます。'
    },
    buttonMsg: {
      confirm: '同意して確認へ進む',
      back: '修正する',
      send: 'お問合せを送信する'
    },
    link: {
      backToMenu: 'TOPページに戻る',
      policy: '「個人情報保護方針」'
    },
    notice: '未入力項目または入力エラーがあります。',
    note: '*は必須項目です'
  },
  addressBar: {
    japanTitle: '東京開発拠点',
    japanAddress: '〒104-0033 東京都中央区新川1-25-2br 新川STビル2F（Future Tech Hub内）',
    cambodiaTitle: 'カンボジア開発拠点',
    vietnamTitle: 'ベトナム開発拠点'
  },
  notification: {
    return: '戻る'
  },
  fixedRequest: {
    contactDetailsRadioOptions: 'サービスページからの問い合わせ'
  }
}
