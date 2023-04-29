<template>
  <v-container style="width:1000px">
    <h2 class="mt-10 mb-10" align="center">상품 등록</h2>
    <product-register-form @submit="onSubmit"/>
  </v-container>
</template>

<script>
import ProductRegisterForm from '@/components/product/ProductRegisterForm.vue'
import { mapActions } from 'vuex'

const productModule = 'productModule'

export default {
    components: { ProductRegisterForm },
    name: "ProductRegisterPage",
    methods: {
        ...mapActions (
            productModule, ['requestCreateProductToSpring'],
        ),
        async onSubmit (payload) {
            const product = await this.requestCreateProductToSpring(payload) 
            console.log('product: ' + JSON.stringify(product.data))
            await this.$router.push({ 
                name: 'ProductManagePage',
            })
        }
    }
}

</script>

<style>

</style>