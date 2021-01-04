<template>
  <div class="the-view">
    <ul class="list-group">
      <li
        v-for="item in items"
        :key="item.id"
        class="item list-group-item w-100 border-top-0 border-left-0 border-right-0"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Item } from '@/types'

import { Vue } from 'vue-class-component'

export default class TheView extends Vue {
  private items: Item[] = []
}
</script>
