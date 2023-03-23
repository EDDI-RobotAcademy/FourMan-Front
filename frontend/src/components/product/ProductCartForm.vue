<template>
  <div>
      <form>
         <v-simple-table style="text-align: center;">
            <template>
               <thead>
                  <tr>
                     <th class="text-center">이미지</th>
                     <th class="text-center">상품명</th>
                     <th class="text-center">가격</th>
                     <th class="text-center">수량</th>
                     <th class="text-center">총합</th>
                     <th class="text-center">삭제</th>
                  </tr>
               </thead>
            </template>
            <tbody>
               <tr v-if="!carts || (Array.isArray(carts) && carts.length === 0)">
                  <td colspan="6">장바구니에 상품이 존재하지 않습니다</td>
               </tr>
               <tr v-else v-for="(cart, idx) in carts" :key="idx">
                  <td>
                     <center>
                     <v-img :src="require(`@/assets/product/uploadImgs/${cart.imageResourcePath}`)" width="50px"/>
                     </center>
                     </td>
                  <td>{{ cart.productName }}</td>
                  <td>{{ cart.price }}원</td>
                  <td>
                     <v-btn xSmall>-</v-btn>
                     {{ count }}
                     <v-btn xSmall>+</v-btn>
                  </td>
                  <td>
                     {{ totalCount }}
                  </td>
                  <td><v-btn small>삭제</v-btn></td>
               </tr>
            </tbody>
         </v-simple-table>
      </form>
   </div>
</template>

<script>
export default {
   name: "ProductCartForm",
   data() {
      return {
         count: 1,
         totalCount: 1,
      }
   },
   props: {
      carts: {
         type: Array
      }
   },
}
</script>

<style>

</style>