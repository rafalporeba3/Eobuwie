<template>
  <div class="c-separator"></div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'cSeparator',
});
</script>

<style scoped
       lang="scss">

.c-separator {
  width: 100%;
  border-top: $f1 solid rgb(var(--grey-500));
  margin: $f21 0;
}

</style>
