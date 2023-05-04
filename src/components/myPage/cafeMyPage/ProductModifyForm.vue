<template>
  <div class="ma-10">
    <v-card>
      <v-card-title>상품 수정</v-card-title>
      <v-card-text>
        <v-form>
          <div align="center">
            <!-- AWS s3 설정을 위한 주석 처리 -->
            <!-- <v-img v-if="file == null" class="imagePreview" :src="require(`@/assets/product/uploadImgs/${editedProduct.imageResourceList[0].imageResourcePath}`)" max-width="90px" max-height="120px" /> -->

            <v-img v-if="file == null" :src="`https://vue-s3-test-fourman.s3.ap-northeast-2.amazonaws.com/${editedProduct.imageResourceList[0].imageResourcePath}`" width="90px" height="120px" />
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
import { v4 as uuidv4 } from 'uuid'

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
      awsBucketName: 'vue-s3-test-fourman',
      awsBucketRegion: 'ap-northeast-2',
      awsIdentityPoolId: "ap-northeast-2:ce9c61fa-af5d-4ed1-8e3d-9b8d460ee927",
      s3: null,
    }
  },
  methods: {
    ...mapActions(
      productModule, 
      ['requestEditProductWithoutImageToSpring', 'requestEditProductWithImageToSpring'],
    ),
    // * AWS s3 사용을 위한 주석 처리
    // async save() {
      
    //   let formData = new FormData()

    //   const { productId, productName, price, drinkType } = this.editedProduct

    //   let editedProductInfo = {
    //         productId: productId,
    //         productName: productName,
    //         price: price,
    //         drinkType: drinkType,
    //   }

    //   formData.append(
    //         "editedProductInfo",
    //         new Blob([JSON.stringify(editedProductInfo)], { type: "application/json" })
    //   )

    //   if(this.file == null) {
    //     await this.requestEditProductWithoutImageToSpring(formData)
    //     this.$router.push({
    //           name: "ProductManagePage"
    //     })
    //   } else {
    //     formData.append('editedProductImage', this.file)
    //     await this.requestEditProductWithImageToSpring(formData)
    //     this.$router.push({
    //            name: "ProductManagePage"
    //      })
    //   }
    // },

    async save() {
      
      let formData = new FormData()

      const { productId, productName, price, drinkType } = this.editedProduct

      if(this.file == null) {
        let editedProductInfo = {
          productId: productId,
          productName: productName,
          price: price,
          drinkType: drinkType,
          editedProductImageName: null
        }

        formData.append(
          "editedProductInfo",
              new Blob([JSON.stringify(editedProductInfo)], { type: "application/json" })
        )

        await this.requestEditProductWithoutImageToSpring(formData)
        
      } else {
        // s3 에 존재하던 기존 사진 삭제
        await this.deleteImageFromS3(this.editedProduct.imageResourceList[0].imageResourcePath);

        // 바꾸려는 새로운 사진 저장
        const fileName = await this.uploadAwsS3(this.file)

        let editedProductInfo = {
          productId: productId,
          productName: productName,
          price: price,
          drinkType: drinkType,
          editedProductImageName: fileName
        }

        formData.append(
        "editedProductInfo",
            new Blob([JSON.stringify(editedProductInfo)], { type: "application/json" })
        )

        await this.requestEditProductWithImageToSpring(formData)
      }

      this.$router.push({
        name: "ProductManagePage"
      })
    },
    cancel() {
      this.$router.push({
               name: "ProductManagePage",
            })
    },
    previewFile(file) {
      if (!file) {
        this.preview = "";
        return;
      }

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
    async uploadAwsS3(file) {
          this.awsS3Config()

          const fileExtension = file.name.split('.').pop()
          const fileName = `${uuidv4()}.${fileExtension}`

          return new Promise((resolve, reject) => {
              this.s3.upload({
                  Key: fileName,
                  Body: file,
                  ACL: 'public-read',
              }, (err, data) => {
                  if (err) {
                      console.log(err)
                      reject(err.message)
                  } else {
                      resolve(fileName)
                  }
              })
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