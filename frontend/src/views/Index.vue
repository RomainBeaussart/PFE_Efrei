<template>
    <v-container>
        <router-view></router-view>
    </v-container>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class Index extends Vue {

}
</script>
