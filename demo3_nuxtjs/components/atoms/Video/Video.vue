<template>
  <div :key="trigger" class="youtube-container" :style="styles">
    <div v-show="stateButton" id="play-button" class="button">
      <img
        :src="require(`@/assets/images/icon/icon-play-video.svg`)"
        alt="video play icon"
        width="100"
        height="100"
      />
    </div>
    <iframe
      id="video"
      :src="`${src}?mute=2`"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  onUpdated,
  watch
} from '@nuxtjs/composition-api'

declare let YT: any
interface VideoProps {
  width: string
  height: string
  src: string
}
export default defineComponent({
  name: 'Video',

  props: {
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: '250px'
    },
    src: {
      type: String,
      default: 'https://www.youtube.com/embed/akeytNVcIy4'
    }
  },
  setup(props: VideoProps) {
    const styles = computed(() => {
      return {
        width: props.width,
        height: props.height
      }
    })

    const stateButton = ref(true)
    const handlePlay = () => {
      setTimeout(() => (stateButton.value = false), 300)
    }

    const trigger = ref(0)

    const initYoutube = () => {
      //wait for script done load
      setTimeout(() => onYouTubePlayerAPIReady(), 2000)
      // global variable for the player
      let player

      // this function gets called when API is ready to use
      function onYouTubePlayerAPIReady() {
        // create the global player from the specific iframe (#video)
        player = new YT.Player('video', {
          events: {
            // call this function when player is ready to use
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
          }
        })
      }

      function onPlayerReady() {
        // bind events
        const playButton = document.getElementById('play-button')

        if (playButton)
          playButton.addEventListener('click', () => {
            player.playVideo()
            handlePlay()
          })
      }

      function onPlayerStateChange(event) {
        if (event.data === 0) {
          trigger.value += 1
          stateButton.value = true
        }
      }
    }

    onMounted(() => {
      initYoutube()
    })
    onUpdated(() => {
      initYoutube()
    })

    watch(
      () => stateButton.value,
      () => {
        const elem = document.getElementById('video')

        if (elem) {
          elem.style.pointerEvents = 'auto'
        }
      }
    )

    return { styles, handlePlay, stateButton, trigger }
  }
})
</script>

<style lang="scss" scoped>
.youtube-container {
  overflow: hidden;
  aspect-ratio: 16/9;
  position: relative;

  .button {
    position: absolute;
    width: 100px;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
  }
  iframe {
    width: 300%;
    height: 100%;
    pointer-events: none;
    margin-left: -100%;
  }
}
</style>
