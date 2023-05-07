<template>
  <div class="white" style="font-family: Arial">
    <v-row justify="center">
      <v-col cols="auto" style="padding-top: 100px; padding-bottom: 300px">
        <div>
          <v-card style="width:1000px">
            <div>
              <h1 align="center" class="section" style="color: #2F4F4F">
                <!-- <v-img :src="require(`@/assets/logo/eddi.png`)" width="130" class="mx-auto mb-6"/> -->
                <span class="mdi mdi-cart"></span>
                My Cart
              </h1>
              
              <!--장바구니 데이터-->
              <div>
                <table class="cart">
                  <v-simple-table>
                    <thead class="wrap">
                      <tr>
                          <th class="text-center">이미지</th>
                          <th>상품명</th>
                          <th>수량</th>
                          <th>가격</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in cartItems" :key="index">
                        <td>
                          <center>
                          <!-- AWS s3 사용을 위한 주석 처리 -->
                          <!-- <v-img :src="require(`@/assets/product/uploadImgs/${item.imageResourceList[0].imageResourcePath}`)" width="50px"/> -->
                          <v-img :src="`https://vue-s3-test-fourman.s3.ap-northeast-2.amazonaws.com/${item.imageResourceList[0].imageResourcePath}`" width="50px" />
                          </center>
                        </td>
                        <td class="product">
                          <h4 class="header">{{ item.productName }}
                              <div>{{ selectedSeats.cafe.cafeName }}</div>
                          </h4>
                        </td>
                        <td>{{ item.count }}</td>
                        <td>{{ item.price | comma }}원</td>
                      </tr>
                    </tbody>

                    <tfoot v-if="isOrderPacking == false" class="wrap">
                      <tr>
                        <th class="text-center" style="font-size: 16px; font-weight: bold">장바구니 정보</th>
                        <th>
                          <span class="d-inline" style="font-size: 14px; font-weight: bold">선택 좌석 : </span>
                          <span class="d-inline" style="font-size: 14px; font-weight: bold" v-for="(seat, idx) in selectedSeats.seatList" :key="idx">
                            ({{ seat.seatNo }})
                          </span>
                        </th>
                        <th>
                          <span class="d-inline" style="font-size: 14px; font-weight: bold">예약 시간 : {{ selectedSeats.timeString }} </span>
                        </th>
                        <th style="font-size: 16px">{{ totalOrderPrice | comma}}원</th>
                      </tr>
                    </tfoot>

                    <!-- 포장 결제  -->
                    <tfoot v-else class="wrap">
                     <tr>
                        <!-- <th class="text-center" style="font-size: 18px; font-weight: bold">{{ this.selectedSeats.cafe.cafeName }}</th> -->
                        <th class="text-center" style="font-size: 16px; font-weight: bold">장바구니 정보</th>
                        <th colspan="2"></th>
                        <th style="font-size: 16px">{{ totalOrderPrice | comma}}원</th>
                     </tr>
                    </tfoot>
                  </v-simple-table>
                </table>
              </div>
            </div>

            <!-- 예약 주문인 경우의 결제 정보 창 -->
            <div v-if="isOrderPacking == false" class="mb-2">
              <v-row>
                <v-col>
                  <v-card flat>
                    <v-card-text>
                      <h3 class="mt-1 mb-3">포인트 사용</h3>
                      <span>보유 포인트 : {{ numberHoldPoint | comma }}P</span>
                      <div class="d-flex align-center mt-5">
                        <v-text-field v-model.number="usePoint" label="사용할 포인트" type="number" min="0" :max="numberHoldPoint" clearable variant="underlined"  @change="pointLimitCheck"></v-text-field> <span class="ml-2">원</span>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card flat>
                    <v-card-text>
                      <h3 class="mt-1">결제 정보</h3>
                      <div class="mt-3">
                        <span class="d-flex align-center" style="font-size: 18px;">
                          상품 금액 <v-spacer/> + {{ totalOrderPrice | comma}}원
                        </span>
                        <span class="d-flex align-center mt-3" style="font-size: 18px;">
                          예약 비용 <v-spacer/> + {{ reservationFee | comma}}원
                        </span>
                        <span class="d-flex align-center mt-3" style="font-size: 18px;">
                          포인트 사용 <v-spacer/> <span class="mr-1" v-if="this.usePoint != 0">-</span>{{ usePoint | comma}}원
                        </span>
                      </div>
                      <v-divider class="mt-3" />
                      <span class="d-flex align-center mt-3" style="font-size: 18px;">
                          최종 결제 금액 <v-spacer/> {{ totalOrderPrice + reservationFee - usePoint | comma }}원
                        </span>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <!-- 포장 주문인 경우의 결제 정보 창 -->
            <div v-else class="mb-2">
              <v-row>
                <v-col>
                  <v-card flat>
                    <v-card-text>
                      <h3 class="mt-1 mb-3">포인트 사용</h3>
                      <span>보유 포인트 : {{ numberHoldPoint | comma }}P</span>
                      <div class="d-flex align-center mt-5">
                        <v-text-field v-model.number="usePoint" label="사용할 포인트" type="number" min="0" :max="numberHoldPoint" clearable variant="underlined"  @change="pointLimitCheck"></v-text-field> <span class="ml-2">원</span>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card flat>
                    <v-card-text>
                      <h3 class="mt-1">결제 정보</h3>
                      <div class="mt-3">
                        <span class="d-flex align-center" style="font-size: 18px;">
                          상품 금액 <v-spacer/> {{ totalOrderPrice | comma}}원
                        </span>
                        <span class="d-flex align-center mt-3" style="font-size: 18px;">
                          포인트 사용 <v-spacer/> -{{ usePoint | comma}}원
                        </span>
                      </div>
                      <v-divider class="mt-3" />
                      <span class="d-flex align-center mt-3" style="font-size: 18px;">
                          최종 결제 금액 <v-spacer/> {{ totalOrderPrice - usePoint | comma}}원
                        </span>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-card>
          <div>
            <v-btn @click="purchase" block x-large color="#5F4F4F" style="color: white; font-size: 1.1em" >
              {{ totalOrderPrice + reservationFee - usePoint | comma }}원 결제하기
            </v-btn>
          </div> 
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const orderModule = 'orderModule'

export default {
   name: "TotalOrderForm",
   data() {
    return {
      totalOrderPriceData: Number,
      usePoint: 0,
      reservationFee: this.isOrderPacking ? 0 : 1000
    }
   },
   props: {
      cartItems: {
        type: Array,
        required: true
      },
      totalOrderPrice: {
        type: Number,
        required: true
      },
      selectedSeats: {
        type: Object,
        required: true,
      },
      isOrderPacking: {
        type: Boolean,
        required: true,
      },
      numberHoldPoint: {
        type: Number,
        required: true,
      },
   },
   async created() {

   },
   filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
   },
   computed: {
      ...mapState(
        orderModule, ['orderInformations', 'isReservationAvailable'],
      ),
   },
   methods: {
      ...mapActions(
        orderModule, ['requestCreateOrderInformationsToSpring', 'requestIsReservationAvailableToSpring'],
      ),
      async purchase() {
        // 예약 가능한지 좌석 체크
        // await this.isAvailable()

        // if(this.isReservationAvailable == true) {
        //   await this.kakaoPayAPI()
        // } else if(this.isReservationAvailable == false) {
        //   alert('이미 예약된 좌석입니다 다시 좌석과 시간을 선택해 주세요!')
        //   this.$router.push({ name: "CafeIntroBoardListPage" });
        //   // this.$router.push({ path: '/seats/:cafeId', params: { cafeId: this.selectedSeats.cafe.cafeId } })
        // } else {
        //   console.log('포장 주문')
        //   await this.kakaoPayAPI()
        // }

        this.kakaoPayAPI()
      },
      async isAvailable() {
        if(this.isOrderPacking == false) {
          let formData = new FormData()
          let seatList = []

          if(this.isOrderPacking == false) { // 예약 주문
            for(let i = 0; i < this.selectedSeats.seatList.length; i++) {
              seatList.push(this.selectedSeats.seatList[i].seatNo)
            }
          }
          let cafeId = this.selectedSeats.cafe.cafeId

          let reservationInfo = {
            seatList: seatList,
            time: this.selectedSeats.timeString,
          }

          formData.append(
            "reservationInfo",
            new Blob([JSON.stringify(reservationInfo)], { type: "application/json" })
          )

          await this.requestIsReservationAvailableToSpring({cafeId, formData})
          console.log('' + this.isReservationAvailable)
        } 
      },
      saveOrderInformations() {
        let formData = new FormData()
        let memberId = JSON.parse(localStorage.getItem('userInfo')).id
        let totalQuantity = 0

        for(let i = 0; i < this.cartItems.length; i++) {
          totalQuantity += this.cartItems[i].count
        }
        let totalPrice = this.totalOrderPrice + this.reservationFee - this.usePoint
        let cartItemList = []

        for(let i = 0; i < this.cartItems.length; i++) {
          cartItemList.push({
            productName: this.cartItems[i].productName,
            count: this.cartItems[i].count, 
            imageResource: this.cartItems[i].imageResourceList[0].imageResourcePath,
            drinkType: this.cartItems[i].drinkType,
            price: this.cartItems[i].price,
            })
        }

        let seatList = []

        if(this.isOrderPacking == false) { // 예약 주문
          for(let i = 0; i < this.selectedSeats.seatList.length; i++) {
            seatList.push(this.selectedSeats.seatList[i].seatNo)
          }
  
          var reservationInfo = {
            seatList: seatList,
            time: this.selectedSeats.timeString,
          }
        } else { // 포장 주문 
          var reservationInfo = {
            seatList: null,
            time: null,
          }
        }

        var orderInfo = {
            memberId: memberId,
            cafeId: this.selectedSeats.cafe.cafeId,
            totalQuantity: totalQuantity,
            totalPrice: totalPrice,
            usePoint: this.usePoint,
            isPacking: this.isOrderPacking,
            cartItemList: cartItemList,
            reservationInfo: reservationInfo
          } 

        console.log('orderInfo: ' + JSON.stringify(orderInfo))
        
        formData.append(
            "orderInfo",
            new Blob([JSON.stringify(orderInfo)], { type: "application/json" })
        )

        this.requestCreateOrderInformationsToSpring(formData)
      },
      kakaoPayAPI() {
        var vm = this;
        var IMP = window.IMP; 

        let totalPrice = this.totalOrderPrice + this.reservationFee - this.usePoint

        IMP.init("imp60856856");

        // 결제창 호출 코드
        IMP.request_pay({
          pg : "kakaopay", 
          pay_method : 'card',
          merchant_uid : 'merchant_' + new Date().getTime(),
          name : '결제',
          amount : totalPrice,
          buyer_email : '구매자 이메일',
          buyer_name : '구매자 이름',
          buyer_tel : '구매자 번호',
          buyer_addr : '구매자 주소',
          buyer_postcode : '구매자 주소',
          m_redirect_url : 'redirect url'
        }, function(rsp) {
            if ( rsp.success ) {
              vm.saveOrderInformations()
              var msg = '결제가 완료되었습니다.';
              vm.$router.push({ name: "MemberOrderHistoryPage" });
              alert(msg)
            } else {
              var msg = '결제에 실패하였습니다.';
              rsp.error_msg;
              alert(msg)
            }
        });
      },
      pointLimitCheck() {
        if(this.usePoint > this.numberHoldPoint) {
          alert('보유 포인트 금액 이상 사용은 불가능합니다.')
          this.usePoint = this.numberHoldPoint
        } else if(this.usePoint < 0) {
          alert('0보다 작은 금액은 사용이 불가능합니다.') 
          this.usePoint = 0
        } else if(this.usePoint > this.totalOrderPrice) {
          alert('총 가격보다 많은 양은 사용이 불가능합니다.') 
          this.usePoint = this.totalOrderPrice
        }
      },
   },
   watch: {
      usePoint: {
         deep: true,
         handler() {
          if(this.usePoint == null) {
            this.usePoint = 0;
          }
         }
      },
   },
}
</script>

<style scoped>
tr th {
   width: 150px;
}

.cart {
  padding: 5px;
  padding-bottom: 0px;
  width: 100%;
}

h4 div {
  color: #666666;
  font-size: .8em;
}

.section {
  padding-top: 40px;
  padding-bottom: 40px;
}

.wrap {
  background-color: #eaebee;
}

</style>