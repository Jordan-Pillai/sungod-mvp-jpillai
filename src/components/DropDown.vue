<template>
  <div class="flex flex-col items-center w-full py-6">
    <select
      :id="dropdownId"
      :value="selectedValue"
      @input="updateSelectedValue"
      class="block w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    selectedValue: {
      type: [String, Number],
      default: null,
      required: true,
    },
    dropdownId: {
      type: String,
      default: "dropdown",
    },
  },
  methods: {
    updateSelectedValue(event) {
      this.$emit("update:selectedValue", event.target.value);
    },
  },
};
</script>
