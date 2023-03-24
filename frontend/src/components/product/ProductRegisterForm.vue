<template>
  <form class="register-form" @submit.prevent="onSubmit">
    <div class="form-field">
      <label for="files">Register photo</label>
      <input type="file" id="files" ref="files" @change="handleFileUpload"/>
    </div>
    <div class="form-field">
      <label for="productName">Product name</label>
      <input type="text" id="productName" v-model="productName"/>
    </div>
    <div class="form-field">
      <label for="price">Price</label>
      <input type="text" id="price" v-model="price"/>
    </div>

    <div class="form-buttons">
      <button type="submit">Register</button>
      <button @click="moveToListPage">
          Cancel
      </button>
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
        }
    },
    methods: {
        onSubmit () {
          let formData = new FormData()

          for(let idx = 0; idx < this.files.length; idx++) {
            formData.append('imageFileList', this.files[idx])
          }

          const { productName, price } = this
          
          let productInfo = {
            productName: productName,
            price: price,
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
        }

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