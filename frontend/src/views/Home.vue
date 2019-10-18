<template>
<v-container>
    Home {{ user.username }}
    <v-btn
        elevation="0"
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

}
</script>