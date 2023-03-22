<template>
  <div>
      <form>
         <table border="1" width="100%" bor style="text-align: center; border-collapse: collapse;">
            <thead>
               <tr>
                  <th>이미지</th>
                  <th>상품명</th>
                  <th>가격</th>
                  <th>수량</th>
                  <th>총합</th>
                  <th>삭제</th>
               </tr>
            </thead>
            <tbody>
               <tr v-if="!carts || (Array.isArray(carts) && carts.length === 0)">
                  <td colspan="6">장바구니에 상품이 존재하지 않습니다</td>
               </tr>
            </tbody>
         </table>
      </form>
   </div>
</template>

<script>
export default {
   name: "ProductCartForm",
   data() {
      return {
         count: 0,
         totalCount: 0,
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