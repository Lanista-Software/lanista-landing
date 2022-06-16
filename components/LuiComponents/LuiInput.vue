<template>
  <div :class="attrClasses">
    <div :class="[parentClasses]">
      <lui-icon
        v-if="prepend !== 'none'"
        :name="prepend"
        :class="[iconClasses.size, iconClasses.position, iconClasses.prepend]"
        line
      />
      <input
        ref="Linput"
        v-bind="$attrs"
        :class="computedClasses"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
      <lui-button
        v-if="clear && !$attrs.disabled"
        type="link"
        variant="secondary"
        icon="close"
        :size="size"
        disable-styles
        :class="[iconClasses.position, iconClasses.clear]"
        @click="$emit('onInputClean')"
      />
      <lui-icon
        v-if="state !== null"
        :name="iconClasses.name"
        :class="[
          iconClasses.size,
          iconClasses.color,
          iconClasses.position,
          iconClasses.state,
        ]"
        line
      />
    </div>
    <p v-if="description !== 'none'" :class="descriptionClasses">
      {{ description }}
    </p>
  </div>
</template>
<script>
import { generateClasses } from '../../mixins/methods'
import * as prop from '../../mixins/props'
import LuiIcon from './LuiIcon.vue'
import LuiButton from './LuiButton.vue'
export default {
  components: {
    LuiIcon,
    LuiButton,
  },
  mixins: [
    prop.string('prepend'),
    // prop.string('modelValue', ''),
    prop.size('sm', ['sm', 'md', 'lg']),
    prop.boolean('clear'),
    prop.string('description'),
  ],
  inheritAttrs: false,
  props: {
    state: {
      type: [String, Boolean, null],
      default: null,
      validator(value) {
        return [null, 'warning', true, false].includes(value)
      },
    },
    value: {
      type: String,
      default: '',
    },
  },
  // emits: ['update:modelValue'],
  computed: {
    attrClasses() {
      return this.$attrs.class
    },
    computedClasses() {
      const classes = {
        paddingLeft:
          this.prepend === 'none'
            ? this.size === 'lg'
              ? 'pl-3'
              : 'pl-2'
            : this.size === 'lg' // icon varsa
            ? 'pl-11'
            : this.size === 'md'
            ? 'pl-9'
            : 'pl-8',
        paddingRight:
          this.state !== null && this.clear === true // two icon on right
            ? this.size === 'lg'
              ? 'pr-20'
              : this.size === 'md'
              ? 'pr-16'
              : 'pr-14'
            : this.state === null && this.clear === false // no icon on right
            ? this.size === 'lg'
              ? 'pr-3'
              : 'pr-2'
            : this.size === 'lg' // one icon on right
            ? 'pr-11'
            : this.size === 'md'
            ? 'pr-9'
            : 'pr-8',
        paddingY:
          this.size === 'sm' ? 'py-1.5' : this.size === 'md' ? 'py-2' : 'py-3',
        border:
          this.state === 'warning'
            ? 'border border-warning'
            : this.state === true
            ? 'border border-success'
            : this.state === false
            ? 'border border-danger'
            : 'border border-info-200',
        ring:
          this.state === 'warning'
            ? 'ring-4 ring-warning-100'
            : this.state === true
            ? 'ring-4 ring-success-100'
            : this.state === false
            ? 'ring-4 ring-danger-100'
            : '',
        borderRadius: `rounded-${this.size}`,
        fontSize: this.size === 'sm' ? 'text-xs' : 'text-base',
        lineHeight: this.size === 'sm' ? 'leading-4.5' : 'leading-6',
        fontColor: 'placeholder-info-400 text-info-600',
        width: 'w-full',
      }
      const stateClasses = {
        focus: {
          ring:
            this.state === null ? 'focus:ring-4 focus:ring-primary-100' : '',
          outline: 'outline-none',
          border: this.state === null ? 'focus:border-primary' : '',
        },
        disabled: {
          border: 'disabled:border-info',
          backgroundColor: 'disabled:bg-info-100',
          fontColor: 'disabled:text-info-300',
          ring: 'disabled:ring-0 disabled:ring-transparent',
        },
      }
      const { focus, disabled } = stateClasses
      return generateClasses([{ ...classes }, { ...focus }, { ...disabled }])
    },
    descriptionClasses() {
      const textColor =
        this.state === true
          ? 'text-success'
          : this.state === false
          ? 'text-danger'
          : this.state === 'warning'
          ? 'text-warning'
          : 'text-info-600'
      return `${textColor} inline-block text-xs leading-4.5 mt-1`
    },
    iconClasses() {
      return {
        name:
          !!this.$attrs.disabled === true
            ? 'forbid'
            : this.state === 'warning'
            ? 'feedback'
            : this.state === false
            ? 'error-warning'
            : this.state === true
            ? 'checkbox-circle'
            : '',
        size:
          this.size === 'sm'
            ? 'text-base'
            : this.size === 'md'
            ? 'text-xl'
            : 'text-2xl',
        color:
          !!this.$attrs.disabled === true
            ? 'text-info-300'
            : this.state === 'warning'
            ? 'text-warning'
            : this.state === false
            ? 'text-danger'
            : this.state === true
            ? 'text-success'
            : '',
        position: 'absolute top-2/4 transform -translate-y-1/2',
        prepend:
          this.size === 'lg' ? 'text-info-400 left-3' : 'text-info-400 left-2',
        state: this.size === 'lg' ? 'right-3' : 'right-2',
        clear:
          this.state === null
            ? this.size === 'lg'
              ? 'right-3'
              : 'right-2'
            : // sm:56 md:64 - 16 lg:48 = 20
            this.size === 'lg'
            ? 'right-12'
            : this.size === 'md'
            ? 'right-9'
            : 'right-8',
      }
    },
    parentClasses() {
      return 'relative'
    },
  },
}
</script>
<style scoped>
input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  display: none;
}
</style>
