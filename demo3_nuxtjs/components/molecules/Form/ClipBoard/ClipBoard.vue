<template>
  <div class="clipBoard">
    <transition name="copied">
      <div v-show="copied" class="clipBoard_tooltip">
        <Tooltip :text="$t('spaces.shareModal.copied')" bg-color="primary" />
      </div>
    </transition>
    <!-- input clipboard -->
    <div v-if="!textArea" class="clipBoard_input">
      <TextInput class="clipBoard_input_field" :model-value="clipText" border-color="gray" />
      <Button
        v-if="isInstanceUrl"
        class="clipBoard_button"
        bg-color="blue"
        :label="$t('spaces.instanceUrl.button')"
        @onClick="onClick"
      />
      <button v-else class="clipBoard_input_button" @click="onClick">
        {{ $t('spaces.shareModal.copy') }}
      </button>
    </div>
    <!-- textarea clipboard -->
    <div v-else class="clipBoard_textarea">
      <TextArea row="5" col="140" :model-value="clipText" />
      <div class="clipBoard_textarea_button">
        <Button
          border-color="secondary"
          bg-color="secondary"
          :label="$t('spaces.embedModal.button')"
          @onClick="onClick"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import clipboard from '@/composables/utilities/clipboard'
import TextInput from '@/components/atoms/Form/TextInput/TextInput.vue'
import TextArea from '~/components/atoms/Form/TextArea/TextArea.vue'
import Tooltip from '@/components/atoms/Tooltip/Tooltip.vue'
import Button from '~/components/atoms/Button/Button.vue'

// props type
type ClipBoardProps = {
  value: string
}

export default defineComponent({
  name: 'ClipBoard',

  components: {
    TextInput,
    TextArea,
    Tooltip,
    Button
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    textArea: {
      type: Boolean,
      default: false
    },
    isInstanceUrl: {
      type: Boolean,
      default: false
    }
  },

  setup(props: ClipBoardProps) {
    const { toClipboard } = clipboard()
    const copied = ref<boolean>(false)
    const clipText = computed(() => props.value || '')

    const onClick = async () => {
      try {
        await toClipboard(clipText.value)
        // show copied alert
        copied.value = true
        setTimeout(() => {
          copied.value = false
        }, 1500)
      } catch {
        copied.value = false
      }
    }

    return {
      onClick,
      clipText,
      copied
    }
  }
})
</script>

<style lang="scss" scoped>
.clipBoard {
  position: relative;

  &_button {
    margin-left: $spacing_3x;
    height: $input_H;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &_input {
    position: relative;

    &_button {
      cursor: pointer;
      @include fz($font_size_xxxs);
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      color: $color_white;
      background: $color_gray;
      border-radius: 0 $input_BorderRadius $input_BorderRadius 0;
      width: 60px;
      height: $input_H;
      display: block;
      text-align: center;
    }

    &_field {
      pointer-events: none;
    }
  }

  &_textarea {
    &_button {
      text-align: center;
      margin-top: $spacing_5x;
    }
  }

  &_tooltip {
    position: absolute;
    z-index: 1;
    top: -$input_H;
    left: 50%;
    transform: translate(-50%, 10px);
  }
}

.copied-enter-active {
  animation: copied-in 2s;
}

@keyframes copied-in {
  0% {
    transform: translate(-50%, 10px);
    opacity: 0;
  }
  20% {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  75% {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, 10px);
    opacity: 0.5;
  }
}
</style>
