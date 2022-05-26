export default {
  spaceNew: {
    title: '空間新規作成',
    form: {
      title1: '基本情報',
      title2: 'タグ',
      title3: 'サムネイル画像',
      title4: 'カバー',
      label: {
        name: '空間名',
        category: 'カテゴリー',
        subCategory1: 'サブカテゴリー1',
        subCategory2: 'サブカテゴリー2',
        description: '説明文',
        imageTitle: 'タイトル',
        imageDescription: '説明文',
        thumbnail: 'サムネイル画像',
        coverType: 'カバーの種類',
        coverImage: 'コンテンツ',
        coverImageYoutube: 'Youtube URL 貼り付け',
        coverImageSketchfab: 'Sketchfab URL 貼り付け',
        coverImageVt: 'バーチャルツアー URL 貼り付け',
        WysiwygEditorCodeBlock: 'HTMLエディタ'
      },
      placeHolder: {
        name: 'テキストを入力',
        category: 'カテゴリーを選択',
        subCategory1: 'カテゴリーを選択',
        subCategory2: 'カテゴリーを選択',
        description: 'テキストを入力',
        imageTitle: 'テキストを入力',
        imageDescription: 'テキストを入力',
        coverType: '〇〇を選択',
        WysiwygEditorCodeBlock: 'HTMLエディタ'
      },
      explanation: {
        text: 'これは何ですか？',
        coverImage: {
          title: 'カバー画像とは',
          subTitle: '空間詳細ページの一番上に表示される画像です。※赤枠部分'
        },
        coverUrl: {
          title: 'お問い合わせURLとは',
          subTitle:
            '自身の指定したお問い合わせ先のURLを公開プロフィールページに設置することができます'
        }
      }
    },
    dialogueSave: {
      title: '空間を保存しますか',
      backButton: 'キャンセル',
      confirmButton: '保存'
    },
    tags: {
      label1: '建築',
      label2: '設計',
      label3: '不動産',
      label4: '都市計画',
      label5: 'スマートシティ',
      label6: 'デジタルアーカイブ',
      label7: 'デジタルツイン',
      label8: 'メタバース',
      placeHolder: 'ハッシュタグを入力',
      frequentlyAdded: '人気のタグ'
    },
    privacySettings: {
      title: '公開設定',
      open: '公開',
      openText: '全てのユーザーが閲覧可能',
      limited: '限定公開',
      limitedText: 'リンクを知っているユーザーのみが閲覧可能',
      privately: '非公開',
      privatelyText: 'ワークスペース内のユーザーのみ閲覧可能',
      previewButton: 'プレビュー',
      saveButton: '保存'
    },
    notify: {
      thumbnail:
        '※ comonyのギャラリーに使用されるサムネイル画像には、文字を含む装飾を行えません。文字が入った画像をアップロードした場合は、非公開にさせていただく可能性があります。'
    }
  }
}
