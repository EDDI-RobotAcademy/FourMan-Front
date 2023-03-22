<template>
  <form @submit.prevent="onSubmit">
    <table>
      <tr>
        <td>사진 등록</td>
        <td>
          <input type="file" id="files" ref="files" @change="handleFileUpload"/>
        </td>
      </tr>
      <tr>
        <td>상품명</td>
        <td>
          <input type="text" v-model="productName"/>
        </td>
      </tr>
      <tr>
        <td>가격</td>
        <td>
          <input tpye="text" v-model="price"/>
        </td>
      </tr>
    </table>

    <div>
      <button type="submit">등록</button>
      <router-link to="{ name: 'ProductListPage' }">
        취소
      </router-link>
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
        }

    }
}

</script>

<style>

</style>