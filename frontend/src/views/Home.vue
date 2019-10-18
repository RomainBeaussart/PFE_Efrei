<template>
<v-container>
    Home {{ user.username }}
    <v-btn
        rounded
        @click="logout()"
    > Disconnect </v-btn>
</v-container>
</template>

<script>
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class Home extends Vue {
    
    get user() {
        return this.$store.state.user
    }

    mounted() {
        console.log(this.$store.state.user)
    }

    logout() {
        localStorage.removeItem("apollo-token");
        this.$store.commit("logoutUser");
        location.reload();
    }

}
</script>