<template>
  <container>
        <v-progress-linear
            color="red darken-2"
            rounded
            value="100"
        ></v-progress-linear>
  </container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import { Apollo } from "../decorators"

@Component
export default class Serie extends Vue {
    get id() {
        return this.$route.params.id;
    }
}
</script>

<style>

</style>