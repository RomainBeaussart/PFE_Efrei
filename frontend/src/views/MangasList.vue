<template>
    <v-container fluid>
        <v-layout wrap class="d-flex justify-center">
            <v-flex xs4>
                <v-text-field
                    v-model="search"
                    label="Recherche"
                    placeholder="Recherche"
                    append-outer-icon="search"
                    @click:append-outer="getAPI()"
                    @keyup.enter="getAPI()"
                    outlined
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout wrap v-if="mangas && mangas.length && mangas.length > 0">
            <v-flex xs3 my-2
                v-for="manga in mangas" :key="manga.resultUrl"
            >
                <v-card
                    class="mx-auto"
                    outlined
                    max-width="400"
                >
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1">{{manga.resultName}}</v-list-item-title>
                            <v-list-item-subtitle>{{ manga.resultGenre }}</v-list-item-subtitle>
                            <v-card-actions>
                                <v-btn text @click="getComics(manga)">Lire</v-btn>
                             </v-card-actions>
                        </v-list-item-content>
                        <img :src="manga.resultThumbImageUrl" />
                    </v-list-item>
                    <v-progress-linear :value="progresses[manga.resultUrl] * 100"></v-progress-linear>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout wrap v-else-if="mangas && mangas.length && mangas.length === 0">
            <v-flex xs4
                v-for="manga in mangas" :key="manga.resultUrl"
            >
                Aucun Manga n'a été trouvé
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator"

import { search, comics } from '../services/index'

import MANGAS_PROGRESS from '../graphql/SeasonProgression.gql'


@Component
export default class Manga extends Vue {
    search: string = ""
    mangas: Array<any> = []
    progresses: any = {}

    async getAPI(){
        const result = await search(this.search)
        this.mangas = result.data.results
        this.mangas.forEach(async (manga) => {
            let progress = await this.$apollo.query({
                query: MANGAS_PROGRESS,
                variables: {
                    userID: this.$store.state.user.id,
                    progressURL: manga.resultUrl,
                    type: "MANGA"
                }
            })
            debugger
            this.progresses[manga.resultUrl] = progress.data.seasonProgression.progression
        });
        console.log(this.progresses)
    }

    getComics(manga: any) {
        this.$router.push({
            name:'mangaChapters',
            params: {
                urlComics: manga.resultFullUrl,
                mangaName: manga.resultName
            }
        })
    }
}
</script>

<style>

</style>