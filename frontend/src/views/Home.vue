<template>
<v-container>
    {{ text }}
    <v-btn
        @click="test()"
    > Test </v-btn>
</v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import gql from "graphql-tag";
import { Apollo } from '../decorators'

import USERS from '../graphql/Users.gql'

@Component
export default class Home extends Vue {

    text: string = "This is a test"

    async test() {
        const res: any = await this.$apollo.query({
            query: USERS
        })
        console.log(res)
    }

    @Apollo({
        query: USERS,
        result({ data, loading, networkStatus }: any) {
            if (!loading) {
                console.log(data)
            }
        }
    })
}
</script>
