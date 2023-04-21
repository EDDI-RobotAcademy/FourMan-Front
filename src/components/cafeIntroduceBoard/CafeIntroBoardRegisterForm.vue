<template>
  <div id="registerForm">
    <v-form @submit.prevent="onSubmit">
      <div id="title" class="mb-15"></div>
      <table>
        <v-row>
          <v-col cols="3">
            <v-row>
              <h3 class="mt-1 ml-1 brown--text">대표 이미지</h3>
              <div>
                <v-btn class="mt-0 ml-2 brown darken-2 white--text" text>
                  <label for="thumbnailFile">
                    <v-icon>mdi-camera</v-icon><v-icon>mdi-plus</v-icon>
                  </label>
                  <input
                    type="file"
                    id="thumbnailFile"
                    ref="thumbnailFile"
                    v-on:change="handleFileUpload"
                    hidden
                  />
                </v-btn>
              </div>
            </v-row>
            <v-row class="mt-7">
              <table class="thumbTable" width="320px" height="240px">
                <tr>
                  <td style="padding-bottom: 15px">
                    <div v-if="this.thumbnailFile.length > 0">
                      <v-icon
                        align="right"
                        style="align-items: end"
                        @click="thumbnailCancel"
                        >mdi-close</v-icon
                      >
                      <v-img
                        :src="thumbnailPreview"
                        width="200px"
                        style="
                          margin-left: auto;
                          margin-right: auto;
                          display: block;
                        "
                      />
                    </div>
                    <div v-else>
                      <p
                        style="
                          color: #888888;
                          font-size: medium;
                          text-align: center;
                        "
                      >
                        preview
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </v-row>
          </v-col>

          <v-col>
            <v-row class="mt-10 ml-1">
              <v-col cols="2"><h4>카페명</h4></v-col>
              <v-text-field
                outlined
                color="grey darken-1"
                placeholder="카페명을 입력해주세요."
                :value="cafeName"
                dense
                readonly
              />
            </v-row>

            <v-row class="ml-1">
              <v-col cols="2"><h4>주소</h4></v-col>
              <v-text-field
                outlined
                color="grey darken-1"
                dense
                placeholder="주소를 입력해주세요"
                v-model="cafeAddress"
              >
              </v-text-field>

              <v-col cols="2" align="center"><h4>전화번호</h4></v-col>
              <v-text-field
                outlined
                color="grey darken-1"
                dense
                placeholder="전화번호를 입력해주세요"
                v-model="cafeTel"
              >
              </v-text-field>
            </v-row>

            <v-row class="ml-1">
              <v-col cols="2"><h4>영업 시작</h4></v-col>
              <v-select
                v-model="startTime"
                :items="this.times"
                label="영업 시작 시간"
                style="width: 200px"
                outlined
                dense
              >
              </v-select>
              <v-col cols="2" align="center"><h4>영업 종료</h4></v-col>
              <v-select
                v-model="endTime"
                :items="this.times"
                label="영업 종료 시간"
                style="width: 200px"
                outlined
                dense
              >
              </v-select>
            </v-row>
          </v-col>
        </v-row>

        <v-divider class="mt-10" />

        <v-row class="mt-7">
          <v-col cols="2"><h4>카페 간단 설명</h4></v-col>
          <v-text-field
            outlined
            color="grey darken-1"
            placeholder="카페의 간단한 설명을 입력해주세요"
            v-model="subTitle"
          >
          </v-text-field>
        </v-row>

        <v-row class="mt-7">
          <v-col cols="2"><h4>카페 상세 설명</h4></v-col>
          <textarea
            class="ml-3"
            style="border-color: #888888"
            cols="100"
            rows="5"
            placeholder="카페의 상세한 설명을 입력해주세요"
            v-model="description"
          >
          </textarea>
        </v-row>

        <v-row class="mt-10">
          <v-col cols="2"><h4>카페 상세 사진</h4></v-col>
          <div class="ml-0">
            <v-btn
              class="ma-2 brown darken-2 white--text"
              outlined
              elevation="1"
            >
              <label for="multipleFiles">
                upload
                <v-icon>mdi-camera</v-icon>
              </label>
              <input
                type="file"
                id="multipleFiles"
                ref="multipleFiles"
                multiple
                v-on:change="handleMultipleFileUpload"
                hidden
              />
            </v-btn>
          </div>
          <div class="mt-4 ml-2" v-if="!this.multipleFiles.length > 0">
            <p>업로드 시 미리보기 가능합니다</p>
          </div>
        </v-row>

        <v-row class="mt-10">
    <table v-show="this.multipleFiles.length > 0">
      <tr>
        <td  colspan="3" align="right" style="border-bottom: none;">
          <v-btn
            text
            color="grey"
            style="font-size: 16px"
            @click="uploadCancel"
            >cancel<v-icon>mdi-delete-outline</v-icon></v-btn
          >
        </td>
      </tr>
      <tr
        v-for="(row, rowIndex) in processedImages"
        :key="'row-' + rowIndex"
        style="border-bottom: none"
      >
        <td
          v-for="(image, imageIndex) in row"
          :key="'image-' + rowIndex + '-' + imageIndex"
          class="imageTd"
        >
          <v-img :src="image" width="300px" contain style="display: block" />
        </td>
      </tr>
    </table>
  </v-row>

      

        <!-- <v-row class="mt-10">
          <table v-show="this.multipleFiles.length > 0">
            <tr>
              <td align="right">
                <v-btn
                  text
                  color="grey"
                  style="font-size: 16px"
                  @click="uploadCancel"
                  >cancel<v-icon>mdi-delete-outline</v-icon></v-btn
                >
              </td>
            </tr>
            <tr
              v-for="(image, index) in this.multiplePreview"
              :key="index"
              style="border-bottom: none"
            >
              <td colspan="4" class="imageTd">
                <v-img
                  :src="image"
                  width="400px"
                  contain
                  style=" display: block"
                />
              </td>
            </tr>
          </table>
        </v-row> -->

        <!-- 등록하기 -->
        <v-row class="justify-center mt-15 mb-5">
          <div>
            <v-btn
              @click="cancel"
              class="brown darken-2 white--text"
              large
              style="width: 200px; font-size: 18px"
              >취소</v-btn
            >

            <v-btn
              type="submit"
              class="ml-3 brown darken-2 white--text"
              large
              style="width: 200px; font-size: 18px"
              >등록
            </v-btn>
          </div>
        </v-row>
      </table>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
const cafeIntroduceBoardModule = "cafeIntroduceBoardModule";
export default {
  name: "CafeIntroBoardRegisterForm",
  created() {
    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0); // 00:00:00
    const endTime = new Date();
    endTime.setHours(23, 59, 0, 0); // 23:59:00

    const intervalMinutes = 30; // 30분 간격
    let currentTime = startTime;

    while (currentTime <= endTime) {
      const hour = currentTime.getHours();
      const minute = currentTime.getMinutes();
      const timeString = `${hour < 10 ? "0" : ""}${hour}:${
        minute < 10 ? "0" : ""
      }${minute}`;
      this.times.push(timeString);
      currentTime = new Date(currentTime.getTime() + intervalMinutes * 60000);
    }
  },
  computed: {
    processedImages() {
      const imageRows = [];
      for (let i = 0; i < this.multipleFiles.length; i += 3) {
        const rowImages = [];
        for (let j = 0; j < 3 && i + j < this.multipleFiles.length; j++) {
          rowImages.push(URL.createObjectURL(this.multipleFiles[i + j]));
        }
        imageRows.push(rowImages);
      }
      return imageRows;
    },
  },
  data() {
    return {
      cafeName: JSON.parse(localStorage.getItem("userInfo")).cafeName,
      cafeAddress: "",
      cafeTel: "",
      startTime: "",
      endTime: "",
      times: [],

      subTitle: "",
      description: "",
      uploadPreImageUrl: [],
      uploadPreThumbnailUrl: [],

      thumbnailFile: "",
      multipleFiles: "",
      fileNum: 0,
      multiplePreview: [],
      thumbnailPreview: [],
    };
  },

  methods: {
    ...mapActions(cafeIntroduceBoardModule, [
      "requestCreateCafeToSpring",
      "requestCafeListToSpring",
    ]),
    handleFileUpload() {
      this.thumbnailFile = this.$refs.thumbnailFile.files;
      this.thumbnailPreview = URL.createObjectURL(this.thumbnailFile[0]);
    },
    handleMultipleFileUpload() {
      this.multipleFiles = this.$refs.multipleFiles.files;
      this.fileNum += this.$refs.multipleFiles.files.length;
      for (let i = 0; i < this.$refs.multipleFiles.files.length; i++) {
        this.multiplePreview[i] = URL.createObjectURL(
          this.$refs.multipleFiles.files[i]
        );
      }
    },

    async onSubmit() {
      console.log("카페 등록- registerform");

      //파일 업로드한 경우
      if (!this.multipleFiles.length == 0 && !this.thumbnailFile.length == 0) {
        let formData = new FormData();

        formData.append("thumbnail", this.thumbnailFile[0]);

        for (let idx = 0; idx < this.multipleFiles.length; idx++) {
          console.log("파일리스트 반복문:" + idx);
          formData.append("fileList", this.multipleFiles[idx]);
        }

        let cafeContents = {
          cafeAddress: this.cafeAddress,
          cafeTel: this.cafeTel,
          startTime: this.startTime,
          endTime: this.endTime,
          subTitle: this.subTitle,
          description: this.description,
          code: JSON.parse(localStorage.getItem("userInfo")).code,
        };

        formData.append(
          "info",
          new Blob([JSON.stringify(cafeContents)], {
            type: "application/json",
          })
        );

        await this.requestCreateCafeToSpring(formData);
        await this.requestCafeListToSpring();
        await this.$router.push({ name: "CafeIntroBoardListPage" });
        //파일 업로드 하지 않은 경우
      } else {
        alert("상품 사진을 업로드해주세요");
      }
    },
    thumbnailCancel() {
      this.thumbnailFile = "";
      this.$refs.thumbnailFile.value = "";
    },
    uploadCancel() {
      this.multipleFiles = "";
      this.$refs.multipleFiles.value = "";
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
table {
  margin-top: 5px;
  width: 100%;
}
tr {
  border: none;
}
td {
  border: none;
}
table.thumbTable {
  border: 1px solid lightgray;
  border-collapse: collapse;
}
#registerForm {
  display: block;
  margin-top: 60px;
  margin: 50px;
  border: 1px solid lightgray;
  width: 1000px;
  margin: 0 auto;
  padding: 40px;
  line-height: 24px;
  margin-bottom: 50px;
}
</style>