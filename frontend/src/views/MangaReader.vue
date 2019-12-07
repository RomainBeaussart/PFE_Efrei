<template>
    <v-container fluid>
        <v-layout wrap class="d-flex justify-center">
            <v-flex xs8 class="d-flex justify-space-between">
                <v-btn
                    color="primary"
                    @click="previousPage()"
                >
                    <v-icon>arrow_left</v-icon>
                </v-btn>
                <v-col cols="2">
                    <v-text-field
                        v-model="currentPage"
                        label="Page"
                        value="example"
                        :suffix=" + chapter.pageCount ? '/ ' +chapter.pageCount : '/'"
                        outlined
                        @blur="selectPage()"
                    ></v-text-field>
                </v-col>
                <v-btn
                    color="primary"
                    @click="nextPage()"
                >
                    <v-icon>arrow_right</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout wrap class="d-flex justify-center">
            <v-flex xs4 class="d-flex justify-center">
                <v-progress-linear 
                    :value="this.currentPage / this.chapter.pageCount * 100"
                    rounded
                ></v-progress-linear>
            </v-flex>
            <v-flex xs12 v-if="page.pageImage" class="d-flex justify-center">
                <img :src="page.pageImage.imageSource" height="750"/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator"

import { Apollo } from '../decorators'

import { chapters, page } from '../services/index'

import MANGA from '../graphql/UpsertManga.gql'
import UPDATE_READING from '../graphql/UpdateMangaProgression.gql'
import PROGRESSION from '../graphql/Progression.gql'
import CREATE_PROGRESSION from '../graphql/CreateMangaProgression.gql'

@Component
export default class Manga extends Vue {
    @Prop() urlChapiter: string
    @Prop() mangaName: string
    @Prop() chapterName: string

    search: string = ""
    chapter: any = {}
    currentPage: number
    page: any = {}
    progressID= ""

    async mounted() {
        const result = await chapters(this.urlChapiter)
        this.chapter = result.data
        console.log(this.chapter)
        const url = this.urlChapiter.split("/")
        const save = await this.$apollo.mutate({
            mutation: MANGA,
            variables: {
                name: this.chapterName,
                url: "/" + url[3] + "/" + url[4],
                season: "/" + url[3],
            }
        })

        console.log(save)

        let progress = await this.$apollo.query({
            query: PROGRESSION,
            variables: {
                userID: this.$store.state.user.id,
                url: "/" + url[3] + "/" + url[4],
            }
        })
        if (progress.data.progressions.length === 0) {
            debugger
            progress = await this.$apollo.mutate({
                mutation: CREATE_PROGRESSION,
                variables: {
                    userID: this.$store.state.user.id,
                    mangaURL: "/" + url[3] + "/" + url[4],
                }
            })
            this.progressID = progress.data.createProgression.id
            this.currentPage = 0
        } else {
            this.progressID = progress.data.progressions[0].id
            this.currentPage = Math.round(progress.data.progressions[0].avancement * this.chapter.pageCount)
            debugger
        }

        this.getPage(this.currentPage)
        document.onkeydown = (e) => {
            switch (e.keyCode) {
                case 37:
                    this.previousPage()
                    break
                case 39:
                    this.nextPage()
                    break
            }
        };
    }

    previousPage() {
        if(this.currentPage > 0){
            this.currentPage --
            this.getPage(this.currentPage)
        }
    }

    nextPage() {
        if(this.currentPage < this.chapter.pageCount){
            this.currentPage ++
            this.getPage(this.currentPage)
        }
    }

    async getPage(pageNumber: number) {
        const result = await page(this.chapter.pages[pageNumber].pageFullUrl)
        this.page = result.data
        await this.$apollo.mutate({
            mutation: UPDATE_READING,
            variables: {
                avancement: this.currentPage / this.chapter.pageCount,
                id: this.progressID
            }
        })
    }

    @Watch('currentPage')
    async selectPage(){
        if(this.currentPage && this.currentPage <= this.chapter.pageCount && this.currentPage > 0) {
            this.getPage(this.currentPage)
        }
    }
}
</script>

<style>

</style>