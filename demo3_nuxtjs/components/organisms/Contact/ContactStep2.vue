<template>
  <div>
    <InputFieldSet
      :disabled="true"
      class="contactForm_input"
      :label="$t('formContact.label.name')"
      :model-value="dataContactPage.name"
    />
    <InputFieldSet
      :disabled="true"
      class="contactForm_input"
      :label="$t('formContact.label.mailAddress')"
      :model-value="dataContactPage.email"
    />
    <InputFieldSet
      :disabled="true"
      class="contactForm_input"
      :label="$t('formContact.label.phoneNumber')"
      :model-value="dataContactPage.phone"
    />
    <InputFieldSet
      :disabled="true"
      class="contactForm_input"
      :label="$t('formContact.label.companyName')"
      :model-value="dataContactPage.companyName"
    />
    <InputFieldSet
      :disabled="true"
      class="contactForm_input"
      :label="$t('formContact.label.department')"
      :model-value="dataContactPage.department"
    />
    <div class="contactForm_input">
      <InputLabel size="medium" :value="$t('formContact.label.inquiryDetaill')" color="gray" />
      <RadioButtons
        :key="inquiryDetailsRadioButtonsData.id"
        :disabled="true"
        :radio-buttons-data="inquiryDetailsRadioButtonsData"
        :model-value="dataContactPage.optionRadio"
      />
    </div>
    <div class="contactForm_input">
      <InputLabel size="medium" :value="$t('formContact.label.contactDetails')" color="gray" />
      <TextArea
        :disabled="true"
        row="5"
        col="140"
        placeholder="Please fill the form"
        :model-value="dataContactPage.contactDetails"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import InputFieldSet from '~/components/molecules/Form/InputFieldSet/InputFieldSet.vue'
import RadioButtons from '~/components/atoms/Form/RadioButtons/RadioButtons.vue'
import TextArea from '~/components/atoms/Form/TextArea/TextArea.vue'
import InputLabel from '~/components/atoms/Form/InputLabel/InputLabel.vue'

// props type
interface dataContactPageInterface {
  name: string
  email: string
  phone: string
  companyName: string
  department: string
  optionRadio: string
  contactDetails: string
}
interface inquiryDetailsRadioButtonsDataInterface {
  id: number
  label: string
}

export default defineComponent({
  name: 'ContactStep2',
  components: {
    InputFieldSet,
    RadioButtons,
    TextArea,
    InputLabel
  },

  props: {
    dataContactPage: {
      type: Object as PropType<dataContactPageInterface>,
      required: true
    },
    inquiryDetailsRadioButtonsData: {
      type: Array as PropType<inquiryDetailsRadioButtonsDataInterface[]>,
      required: true
    }
  }
})
</script>

<style scoped lang="scss">
.contactForm {
  padding: 5%;

  &_input {
    margin-bottom: $spacing_5x;
  }
}

.submit {
  text-align: center;
}
</style>
