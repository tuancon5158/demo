<template>
  <div class="privacySetting">
    <p class="privacySetting_title">
      {{ $t('spaceNew.privacySettings.title') }}
    </p>
    <div v-if="listData" class="privacySetting_group">
      <RadioButtons
        type="privacy"
        :is-vertical-item="true"
        :model-value="String(modelValue)"
        :radio-buttons-data="listData"
        @update:modelValue="handleInputFieldSetChange"
      />
    </div>
    <div class="privacySetting_hr"></div>
    <!-- hide Preview button -->
    <!-- <Button
      :fullSize="true"
      size="large"
      class="privacySetting_preview"
      border-color="blue"
      bg-color="transparent"
      :label="$t('spaceNew.privacySettings.previewButton')"
      @onClick="handleClickPreview"
    /> -->
    <Button
      full-size
      size="large"
      :label="$t('spaceNew.privacySettings.saveButton')"
      class="privacySetting_save"
      bg-color="blue"
      :disabled="isDisableBtn"
      @onClick="handleClickSave"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import RadioButtons from '~/components/atoms/Form/RadioButtons/RadioButtons.vue'
import Button from '~/components/atoms/Button/Button.vue'

interface I_Access {
  id: number
  value: number
  label: string
  subLabel: string
}

export default defineComponent({
  name: 'PrivacySettingPanel',

  components: {
    RadioButtons,
    Button
  },

  props: {
    isDisableBtn: {
      type: Boolean,
      default: false
    },
    listData: {
      type: Array as PropType<I_Access[]>,
      required: true
    },
    modelValue: {
      type: Number,
      required: true
    }
  },

  setup(_, { emit }) {
    // handle preview button click
    const handleClickPreview = (e: InputEvent) => {
      emit('onPreview', e)
    }

    // handle save button click
    const handleClickSave = (e: InputEvent) => {
      emit('onSave', e)
    }

    // handle input changes value
    const handleInputFieldSetChange = (value: number) => {
      emit('onInputFieldSetChange', value)
    }

    return {
      handleClickPreview,
      handleClickSave,
      handleInputFieldSetChange
    }
  }
})
</script>
<style lang="scss" scoped>
.privacySetting {
  background: $color_white;
  border: 1px solid $color_light_blue_200;
  width: 100%;
  padding: $spacing_5x;
  border-radius: $privacySetting_BorderRadius;

  @include pc() {
    position: sticky;
    top: 3.2rem;
  }

  &_title {
    color: $color_gray_900;
    font-weight: $font_weight_medium;
    @include fz($font_size_s);
    line-height: 24px;
    margin: 0;
    margin-bottom: $spacing_4x;
  }

  &_hr {
    border-bottom: 1px solid $color_light_blue_200;
    margin: $spacing_5x 0;
  }

  &_preview {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: $spacing_2x;
  }

  &_save {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
