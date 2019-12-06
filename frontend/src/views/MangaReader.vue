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
                <v-col cols="1">
                    <v-text-field
                        v-model="currentPage"
                        label="Page"
                        value="example"
                        :suffix=" + chapter.pageCount ? '/ ' +chapter.pageCount : '/'"
                        outlined
                    ></v-text-field>
                </v-col>
                <v-btn
                    color="primary"
                    @click="nextPage()"
                >
                    <v-icon>arrow_right</v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs8 v-if="page.pageImage" class="d-flex justify-center">
                <img :src="page.pageImage.imageSource" height="750"/>
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
    }

    @Watch('currentPage')
    selectPage(){
        if(this.currentPage && this.currentPage <= this.chapter.pageCount && this.currentPage > 0) {
            this.getPage(this.currentPage)
        }
    }
    


}
</script>

<style>

</style>