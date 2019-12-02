<template>
    <v-container fluid v-if="series.length">
        <v-layout :style="background">
            <hooper ref="hooper" style="height: 100%; width: 45%; margin-left: auto" :vertical="true" :settings="hooperSettings" @slide="updateCarousel">
                <slide v-for="serie in series" v-bind:key="serie.id" style="height: 25vh">
                    <v-card
                        height="24vh"
                        class="headline"
                        style="overflow: hidden"
                        dark
                        @click="openSerie(serie.id)"
                    >
                        <v-layout>
                            <v-flex xs5>
                                <v-img
                                    :src="serie.display.medium"
                                    height="24vh"
                                ></v-img>
                            </v-flex>
                            <v-flex xs7>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </slide>
            </hooper>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import { Apollo } from "../decorators";

import SERIES from "../graphql/Series.gql";

@Component
export default class Series extends Vue {

    currentSlide = 0

    get background() {
        return "background: url('" + this.series[this.currentSlide].display.big +"') 0% 0% / cover; height: 100%"
    }

    hooperSettings: any = {
        itemsToShow: 4,
        currentSlide: 0,
        centerMode: true
    }

    @Apollo({
        query: SERIES,
        result({ data, loading, networkStatus }: any) {
            if (!loading) {
                if (data && data.series) {
                    this.series = data.series
                }
            }
        }
    })
    series: Array<any> = []

    openSerie(id) {
        this.$router.push({
            name: "serie",
            params: {
                id: id,
            }
        });
    }

    updateCarousel(payload) {
        console.log(payload.currentSlide)
        this.currentSlide = payload.currentSlide
    }

    print() {
        console.log(this.currentSlide)
    }
}
</script>
