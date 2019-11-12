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
                            <v-flex xs8>
                                <v-text-field
                                    v-model="email"
                                    :rules="[rules.email]"
                                    label="Email"
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
                        height="300px"
                        elevation="0"
                    >
                        <v-layout wrap xs12>
                            <v-flex
                                v-for="(title, id) in titles"
                                v-bind:key="id"
                                pa-3
                                xs2
                                :style="preferences.includes(title.id) ? 'background: #3498db; border-radius: 5px' : ''"
                                @click="select(title.id)"
                            >
                                <img :src="title.small" width="100%" />

                            </v-flex>
                        </v-layout>
                    </v-card>
                    <v-btn
                            elevation="0"
                            @click="signup()"
                        >
                            Sign Up
                        </v-btn>
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

import TITLES from '../graphql/SignupTitles.gql'


@Component
export default class Signup extends Vue {

    steps: number = 1

    username: string = ""

    password: string = ""
    passwordShow: boolean = false
    rePassword: string = ""
    rePasswordShow: boolean = false

    firstname: string = ""
    lastname: string = ""
    email: string = ""

    preferences: Array<string> = []

    titles: Array<any> = [
        {
            name: "One Piece",
            small: "https://image.uniqlo.com//UQ/ST3/us/imagesother/home/190619-l3-square-onepiecestampede.jpg",
            id: "one-piece",
        }, {
            name: "Naruto",
            small: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvDo20IqrHrcSsfLzxhgb0fi-kC8Mpoqu_gIAUWKHmX5Z9200Drw&s",
            id: "naruto"
        }, {
            name: "Stranger",
            small:"https://akns-images.eonline.com/eol_images/Entire_Site/2017913/rs_600x600-171013065637-600.netflix-stranger-things-24252.ch.101317.jpg",
            id: "stranger-things"
        }
    ]




    get rules() {
        return {
            username: !this.usernameIsset || this.username + " est déjà utilisé",
            password: (this.password.length >= 4 || this.password.length === 0) || "Min 4 characters",
            rePassword: (this.rePassword === this.password || this.rePassword.length === 0) || "Les mots de passes ne correspondents pas",
            email: !this.emailIsset || this.email + " est déjà utilisé"
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
                email: this.email,
            }
        },
        result({ data, loading, networkStatus }: any) {
            if (!loading) {
                if (data && data.username && data.username.aggregate.count === 0) {
                    this.usernameIsset = false
                } else {
                    this.usernameIsset = true
                }
                if (data && data.email && data.email.aggregate.count === 0) {
                    this.emailIsset = false
                } else {
                    this.emailIsset = true
                }
            }
        }
    })
    usernameIsset: boolean = false
    emailIsset: boolean = false

    async signup() {
        console.log(this.username)
        await this.$apollo.mutate({
            mutation: CREATE_USER,
            variables: {
                username: this.username,
                password: sha256(this.password),
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                preferences: this.preferences.map(x => { return {id: x }})
            }
        })
        this.$router.push({name: "login"})
    }

    async mounted() {
        let result = await this.$apollo.query({
            query: TITLES
        })

        // this.titles = result.data.displays
    }

    select(id: string){
        const index = this.preferences.indexOf(id)
        console.log(index)
        if(index === -1) {
            this.preferences.push(id)
        } else {
            this.preferences.splice(index, 1)
        }
        console.log(this.preferences)
    }
}
</script>
