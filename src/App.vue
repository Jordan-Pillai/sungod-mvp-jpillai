<template>
  <div class="mx-auto h-full container">
    <div class="flex flex-col h-full" :style="{ userSelect: 'none' }">
      <div class="flex flex-col-reverse sm:flex-row h-full">
        <div class="flex flex-col items-center mr-4 w-full sm:w-2/5 p-6">
          <!-- NOTE: Text added below purely to demonstrate retrieving product data
          MVP design did not have indications of the need for the use of this data -->
          <div>
            <h1 class="text-2xl font-bold mt-4">{{ productData.name }}</h1>
            <h2 class="text-lg font-semibold mt-2">
              {{ productData.productInfoTitle }}
            </h2>
            <p class="text-gray-600 mt-2">{{ productData.productInfoText }}</p>
          </div>
          <Dropdown
            :options="lensOptions"
            :selectedValue="selectedLens"
            @update:selectedValue="handleSelectedLensUpdate"
            :dropdownId="lensDropdownId"
          />
        </div>
        <div
          class="w-full relative"
          v-if="activeItem && activeSceneImages[selectedLens]"
        >
          <ImageComparison
            :image="activeItem.nakedEyeImage.responsiveImage"
            :overlayImage="
              activeSceneImages[selectedLens].image.responsiveImage
            "
          />
          <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <SceneSelector :lensData="lensData" @selectItem="selectItem" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageComparison from "./components/ImageComparison.vue";
import Dropdown from "./components/DropDown.vue";
import SceneSelector from "./components/SceneSelector.vue";

import { useHead } from "@unhead/vue";

export default {
  components: {
    Dropdown,
    ImageComparison,
    SceneSelector,
  },

  data() {
    return {
      lensData: [],
      activeItem: null,
      selectedLens: null,
      activeSceneImages: {},
      lensOptions: [],
      lensDropdownId: "lensDropdown",
      selectedLens: "",
      productData: {},
    };
  },

  methods: {
    async fetchLensData() {
      try {
        const response = await this.$axios.get(
          "https://gist.githubusercontent.com/robwatkiss/09f2461e02d372747dad5fe56ff2251f/raw/b942d9ba21e10889a6cfce639c1a12f6bb2bfa0e/Senior%2520Frontend%2520Developer%2520Task%2520-%2520Sample%2520Lens%2520Guide%2520Data.json"
        );

        this.lensData = response.data;
        this.activeItem = this.lensData[0];
        this.selectedLens = this.activeItem
          ? Object.keys(this.activeItem.sceneImages)[0]
          : null;
        this.activeSceneImages = this.activeItem
          ? this.activeItem.sceneImages
          : {};
        this.lensOptions = Object.keys(this.activeItem.sceneImages).map(
          (key) => ({
            label: `${this.activeItem.sceneImages[key].lensType} ${this.activeItem.sceneImages[key].lensColour}`,
            value: key,
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async fetchProductData() {
      try {
        const response = await this.$axios.get(
          "https://www.sungod.co/products/9150/renegades?pdp=1"
        );

        const { renegades } = response.data;

        this.productData = {
          ...renegades,
        };

        const titleTagObject = renegades.meta.find(
          (item) => item.tag === "title"
        );

        const metaArray = renegades.meta.map((item) => ({
          ...item.attributes,
        }));

        useHead({
          title: titleTagObject.content,
          meta: metaArray,
        });
      } catch (error) {
        console.error("Error fetching new API data:", error);
      }
    },

    selectItem(item) {
      this.activeItem = item;
      this.activeSceneImages = item ? item.sceneImages : {};
      this.selectedLens = item ? Object.keys(item.sceneImages)[0] : null;
    },

    handleSelectedLensUpdate(newSelectedLens) {
      this.selectedLens = newSelectedLens;
    },
  },

  mounted() {
    this.fetchLensData();
    this.fetchProductData();
  },
};
</script>
