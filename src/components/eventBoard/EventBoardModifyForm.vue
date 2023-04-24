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
                    <div v-if="this.thumbnailPreview">
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
              <v-col cols="6"><h4>이벤트 시작일</h4></v-col>
              <v-col cols="6"><h4>이벤트 종료일</h4></v-col>
            </v-row>

            <v-row class="ml-1">
              <v-col cols="6">
                <v-menu
                  v-model="startDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                  style="z-index: 3000"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="eventStartDate"
                      label="이벤트 시작일"
                      :rules="[required]"
                      readonly
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="eventStartDate"
                    @input="onStartDateSelected"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-menu
                  v-model="endDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                  style="z-index: 3000"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="eventEndDate"
                      label="이벤트 종료일"
                      :rules="[required, endDateAfterStartDate]"
                      readonly
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="eventEndDate"
                    @input="onEndDateSelected"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-divider class="mt-10" />
        <v-row class="mt-7">
          <v-col cols="2"><h3>이벤트 제목</h3></v-col>
          <v-text-field
            outlined
            color="grey darken-1"
            placeholder="이벤트 제목 을 입력해주세요"
            v-model="eventName"
          >
          </v-text-field>
        </v-row>

        <div class="mb-10">
          <div id="editor" />
          <textarea v-model="content" style="display: none" />
        </div>

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
const eventBoardModule = "eventBoardModule";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style

export default {
  name: "EventBoardModifyForm",
  components: {
    editor: Editor,
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  created() {
    console.log("event객체:", this.event);
    this.eventName = this.event.eventName;
    this.eventStartDate = this.event.eventStartDate;
    this.eventEndDate = this.event.eventEndDate;
    this.content = this.event.content;
    this.thumbnailFile = this.event.thumbnailFileName;
    console.log(" this.event.thumbnailFileName:", this.event.thumbnailFileName);
    this.thumbnailPreview = `/assets/event/uploadImgs/${this.thumbnailFile}`;
    console.log("this.thumbnailPreview", this.thumbnailPreview);
  },
  mounted() {

    this.editor = new Editor({
      el: document.querySelector("#editor"),
      height: "500px",
      initialValue: this.content, //
      initialEditType: "wysiwyg",
      previewStyle: "vertical",
      placeholder: "내용을 입력하세요.",
      usageStatistics: false,
      hooks: {
        addImageBlobHook: (blob, callback) => this.uploadImage(blob, callback),
      },
    });
    this.editor.on("change", () => {
      this.content = this.editor.getMarkdown();
    });
  },

  data() {
    return {
      cafeName: JSON.parse(localStorage.getItem("userInfo")).cafeName,
      eventName: "",
      eventStartDate: null,
      eventEndDate: null,
      startDateMenu: false,
      endDateMenu: false,
      content: "",
      uploadPreThumbnailUrl: [],
      thumbnailFile: "",
      thumbnailPreview: [],
    };
  },

  methods: {
    ...mapActions(eventBoardModule, ["requestImageURLToSpring"]),
    onStartDateSelected() {
      this.startDateMenu = false;
    },

    onEndDateSelected() {
      this.endDateMenu = false;
    },
    async uploadImage(blob, callback) {
      let formData = new FormData();
      const fileExtension = blob.type.split("/")[1];
      // 영문으로 된 랜덤 파일 이름 생성
      const randomFileName = `image_${Math.random()
        .toString(36)
        .substring(2)}.${fileExtension}`;
      // 수정된 파일 이름으로 Blob 객체를 File 객체로 변환
      const file = new File([blob], randomFileName, { type: blob.type });
      formData.append("file", file);

      try {
        const response = await this.requestImageURLToSpring(formData);
        console.log("response", response);
        console.log("response.data", response.data);
        const imageUrl = response.data;
        console.log("imageUrl", imageUrl);
        callback(imageUrl, "alt text");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },

    required(value) {
      return !!value || "필수 입력 사항입니다.";
    },
    endDateAfterStartDate(value) {
      if (value < this.eventStartDate) {
        return "종료일은 시작일 이후여야 합니다.";
      }
      return true;
    },
    handleFileUpload() {
      this.thumbnailFile = this.$refs.thumbnailFile.files;
      this.thumbnailPreview = URL.createObjectURL(this.thumbnailFile[0]);
    },

    async onSubmit() {
      console.log("이벤트 등록- registerform");
      console.log("eventStartDate", this.eventStartDate);
      console.log("eventEndDate", this.eventEndDate);

      //파일 업로드한 경우
      if (!this.thumbnailFile.length == 0) {
        let formData = new FormData();

        formData.append("thumbnail", this.thumbnailFile[0]);

        let eventContents = {
          eventName: this.eventName,
          eventStartDate: this.eventStartDate,
          eventEndDate: this.eventEndDate,
          content: this.content,
          code: JSON.parse(localStorage.getItem("userInfo")).code,
        };

        formData.append(
          "info",
          new Blob([JSON.stringify(eventContents)], {
            type: "application/json",
          })
        );
        this.$emit("submit", formData);
      } else {
        alert("이벤트 사진을 업로드해주세요");
      }
    },
    thumbnailCancel() {
      this.thumbnailFile = "";
      this.$refs.thumbnailFile.value = "";
      this.thumbnailPreview = ""; // 이 부분을 추가해주세요.
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