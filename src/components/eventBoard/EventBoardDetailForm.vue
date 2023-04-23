<template>
  <v-container>
    <v-card class="mx-auto overflow-hidden" style="max-width: 1200px">
      <!-- test -->
      <v-row justify="center">
        <v-col cols="auto">
          <v-img
            v-if="event.thumbnailFileName"
            contain
            width="800px"
            :src="
              require(`../../assets/event/uploadImgs/${event.thumbnailFileName}`)
            "
            class="mx-auto"
          />
        </v-col>
      </v-row>
      <v-card-title class="align-start">
        <div>
          <v-row align="center" class="mx-0">
            <span class="text-h5">{{ event.eventName }}</span
            >&nbsp; &nbsp; &nbsp;
          </v-row>
          <br />
          <v-row>
            <div class="grey--text">
              <span>{{ event.cafeName }} </span> &nbsp; &nbsp; &nbsp;
              <span
                >이벤트 기간: {{ event.eventStartDate }} ~
                {{ event.eventEndDate }}</span
              >
              &nbsp; &nbsp; &nbsp;
              <v-btn class="brown darken-2 white--text" text @click="reserve">
                예약하기
              </v-btn>
            </div>
          </v-row>
        </div>

        <!-- 공유를 눌렀을때 나오는거 -->
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" width="400">
          <template v-slot:activator="{ on }">
            <v-icon v-on="on"> mdi-share-variant </v-icon>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h6 font-weight-bold">Share</span>
              <v-spacer></v-spacer>
              <v-btn class="mx-0" icon @click="dialog = false">
                <v-icon>mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-card-title>
            <v-list>
              <v-list-item @click="shareOnFacebook">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-facebook</v-icon>
                </v-list-item-action>
                <v-card-title>Facebook</v-card-title>
              </v-list-item>

              <v-list-item @click="shareOnTwitter">
                <v-list-item-action>
                  <v-icon color="cyan">mdi-twitter</v-icon>
                </v-list-item-action>
                <v-card-title>Twitter</v-card-title>
              </v-list-item>

              <v-list-item @click="shareByEmail">
                <v-list-item-action>
                  <v-icon>mdi-email</v-icon>
                </v-list-item-action>
                <v-card-title>Email</v-card-title>
              </v-list-item>
            </v-list>

            <v-text-field
              ref="link"
              :label="copied ? 'Link copied' : 'Click to copy link'"
              class="pa-4"
              readonly
              :value="shareUrl"
              @click="copy"
            ></v-text-field>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-divider></v-divider>
      <v-spacer></v-spacer><br /><br />

      <tui-editor-viewer
        v-if="loaded"
        :initialValue="event.content"
        :options="{ viewer: true, hideModeSwitch: true, toolbarItems: [] }"
      ></tui-editor-viewer>
    </v-card>
  </v-container>
</template>

<script>
import { Viewer } from "@toast-ui/vue-editor";
export default {
  name: "EventBoardDetailForm",
  components: {
    "tui-editor-viewer": Viewer,
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    loaded: false,
    copied: false,
    dialog: false,
    shareUrl: "",
  }),
  methods: {
    shareOnFacebook() {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        this.shareUrl
      )}`;
      window.open(url, "_blank");
    },
    shareOnTwitter() {
      const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        this.shareUrl
      )}&text=${encodeURIComponent("Check out this cafe!")}`;
      window.open(url, "_blank");
    },
    shareByEmail() {
      const url = `mailto:?subject=${encodeURIComponent(
        "Check out this cafe!"
      )}&body=${encodeURIComponent(this.shareUrl)}`;
      window.location.href = url;
    },
    async copy() {
      try {
        await navigator.clipboard.writeText(this.shareUrl);
        this.copied = true;
      } catch (err) {
        console.error("Failed to copy text: ", err);
        this.copied = false;
      }
    },

    reserve() {
      this.$router.push({
        name: "HallSeatPage",
        params: {
          cafe: this.cafe,
        },
      });
    },
  },
  created() {
    this.shareUrl = window.location.href;
  },
  watch: {
    event: {
      handler() {
        this.loaded = false;
        this.$nextTick(() => {
          this.loaded = true;
        });
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
</style>