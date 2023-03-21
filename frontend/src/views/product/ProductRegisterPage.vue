<template>
  <v-container>
    <h2>상품 등록</h2>
    <product-register-form @submit="onSubmit"/>
  </v-container>
</template>

<script>
import ProductRegisterForm from '@/components/product/ProductRegisterForm.vue'
import { mapActions } from 'vuex'

export default {
    components: { ProductRegisterForm },
    name: "ProductRegisterPage",
    methods: {
        ...mapActions ([
            'requestCreateProductToSpring'
        ]),
        async onSubmit (payload) {
            const product = await this.requestCreateProductToSpring(payload) 
            console.log('product: ' + JSON.stringify(product.data))
            await this.$router.push({ 
                name: 'ProductListPage',
            })
        }
    }
}

</script>

<style>

</style>