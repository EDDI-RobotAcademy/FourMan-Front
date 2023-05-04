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
                     상품 목록이 존재하지 않습니다.
                  </td>
               </tr>
               <tr v-else-if="isExist == false">
                  <td colspan="6" align="center">
                     해당 카테고리 상품이 존재하지 않습니다.
                  </td>
               </tr>
               <tr v-else v-for="(product,index) in calData" :key="index">
                  <td>
                     <!-- AWS s3 사용을 위한 주석 -->
                     <!-- <v-img :src="require(`@/assets/product/uploadImgs/${product.imageResourceList[0].imageResourcePath}`)" width="50px" height="80px"> -->
                     <v-img :src="`https://vue-s3-test-fourman.s3.ap-northeast-2.amazonaws.com/${product.imageResourceList[0].imageResourcePath}`" width="50px" height="80px">
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
                     <v-btn outlined elevation="0" @click="modifyBtn(product)">
                        <v-icon>mdi-pencil</v-icon>
                     </v-btn> <!-- 버튼을 눌렀을 때 v-card가 보여진다. -->
                  </td>

                  <!-- 삭제 -->
                  <td>
                     <v-btn color="red" outlined elevation="0" @click="deleteBtn(product)">
                        <v-icon>mdi-delete</v-icon>
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
import ProductModifyForm from '@/components/myPage/cafeMyPage/ProductModifyForm.vue'
import AWS from 'aws-sdk'
import { mapActions } from 'vuex'

const productModule = 'productModule'

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
         editedProduct: Object,
         isExist: true,
         awsBucketName: 'vue-s3-test-fourman',
         awsBucketRegion: 'ap-northeast-2',
         awsIdentityPoolId: "ap-northeast-2:ce9c61fa-af5d-4ed1-8e3d-9b8d460ee927",
         s3: null,
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
      ...mapActions(
         productModule, ['requestDeleteProductToSpring']
      ),
      filterCategory(index) {
         this.category = this.categoryBtn[index].value
         if(this.category === 'ALL'){
            this.isExist = true
            this.filteredItems = this.productList
         } else {
            const categoryData = this.productList.filter((value) => value.drinkType == this.category)
            if(categoryData.length === 0) {
               return this.isExist = false
            }
            this.isExist = true
            this.filteredItems = categoryData
         }
      },
      modifyBtn(product) {
         this.$router.push({
               name: "ProductModifyPage",
               params: { modifyProduct: product }
            })
      },
      // * AWS s3 사용을 위한 주석
      // async deleteBtn(product) {
      //    if (confirm("정말 삭제 하시겠습니까?")) {
      //       let productId = product.productId
      //       await this.requestDeleteProductToSpring(productId)
            
      //       // 새로고침
      //       this.$router.go()
      //    } else {
      //       console.log("상품 삭제 취소되었습니다.")
      //    }
      // },

      // AWS s3
      async deleteBtn(product) {
         if (confirm("정말 삭제 하시겠습니까?")) {

            await this.deleteImageFromS3(product.imageResourceList[0].imageResourcePath);

            let productId = product.productId
            await this.requestDeleteProductToSpring(productId)

            // 새로고침
            this.$router.go()
         } else {
            console.log("상품 삭제 취소되었습니다.")
         }
      },
      
      awsS3Config () {
         AWS.config.update({
               region: this.awsBucketRegion,
               credentials: new AWS.CognitoIdentityCredentials({
                  IdentityPoolId: this.awsIdentityPoolId
               })
         })

         this.s3 = new AWS.S3({
               apiVersion: '2006-03-01',
               params: {
                  Bucket: this.awsBucketName
               }
         })
      },
      async deleteImageFromS3(imagePath) {
         try {

            this.awsS3Config()

            // 삭제할 객체의 키를 생성
            const objectKey = imagePath;

            // 객체 삭제
            const deleteParams = {
            Bucket: this.awsBucketName,
            Key: objectKey
            };

            await this.s3.deleteObject(deleteParams).promise();

            console.log("이미지가 S3에서 삭제되었습니다.");
         } catch (error) {
            console.error("S3에서 이미지를 삭제하는 데 실패했습니다.", error);
         }
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
      console.log(JSON.stringify(this.filteredItems))
   },
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