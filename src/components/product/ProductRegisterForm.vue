<template>
  <form class="register-form" @submit.prevent="onSubmit">
    <div class="form-field">
      <label for="files">카페 이름</label>
      <input type="text" id="price" v-model="cafeName" disabled/>
    </div>
    <div class="form-field">
      <label for="files">상품 사진</label>
      <input type="file" id="files" ref="files" @change="handleFileUpload" style="display:none" />
      <div class="preview-container">
        <img v-if="previewImage" :src="previewImage" class="image-preview"/>
      </div>
        <v-btn class="grey darken-3 white--text" @click="clickFileInput">파일 선택</v-btn>
    </div>
    <div class="form-field">
      <label>카테고리</label>
      <v-select style="margin-top: -8px" v-model="drinkType" @change="drinkTypeSelect" label="DrinkType" :items="drinkTypeList">
      </v-select>
    </div>
    <div style="margin-top: -10px;" class="form-field">
      <label for="productName">상품 이름</label>
      <input type="text" id="productName" v-model="productName" placeholder="상품명을 입력하세요" />
    </div>
    <div class="form-field">
      <label for="price">가격</label>
      <input type="text" id="price" v-model="price" placeholder="가격을 입력하세요" @input="restrictToNumbers" />
    </div>
    <div class="mt-5">
        <v-btn class="brown darken-2 white--text mr-5" @click="cancel">취소</v-btn>
        <v-btn class="brown darken-2 white--text ml-5" @click="onSubmit">등록</v-btn>
    </div>
  </form>
</template>

<script>
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'

export default {
    name: "ProductRegisterForm",
    data () {
        return {
            productName: '',
            price: '',
            files: '',
            drinkTypeList: ['COFFEE & LATTE', 'BUBBLETEA & NON-COFFEE', 'ADE & TEA', 'SMOOTHIE & FRUIT BEVERAGE'],
            drinkType: '',
            previewImage: null,
            cafeName: JSON.parse(localStorage.getItem('userInfo')).cafeName,
            cafeId: JSON.parse(localStorage.getItem('userInfo')).cafeId,
            awsBucketName: 'vue-s3-test-fourman',
            awsBucketRegion: 'ap-northeast-2',
            awsIdentityPoolId: "ap-northeast-2:ce9c61fa-af5d-4ed1-8e3d-9b8d460ee927",
            s3: null,
        }
    },
    methods: {
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
            const fileName = `product/${uuidv4()}.${fileExtension}`

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
        
        // * AWS s3 사용을 위한 주석
        // onSubmit () {
        //   if(this.drinkType.length == 0 || this.cafeId.length == 0 || this.price.length == 0 || this.productName.length == 0 || this.files.length == 0) {
        //     alert('정보를 다 기입해주셔야 합니다!')
        //   } else {
        //     let formData = new FormData()
  
        //     for(let idx = 0; idx < this.files.length; idx++) {
        //       formData.append('imageFileList', this.files[idx])
        //     }
  
        //     const { cafeId, productName, price, drinkType } = this
            
        //     let productInfo = {
        //       cafeId: cafeId,
        //       productName: productName,
        //       price: price,
        //       drinkType: drinkType,
        //     }
  
        //     console.log('productInfo: ' + JSON.stringify(productInfo))
  
        //     formData.append(
        //       "productInfo",
        //       new Blob([JSON.stringify(productInfo)], { type: "application/json" })
        //     )
  
        //     console.log('formData: ' + JSON.stringify(formData))
  
        //     this.$emit('submit', formData)
        //   }
        // },

        async onSubmit () {
          if(this.drinkType.length == 0 || this.cafeId.length == 0 || this.price.length == 0 || this.productName.length == 0 || this.files.length == 0) {
            alert('정보를 다 기입해주셔야 합니다!')
          } else {
            let formData = new FormData()

            const imageFileNameList = []

            for (const file of this.files) {
                try {
                    const fileName = await this.uploadAwsS3(file)
                    imageFileNameList.push(fileName)
                } catch (error) {
                    alert('업로드 중 문제 발생 (사진 파일에 문제가 있음)', error)
                    return
                }
            }

            formData.append(
              "imageFileNameList",
              new Blob([JSON.stringify(imageFileNameList)], { type: "application/json" })
            );

  
            const { cafeId, productName, price, drinkType } = this
            
            let productInfo = {
              cafeId: cafeId,
              productName: productName,
              price: price,
              drinkType: drinkType,
            }
  
            console.log('productInfo: ' + JSON.stringify(productInfo))
  
            formData.append(
              "productInfo",
              new Blob([JSON.stringify(productInfo)], { type: "application/json" })
            )
  
            console.log('formData: ' + JSON.stringify(formData))
  
            this.$emit('submit', formData)
          }
        },
        handleFileUpload() {
          this.files = this.$refs.files.files

          if (this.files.length > 0) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(this.files[0]);
            fileReader.onload = (event) => {
            this.previewImage = event.target.result;
          };
          } else {
            this.previewImage = null;
          }
        },
        cancel() {
          this.$router.push( {
            name: 'ProductManagePage'
          })
        },
        drinkTypeSelect(drinkType) {
          this.drinkType = drinkType
        },
        restrictToNumbers(event) {
          event.target.value = event.target.value.replace(/[^0-9]/g, '');
        },
        clickFileInput() {
          this.$refs.files.click();
        },
    },
    updated() {
      console.log('drinkType: ' + this.drinkType)
    }
}

</script>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
}

.form-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
}

label {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input[type="file"] {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  width: 100%;
}

input[type="text"] {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  width: 100%;
}

.form-buttons {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  width: 100%;
}

button {
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
  width: 8rem;
}

.cancel-button {
  text-decoration: none;
  color: white;
}

.image-preview {
  width: 150px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
}

.preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>