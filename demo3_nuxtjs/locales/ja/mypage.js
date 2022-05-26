// mypage page
export default {
  mypage: {
    uploadImage: {
      title: 'ファイルをドロップしてアップロード',
      titleLoading: 'ファイルをアップロード中...',
      type: 'JPG,PNG,GIF画像',
      maxSize: '最大サイズ',
      minBreadth: '最大幅',
      button: '画像を変更',
      button2: '画像を削除'
    },
    profile: {
      pageTitle: 'プロフィール編集',
      heading: 'プロフィール編集',
      subtitle: '基本情報',
      link: '公開中のプロフィールをみる',
      form: {
        thumbLabel: 'プロフィール画像',
        nameLabel: 'アカウント名',
        biography: '概要',
        title2: '会社情報',
        companyLabel: '会社名',
        companySubtext: '※ アカウント名の下に表示されます。未入力の場合は表示されません。',
        companyUrlLabel: '企業コーポレートサイトURL',
        contactUrlLabel: '問い合わせフォーム',
        sns: 'SNS',
        facebookContact: 'FacebookURL',
        twitterContact: 'Twitter URL'
      },
      button: '保存する'
    },
    avatar: {
      pageTitle: 'アバター選択',
      heading: 'アバター選択',
      subtitle: '空間内で使用されるキャラクター設定',
      button: '保存する'
    },
    editSpace: {
      heading: '空間 一覧/編集',
      heading1: '空間/編集',
      button: '空間 新規作成',
      table: {
        row1: 'No.',
        row2: 'サムネイル画像',
        row3: 'タイトル',
        row4: '公開ステータス'
      },
      contents: {
        row1: 'モデル一覧',
        row2: '編集',
        row3: '削除'
      },
      closeButton: '閉じる',
      saveButton: '保存する',
      delete: {
        heading: '空間削除確認',
        reconfirm: '本当にデータを削除しますか？',
        deleteButton: '削除する',
        failed: '削除に失敗しました。'
      }
    },
    howto: {
      heading: '空間 アップロード',
      subtitle1:
        'comony専用のSDKを使用し、ご自身で空間データをアップロードしていただくことが可能です。',
      subtitle2: 'はじめてご使用する場合は、comony SDK使用説明書をご確認ください。',
      doc1: '使用説明書',
      doc2: 'アップロード用キット',
      subtext:
        '弊社にアップロード作業をご依頼される場合は、お問い合わせフォームからご連絡ください。',
      button: 'お問い合わせフォームはこちら'
    },
    registerCompletedModal: {
      heading: '空間の登録が完了しました',
      subtitle:
        '空間の登録が完了しました。comony SDKを使用して、空間のデータをアップロードしてください。',
      note: '※ 後で参照できるよう、上記リンクは必ず保存しておいてください。',
      doc: 'comony SDKについて'
    },
    account: {
      pageTitle: 'アカウント設定',
      heading: 'アカウント設定',
      changeButton: '変更',
      user: {
        heading: 'アカウント情報',
        name: 'お名前',
        email: 'メールアドレス',
        password: 'パスワード',
        linkedSNS: 'SNS連携',
        role: 'アカウント種別',
        roleType5: '管理者権限',
        roleType4: 'ビジネスアカウント（有料）',
        roleType2: 'クリエイターアカウント（無料）',
        roleType3: '通常アカウント（無料）',
        roleType1: '管理者権限',
        isSNSLogin: {
          google: 'Google連携済み',
          facebook: 'Facebook連携済み',
          apple: 'Apple連携済み'
        },
        pwModal: {
          heading: 'パスワード変更',
          pwLabel1: '新しいパスワード',
          pwLabel2: '新しいパスワード（確認用）',
          submit: '送信'
        },
        emailModal: {
          heading: 'アドレス変更',
          pwLabel1: '新しいメールアドレス',
          pwLabel2: '新しいメールアドレス（確認用）',
          submit: '変更する'
        },
        membership: {
          heading: '退会',
          text: 'アカウントの削除をすると、これまでに追加したコンテンツや情報の取得はできなくなります。',
          link: 'アカウントを削除',
          modal: {
            heading: 'アカウント削除 確認',
            confimText: '本当にアカウントを削除しますか?',
            close: '閉じる',
            submit: '退会する'
          }
        },
        userDelete: {
          heading: 'アカウントの削除',
          content: 'アカウントを削除すると、全てのユーザー情報が失われます。',
          buttonTitle: 'アカウントを削除'
        }
      }
    },
    register: {
      heading: '空間 新規作成',
      stepTitle1: '詳細設定',
      stepTitle2: '公開設定',
      stepTitle3: '完了',
      stepTitle3Subtext: 'SDKから空間アップロード',
      subtext: 'comony上にアップロードする空間の詳細情報を入力してください。',
      form: {
        spaceLabel: '空間タイトル',
        spacePh: '空間タイトルを記入してください',
        categoryLabel: 'カテゴリー',
        categorySubtext: 'カテゴリーを選択する',
        tagLabel: 'タグ',
        tagPh: 'タグ追加',
        descLabel: '説明文',
        thumbLabel: 'サムネイル画像',
        thumbSubtext: '※ 空間ギャラリーページに使用されます。',
        coverLabel: 'カバー画像',
        coverSubtext: '※ 空間詳細ページに使用されます。',
        coverTypeLabel: '（１）カバー画像に表示するコンテンツ選択',
        coverTypeType0: '画像',
        coverTypeType3: 'バーチャルツアー',
        coverImageLabel: '（２）カバー画像 選択',
        coverImageYoutubeLabel: 'Youtube URL 貼り付け',
        coverImageSketchfabLabel: 'Sketchfab URL 貼り付け',
        coverImageVtLabel: 'バーチャルツアー URL 貼り付け',
        helpTextThumbnail:
          '画像サイズ 400px × 280px（縦横比 10:7）で、サムネイルを作成することをお勧めしています。',
        helpTextCoverImg:
          '画像サイズ 1365px × 680px（縦横比 2:1）で、サムネイルを作成することをお勧めしています。',
        previewButton: 'プレビュー',
        nextButton: '次へ（公開設定）',
        submit: '保存する',
        validate: {
          title: '空間タイトルは入力必須項目です。',
          categoryId: 'カテゴリーは入力必須項目です。',
          description: '説明文は入力必須項目です。',
          thumbnailUrl: 'サムネイル画像は入力必須項目です。',
          coverType: 'カバーイメージのタイプは入力必須項目です。',
          coverDataValue: 'カバー画像は入力必須項目です。',
          coverDefaultImageUrl: 'カバー画像は入力必須項目です。',
          embedUrl: 'カバー画像URLは入力必須項目です。',
          youtube: 'Youtube URLは必須項目です。',
          sketchfab: 'Sketchfab URLは必須項目です。',
          virtualTour: 'Virtual Tour URLは必須項目です。'
        }
      },
      public: {
        heading: '公開設定',
        open: '公開',
        openText1: 'すべてのユーザーが閲覧可能です。',
        openText2: '公開日は、VR空間アップロードが完了した日時が自動設定されます。',
        limitation: '限定公開',
        limitationText1: 'リンクを知っているユーザーのみ閲覧可能です。',
        limitationText2: '公開日は、VR空間アップロードが完了した日時が自動設定されます。',
        privately: '非公開',
        privatelyText1: '自分のみ閲覧可能です',
        backButton: '戻る',
        nextButton: '次へ'
      },
      complete: {
        heading: '完了',
        note1: '空間データの登録が完了しました。',
        note2: 'comony SDKを使用して、空間データをアップロードしてください。'
      }
    },
    publicProfile: {
      followButton: '＋フォローする',
      contactButton: 'お問い合わせ'
    },
    members: {
      memberInvitationModal: {
        heading: 'ユーザーを招待',
        note: '入力したメールアドレスにワークスペースへの招待メールを送信します。',
        placeholder: 'メールアドレスを入力',
        button: '招待を送信'
      }
    }
  }
}
