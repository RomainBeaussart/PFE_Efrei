<template>
    <v-container>
        <v-layout xs6 class="justify-center">
            <v-flex xs6>
                <p class="display-2">
                    Na Mo Naki
                </p>
                <v-text-field
                    v-model="username"
                    label="Email ou pseudo"
                    outlined
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    label="Mot de passe"
                    :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
                    :type="passwordShow ? 'text' : 'password'"
                    @click:append="passwordShow = !passwordShow"
                    outlined
                ></v-text-field>
                <v-btn
                    elevation="0"
                    @click="login()"
                > S'identifier
                </v-btn>
                {{ error }}
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import gql from "graphql-tag";
import { Apollo } from '../decorators'
import sha256 from "js-sha256"
import store from "../store/store"

import AUTHENTICATE_USER from '../graphql/auth/AuthenticateUser.gql'

@Component
export default class Login extends Vue {
    passwordShow: boolean = false

    username: string = ""
    password: string = ""

    error = ""

    loading = false

    async login() {
        try {
            this.loading = true
            const result = await this.$apollo.mutate({
                mutation: AUTHENTICATE_USER,
                variables: {
                    username: this.username,
                    password: this.password
                }
            })

            this.loading = false

            if (result.data.login) {
                // this.$store.commit('logoutAdmin')
                localStorage.setItem('apollo-token', result.data.login.token)
                if (this.$route.query.from) {
                    this.$router.replace(this.$route.query.from as string)
                } else {
                    this.$router.replace({ name: 'home' })
                }
            }
        } catch (e) {
            this.error = "Vérifiez votre email et mot de passe"
            this.loading = false
        }
    }

    mounted() {
        console.log(this.$store.state)
    }

    @Watch('username')
    @Watch('password')
    reset() { this.error = '' }

}
</script>
