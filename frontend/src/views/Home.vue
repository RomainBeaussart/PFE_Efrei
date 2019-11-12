<template>
    <HeadHome
        width="100%"
        v-bind:videos="headHomeVideos"
    ></HeadHome>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import { Apollo } from "../decorators"

import VIDEOS from "../graphql/Videos.gql"

import HeadHome from './HeadHome.vue'

@Component({
    components: {
        HeadHome
    }
})
export default class Home extends Vue {

    @Apollo({
        query: VIDEOS,
        result({ data, loading, networkStatus }: any) {
            if (!loading) {
                if (data) {
                    console.log(data)
                    this.headHomeVideos = data.videos
                }
            }
        }
    })
    headHomeVideos = []

}
</script>

<style>

</style>