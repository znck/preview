<script lang="ts">
import ConfiguredDevice from './ConfiguredDevice.vue';
import BaseDevice from './BaseDevice.vue';
import { computed, defineComponent } from 'vue';
import FreeformDevice from './FreeformDevice.vue';

import devices from '../devices';
export default defineComponent({
  props: {
    name: { type: String, default: 'freeform' },
  },
  components: {
    ConfiguredDevice,
    BaseDevice,
    FreeformDevice,
  },
  setup(props) {
    const device = computed(() => devices[props.name]);

    return { device };
  },
});
</script>

<template>
  <FreeformDevice v-if="name === 'freeform'">
    <slot />
  </FreeformDevice>
  <template v-else-if="device">
    <ConfiguredDevice :device="device">
      <slot />
    </ConfiguredDevice>
  </template>
  <div v-else>Unsupported device: {{ name }}</div>
</template>
