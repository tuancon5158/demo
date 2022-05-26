<template>
  <div class="spaceRegisterForm">
    <div class="spaceRegisterForm_form">
      <!-- Space basic setting -->
      <FormContainer class="spaceRegisterForm_form" :title="$t('spaceNew.form.title1')">
        <template #formContents>
          <TableDataList :title="basicInfoTitles">
            <template #data_1>
              <InputFieldSet
                :has-focus="!isEdit"
                class="spaceRegisterForm_input"
                :model-value="formValues.title"
                :error-message="msgError.title"
                border-color="gray"
                :place-holder="$t('spaceNew.form.placeHolder.name')"
                @update:modelValue="handleInputFieldSetChange($event, 'title')"
              />
            </template>
            <template #data_2>
              <SelectBox
                :unSelect="inUnselect"
                :placeholder="$t('spaceNew.form.placeHolder.category')"
                :options="categoryList"
                :model-value="formValues.categoryId.toString()"
                :error-message="msgError.categoryId"
                bg-color="gray"
                @update:modelValue="handleInputFieldSetChange($event, 'categoryId')"
              />
            </template>
            <template #data_3>
              <SelectBox
                :unSelect="inUnselect1"
                :placeholder="$t('spaceNew.form.placeHolder.subCategory1')"
                :disabled="disable2"
                :options="categoryList2"
                :model-value="formValues.categoryId2.toString()"
                :error-message="msgError.categoryId2"
                bg-color="gray"
                @update:modelValue="handleInputFieldSetChange($event, 'categoryId2')"
              />
            </template>
            <template #data_4>
              <SelectBox
                :unSelect="true"
                :placeholder="$t('spaceNew.form.placeHolder.subCategory2')"
                :options="categoryList3"
                :disabled="disable3"
                :model-value="formValues.categoryId3.toString()"
                :error-message="msgError.categoryId3"
                bg-color="gray"
                @update:modelValue="handleInputFieldSetChange($event, 'categoryId3')"
              />
            </template>
            <template #data_5>
              <WysiwygEditor
                :placeholder="$t('spaceNew.form.placeHolder.description')"
                :model-value="formValues.description"
                :value="formValues.description"
                :error-message="msgError.description"
                @update:modelValue="handleInputFieldSetChange($event, 'description')"
              />
            </template>
          </TableDataList>
        </template>
      </FormContainer>
      <!-- Tag Input -->
      <FormContainer class="spaceRegisterForm_form" :title="$t('spaceNew.form.title2')">
        <template #formContents>
          <TagInputForm
            v-model="formValues.tags"
            class="spaceRegisterForm_form_tags"
            :options="popularTagList"
          />
        </template>
      </FormContainer>
      <!-- Space thumbnail setting -->
      <FormContainer class="spaceRegisterForm_form" :title="$t('spaceNew.form.title3')">
        <template #formContents>
          <TableDataList :title="thumbnailTitles">
            <template #data_1>
              <FileDropBox
                :image-url="formValues.thumbnailUrl ? convertFullPath(formValues.thumbnailUrl) : ''"
                size="full"
                max-size="3145728"
                :error-message="msgError.thumbnailUrl"
                :percentage="currentProgress"
                :is-loading="isLoading"
                @onSelectImage="handleSelectImage($event, 'thumbnailUrl', 'spaces')"
                @onDeleteImage="handleDeleteImage($event)"
              />
              <span class="spaceRegisterForm_form_notify">
                {{ $t('spaceNew.notify.thumbnail') }}
              </span>
            </template>
          </TableDataList>
        </template>
      </FormContainer>
      <!-- Space covertype setting -->
      <FormContainer
        class="spaceRegisterForm_ThirdForm"
        :title="$t('spaceNew.form.title4')"
        :explanation-text="$t('spaceNew.form.explanation.text')"
        @onMouseover="showPopup = true"
        @onMouseleave="showPopup = false"
      >
        <template #formContents>
          <TableDataList :title="coverTitles">
            <template #data_1>
              <SelectBox
                :placeholder="$t('spaceNew.form.placeHolder.coverType')"
                :options="coverList"
                :model-value="coverType"
                :error-message="msgError.coverType"
                bg-color="gray"
                @update:modelValue="handleInputFieldSetChange($event, 'coverType')"
              />
            </template>
            <template #data_2>
              <TextArea
                v-if="formValues.coverType !== 0"
                :model-value="formValues.embedUrl"
                :error-message="msgError.embedUrl"
                row="3"
                col="200"
                :max-word-count="100"
                :is-display-word-count="false"
                :placeholder="
                  formValues.coverType === 1
                    ? 'https://www.youtube.com/xxx'
                    : formValues.coverType === 2
                    ? 'https://sketchfab.com/xxxx'
                    : 'https://virtualtour-site.com/show/?m=xxxxxxxxxxx'
                "
                @update:modelValue="handleInputFieldSetChange($event, 'embedUrl')"
              />
              <FileDropBox
                v-else
                :image-url="
                  formValues.coverDataValue
                    ? convertFullPathImageCover(formValues.coverDataValue)
                    : ''
                "
                size="full"
                max-size="3145728"
                :percentage="currentProgressCover"
                :is-loading="isLoadingCover"
                :error-message="msgError.coverDataValue"
                @onSelectImage="handleSelectImageCover($event, 'coverDataValue', 'spaces')"
                @onDeleteImage="handleDeleteImageCover($event)"
              />
            </template>
            <template #data_3></template>
          </TableDataList>
        </template>
        <template #formExplanation>
          <Popup
            :show="showPopup"
            :cover-type="formValues.coverType"
            @onClose="showPopup = false"
          />
        </template>
      </FormContainer>
    </div>
    <div class="spaceRegisterForm_privacySettings">
      <PrivacySettingPanel
        :model-value="formValues.publishedStatus"
        :list-data="privacyOptions"
        :is-disable-btn="isDisable"
        @onInputFieldSetChange="handleInputFieldSetChange($event, 'publishedStatus')"
        @onSave="handleSubmit"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  SetupContext,
  ref,
  onBeforeMount,
  useRoute,
  computed,
  watch,
  watchEffect
} from '@nuxtjs/composition-api'
import FormContainer from '~/components/molecules/FormContainer/FormContainer.vue'
import TableDataList from '~/components/molecules/TableDataList/TableDataList.vue'
import InputFieldSet from '~/components/molecules/Form/InputFieldSet/InputFieldSet.vue'
import TextArea from '~/components/atoms/Form/TextArea/TextArea.vue'
import FileDropBox from '~/components/molecules/Form/FileDropBox/FileDropBox.vue'
import SelectBox, { I_ItemSelectInterface } from '~/components/atoms/Form/SelectBox/SelectBox.vue'
import TagInputForm from '~/components/molecules/TagInputForm/TagInputForm.vue'
import WysiwygEditor from '~/components/atoms/Form/WysiwygEditor/WysiwygEditor.vue'
import PrivacySettingPanel from '~/components/organisms/PrivacySettingPanel/PrivacySettingPanel.vue'
import Popup from '~/components/organisms/Popup/Popup.vue'
import { handleInputChangeComposables } from '~/composables/utilities/formValidate/handleInputChange'
import {
  useFormValuesInit,
  useUploadImage,
  useErrorDisplay,
  injectNotification,
  injectWorkspace
} from '~/composables'
// constants
import { spaceCoverTypeId, publishedStatusId } from '~/constants/spaces'
//cloneDeep
import { cloneDeep } from '~/composables/utilities/cloneDeep'
//types
import { I_Space_Response_Data_Details, I_Response_Type } from '~/types/schema/response'
// props type
interface I_TagList {
  name: string
  value: string
}
export default defineComponent({
  name: 'SpaceRegisterForm',
  components: {
    FormContainer,
    TableDataList,
    InputFieldSet,
    TextArea,
    FileDropBox,
    SelectBox,
    TagInputForm,
    WysiwygEditor,
    PrivacySettingPanel,
    Popup
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    isRegister: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context: SetupContext) {
    const { app } = useContext()
    const { $config } = context.root
    // Get workspace Id
    const { getWorkspaceId } = injectWorkspace()
    const id = getWorkspaceId.value || ''
    const setNotiState = injectNotification()
    const { setError } = useErrorDisplay()
    const basicInfoTitles = [
      {
        label: app.i18n.t('spaceNew.form.label.name'),
        required: true
      },
      {
        label: app.i18n.t('spaceNew.form.label.category'),
        required: true
      },
      {
        label: app.i18n.t('spaceNew.form.label.subCategory1'),
        required: false
      },
      {
        label: app.i18n.t('spaceNew.form.label.subCategory2'),
        required: false
      },
      {
        label: app.i18n.t('spaceNew.form.label.description'),
        required: true
      }
    ]
    const thumbnailTitles = [
      {
        label: app.i18n.t('spaceNew.form.label.thumbnail'),
        required: true
      }
    ]
    const coverTitles = [
      {
        label: app.i18n.t('spaceNew.form.label.coverType'),
        required: true
      },
      {
        // app.i18n.t('spaceNew.form.label.coverDescription'),
        label: app.i18n.t('spaceNew.form.label.coverImage'),
        required: true
      }
    ]
    const coverList = ref([
      {
        value: spaceCoverTypeId.IMAGE,
        label: app.i18n.t('mypage.register.form.coverTypeType0')
      },
      {
        value: spaceCoverTypeId.YOUTUBE,
        label: 'Youtube'
      },
      {
        value: spaceCoverTypeId.SKETCHFAB,
        label: 'Sketchfab'
      },
      {
        value: spaceCoverTypeId.VIRTUALTOUR,
        label: app.i18n.t('mypage.register.form.coverTypeType3')
      }
    ])
    const popularTagList = [
      { label: app.i18n.t('spaceNew.tags.label1'), value: '1' },
      { label: app.i18n.t('spaceNew.tags.label2'), value: '2' },
      { label: app.i18n.t('spaceNew.tags.label3'), value: '3' },
      { label: app.i18n.t('spaceNew.tags.label4'), value: '4' },
      { label: app.i18n.t('spaceNew.tags.label5'), value: '5' },
      { label: app.i18n.t('spaceNew.tags.label6'), value: '6' },
      { label: app.i18n.t('spaceNew.tags.label7'), value: '7' },
      { label: app.i18n.t('spaceNew.tags.label8'), value: '8' }
    ]
    const privacyOptions = ref([
      {
        id: 'top',
        value: publishedStatusId.OPEN,
        label: app.i18n.t('spaceNew.privacySettings.open'),
        subLabel: app.i18n.t('spaceNew.privacySettings.openText')
      },
      {
        id: 'middle',
        value: publishedStatusId.LIMITTED,
        label: app.i18n.t('spaceNew.privacySettings.limited'),
        subLabel: app.i18n.t('spaceNew.privacySettings.limitedText')
      },
      {
        id: 'bottom',
        value: publishedStatusId.PRIVATE,
        label: app.i18n.t('spaceNew.privacySettings.privately'),
        subLabel: app.i18n.t('spaceNew.privacySettings.privatelyText')
      }
    ])
    const route = useRoute()
    const spaceIdParam = ref(route.value.params.spaceId || '')

    onBeforeMount(() => {
      fetchCategoryList()

      if (props.isEdit) {
        fetchSpaceDetail()
      }
    })

    const categoryList = ref<I_ItemSelectInterface[]>([])
    const categoryList2 = ref<I_ItemSelectInterface[]>([])
    const categoryList3 = ref<I_ItemSelectInterface[]>([])

    const tagList = ref<I_TagList[]>([])
    // show popup explanation for cover
    const showPopup = ref(false)

    // dont watch reset when first time fetch

    // get category list
    const fetchCategoryList = async () => {
      await app
        .$repository('categories')
        .get()
        .then((response) => {
          response.data.list.forEach((item) => {
            // 英語の場合はitem.nameEnを入れる
            if (app.i18n.locale === 'en') {
              categoryList.value.push({
                value: item.id.toString(),
                label: item.nameEn,
                disabled: false
              })
            } else {
              categoryList.value.push({
                value: item.id.toString(),
                label: item.name,
                disabled: false
              })
            }
          })
          categoryList2.value = cloneDeep(categoryList.value)
          categoryList3.value = cloneDeep(categoryList.value)
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key

          setError(errorKeyCode, '')
        })
    }

    // get space detail if edit
    const fetchSpaceDetail = async () => {
      await app
        .$repository('belongSpaces')
        .getBelongSpaceDetail(spaceIdParam.value)
        .then((response) => {
          const keys = Object.keys(formValues)

          // eslint-disable-next-line array-callback-return
          keys.map((key) => {
            if (key === 'coverType') {
              formValues[key] = response.data[key] || 0
            } else if (key === 'categoryId' || key === 'categoryId2' || key === 'categoryId3') {
              formValues[key] = response.data[key] || ''
            } else if (key === 'tags') {
              formValues[key] = response.data[key] || []
            } else if (key === 'publishedStatus') {
              formValues[key] = response.data[key] || publishedStatusId.PRIVATE
            } else {
              formValues[key] = response.data[key] || ''
            }
          })
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key

          setError(errorKeyCode, '')
        })
    }
    // Form data
    const { formValues, msgError, isDisableBtnWithCondition } = useFormValuesInit({
      title: '',
      categoryId: '',
      categoryId2: '',
      categoryId3: '',
      description: '',
      tags: '',
      thumbnailUrl: '',
      coverType: '',
      coverDataValue: '',
      coverDefaultImageUrl: '',
      embedUrl: '',
      publishedStatus: ''
    })

    formValues.tags = []
    formValues.coverType = 0
    formValues.publishedStatus = ref<number>(publishedStatusId.PRIVATE)

    const coverType = computed(() => formValues.coverType.toString())
    // require to check
    const isDisable = ref(false)

    watchEffect(() => {
      if (coverType.value === '0') {
        isDisable.value = isDisableBtnWithCondition(
          formValues,
          ['title', 'categoryId', 'description', 'thumbnailUrl', 'coverDataValue'],
          ['embedUrl']
        )
      } else {
        isDisable.value = isDisableBtnWithCondition(formValues, [
          'title',
          'categoryId',
          'description',
          'thumbnailUrl',
          'embedUrl'
        ])
      }
    })

    // relation category and subCategory (disable and value option disable)

    const disable2 = ref(true)
    const disable3 = ref(true)

    // detect change main category after fetch 1st time
    // recursion later
    const reCountingCategoryList = () => {
      categoryList.value.forEach((category) => {
        category.disabled =
          category.value == formValues.categoryId2 || category.value == formValues.categoryId3
      })
    }

    const reCountingCategoryList2 = () => {
      categoryList2.value.forEach((category) => {
        category.disabled =
          category.value == formValues.categoryId || category.value == formValues.categoryId3
      })
    }

    const reCountingCategoryList3 = () => {
      categoryList3.value.forEach((category) => {
        category.disabled =
          category.value == formValues.categoryId2 || category.value == formValues.categoryId
      })
    }

    watch(
      () => formValues.categoryId,
      (newValue, oldValue) => {
        // get data turn 2, use for edit because of waiting api binding to form
        if (oldValue !== '' && newValue !== oldValue && props.isRegister === false) {
          reCountingCategoryList2()
          reCountingCategoryList3()
        }
        // in register space
        else {
          reCountingCategoryList2()
          reCountingCategoryList3()
        }
      }
    )

    //if sub category 1 have value, un disable sub category 2
    //if sub category 1 == sub category 2, reset sub category 2
    watch(
      () => formValues.categoryId2,
      (value: number) => {
        reCountingCategoryList()
        reCountingCategoryList3()
      }
    )
    watch(
      () => formValues.categoryId3,
      () => {
        reCountingCategoryList()
        reCountingCategoryList2()
      }
    )
    //handle disabled
    watch(
      () => formValues.categoryId,
      () => {
        if (formValues.categoryId) {
          disable2.value = false
        } else {
          formValues.categoryId2 = ''
          disable3.value = true
        }
      }
    )

    watch(
      () => formValues.categoryId2,
      () => {
        if (formValues.categoryId2) {
          disable3.value = false
          reCountingCategoryList()
          reCountingCategoryList2()
        } else {
          formValues.categoryId3 = ''
          disable3.value = true
        }
      }
    )

    //handle disable first Item ( cannot remove value)
    const inUnselect = ref(true)
    const inUnselect1 = ref(true)
    const isAllUserSelect = computed(
      () => formValues.categoryId && formValues.categoryId2 && formValues.categoryId3
    )

    const isUserSelectMainAndSub1 = computed(
      () => formValues.categoryId && formValues.categoryId2 && !formValues.categoryId3
    )
    watch(isAllUserSelect, () => {
      if (isAllUserSelect.value) {
        inUnselect1.value = false
        inUnselect.value = false
      }
    })
    watch(isUserSelectMainAndSub1, () => {
      if (isUserSelectMainAndSub1.value) {
        inUnselect.value = false
        inUnselect1.value = true
      }
    })

    // ----------------------------------------------------------

    /*
     * update value when input changes
     * @value: <String> | input value
     * @fieldName: <String> | name of input
     */
    const handleInputFieldSetChange = (value: string, fieldName: string) => {
      if (typeof formValues[fieldName] === 'number') {
        formValues[fieldName] = parseInt(value)
      } else {
        handleInputChangeComposables(formValues, msgError, value, fieldName, app)
      }

      if (fieldName === 'coverType') {
        formValues.coverDataValue = ''
        formValues.embedUrl = ''
        const actions = {
          1: app.i18n.t('spaceNew.form.label.coverImageYoutube'),
          2: app.i18n.t('spaceNew.form.label.coverImageSketchfab'),
          3: app.i18n.t('spaceNew.form.label.coverImageVt'),
          default: app.i18n.t('spaceNew.form.label.coverImage')
        }

        coverTitles[1] = { label: actions[value] || actions.default, required: true }
      }
    }

    // handle upload thumbnail image
    const uploadThumbnailImage = () => {
      const { isLoading, currentProgress, handleSelectImage, handleDeleteImage, convertFullPath } =
        useUploadImage('thumbnailUrl', formValues, $config)

      return {
        isLoading,
        currentProgress,
        handleSelectImage,
        handleDeleteImage,
        convertFullPath
      }
    }

    // handle upload cover image
    const uploadCoverImage = () => {
      const {
        isLoading: isLoadingCover,
        currentProgress: currentProgressCover,
        handleSelectImage: handleSelectImageCover,
        handleDeleteImage: handleDeleteImageCover,
        convertFullPath: convertFullPathImageCover
      } = useUploadImage('coverDataValue', formValues, $config)

      return {
        isLoadingCover,
        currentProgressCover,
        handleSelectImageCover,
        handleDeleteImageCover,
        convertFullPathImageCover
      }
    }

    // handle click button to submit
    const handleSubmit = async () => {
      if (formValues.coverType !== 0) {
        formValues.coverDataValue = formValues.embedUrl
      }

      formValues.coverDefaultImageUrl = formValues.coverDataValue

      if (!props.isEdit) {
        await createSpace()
      } else {
        await editSpace()
      }
    }

    // handle call API to create new space
    const createSpace = async () => {
      await app
        .$repository('belongSpaces')
        .createBelongSpaces({
          workspaceId: id,
          ...formValues,
          categoryId: +formValues.categoryId || null,
          categoryId2: +formValues.categoryId2 || null,
          categoryId3: +formValues.categoryId3 || null
        })
        .then(() => {
          context.emit('closeDialogue')
          context.emit('createSpaceDone')

          // clear cache
          excuteClearPageCache(spaceIdParam.value)
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key

          setError(errorKeyCode, '')
        })
    }

    // handle call API to edit space
    const editSpace = async () => {
      await app
        .$repository('belongSpaces')
        .editBelongSpaceDetail({
          workspaceId: id,
          spaceId: spaceIdParam.value,
          ...formValues,
          categoryId2: +formValues.categoryId2 || null,
          categoryId3: +formValues.categoryId3 || null
        })
        .then(() => {
          context.emit('closeDialogue')
          setNotiState.setNotification(
            app.i18n.t('form.successMessage.updated'),
            'success',
            app.localePath({ name: 'dashboard-id-spaces', params: { id } })
          )

          // clear cache
          excuteClearPageCache(spaceIdParam.value)
        })
        .catch((error) => {
          const statusCode = error.response?.data?.httpStatusCode
          const errorKeyCode = error.response?.data?.response.key

          if (errorKeyCode) {
            setNotiState.setNotification(app.i18n.t(`form.errorMessage.${errorKeyCode}`), 'error')
          } else if (statusCode === 406) {
            setNotiState.setNotification(
              app.i18n.t('form.errorMessage.space.unPermission'),
              'error'
            )
          } else {
            setNotiState.setNotification(app.i18n.t('form.errorMessage.normal'), 'error')
          }
        })
    }

    // cloudfront cache clean for each page
    const excuteClearPageCache = (editedSpaceId) => {
      app
        .$repository('cloudFront')
        .clearPageCache($config.distributionId, [
          `/`,
          `/spaces`,
          `/spaces/${editedSpaceId}`,
          `/profile/workspace/${id}`
        ])
    }

    watch(
      () => formValues.coverDataValue,
      (curr) => {
        if (curr) {
          msgError.coverDataValue = ''
        }
      }
    )
    watch(
      () => formValues.thumbnailUrl,
      (curr) => {
        if (curr) {
          msgError.thumbnailUrl = ''
        }
      }
    )
    watch(
      () => formValues.coverType,
      (val) => {
        if (val === 0) {
          formValues.embedUrl = ''
          msgError.embedUrl = ''
        }
      }
    )

    return {
      basicInfoTitles,
      thumbnailTitles,
      coverTitles,
      categoryList,
      categoryList2,
      categoryList3,
      disable2,
      disable3,
      inUnselect,
      inUnselect1,
      coverList,
      tagList,
      popularTagList,
      formValues,
      msgError,
      handleInputFieldSetChange,
      handleSubmit,
      ...uploadThumbnailImage(),
      ...uploadCoverImage(),
      privacyOptions,
      fetchSpaceDetail,

      coverType,
      getWorkspaceId,
      isDisable,
      showPopup
    }
  }
})
</script>

<style scoped lang="scss">
$privacySettings_W: 30rem;
.spaceRegisterForm {
  display: flex;

  @include max-screen(map-get($breakpoints, xxl)) {
    flex-direction: column;
    padding: 0;
  }

  &_form {
    flex: 0 1 auto;
    margin-bottom: $spacing_8x;
    &_tags {
      width: 100%;
    }

    @include max-screen(map-get($breakpoints, xxl)) {
      max-width: 100%;
    }

    &_notify {
      @include fz(12);
      color: $color_red_500;
      display: inline-block;
    }
  }

  &_privacySettings {
    max-width: $privacySettings_W;
    margin-left: $spacing_8x;
    flex: 0 0 auto;

    @include max-screen(map-get($breakpoints, xxl)) {
      max-width: 100%;
      margin-left: 0;
    }
  }
}
</style>
