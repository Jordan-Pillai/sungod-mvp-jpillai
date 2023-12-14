<template>
  <div class="image-comparison container h-screen">
    <img
      :src="image.src"
      :srcset="image.srcSet"
      :sizes="image.sizes"
      :width="image.width"
      :height="image.height"
      :alt="image.sceneName"
    />
    <img
      :src="overlayImage.src"
      :srcset="overlayImage.srcSet"
      :sizes="overlayImage.sizes"
      :width="overlayImage.width"
      :height="overlayImage.height"
      :alt="overlayImage.sceneName"
      class="overlay-image"
    />
    <input
      type="range"
      min="0"
      max="100"
      v-model="slideValue"
      @input="slide"
      class="slider top-1/4 sm:top-0"
    />
  </div>
</template>

<script>
export default {
  props: {
    image: Object,
    overlayImage: Object,
  },
  data() {
    return {
      slideValue: 50,
    };
  },
  methods: {
    slide() {
      const slideValue = this.slideValue;
      document.querySelector(
        ".overlay-image"
      ).style.clipPath = `polygon(0 0, ${slideValue}% 0, ${slideValue}% 100%, 0 100%)`;
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
}

.overlay-image {
  clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
}

.slider {
  position: relative;
  appearance: none;
  width: calc(100% + 56px);
  height: 100%;
  margin-left: -27px;
  background-color: transparent;
  outline: none;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  height: 56px;
  width: 56px;
  background: url("../assets/drag-cursor.svg");
  border-radius: 50%;
  background-size: contain;
  cursor: pointer;
}

/* For Firefox */
.slider::-moz-range-thumb {
  appearance: none;
  height: 56px;
  width: 56px;
  background: url("../assets/drag-cursor.svg");
  border-radius: 50%;
  background-size: contain;
  cursor: pointer;
}
</style>
