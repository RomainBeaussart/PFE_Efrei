<template>
<v-container>
    <v-card elevation="0">
        <v-stepper v-model="steps">
            <v-stepper-header class="elevation-0">
                <v-stepper-step :complete="steps > 1" step="1">Vos Identifiants</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="steps > 2" step="2">Vos Informations personnelles</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">Commencer l'experience</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card
                        class="mb-12"
                        height="200px"
                        elevation="0"
                    >
                        <v-layout row xs10 ma-5>
                            <v-flex xs8>
                                <v-text-field
                                    v-model="username"
                                    :rules="[rules.username]"
                                    label="Pseudo"
                                    outlined
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex xs8>
                                <v-text-field
                                    v-model="password"
                                    label="Mot de passe"
                                    :rules="[rules.password]"
                                    :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
                                    :type="passwordShow ? 'text' : 'password'"
                                    @click:append="passwordShow = !passwordShow"
                                    outlined
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs8>
                                <v-text-field
                                    v-model="rePassword"
                                    label="Confirmez votre mot de passe"
                                    :rules="[rules.rePassword]"
                                    :append-icon="rePasswordShow ? 'visibility' : 'visibility_off'"
                                    :type="rePasswordShow ? 'text' : 'password'"
                                    @click:append="rePasswordShow = !rePasswordShow"
                                    outlined
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-card>
                    <v-btn
                        @click="steps = 2"
                        elevation="0"
                        style="float: right"
                        :disabled="stepsIsValid.step1"
                    >
                        Continue
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card
                        class="mb-12"
                        height="200px"
                        elevation="0"
                    >
                        <v-layout row xs10 ma-5>
                            <v-flex xs8>
                                <v-text-field
                                    v-model="firstname"
                                    label="Prénom"
                                    outlined
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex xs8>
                                <v-text-field
                                    v-model="lastname"
                                    label="Nom"
                                    outlined
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-card>

                    <v-btn text
                        @click="steps = 1"
                    >Previous</v-btn>
                    <v-btn
                        @click="steps = 3"
                        elevation="0"
                        style="float: right"
                    >
                         Continue
                    </v-btn>

                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card
                        class="mb-12"
                        height="200px"
                        elevation="0"
                    >
                        <v-btn
                            elevation="0"
                            @click="signup()"
                        >
                            Sign Up
                        </v-btn>
                    </v-card>
                    <v-btn
                        elevation="0"
                        text
                        @click="steps = 2"
                    > Previous </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-card>
</v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Apollo } from '../decorators'
import { sha256 } from 'js-sha256'

import USERNAME_VERIF from '../graphql/UsernameVerif.gql'
import CREATE_USER from '../graphql/CreateUser.gql'


@Component
export default class Signup extends Vue {

    steps: number = 1

    username: string = ""

    password: string = ""
    passwordShow: boolean = false
    rePassword: string = ""
    rePasswordShow: boolean = false

    firstname: string = ""
    lastname: string =""


    get rules() {
        return {
            username: !this.usernameIsset || this.username + " est déjà utilisé",
            password: (this.password.length >= 4 || this.password.length === 0) || "Min 4 characters",
            rePassword: (this.rePassword === this.password || this.rePassword.length === 0) || "Les mots de passes ne correspondents pas"
        }
    }

    get stepsIsValid() {
        let step1 = false
        if (this.rules.username !== true) step1 = true
        if (this.rules.password !== true) step1 = true
        if (this.rules.rePassword !== true) step1 = true
        return {
            step1: step1
        }
    }

    @Apollo({
        query: USERNAME_VERIF,
        variables() {
            return {
                username: this.username,
                firstname: this.firstname,
            }
        },
        result({ data, loading, networkStatus }: any) {
            if (!loading) {
                if (data && data.usersConnection && data.usersConnection.aggregate.count === 0) {
                    this.usernameIsset = false
                } else {
                    this.usernameIsset = true
                }
            }
        }
    })
    usernameIsset: boolean = false

    async signup() {
        console.log(this.username)
        await this.$apollo.mutate({
            mutation: CREATE_USER,
            variables: {
                username: this.username,
                password: sha256(this.password),
                firstname: this.firstname,
                lastname: this.lastname
            }
        })
        this.$router.push({name: "login"})
    }
}
</script>
