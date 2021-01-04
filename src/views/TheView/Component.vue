<template>
  <div class="the-view">
    <nav class="navbar navbar-light bg-light">
      <button
        @click="isModalVisible = true"
        type="button"
        class="btn btn-primary ml-auto"
      >
        Edit
      </button>
    </nav>
    <ul class="list-group">
      <transition-group name="item-fade">
        <li
          v-for="item in items"
          :key="item.id"
          class="item list-group-item w-100 border-top-0 border-left-0 border-right-0"
        >
          {{ item.name }}
        </li>
      </transition-group>
    </ul>
    <teleport to="#modal-overlay">
      <the-modal
        v-if="isModalVisible"
        :items="items"
        @on-cancel-click="isModalVisible = false"
        @on-delete-click="deleteItems"
      />
    </teleport>
    <teleport to="#loader-overlay">
      <the-loader v-if="isLoaderVisible" />
    </teleport>
  </div>
</template>

<script lang="ts">
import { Item } from '@/types'

import { Options, Vue } from 'vue-class-component'
import { fetchItems, fetchRemainedItems } from './module'

import TheModal from '@/components/TheModal/Component.vue'
import TheLoader from '@/components/TheLoader/Component.vue'

@Options({
  components: {
    TheModal,
    TheLoader
  }
})
export default class TheView extends Vue {
  private items: Item[] = []
  private isModalVisible = false
  private isLoaderVisible = false

  public async created () {
    this.isLoaderVisible = true
    this.items = await fetchItems(20)
    this.isLoaderVisible = false
  }

  private async deleteItems (deleteTargetIds: number[]) {
    this.isModalVisible = false
    this.isLoaderVisible = true
    this.items = await fetchRemainedItems(deleteTargetIds)(this.items)
    this.isLoaderVisible = false
  }
}
</script>

<style lang="scss" scoped>
.item {
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-fade-leave-active {
  animation: shrink .4s;
  overflow: hidden;
}
@keyframes shrink {
  100% {
    height: 0;
    padding-top: 0;
    padding-bottom: 0;
    border: 0;
    opacity: 0;
  }
}
</style>
