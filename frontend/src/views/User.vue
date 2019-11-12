<template>
    <v-container v-if="user.username">
        <v-layout>
            <v-flex xs-12>
                {{ user.username }}
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Apollo } from '../decorators'

import USER from "../graphql/User.gql"

@Component
export default class User extends Vue{

    get id(){
        return this.$store.state.user.id;
    }

    @Apollo({
        query: USER,
        variables() {
            console.log(typeof this.id)
            return {
                id: "ck22f93a500hr0821arfl3dzz"
            }
        },
        result({ data, loading, networkStatus }: any) {
            if (!loading) {
                console.log(data)
                if(data && data.user) {
                    console.log(data)
                    this.user = data.user
                }
            }
        }
    })
    user = {}

}
</script>
