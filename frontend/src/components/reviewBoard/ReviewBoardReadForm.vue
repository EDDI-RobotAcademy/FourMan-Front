<template>
    <div>
        <table class="type09 mt-5 mb-5">
          <thead>
            <tr style="height: 3em;">
              <th scope="cols">
                {{ reviewBoard.cafeName }}
              </th>
              <th>
                <v-rating
                    v-model= reviewBoard.rating
                    bg-color="orange-lighten-1"
                    color="blue"
                    readonly
                    />
              </th>
            </tr>
            <tr style="height: 3em;">
              <td scope="row">
                {{ reviewBoard.title }}
              </td>
              <td scope="row" class="text-right">
                {{ reviewBoard.writer }}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr style="height: 37em;">
              <td colspan="2" scope="row">
                {{ reviewBoard.content }}
              </td>
            </tr>
            <tr>
                <td colspan="2" scope="cols">
                    <v-row>
                        <v-col v-for="(imagePath, idx) in reviewBoardImages" :key="idx" cols="12">
                          <v-img :src="require(`@/assets/reviewImage/${imagePath.reviewBoardImageResourcePath}`)" aspect-ratio="1" class="grey lighten-2">
                            <template v-slot:placeholder>
                              <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey lighten-5"/>
                              </v-row>
                            </template>
                          </v-img>
                        </v-col>
                      </v-row>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
  </template>
  
  <script>
  export default {
      name: "ReviewBoardReadForm",
      props: {
          reviewBoard: {
              type: Object,
              required: true,
          },
          reviewBoardImages: {
              type: Array,
          }
      },
      created() {
          console.log('reviewBoardImages: ' + this.reviewBoardImages)
      }
  }
  </script>
  
  <style scoped>
  table.type09 {
    border-collapse: collapse;
    text-align: left;
    line-height: 1.5;
  
  }
  table.type09 thead th {
    padding: 10px;
    font-weight: bold;
    vertical-align: top;
    color: #369;
    border-bottom: 3px solid #036;
  }
  table.type09 tbody th {
    width: 150px;
    padding: 10px;
    font-weight: bold;
    vertical-align: top;
    border-bottom: 1px solid #ccc;
    background: #f3f6f7;
  }
  table.type09 td {
    width: 350px;
    padding: 10px;
    vertical-align: top;
    border-bottom: 1px solid #ccc;
  }
  </style>