<template>
  <v-container style="width: 1000px">
    <div
      v-if="!datas || (Array.isArray(datas) && datas.length === 0)"
      class="mt-2"
    >
      <center>
        <h2>상품이 존재하지 않습니다.</h2>
      </center>
    </div>
    <div v-else class="mt-2">
      <product-card-form :datas="datas" @addCart="addCart" />
    </div>
    <div class="mt-8">
      <product-cart-form :cartItems="cartItems" />
    </div>

    <!-- 이 정보도 예쁘게 나타내는게 좋지 않을까? -->
    선택하신 카페명:{{ selectedSeats.cafe.cafeName }}<br>
      예약 날짜:{{ selectedSeats.timeString }}<br>
      선택한 자리:
    <div>
      <ul>
        <li v-for="seat in selectedSeats.seatList" :key="seat.seatNo">
          {{ seat.seatNo }}
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script>
import ProductCardForm from "@/components/product/ProductCardForm.vue";
import ProductCartForm from "@/components/product/ProductCartForm.vue";

export default {
  name: "ProductListForm",
  components: {
    ProductCardForm,
    ProductCartForm,
  },
  data() {
    return {
      cartItems: [],
    };
  },
  props: {
    selectedSeats: {
      type: Object,
      required: true,
    },

    datas: {
      type: Array,
      required: true,
    },
    categoryDatas: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addCart(receiveData) {
      var data = receiveData;

      let item = this.cartItems.find(
        (item) => item.productId === data.productId
      );
      if (item) {
        item.count++;
        item.totalPrice = item.price * item.count;
      } else {
        this.cartItems.push(data);
      }
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin-right: 10px;
}
</style>