<template>
    <div>
        <pdf
            src="/User/romainbeaussart/Developer/PFE/website/frontend/src/static/test.pdf"
        ></pdf>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import pdf from 'vue-pdf'

@Component({
    components: {
        pdf
    }
})
export default class Manga extends Vue{
    
}
</script>

<style>

</style>