<template>
    <v-container fluid style="padding-left: 0; padding-right: 0">
        <HeadLine></HeadLine>
        <v-hover ma-5 v-slot:default="{ hover }">
            <v-layout mt-5 mb-3 class="title">
                Series
                <v-scroll-x-transition>
                    <small v-show="hover">Voir tout</small>
                </v-scroll-x-transition>
            </v-layout>
        </v-hover>
        <hooper
            :itemsToShow="5"
            :infiniteScroll="true"
            :centerMode="false"
            style="height: 260px"
            :wheelControl="false"
        >
            <slide v-for="serie in series" v-bind:key="serie.id" style="padding-left: 1vw; padding-right: 1vw">
                <v-card
                    class="mx-auto"
                    max-width="400"
                    ma-5
                >
                    <v-img
                        class="white--text align-end"
                        height="200px"
                        :src="serie.display.medium"
                    >
                        <v-card-title style="background: rgba(0,0,0,0.3)">
                            {{ serie.name }}
                        </v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

                    <v-card-text class="text--primary">
                        {{ serie.description }}
                    </v-card-text>

                    <v-card-actions
                        v-if="serie.display.type === 'SERIE'"
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
            <hooper-navigation slot="hooper-addons" style="background: #FFF"></hooper-navigation>
        </hooper>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import { Apollo } from "../decorators"

import SERIES from "../graphql/Series.gql"

import HeadLine from "./HeadLine.vue"

@Component({
    components: {
        HeadLine
    }
})
export default class Home extends Vue {

    hover= {
        serie: false
    }

    @Apollo({
        query: SERIES,
        result({ data, loading, networkStatus }: any) {
            if (!loading) {
                if (data) {
                    console.log(data)
                    this.series = data.series
                }
            }
        }
    })
    series = []

}
</script>

<style>
.hooper-prev, .hooper-next {
    background: rgba(0,0,0,0.5);
    height: 100%;
    color: #FFF;
}
</style>