<template>
  <div class="newsItem">
    <div class="newsItem_date">
      {{ getYmd(dateItem) }}
    </div>
    <component
      :is="urlLink ? 'a' : 'nuxt-link'"
      class="newsItem_link"
      :class="classes"
      :to="urlLink ? '' : localePath(`/news/${id}`)"
      :href="urlLink ? urlLink : false"
      :target="urlLink ? '_blank' : false"
    >
      {{ content }}
      <div class="newsItem_label">
        <Label v-if="isNewArticle(dateItem)" label="New" bg-color="primary" size="small" />
      </div>
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import Label from '~/components/atoms/Label/Label.vue'
import { dateFormat } from '~/composables/utilities/dateFormat'

// props type
type NewsItemProps = {
  dateItem: string
  content: string
  id: string
  urlLink: string
  linkColor: string
}

export default defineComponent({
  name: 'NewsItem',

  components: {
    Label
  },

  props: {
    dateItem: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    urlLink: {
      type: String,
      default: ''
    },
    linkColor: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return ['white', 'primary', 'secondary'].includes(value)
      }
    }
  },

  setup(props: NewsItemProps) {
    const classes = computed(() => {
      return {
        [`-color--${props.linkColor}`]: props.linkColor
      }
    })

    const { getYmd } = dateFormat()
    const isNewArticle = (publishedDate: Date) => {
      const date = new Date()

      date.setDate(date.getDate() - 7) // get 7 latest days from now

      if (getYmd(date) <= getYmd(publishedDate)) return true

      return false
    }

    return {
      classes,
      getYmd,
      isNewArticle
    }
  }
})
</script>

<style scoped lang="scss">
.newsItem {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 0;
  text-align: left;

  @include mb() {
    flex-direction: column;
    align-items: flex-start;
  }

  &_date {
    font-weight: $font_weight_bold;
    @include fz($font_size_medium);
    color: $color_white;
    display: inline-block;
    margin-right: $spacing_4x;

    @include mb() {
      @include fz($font_size_xsmall);
    }
  }

  &_link {
    cursor: pointer;
    @include fz($font_size_standard);
    line-height: 30px;
    transition: all 0.2s ease 0s;

    @include mb() {
      @include fz($font_size_xsmall);
    }

    &.-color {
      &--primary {
        color: $color_gray_1000;
        &:hover {
          color: $color_primary;
        }
      }

      &--secondary {
        color: $color_secondary;

        &:hover {
          opacity: $opacity_hoverLink_2;
          color: $color_blue_a_400;
        }
      }

      &--white {
        color: $color_white;
        &:hover {
          opacity: $opacity_hoverLink;
        }
      }
    }
  }

  &_label {
    display: inline-block;
    text-align: center;
    vertical-align: text-bottom;
    line-height: 1.5;
    margin-left: $spacing_1x;
  }
}
</style>
