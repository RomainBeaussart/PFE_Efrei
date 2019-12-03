<template>
    <v-container fluid>
        <v-layout wrap>
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
        <v-layout wrap>
            <v-flex xs4
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
                                <v-btn text @click="getComics(manga.resultFullUrl, manga.resultName)">Lire</v-btn>
                             </v-card-actions>
                        </v-list-item-content>
                        <img :src="manga.resultThumbImageUrl" />
                    </v-list-item>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator"

import { search, comics } from '../services/index'

@Component
export default class Manga extends Vue{
    search: string = ""
    mangas: Array<any> = []

    async getAPI(){
        const result = await search(this.search)
        this.mangas = result.data.results
    }

    getComics(url: string, name: string) {
        this.$router.push({name:'mangaChapters', params: {
            urlComics: url,
            mangaName: name
        }})
    }
}
</script>

<style>

</style>