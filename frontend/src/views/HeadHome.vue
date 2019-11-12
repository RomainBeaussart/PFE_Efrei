<template>
<v-container :key="render">
    <video-bg :source="videos[currentVideo[2]].display.trailer" img="demo/assets/bg.jpg" v-if="videos.length">
    <v-fade-transition>
        <v-layout wrap class="justify-center align-center" style="margin-top: 15vh;" v-show="showDisplay">
            <v-flex xs2 mx-3>
                <v-card
                    class="display"
                    transition="scroll-x-transition"
                    :style='`background: url("` + videos[currentVideo[0]].display.medium + `") 0% 0% / cover`'
                    @click="current_video -= 2"
                >
                </v-card>
                
            </v-flex>
            <v-flex xs2 mx-3>
                
                <v-card
                    class="display"
                    transition="scroll-x-transition"
                    :style='`background: url("` + videos[currentVideo[1]].display.medium + `") 0% 0% / cover`'
                    @click="current_video -= 1"
                >
                </v-card>
                
            </v-flex>
            <v-flex xs3 mx-3>
                
                <v-card
                    
                    class="display middle"
                    transition="scroll-x-transition"
                    :style='`background: url("` + videos[currentVideo[2]].display.medium + `") 0% 0% / cover`'
                >
                    <v-layout wrap pa-3 absolute>
                        <v-flex xs6 pa-3>
                            <v-btn
                                style="width: 100%"
                                color="primary"
                            >Animé</v-btn>
                        </v-flex>
                        <v-flex xs6 pa-3>
                            <v-btn
                                style="width: 100%"
                                ma-5
                                color="primary"
                            >Manga</v-btn>
                        </v-flex>
                    </v-layout>
                    
                </v-card>
                
            </v-flex>
            <v-flex xs2 mx-3>
                
                <v-card
                    class="display"
                    :style='`background: url("` + videos[currentVideo[3]].display.medium + `") 0% 0% / cover`'
                    @click="current_video += 1"
                >
                </v-card>
                
            </v-flex>
            <v-flex xs2 mx-3>
                
                <v-card
                    class="display"
                    :style='`background: url("` + videos[currentVideo[4]].display.medium + `") 0% 0% / cover`'
                    @click="current_video += 2"
                >
                </v-card>
                
            </v-flex>
        </v-layout>
    </v-fade-transition>
    </video-bg>
</v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import { Apollo } from "../decorators"
import VIDEOS from "../graphql/Videos.gql"

@Component
export default class HeadHome extends Vue {

    @Prop({ default: [] }) videos: Array<any>

    current_video = 0

    render = 0

    showDisplay = true

    get currentVideo() {
        if(this.current_video >= this.videos.length) this.current_video -= this.videos.length
        if(this.current_video < 0) this.current_video = this.videos.length - 1
        if(this.current_video === 0){
            return [this.videos.length - 2, this.videos.length - 1, 0, 1, 2]
        }
        if(this.current_video === 1){
            return [this.videos.length - 1, 0, 1, 2, 3]
        }
        if(this.current_video === this.videos.length - 1){
            return [this.videos.length - 3, this.videos.length - 2, this.videos.length - 1, 0, 1]
        }
        if(this.current_video === this.videos.length - 2){
            return [this.videos.length - 4, this.videos.length - 3, this.videos.length - 2, this.videos.length - 1,  0]
        }
        return  [this.current_video - 2, this.current_video - 1, this.current_video, this.current_video + 1, this.current_video + 2]
    }

    get user() {
        return this.$store.state.user
    }

    async mounted() {
        // let result = await this.$apollo.query({
        //     query: VIDEOS
        // })
        // this.videos = result.data.videos
        let timeout;
        let self = this
        document.onmousemove = function(){
            self.showDisplay = true
            clearTimeout(timeout);
            timeout = setTimeout(function(){
                console.log('OK')
                self.showDisplay = false
            }, 1500);
        }
    }

    @Watch('current_video')
    reredering(){
        this.render ++
    }

}
</script>
<style>
    .display {
        border-radius: 15px !important;
        height: 20vh;
        margin-left: 2.5vw;
        margin-right: 2.5vw;
    }

    .middle {
        height: 50vh;
    }
</style>