<template>
  <div class="ma-10">
    <v-card>
      <v-card-title>상품 수정</v-card-title>
      <v-card-text>
        <v-form>
          <div align="center">
              <v-img v-if="file == null" class="imagePreview" :src="require(`@/assets/product/uploadImgs/${editedProduct.imageResourceList[0].imageResourcePath}`)" max-width="90px" max-height="120px" />
              <!-- 이미지 변경 있을 시 -->
              <v-img else class="imagePreview" :src="preview" max-width="90px" max-height="120px" />
          </div>
          <v-file-input
              v-model="file"
              label="이미지 변경"
              accept="image/*"
              @change="previewFile(file)"
          ></v-file-input>
          <v-text-field
              v-model="editedProduct.productName"
              label="상품 이름"
          ></v-text-field>
          <v-select v-model="editedProduct.drinkType" @change="drinkTypeSelect" label="DrinkType" :items="drinkTypeList" />
          <v-text-field
              v-model="editedProduct.price"
              label="상품 가격"
              type="number"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="save">저장</v-btn>
        <v-btn color="secondary" @click="cancel">취소</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

const productModule = 'productModule'

export default {
   name: "ProductModifyForm",
   props: {
    modifyProduct: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editedProduct: { ...this.modifyProduct },
      preview: '',
      file: null,
      drinkTypeList: ['COFFEE & LATTE', 'BUBBLETEA & NON-COFFEE', 'ADE & TEA', 'SMOOTHIE & FRUIT BEVERAGE'],
    }
  },
  methods: {
    ...mapActions(
      productModule, 
      ['requestEditProductWithoutImageToSpring', 'requestEditProductWithImageToSpring'],
    ),
    async save() {
      
      let formData = new FormData()

      const { productId, productName, price, drinkType } = this.editedProduct

      let editedProductInfo = {
            productId: productId,
            productName: productName,
            price: price,
            drinkType: drinkType,
      }

      formData.append(
            "editedProductInfo",
            new Blob([JSON.stringify(editedProductInfo)], { type: "application/json" })
      )

      if(this.file == null) {
        await this.requestEditProductWithoutImageToSpring(formData)
        this.$router.push({
              name: "ProductManagePage"
        })
      } else {
        formData.append('editedProductImage', this.file)
        await this.requestEditProductWithImageToSpring(formData)
        this.$router.push({
               name: "ProductManagePage"
         })
      }
    },
    cancel() {
      this.$router.push({
               name: "ProductManagePage",
            })
    },
    previewFile(file) {
      const fileData = (data) => {
        this.preview = data
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener("load", function() {
        fileData(reader.result)
      }, false)
    },
    drinkTypeSelect(drinkType) {
          this.editedProduct.drinkType = drinkType
        }
  },
  mounted() {
    console.log('product: ' + JSON.stringify(this.modifyProduct))
  },
}
</script>

<style scoped>
.imagePreview {
  display: inline-block;
  vertical-align: middle;
}

</style>