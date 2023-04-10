<template>
    <v-flex xs12 sm6 md3>
        <v-text-field
            label="검색어를 입력하세요."
            hide-details="auto"
            append-icon="mdi-magnify"
            v-model="searchText"
            clearable
            @keyup.enter="search"
            @click:append="search">
        </v-text-field>
    </v-flex>
</template>

<script>
export default {
    name: "SearchBarForm.vue",
    data () {
        return {
            searchText: '',
        }
    },
    methods: {
        search() {
            this.$emit('search', this.searchText)
        }
    }
}
</script>