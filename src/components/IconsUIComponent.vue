<template>
  <div class="widget__icon" :class="{'absolute': absolute}">
    <svg class="icon" :width="width" :height="height" viewBox="0 0 24 24" :fill="fill">
      <path :d="icons[icon]"></path>
    </svg>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {icons} from '@/components/icons.ui';

export default defineComponent({
  name : 'icon-component',
  props : {
    w:{
      default: 24
    },
    h:{
      default: 24
    },
    icon:{
      default: ''
    },
    fill:{
      default: 'gray'
    },
    absolute:{
      default: false
    }

  },
  computed: {
    width() {
      return (this.absolute) ? `${this.w}%` : `${this.w}px`;
    },
    height() {
      return (this.absolute) ? `${this.h}%` : `${this.h}px`;
    }
  },
  data() {
    return {
		icons: icons
    }
  }
});
</script>