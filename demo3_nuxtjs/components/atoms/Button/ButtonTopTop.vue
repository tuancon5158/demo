<template>
  <div class="buttonToTop" :class="{ 'buttonToTop--display': showButtonToTop }">
    <div class="buttonToTop_wrapper">
      <button type="button" @click="scrollToTop">
        <img
          src="../../../assets/images/icon/icon-arrow-top.svg"
          alt="icon arrow top"
          width="28"
          height="14"
        />
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from '@nuxtjs/composition-api'
import { defineComponent, onMounted } from '@vue/composition-api'

export default defineComponent({
  name: 'ButtonToTop',

  props: {},
  setup() {
    const showButtonToTop = ref(false)

    // click button back to top scroll top
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      // remove id in url
      setTimeout(() => {
        history.replaceState(
          '',
          document.title,
          window.location.origin + window.location.pathname + window.location.search
        )
      }, 0)
    }

    // auto detect scroll show when user scroll
    const scrollFunction = (e) => {
      if (e.target.scrollingElement.scrollTop > 20) {
        showButtonToTop.value = true
      } else {
        showButtonToTop.value = false
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', scrollFunction)
    })

    return {
      scrollToTop,
      showButtonToTop
    }
  }
})
</script>
<style lang="scss" scoped>
.buttonToTop {
  position: relative;
  transition: all 0.3s;
  z-index: 999;
  bottom: 0;
  opacity: 0;

  &--display {
    opacity: 1;
  }

  &_wrapper {
    position: relative;
    width: 100%;
  }

  button {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: $color_yellow_new;
    width: 51px;
    height: 51px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
