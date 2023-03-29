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
                           <v-img :src="require(`@/assets/product/uploadImgs/${item.imageResourcePath}`)" width="50px"/>
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
                        <th>TOTAL : {{ totalPrice | comma}}원</th>
                     </tr>
                    </tfoot>
                  </v-simple-table>
                </table>
              </div>
            </div>
          </v-card>
          <v-btn @click="purchase" block x-large class="" color="#5F4F4F" style="color: white; font-size: 1em" >
            {{ totalPrice | comma }}원 결제하기
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
   name: "TotalOrderForm",
   props: {
      cartItems: {
        type: Array
      },
      totalPrice: {
        type: ""
      }
   },
   async mounted() {
      console.log('cartItems: ' + JSON.stringify(this.cartItems))
   },
   filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
   },
   methods: {
      purchase() {
        
      }
   }
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