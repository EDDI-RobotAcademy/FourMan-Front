<template>
  <form class="register-form" @submit.prevent="onSubmit">
    <div class="form-field">
      <label for="files">Cafe Name</label>
      <input type="text" id="price" v-model="cafeName" disabled/>
    </div>
    <div class="form-field">
      <label for="files">Register photo</label>
      <input type="file" id="files" ref="files" @change="handleFileUpload"/>
    </div>
    <div class="form-field">
      <label>DrinkType</label>
      <v-select v-model="drinkType" @change="drinkTypeSelect" label="DrinkType" :items="drinkTypeList">
      </v-select>
    </div>
    <div class="form-field">
      <label for="productName">Product name</label>
      <input type="text" id="productName" v-model="productName"/>
    </div>
    <div class="form-field">
      <label for="price">Price</label>
      <input type="text" id="price" v-model="price"/>
    </div>
    <div>
        <v-btn class="brown darken-2 white--text" @click="onSubmit">Register</v-btn>
        <v-btn class="brown darken-2 white--text" @click="moveToListPage">Cancel</v-btn>
    </div>
  </form>
</template>

<script>

export default {
    name: "ProductRegisterForm",
    data () {
        return {
            productName: '상품명을 입력하세요.',
            price: 0,
            files: '',
            drinkTypeList: ['COFFEE & LATTE', 'BUBBLETEA & NON-COFFEE', 'ADE & TEA', 'SMOOTHIE & FRUIT BEVERAGE'],
            drinkType: '',
            cafeName: JSON.parse(localStorage.getItem('userInfo')).cafeName,
            cafeId: JSON.parse(localStorage.getItem('userInfo')).cafeId,
        }
    },
    methods: {
        onSubmit () {
          
          let formData = new FormData()

          for(let idx = 0; idx < this.files.length; idx++) {
            formData.append('imageFileList', this.files[idx])
          }

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
        },
        handleFileUpload() {
          this.files = this.$refs.files.files
        },
        moveToListPage() {
          this.$router.push( {
            name: 'ProductListPage'
          })
        },
        drinkTypeSelect(drinkType) {
          this.drinkType = drinkType
        }
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
  background-color: #4CAF50;
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

button:hover {
  background-color: #3e8e41;
}

.cancel-button {
  text-decoration: none;
  color: white;
}
</style>