<template>
  <div class="mb-5 p-1 rounded-lg bg-white">
    <ul class="flex">
      <li
        v-for="item in lensData"
        :key="item.sceneName"
        @click="selectItem(item)"
        class="mr-1 last:mr-0 cursor-pointer relative"
      >
        <img
          :src="item.nakedEyeImage.responsiveImage.src"
          alt="Thumbnail"
          class="w-12.5 h-12.5 object-cover rounded-md"
        />
        <img
          v-if="item === selectedItem"
          src="../assets/Overlay.png"
          class="absolute top-0 left-0 object-cover rounded-md"
        />
        <img
          v-if="item === selectedItem"
          src="../assets/landscape.svg"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    lensData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedItem: this.lensData.length > 0 ? this.lensData[0] : null,
    };
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
      this.$emit("selectItem", item);
    },
  },
};
</script>
