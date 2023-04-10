<template>
   <div>
      <div>
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
      <div class="mt-3">
         <div class="ma-2" style="display: inline-block;" v-for="(data, index) in calData" :key="index">
            <v-card class="pa-3" align="center">
               <div>
                  <v-img :src="require(`@/assets/product/uploadImgs/${data.imageResourceList[0].imageResourcePath}`)" width="50px" height="100px">
                     <template v-slot:placeholder>
                        <div class="fill-height ma-0" align="center" justify="center">
                           <v-progress-circular indeterminate color="grey lighten-5"/>
                        </div>
                     </template>
                  </v-img>
               </div>
               <div class="mt-2">
                  <p>{{ data.productName }}</p>
               </div>
               <div>
                  <p>{{ data.price | comma }}원</p> 
               </div>
               <div>
                  <v-btn class="brown darken-2 white--text" @click="addCart(data)">장바구니 담기</v-btn>
               </div>
            </v-card>
         </div> 
      </div>

      <v-pagination
      v-model="curPageNum"
      :length="numOfPages"
      color="#5D4037"
      class="mt-10"
      flat
      ></v-pagination>

   </div>
</template>

<script>

export default {
   name: "ProductCardForm",
   data() {
      return {
         categoryBtn : [
            {name: "전체 메뉴", value: 'ALL'},
            {name: "커피/라떼", value: 'COFFEE & LATTE'},
            {name: "버블티/논커피", value: 'BUBBLETEA & NON-COFFEE'},
            {name: "에이드/티", value: 'ADE & TEA'},
            {name: "스무디/과일음료", value: 'SMOOTHIE & FRUIT BEVERAGE'},
         ],
         filteredItems: [],
         category: '',
         dataPerPage: 8,
         curPageNum: 1,
      }
   },
   props: {
      datas: {
         type: Array,
         required: true,
      }
   },
   methods: {
      addCart(data) {
         this.$emit('addCart', data)
      },
      filterCategory(index) {
         this.category = this.categoryBtn[index].value
         if(this.category === 'ALL'){
            this.filteredItems = this.datas
         } else {
            const categoryData = this.datas.filter((value) => value.drinkType == this.category)
            this.filteredItems = categoryData
         }
      },
   },
   filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
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
            return Math.ceil(this.datas.length / this.dataPerPage);
         } else {
            return Math.ceil(this.filteredItems.length / this.dataPerPage);
         }
      },
      calData() {
         if(this.filteredItems.length == 0) {
            return this.datas.slice(this.startOffset, this.endOffset);
         } else {
            return this.filteredItems.slice(this.startOffset, this.endOffset);
         }
      },
   },
}
</script>

<style>

</style>