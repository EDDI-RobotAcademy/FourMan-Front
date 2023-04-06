<template>
   <v-container style="width: 1000px">
      <div class="mt-2">
         <v-layout justify-end>
            <v-btn-toggle borderless dense color="#2f4f4f">
               <v-btn
                  v-for="(btn, index) in categoryBtn" :key="index"
                  elevation="0"
                  color="white" @click="filterCategory(index)">
                  <h4>{{ btn.name }}</h4>
               </v-btn>
            </v-btn-toggle>
         </v-layout>
      </div>
      <div v-if="!(Array.isArray(categoryDatas) && categoryDatas.length === 0)" class="mt-4">
         <product-card-form :datas="categoryDatas" @addCart="addCart"/>
      </div>
      <div v-else class="mt-4">
         <product-card-form :datas="datas" @addCart="addCart"/>
      </div>
      <div class="text-right mr-5 mt-15">
         <v-btn class="brown darken-2 white--text" @click="registerProduct">
               상품 등록
         </v-btn>
      </div>
      <div class="mt-15">
         <product-cart-form :cartItems="cartItems" />
      </div>
   </v-container>
</template>

<script>
import ProductCardForm from '@/components/product/ProductCardForm.vue'
import ProductCartForm from '@/components/product/ProductCartForm.vue'

export default {
   name: "ProductListForm",
   components: { 
      ProductCardForm,
      ProductCartForm
   },
   data() {
      return {
         cartItems: [],
         categoryBtn : [
            {name: "전체 메뉴", value: 'ALL'},
            {name: "커피/라떼", value: 'COFFEE & LATTE'},
            {name: "버블티/논커피", value: 'BUBBLETEA & NON-COFFEE'},
            {name: "에이드/티", value: 'ADE & TEA'},
            {name: "스무디/과일음료", value: 'SMOOTHIE & FRUIT BEVERAGE'},
         ],
         category: '',
         items: []
      }
   },
   props: {
      datas: {
         type: Array,
         required: true,
      },
      categoryDatas: {
         type: Array,
         required: true,
      }
   },
   methods: {
      addCart(receiveData) {
         var data = receiveData

         let item = this.cartItems.find((item) => item.productId === data.productId);
         if(item) {
            item.count++;
            item.totalPrice = item.price * item.count
         } else {
            this.cartItems.push(data)
         }
      },
      filterCategory(index) {
         this.category = this.categoryBtn[index].value
         if(this.category === 'All'){
            this.$emit('categoryData', this.datas)
         } else {
            const categoryData = this.datas.filter((value) => value.drinkType == this.category)
            this.$emit('categoryData', categoryData)
         }
      },
      registerProduct() {
         this.$router.push( {
            name: 'ProductRegisterPage'
          })
      }
   },
}
</script>

<style>

</style>