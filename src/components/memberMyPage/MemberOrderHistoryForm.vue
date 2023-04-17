<template>
  <div>
   <div class="mt-8">
      <v-layout>
         <center>
            <h2>예약 내역</h2>
         </center>
      </v-layout>
   </div>

   <div class="mt-10 mb-15">
      <div v-if="!orderInformations || (Array.isArray(orderInformations) && orderInformations.length === 0)">
         <h3> 예약 내역 정보가 존재하지 않습니다 </h3>
      </div>
      <v-expansion-panels v-else flat popout>
         <v-expansion-panel v-for="(orderInfo, index) in this.orderInformations" :key="index" class="mb-5">
            <v-card flat color="#f5f5f5" style="border: 1px solid #d9d9d9;">
               <v-card-subtitle style="border-bottom: 1px solid #eaebee;">
                  <v-layout>
                     <h3 style="display:flex; align-items:center;"> 상품 총 {{ orderInfo.totalQuantity }}건</h3>
                     
                     <span style="display:flex; align-items:center;" class="ml-3">
                        {{ orderInfo.orderNo }} | {{ orderInfo. orderDate }}
                     </span>
                     <v-spacer />
                     <v-btn elevation="0" outlined> 예약 상세 페이지 </v-btn>
                  </v-layout>
               </v-card-subtitle>

               <div>
                  <v-card flat>
                     <v-expansion-panel-header @click="whenExpanded(index)">
                        
                        <!-- 펼치기 전 header -->
                        <div v-if="(isExpanded == false || expandedArr[index] != true)">
                           <table class="d-block" style="text-align: center; border: 1px; border-collapse: collapse;">
                              <tr>
                                 <td width="80">
                                    <center>
                                       <v-img :src="require(`@/assets/product/uploadImgs/${ orderInfo.orderProductList[0].imageResource }`)" width="80px" height="100px" />
                                    </center>
                                 </td>
                                 <td width="300"> 
                                    <span class="d-block">{{ orderInfo.orderProductList[0].productName }} 포함 {{ orderInfo.orderProductList.length }}건</span>
                                    <span class="d-block mt-2">{{ orderInfo.totalPrice | comma }}원</span>
                                 </td>
                                 <td>
                                    예약 좌석 정보 간략히 
                                 </td>
                              </tr>
                           </table>
                        </div>

                        <!-- 펼쳤을 시 header -->
                        <div v-else-if="isExpanded == true && expandedArr[index] == true">
                           <table class="d-block" style="text-align: center; border: 1px; border-collapse: collapse;">
                              <span> 예약 좌석 정보 </span>
                              <!-- <tr>
                                 <td width="80">
                                    <center>
                                       <v-img :src="require(`@/assets/product/uploadImgs/${ orderInfo.orderProductList[0].imageResource }`)" width="80px" height="100px" />
                                    </center>
                                 </td>
                                 <td width="300"> 
                                    <span class="d-block">{{ orderInfo.orderProductList[0].productName }} </span>
                                    <span class="d-block mt-1">{{ orderInfo.orderProductList[0].price | comma }}원</span>
                                    <span class="d-block mt-1">{{ orderInfo.orderProductList[0].drinkType }}</span>
                                 </td>
                              </tr> -->
                           </table>
                        </div>

                     </v-expansion-panel-header>

                     <v-expansion-panel-content>
                        <!-- <v-divider></v-divider> -->
                        <div v-for="(orderProduct, i) in orderInfo.orderProductList" :key="i" style="border-top: 1px solid #eaebee;" class="pl-6 pr-6 pb-4 pt-4">
                           <table class="d-block" style="text-align: center; border: 1px; border-collapse: collapse;">
                              <tr>
                                 <td width="80">
                                    <center>
                                    <v-img :src="require(`@/assets/product/uploadImgs/${ orderProduct.imageResource }`)" width="80px" height="100px" />
                                    </center>
                                 </td>
                                 <td width="300"> 
                                    <span class="d-block">{{ orderProduct.productName }}</span>
                                    <span class="d-block ">{{ orderProduct.price | comma }}원</span>
                                    <span class="d-block ">{{ orderProduct.drinkType }}</span>
                                    <span class="d-block ">수량 : {{ orderProduct.count }}</span>
                                 </td>
                                 <td>

                                 </td>
                              </tr>
                           </table>
                        </div>
                     </v-expansion-panel-content>
                  </v-card>
               </div>
            </v-card>
         </v-expansion-panel>
      </v-expansion-panels>
   </div>

  </div>
</template>

<script>

export default {
   name: "MemberOrderHistoryForm",
   data() {
      return {
         isExpanded: false,
         expandedArr: [],
      }
   },
   props: {
      orderInformations :{
         type: Array,
         required: true,
      }
   },
   filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
   },
   methods: {
      async whenExpanded(index) {
         if(this.isExpanded == false && this.expandedArr[index] != true) {
            this.isExpanded = true
            this.expandedArr[index] = true
         } else if(this.isExpanded == true && this.expandedArr[index] != true){
            let newArr = []
            this.expandedArr = newArr
            this.expandedArr[index] = true
         } else {
            this.isExpanded = false
            this.expandedArr[index] = false
         }
         // console.log("expanded[" + index + "]: " + this.expandedArr[index])
         // console.log("isExpanded: " + this.isExpanded)
      },
   }
}
</script>

<style scoped>
.v-expansion-panel-content>>> .v-expansion-panel-content__wrap {
  padding: 0;
}
</style>