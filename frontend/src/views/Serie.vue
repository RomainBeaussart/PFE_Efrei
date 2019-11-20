<template>
    <v-container v-if="serie">
        <v-layout :style="background">
            <v-layout row style="margin:20vh 0 0 0" xs12>
                <v-flex
                    style="color: white; text-align: center; text-shadow: 0px 0px 10px #4F4F4F;"
                    class="align-center font-weight-black display-4"
                >
                    {{ serie.name }}
                </v-flex>
                <v-flex
                    xs12
                    v-for="season in serie.seasons"
                    v-bind:key="season.id"
                >
                    <hooper :itemsToShow="4.5">
                        <slide v-for="episode in season.episodes" v-bind:key="episode.id">
                            <v-card
                                :style="getEpisodeStyle(episode.display.medium)"
                                height="20vh"
                                class="headline"
                                dark
                            >
                                <v-layout row>
                                    <v-flex xs12>
                                        {{ episode.name }}
                                    </v-flex>
                                    <v-flex xs12 mt-5>
                                        <v-btn
                                            :color="'#' + serie.color"
                                        >
                                            Lire <v-icon>play_circle_outline</v-icon>
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-progress-linear
                                            :value="40"
                                            rounded
                                            absolute
                                            bottom
                                            background-color="white"
                                            :color="'#' + serie.color"
                                        ></v-progress-linear>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                        </slide>
                    </hooper>
                </v-flex>
                <v-flex xs12 style="margin-left: auto; margin-right: auto">
                    <v-progress-linear
                        :color="'#' + serie.color"
                        rounded
                        style="width: 70%; float: right; margin-right: 1%"
                        height="10px"
                        :value="avencement"
                    ></v-progress-linear>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import { Apollo } from "../decorators";

import SERIE from "../graphql/Serie.gql";

@Component
export default class Serie extends Vue {
    avencement = 99;

    serie: any = null;

    get id() {
        return this.$route.params.id;
    }

    getEpisodeStyle(imageUrl) {
        return "background: url('" + imageUrl +"') 0% 0% / cover; margin: 0.5vw; padding: 0.5vw; text-align: center "
    }

    get background() {
        return "background: url('" + this.serie.display.big +"') 0% 0% / cover; height: 100%"
    }

    @Apollo({
        query: SERIE,
        variables() {
            return {
                id: this.id
            }
        },
        result({ data, loading, networkStatus }: any) {
            if (!loading) {
                if (data && data.serie) {
                    this.serie = data.serie
                }
            }
        }
    })

    @Watch("serie")
    test() {
        console.log(this.serie);
    }
}
</script>
