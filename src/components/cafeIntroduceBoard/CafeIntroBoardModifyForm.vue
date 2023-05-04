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
              <v-col class="cafe-name-display">{{ cafeName }}</v-col>
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
              <td colspan="3" align="right" style="border-bottom: none">
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
                <v-img
                  :src="image.url"
                  width="300px"
                  contain
                  style="display: block"
                />
              </td>
            </tr>
          </table>
        </v-row>
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
              >수정
            </v-btn>
          </div>
        </v-row>
      </table>
    </v-form>
  </div>
</template>

<script>
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { mapActions } from "vuex";
const cafeIntroduceBoardModule = "cafeIntroduceBoardModule";
export default {
  name: "CafeIntroBoardModifyForm",
  props: {
    cafe: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.cafeAddress = this.cafe.cafeAddress;
    this.cafeTel = this.cafe.cafeTel;
    this.startTime = this.cafe.startTime;
    this.endTime = this.cafe.endTime;
    this.subTitle = this.cafe.cafeInfo.subTitle;
    this.description = this.cafe.cafeInfo.description;
    this.thumbnailFile = this.cafe.cafeInfo.thumbnailFileName;
    this.originalThumbnail = this.cafe.cafeInfo.thumbnailFileName;

    console.log(
      " this.cafe.cafeInfo.thumbnailFileName:",
      this.cafe.cafeInfo.thumbnailFileName
    );
    // aws s3사용을 위한 주석
    // this.thumbnailPreview = `/assets/cafe/uploadImgs/${this.thumbnailFile}`;
    this.thumbnailPreview = `https://vue-s3-test-fourman.s3.ap-northeast-2.amazonaws.com/${this.thumbnailFile}`;
    console.log("this.thumbnailPreview", this.thumbnailPreview);

    console.log(
      "this.cafe.cafeInfo.cafeImagesName",
      this.cafe.cafeInfo.cafeImagesName
    );

    if (this.cafe.cafeInfo && this.cafe.cafeInfo.cafeImagesName) {
      this.multipleFiles = this.cafe.cafeInfo.cafeImagesName.map((fileName) => {
        return {
          file: fileName,
          // aws s3사용을 위한 주석
          // url: `/assets/cafe/uploadImgs/${fileName}`,
          url: `https://vue-s3-test-fourman.s3.ap-northeast-2.amazonaws.com/${fileName}`,
        };
      });
    }
    console.log("this.multipleFiles", this.multipleFiles);

    if (this.cafe.cafeInfo && this.cafe.cafeInfo.cafeImagesName) {
      this.originalMultipleFiles = this.cafe.cafeInfo.cafeImagesName.map(
        (fileName) => {
          return {
            file: fileName,
            // aws s3사용을 위한 주석
            // url: `/assets/cafe/uploadImgs/${fileName}`,
            url: `https://vue-s3-test-fourman.s3.ap-northeast-2.amazonaws.com/${fileName}`,
          };
        }
      );
    }

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
          rowImages.push(this.multipleFiles[i + j]);
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
      originalThumbnail: "",
      originalMultipleFiles: "",
      fileNum: 0,
      // multiplePreview: [],
      thumbnailPreview: [],
      add: true,
      awsBucketName: "vue-s3-test-fourman",
      awsBucketRegion: "ap-northeast-2",
      awsIdentityPoolId: "ap-northeast-2:ce9c61fa-af5d-4ed1-8e3d-9b8d460ee927",
      s3: null,
    };
  },

  methods: {
    ...mapActions(cafeIntroduceBoardModule, [
      "requestCreateCafeToSpring",
      "requestCafeListToSpring",
    ]),
    awsS3Config() {
      AWS.config.update({
        region: this.awsBucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.awsIdentityPoolId,
        }),
      });
      this.s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: {
          Bucket: this.awsBucketName,
        },
      });
    },
    handleFileUpload() {
      this.thumbnailFile = this.$refs.thumbnailFile.files;
      this.thumbnailPreview = URL.createObjectURL(this.thumbnailFile[0]);
    },
    handleMultipleFileUpload() {
      const newFiles = this.$refs.multipleFiles.files;
      this.multipleFiles = [
        ...this.multipleFiles,
        ...Array.from(newFiles).map((file) => {
          return {
            file,
            url: URL.createObjectURL(file),
          };
        }),
      ];
      console.log("this.$refs.multipleFiles전", this.$refs.multipleFiles);
      console.log(
        "this.$refs.multipleFiles.value",
        this.$refs.multipleFiles.value
      );
      this.$refs.multipleFiles.value = "";
      console.log("this.$refs.multipleFiles후", this.$refs.multipleFiles);
    },
    //aws s3 적용을 위한 주석처리
    // async onSubmit() {
    //   console.log("카페 등록- registerform");
    //   //파일 업로드한 경우
    //   if (!this.multipleFiles.length == 0 && !this.thumbnailFile.length == 0) {
    //     let formData = new FormData();

    //     formData.append("thumbnail", this.thumbnailFile[0]);

    //     for (let idx = 0; idx < this.multipleFiles.length; idx++) {
    //       console.log("파일리스트 반복문:" + idx);
    //       console.log("this.multipleFiles[idx]" + this.multipleFiles[idx]);
    //       formData.append("fileList", this.multipleFiles[idx].file);
    //     }

    //     let cafeContents = {
    //       cafeAddress: this.cafeAddress,
    //       cafeTel: this.cafeTel,
    //       startTime: this.startTime,
    //       endTime: this.endTime,
    //       subTitle: this.subTitle,
    //       description: this.description,
    //       code: JSON.parse(localStorage.getItem("userInfo")).code,
    //       add: this.add,
    //     };

    //     formData.append(
    //       "info",
    //       new Blob([JSON.stringify(cafeContents)], {
    //         type: "application/json",
    //       })
    //     );
    //     this.$emit("submit", formData);

    //     //파일 업로드 하지 않은 경우
    //   } else {
    //     alert("카페 사진을 업로드해주세요");
    //   }
    // },

    async uploadAwsS3(file) {
      this.awsS3Config();

      const fileExtension = file.name.split(".").pop();
      const fileName = `cafe/${uuidv4()}.${fileExtension}`;

      return new Promise((resolve, reject) => {
        this.s3.upload(
          {
            Key: fileName,
            Body: file,
            ACL: "public-read",
          },
          (err, data) => {
            if (err) {
              console.log(err);
              reject(err.message);
            } else {
              resolve(fileName);
            }
          }
        );
      });
    },
    async multipleuploadAwsS3(file) {
      this.awsS3Config();

      const fileExtension = file.file.name.split(".").pop();
      const fileName = `cafe/${uuidv4()}.${fileExtension}`;

      return new Promise((resolve, reject) => {
        this.s3.upload(
          {
            Key: fileName,
            Body: file.file,
            ACL: "public-read",
          },
          (err, data) => {
            if (err) {
              console.log(err);
              reject(err.message);
            } else {
              resolve(fileName);
            }
          }
        );
      });
    },
    async deleteImageFromS3(imagePath) {
      try {
        this.awsS3Config();

        // 삭제할 객체의 키를 생성
        const objectKey = imagePath;

        // 객체 삭제
        const deleteParams = {
          Bucket: this.awsBucketName,
          Key: objectKey,
        };

        await this.s3.deleteObject(deleteParams).promise();

        console.log("이미지가 S3에서 삭제되었습니다.");
      } catch (error) {
        console.error("S3에서 이미지를 삭제하는 데 실패했습니다.", error);
      }
    },
    arraysEqual(a, b) {
      if (a.length !== b.length) return false;

      for (let i = 0; i < a.length; i++) {
        if (a[i].file !== b[i].file || a[i].url !== b[i].url) {
          return false;
        }
      }

      return true;
    },

    async onSubmit() {
      console.log("카페 수정- modifyform");

      //파일 업로드한 경우
      if (!this.multipleFiles.length == 0 || !this.thumbnailFile.length == 0) {
        let formData = new FormData();

        console.log("this.thumbnailFile", this.thumbnailFile);
        console.log("this.originalThumbnail", this.originalThumbnail);
        console.log(
          "this.thumbnailFile != this.originalThumbnail",
          this.thumbnailFile != this.originalThumbnail
        );
        if (this.thumbnailFile != this.originalThumbnail) {
          const thumbnailFileNameList = [];
          await this.deleteImageFromS3(
            `https://vue-s3-test-fourman.s3.ap-northeast-2.amazonaws.com/${this.originalThumbnailFile}`
          );

          for (const file of this.thumbnailFile) {
            try {
              const fileName = await this.uploadAwsS3(file);
              thumbnailFileNameList.push(fileName);
            } catch (error) {
              console.error("Error in uploadAwsS3():", error); // 추가된 코드
              alert(
                "업로드 중 문제 발생 (사진 썸네일파일에 문제가 있음)",
                error
              );
              return;
            }
          }
          formData.append(
            "thumbnailFileNameList",
            new Blob([JSON.stringify(thumbnailFileNameList)], {
              type: "application/json",
            })
          );
        }
        console.log("this.multipleFiles", this.multipleFiles);
        console.log("this.originalMultipleFiles", this.originalMultipleFiles);
        console.log(
          "this.multipleFiles != this.originalMultipleFiles",
          this.multipleFiles != this.originalMultipleFiles
        );
        console.log(
          "!arraysEqual(this.multipleFiles, this.originalMultipleFiles",
          !this.arraysEqual(this.multipleFiles, this.originalMultipleFiles)
        );
        if (!this.arraysEqual(this.multipleFiles, this.originalMultipleFiles)) {
          const multipleFileNameList = [];
          if (this.add == true) {
            //사진추가.
            const addedFiles = this.multipleFiles.filter((file) => {
              return !this.originalMultipleFiles.some(
                (originalFile) => originalFile.file.name === file.file.name
              );
            });
            for (const file of addedFiles) {
              try {
                console.log("addedFiles", addedFiles);
                console.log("this.add", this.add);
                console.log("file", file);
                console.log("file.file", file.file);
                console.log("file.file.name", file.file.name);
                const fileName = await this.multipleuploadAwsS3(file);

                multipleFileNameList.push(fileName);
              } catch (error) {
                console.error("Error in uploadAwsS3():", error);
                alert(
                  "업로드 중 문제 발생 (사진 멀티플파일에 문제가 있음)",
                  error
                );
                return;
              }
            }
          } else {
            //사진 초기화누르고 업로드
            await this.deleteImageFromS3(
              `https://vue-s3-test-fourman.s3.ap-northeast-2.amazonaws.com/${this.originalMultipleFiles}`
            );

            for (const file of this.multipleFiles) {
              try {
                console.log("file", file);
                console.log("file.file", file.file);
                console.log("file.file.name", file.file.name);
                const fileName = await this.multipleuploadAwsS3(file);

                multipleFileNameList.push(fileName);
              } catch (error) {
                console.error("Error in uploadAwsS3():", error);
                alert(
                  "업로드 중 문제 발생 (사진 멀티플파일에 문제가 있음)",
                  error
                );
                return;
              }
            }
          }

          formData.append(
            "multipleFileNameList",
            new Blob([JSON.stringify(multipleFileNameList)], {
              type: "application/json",
            })
          );
        }

        let cafeContents = {
          cafeAddress: this.cafeAddress,
          cafeTel: this.cafeTel,
          startTime: this.startTime,
          endTime: this.endTime,
          subTitle: this.subTitle,
          description: this.description,
          code: JSON.parse(localStorage.getItem("userInfo")).code,
          add: this.add,
        };

        formData.append(
          "info",
          new Blob([JSON.stringify(cafeContents)], {
            type: "application/json",
          })
        );

        this.$emit("submit", formData);
      } else {
        alert("카페 사진을 업로드해주세요");
      }
    },

    thumbnailCancel() {
      this.thumbnailFile = "";
      this.$refs.thumbnailFile.value = "";
      this.thumbnailPreview = ""; // 이 부분을 추가해주세요.
    },
    uploadCancel() {
      this.multipleFiles = "";
      this.$refs.multipleFiles.value = "";
      this.add = false;
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.cafe-name-display {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
}
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