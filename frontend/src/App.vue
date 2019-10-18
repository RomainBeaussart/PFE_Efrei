<template>
  <v-app>
    <router-view class="body"></router-view>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
    get page() {
        return this.$router.currentRoute.name
    }
}
</script>
<style lang="scss">

</style>
