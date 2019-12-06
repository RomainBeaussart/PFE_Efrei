<template>
    <v-app>
        <v-app-bar app class="elevation-0" color="primary" v-if="currentUser">
            <v-toolbar color="primary" fixed elevation="0">
                <v-layout wrap>
                    <v-flex xs4>
                    </v-flex>
                    <v-flex xs4 class="d-flex justify-center align-center white--text title">
                        Na mo naki
                        <img src="../assets/img/logo_light.gif" width="70vw"/>
                    </v-flex>
                    <v-flex xs4 class="d-flex justify-end">
                        <v-btn
                            text
                            color="#FFF"
                            @click="$router.push({name:'mangas'})"
                        > Mangas</v-btn>
                    </v-flex>
                </v-layout>
            </v-toolbar>
        </v-app-bar>
        <v-content>
            <v-scroll-x-transition>
                <router-view></router-view>
            </v-scroll-x-transition>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class Index extends Vue {
    
    get currentUser() {
        return this.$store.state.user.id;
    }

    logout() {
        localStorage.removeItem("apollo-token");
        this.$store.commit("logoutUser");
        location.reload();
    }
}
</script>
<style>

</style>
