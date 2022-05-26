<template>
  <div ref="animatedBackgroundDOM" class="animatedBackground">
    <div
      id="particleSmall"
      class="is-pc animatedBackground_particle animatedBackground_particleSmall"
      :style="{ transform: `translate3d(0px, -${particleSmall}px, 0px)` }"
    ></div>
    <div
      id="particleMedium"
      class="animatedBackground_particle animatedBackground_particleMedium"
      :style="{ transform: `translate3d(0px, -${particleMedium}px, 0px)` }"
    ></div>
    <div
      id="particleLarge"
      class="animatedBackground_particle animatedBackground_particleLarge"
      :style="{ transform: `translate3d(0px, -${particleLarge}px, 0px)` }"
    ></div>
    <div class="animatedBackground_content">
      <slot name="contents" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AnimatedBackground',

  setup() {
    const particleSmall = ref<number>()
    const particleMedium = ref<number>()
    const particleLarge = ref<number>()

    // TODO: get animatedBackground height
    // const animatedBackgroundDOM = ref<HTMLImageElement | null>(null)
    // const animatedBackgroundHeight = ref<number>()
    // onMounted(() => {
    //   animatedBackgroundHeight.value =
    //     animatedBackgroundDOM.value?.getBoundingClientRect().height + 1000
    // })

    let timer: null | ReturnType<typeof setTimeout>
    const FPS: number = 1000 / 600
    const handleAnimation = () => {
      if (timer) clearTimeout(timer)

      timer = setTimeout(() => {
        timer = null
        const elm: HTMLElement | null = document?.querySelector('#particleSmall')
        let numParticleTop
        if (elm) {
          numParticleTop = elm.offsetTop
        }
        const value = window.scrollY

        particleSmall.value = numParticleTop + value / 2
        particleMedium.value = numParticleTop + value / 4
        particleLarge.value = numParticleTop + value / 8
      }, FPS)
    }

    if (process.client) {
      document.addEventListener('scroll', handleAnimation, { passive: true })
    }

    return {
      // animatedBackgroundDOM,
      // animatedBackgroundHeight,
      particleSmall,
      particleMedium,
      particleLarge
    }
  }
})
</script>
<style lang="scss" scoped>
.animatedBackground {
  // height: 5000px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(179.48deg, #cad7db 3.48%, #d7cdbf 92.91%);

  &_particle {
    position: absolute;
    top: 30px;
    width: auto;
    z-index: 1;
  }

  &_particleSmall {
    background-image: url('../../../assets/images/common/background-toppage/background_small.svg');
    background-repeat: repeat-y;
    width: 100%;
    height: 200%;
    background-size: contain;
  }

  &_particleMedium {
    background-image: url('../../../assets/images/common/background-toppage/background_medium.svg');
    background-repeat: repeat-y;
    width: 100%;
    height: 200%;
    background-size: contain;
  }

  &_particleLarge {
    background-image: url('../../../assets/images/common/background-toppage/background_large.svg');
    background-repeat: repeat-y;
    width: 100%;
    height: 200%;
    background-size: contain;
  }

  &_content {
    position: relative;
    z-index: 1;
  }
}
</style>
