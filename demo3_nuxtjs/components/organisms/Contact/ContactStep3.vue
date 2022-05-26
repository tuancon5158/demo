<template>
  <div class="contactStep3">
    <div class="contactStep3_text">
      <p v-html="$t('formContact.message.success')" />
    </div>
    <div class="contactStep3_text">
      <LinkText
        font-size="medium"
        color="secondary"
        :value="$t('formContact.link.backToMenu')"
        :link="localePath('/')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
// props type
export default defineComponent({
  name: 'ContactStep3',
  components: {
    LinkText
  }
})
</script>

<style lang="scss" scoped>
.contactStep3 {
  text-align: center;

  &_text {
    margin: $spacing_5x auto;
  }
}
</style>
