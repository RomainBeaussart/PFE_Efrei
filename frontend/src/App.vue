<template>
    <v-app>
        <router-view></router-view>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'hooper/dist/hooper.css';


@Component
export default class App extends Vue {
    get page() {
        return this.$router.currentRoute.name
    }
}
</script>
<style>

</style>
