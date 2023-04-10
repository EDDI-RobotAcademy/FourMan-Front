<template>
  <div class="white" style="font-family: Arial">
    <v-row justify="center">
      <v-col cols="auto" style="padding-top: 100px; padding-bottom: 300px">
        <div>
          <v-card style="width:1000px">
            <div>

              <h1 align="center" class="section" style="color: #2F4F4F">
                <v-img :src="require(`@/assets/logo/eddi.png`)" width="130" class="mx-auto mb-6"/>
                ✔ My Cart
              </h1>
              
              <!--장바구니 데이터-->
              <div>
                <table class="cart">
                  <v-simple-table>
                    <thead class="wrap">
                     <tr>
                        <th class="text-center">이미지</th>
                        <th align="text-center">상품명</th>
                        <th align="text-center">수량</th>
                        <th align="text-center">가격</th>
                     </tr>
                    </thead>
                    <tbody v-for="(item, index) in cartItems" :key="index">
                     <tr>
                        <td>
                           <center>
                           <v-img :src="require(`@/assets/product/uploadImgs/${item.imageResourceList[0].imageResourcePath}`)" width="50px"/>
                           </center>
                        </td>
                        <td class="product">
                           <h4 class="header">{{ item.productName }}
                              <div>카페 이름</div>
                           </h4>
                        </td>
                        <td>{{ item.count }}</td>
                        <td>{{ item.price | comma }}원</td>
                     </tr>
                    </tbody>
                    <tfoot class="wrap">
                     <tr>
                        <th colspan="3"></th>
                        <th>TOTAL : {{ totalOrderPrice | comma}}원</th>
                     </tr>
                    </tfoot>
                  </v-simple-table>
                </table>
              </div>
            </div>
          </v-card>
          <v-btn @click="purchase" block x-large class="" color="#5F4F4F" style="color: white; font-size: 1em" >
            {{ totalOrderPrice | comma }}원 결제하기
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import { mapState, mapActions } from "vuex";

export default {
   name: "TotalOrderForm",
   data() {
    return {
      totalOrderPriceData: Number
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
      }
   },
   async created() {

   },
   filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
   },
   computed: {
      ...mapState([
        'orderInformations'
      ]),
   },
   methods: {
      ...mapActions([
        'requestOrderInformationsToSpring'
      ]),
      purchase() {
        this.kakaoPayAPI()
        this.saveOrderInformations()
      },
      kakaoPayAPI() {
        var IMP = window.IMP; 
        IMP.init("imp60856856");

        // 결제창 호출 코드
        IMP.request_pay({
          pg : "kakaopay", 
          pay_method : 'card',
          merchant_uid : 'merchant_' + new Date().getTime(),
          name : '결제',
          amount : this.totalOrderPrice,
          buyer_email : '구매자 이메일',
          buyer_name : '구매자 이름',
          buyer_tel : '구매자 번호',
          buyer_addr : '구매자 주소',
          buyer_postcode : '구매자 주소',
          m_redirect_url : 'redirect url'
         }, function(rsp) {
          if ( rsp.success ) {
              var msg = '결제가 완료되었습니다.';
              location.href='http://localhost:8887/member-my-page';
              alert(msg)
          } else {
              var msg = '결제에 실패하였습니다.';
              rsp.error_msg;
              alert(msg)
          }
        });
      },
      saveOrderInformations() {
        let formData = new FormData()
        let customer = JSON.parse(localStorage.getItem('userInfo')).nickName
        let totalQuantity = 0
        for(let i = 0; i < this.cartItems.length; i++) {
          totalQuantity += this.cartItems[i].count
        }
        let totalPrice = this.totalOrderPrice
        let cartItemList = []

        for(let i = 0; i < this.cartItems.length; i++) {
          cartItemList.push({productId: this.cartItems[i].productId, count: this.cartItems[i].count})
        }

        let orderInfo = {
          customer: customer,
          totalQuantity: totalQuantity,
          totalPrice: totalPrice,
          cartItemList: cartItemList
        } 

        console.log('orderInfo: ' + JSON.stringify(orderInfo))
        
        formData.append(
            "orderInfo",
            new Blob([JSON.stringify(orderInfo)], { type: "application/json" })
        )

        this.requestOrderInformationsToSpring(formData)
      }
   },
}
</script>

<style scoped>
tr th {
   width: 150px;
}

.cart {
  padding: 10px;
  padding-bottom: 0px;
  width: 100%;
}

h4 div {
  color: #666666;
  font-size: .8em;
}

.section {
  padding-top: 50px;
  padding-bottom: 30px;
}

.wrap {
  background-color: #eaebee;
}
</style>