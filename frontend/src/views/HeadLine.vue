<template>
    <hooper
        :itemsToShow="5"
        :infiniteScroll="true"
        :centerMode="false"
        style="height: 660px"
        :wheelControl="false"
    >
        <slide v-for="video in headLine" v-bind:key="video.id" style="padding-left: 1vw; padding-right: 1vw">
            <v-card
                class="mx-auto"
                max-width="400"
                ma-5
            >
                <v-img
                    class="white--text align-end"
                    height="500px"
                    :src="video.display.medium"
                >
                    <v-card-title style="background: rgba(0,0,0,0.3)">
                        {{ video.name }}
                    </v-card-title>
                </v-img>

                <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

                <v-card-text class="text--primary">
                    <div>Whitehaven Beach</div>

                    <div>Whitsunday Island, Whitsunday Islands</div>
                </v-card-text>

                <v-card-actions
                    v-if="video.display.type === 'MOVIE'"
                >
                    <v-btn
                        color="primary"
                        text
                    >
                        Lecture <v-icon x-small>fa-play</v-icon>
                    </v-btn>
                </v-card-actions>

                <v-card-actions
                    v-if="video.display.type === 'SERIE'"
                >
                    <v-btn
                        color="primary"
                        text
                    >
                        Liste des saisons
                    </v-btn>
                </v-card-actions>

            </v-card>
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
    </hooper>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import { Apollo } from "../decorators"

import HEAD_LINE from "../graphql/HeadLine.gql"

@Component
export default class HeadLine extends Vue {

    @Apollo({
        query: HEAD_LINE,
        result({ data, loading, networkStatus }: any) {
            if (!loading) {
                if (data) {
                    this.headLine = data.videos
                }
            }
        }
    })
    headLine = []

}
</script>

<style>

</style>