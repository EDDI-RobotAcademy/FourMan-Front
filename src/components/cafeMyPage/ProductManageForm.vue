<template>
   <div>
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
      <div>
      <v-card class="mt-5">
         <v-simple-table>
            <thead>
               <tr>
                  <th class="text-center">이미지</th>
                  <th class="text-center">상품명</th>
                  <th class="text-center">상품 타입</th>
                  <th class="text-center">가격</th>
                  <th class="text-center" style="width: 80px">수정</th>
                  <th class="text-center" style="width: 80px">삭제</th>
               </tr>
            </thead>
            <tbody align="center">
               <tr v-if="!productList || (Array.isArray(productList) && productList.length === 0)">
                  <td colspan="6" align="center">
                     주문 내역이 존재하지 않습니다.
                  </td>
               </tr>
               <tr v-else v-for="(product,index) in calData" :key="index">
                  <td>
                     <v-img :src="require(`@/assets/product/uploadImgs/${product.imageResourceList[0].imageResourcePath}`)" width="50px" height="80px">
                        <template v-slot:placeholder>
                           <div class="fill-height ma-0" align="center" justify="center">
                              <v-progress-circular indeterminate color="grey lighten-5"/>
                           </div>
                        </template>
                     </v-img>
                  </td>
                  <td>{{ product.productName }}</td>
                  <td>{{ product.drinkType }}</td>
                  <td>{{ product.price | comma }}원</td>

                  <!-- 수정 -->
                  <td>
                     <v-btn elevation="0" @click="modifyBtn(product)">수정</v-btn> <!-- 버튼을 눌렀을 때 v-card가 보여진다. -->
                  </td>

                  <!-- 삭제 -->
                  <td>
                     <v-btn elevation="0">
                        삭제
                     </v-btn>
                  </td>
               </tr>
            </tbody>
         </v-simple-table>
      </v-card>
      </div>

      <v-pagination
      v-model="curPageNum"
      :length="numOfPages"
      color="#5D4037"
      class="mt-10"
      flat
      ></v-pagination>

      <!-- 상품 등록 버튼 -->
      <div class="floating">
         <router-link style="text-decoration: none;" :to="{ name:'ProductRegisterPage' }">
            <v-btn class="button" fab dark color="brown darken-2" width="90" height="90" >
               <v-icon style="width: 300px" size="50"> mdi-plus </v-icon>
            </v-btn>
         </router-link>
      </div>
   </div>
</template>

<script>
import ProductModifyForm from '@/components/cafeMyPage/ProductModifyForm.vue'

export default {
   name: "ProductManageForm",
   components: {
      ProductModifyForm
   },
   data() {
      return {
         categoryBtn : [
            {name: "전체 메뉴", value: 'ALL'},
            {name: "커피/라떼", value: 'COFFEE & LATTE'},
            {name: "버블티/논커피", value: 'BUBBLETEA & NON-COFFEE'},
            {name: "에이드/티", value: 'ADE & TEA'},
            {name: "스무디/과일음료", value: 'SMOOTHIE & FRUIT BEVERAGE'},
         ],
         category: '',
         dataPerPage: 8,
         curPageNum: 1,
         filteredItems: [],
         modifyDialog: false,
         editedProduct: Object
      }
   },
   props: {
      productList: {
         type: Array,
         required: true,
      },
   },
   filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
   },
   methods: {
      filterCategory(index) {
         this.category = this.categoryBtn[index].value
         if(this.category === 'ALL'){
            this.filteredItems = this.productList
         } else {
            const categoryData = this.productList.filter((value) => value.drinkType == this.category)
            this.filteredItems = categoryData
         }
      },
      modifyBtn(product) {
         this.$router.push({
               name: "ProductModifyPage",
               params: { modifyProduct: product }
            })
      },
   },
   computed: {
      startOffset() {
        return (this.curPageNum - 1) * this.dataPerPage;
      },
      endOffset() {
        return this.startOffset + this.dataPerPage;
      },
      numOfPages() {
         if(this.filteredItems.length == 0) {
            return Math.ceil(this.productList.length / this.dataPerPage);
         } else {
            return Math.ceil(this.filteredItems.length / this.dataPerPage);
         }
      },
      calData() {
         if(this.filteredItems.length == 0) {
            return this.productList.slice(this.startOffset, this.endOffset);
         } else {
            return this.filteredItems.slice(this.startOffset, this.endOffset);
         }
      },
   },
   async updated() {
      console.log('dialog: ' + this.modifyDialog)
   }

}
</script>

<style scoped>
.floating {
  /* position: fixed; */
  position:sticky;
  text-align: center;
  width: 120px;
}

.button {
   margin-left: 950px;
   margin-bottom: 50px;
}
</style>