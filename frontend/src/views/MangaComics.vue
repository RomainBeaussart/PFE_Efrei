<template>
    <v-container fluid>
        <v-layout wrap class="d-flex justify-center display-2">
            <v-flex xs12 class="d-flex justify-center display-2" my-5>
                {{ mangaName }}
            </v-flex>
            <v-flex xs6>
                <v-data-table
                    :hide-default-header="true"
                    :items="chapters"
                    :items-per-page="-1"
                    elevation="0"
                    
                >
                    <template slot="item" slot-scope="props">
                        <tr style="cursor: pointer" @click="read(props.item.chapterFullUrl)">
                            <td> {{ props.item.chapterTitle }} </td>
                            <td> {{ props.item.chapterDate }} </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator"

import { comics } from '../services/index'

@Component
export default class Manga extends Vue {
    @Prop() urlComics: string
    @Prop() mangaName: string

    search: string = ""
    chapters: Array<any> = []

    async mounted() {
        const result = await comics(this.urlComics)
        this.chapters = result.data.chapters
        console.log(this.chapters)
    }

    read(url: string) {
        this.$router.push({name:'manga', params: {
            urlChapiter: url
        }})
    }

}
</script>

<style>

</style>