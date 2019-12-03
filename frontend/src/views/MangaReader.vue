<template>
    <v-container fluid>
        <v-layout wrap class="d-flex justify-center display-2">
            <v-flex xs8 class="d-flex justify-space-between">
                <v-btn
                    color="primary"
                    @click="previousPage()"
                >
                    <v-icon>arrow_left</v-icon>
                </v-btn>
                {{ currentPage + 1 }} / {{ chapter.pageCount }}
                <v-btn
                    color="primary"
                    @click="nextPage()"
                >
                    <v-icon>arrow_right</v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs8 v-if="page.pageImage">
                <center>
                    <img :src="page.pageImage.imageSource"/>
                </center>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator"

import { chapters, page } from '../services/index'

@Component
export default class Manga extends Vue {
    @Prop() urlChapiter: string

    search: string = ""
    chapter: any = {}
    currentPage = 0
    page: any = {}

    async mounted() {
        const result = await chapters(this.urlChapiter)
        this.chapter = result.data
        console.log(this.chapter)
        this.getPage(0)
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
    }

}
</script>

<style>

</style>