<template>
  <v-container>
   <v-row>
      <v-col>
         <v-img aspect-ratio="1" :src="require(`@/assets/product/uploadImgs/${imagePath.imageResourcePath}`)" width="100" >
            <template v-slot:placeholder>
               <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"/>
               </v-row>
            </template>
         </v-img>
      </v-col>
   </v-row>
  </v-container>
</template>

<script>
export default {
   name: 'ProductCardImageForm',
   props: {
      imagePath: {
         type: Object,
         required: true,
      }
   }
}
</script>

<style>

</style>