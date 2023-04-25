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
         <v-expansion-panel v-for="(orderInfo, index) in this.orderInformations.slice().reverse()" :key="index" class="mb-5">
            <v-card flat color="#f5f5f5" style="border: 1px solid #d9d9d9;">
               <v-card-subtitle style="border-bottom: 1px solid #eaebee;">
                  <v-layout>
                     <h3 style="display:flex; align-items:center;"> {{ orderInfo.cafeName }}</h3>
                     
                     <span style="display:flex; align-items:center;" class="ml-3">
                        {{ orderInfo.orderNo }} | {{ orderInfo. orderDate }}
                     </span>
                     <v-spacer />
                     <v-sheet v-if="orderInfo.packing == true" class="d-inline-flex align-center justify-center primary white--text mr-3" :elevation="0" 
                     style="width: 80px; height: 35px; font-weight: bold;" rounded>
                     포장 주문
                     </v-sheet>
                     <v-sheet v-if="orderInfo.ready == false" class="d-inline-flex align-center justify-center white--text" :elevation="0" 
                     style="width: 80px; height: 35px; font-weight: bold;  background-color: #ff9800" rounded>
                     준비중
                     </v-sheet>
                     <v-sheet v-else class="d-inline-flex align-center justify-center white--text success" :elevation="0" 
                     style="width: 80px; height: 35px; font-weight: bold;" rounded>
                     준비완료
                     </v-sheet>
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
                                       <v-img :src="require(`@/assets/cafe/uploadImgs/${orderInfo.cafeThumbnailFile }`)" width="80px" height="100px" />
                                    </center>
                                 </td>
                                 <td width="300"> 
                                    <h3>상품 정보</h3>
                                    <div class="mt-3">
                                       <span class="d-block" style="font-size: 16px;">
                                          {{ orderInfo.orderProductList[0].productName }} 포함 총 {{ orderInfo.totalQuantity }}건
                                       </span>
                                       <span class="d-block mt-3" style="font-size: 16px; font-weight: bold;">{{ orderInfo.totalPrice | comma }}원</span>
                                    </div>
                                 </td>

                                 <!-- 예약 주문의 경우 예약 정보 -->
                                 <td v-if="orderInfo.reservationTime != null" width="300">
                                    <h3 class="mt-2">예약 정보</h3>
                                    <div class="mt-2">
                                       <div class="d-flex align-center justify-center">
                                          <v-icon class="mr-2">mdi-clock-time-eight-outline</v-icon> 
                                          <span style="font-size: 16px;">{{ orderInfo.reservationTime }}</span>
                                       </div>
                                       <div class="d-flex align-center mt-2 justify-center">
                                          <div>
                                             <v-icon class="mr-2">mdi-seat</v-icon>
                                          </div>
                                          <div v-for="(seat, j) in orderInfo.seatNoList" :key="j" class="mr-2">
                                             <span style="font-size: 16px;">{{ seat.seatNo }}</span>
                                          </div>
                                       </div>
                                    </div>
                                 </td>
                              </tr>
                           </table>
                        </div>

                        <!-- 펼쳤을 시 header -->
                        <div v-else-if="isExpanded == true && expandedArr[index] == true">
                           <table class="d-block" style="text-align: center; border: 1px; border-collapse: collapse;">
                              <tr>
                                 <td width="80">
                                    <center>
                                       <v-img :src="require(`@/assets/cafe/uploadImgs/${orderInfo.cafeThumbnailFile }`)" width="80px" height="100px" />
                                    </center>
                                 </td>
                                 <td width="300">
                                    <h3 class="mt-2">결제 상세 정보</h3>
                                    <div>
                                       <div class="mt-3">
                                          <div v-if="orderInfo.usePoint != 0" class="d-flex align-center justify-center">
                                             <span style="font-size: 16px; font-weight: bold;">사용 포인트 : </span>
                                             <span class="ml-1" style="font-size: 16px; font-weight: bold;">{{ orderInfo.usePoint | comma }}</span>
                                             <v-icon class="ml-1" style="font-size: 18px;">mdi-alpha-p-circle-outline</v-icon>
                                          </div>
                                       </div>
                                       <div class="mt-3">
                                          <div class="d-flex align-center justify-center">
                                             <span style="font-size: 16px; font-weight: bold;">총 결제 금액 : </span>
                                             <span class="ml-1" style="font-size: 16px; font-weight: bold;">{{ orderInfo.totalPrice | comma }}</span>
                                             <v-icon class="ml-1" style="font-size: 18px;">mdi-currency-krw</v-icon>
                                          </div>
                                       </div>
                                    </div>
                                 </td>
                                 <td width="300" v-if="orderInfo.reservationTime != null"> 
                                    <h3 class="mt-2">예약 정보</h3>
                                    <div>
                                       <div class="mt-2">
                                          <div class="d-flex align-center justify-center">
                                             <v-icon class="mr-2">mdi-clock-time-eight-outline</v-icon> 
                                             <span style="font-size: 16px;">{{ orderInfo.reservationTime }}</span>
                                          </div>
                                       </div>
                                       <div class="mt-2 d-flex align-center justify-center">
                                          <div class="">
                                             <v-icon class="mr-2">mdi-seat</v-icon>
                                          </div>
                                          <div v-for="(seat, j) in orderInfo.seatNoList" :key="j" class="mr-2">
                                             <span style="font-size: 16px;">{{ seat.seatNo }}</span>
                                          </div>
                                       </div>
                                    </div>
                                 </td>
                              </tr>
                           </table>
                        </div>

                     </v-expansion-panel-header>

                     <!-- 펼쳤을 시 하단 content -->
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
                                 <td width="250"> 
                                    <h4 class="d-block">{{ orderProduct.productName }}</h4>
                                    <span class="d-block ">{{ orderProduct.price | comma }}원</span>
                                    <span class="d-block ">{{ orderProduct.drinkType }}</span>
                                    <span class="d-block ">수량 : {{ orderProduct.count }}</span>
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