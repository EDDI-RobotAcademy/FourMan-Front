<template>
  <v-container>
    <v-card class="mx-auto overflow-hidden" flat style="max-width: 1000px">
      <v-card-title class="">
        <v-row class="mx-0" justify="space-between">
          <v-col cols="auto">
            <span class="text-h4">{{ event.eventName }}</span>
          </v-col>
        </v-row>

        <v-row class="mx-0" align="center" justify="space-between">
          <v-col cols="auto" class="d-flex align-center">
            <span class="caption"
              >이벤트 기간: {{ event.eventStartDate }} ~
              {{ event.eventEndDate }}</span
            >
          </v-col>
          <v-col cols="auto" class="d-flex align-center">
            <v-btn
              class="brown darken-2 white--text mr-10"
              text
              @click="reserve"
            >
              예약하기
            </v-btn>
            <!-- 공유를 눌렀을때 나오는거 -->

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
          </v-col>
        </v-row>
      </v-card-title>

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
import { mapActions, mapState } from "vuex";
const eventBoardModule = "eventBoardModule";
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
  computed: {
    ...mapState(eventBoardModule, ["cafe"]),
  },
  methods: {
    ...mapActions(eventBoardModule, ["requestCafeByEventId"]),

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
  watch: {
    event: {
      handler() {
        this.loaded = false;
        const eventId = this.$route.params.eventId;
        if (eventId) {
          this.requestCafeByEventId(eventId);
          this.shareUrl = window.location.href;
        }

        this.$nextTick(() => {
          this.loaded = true;
        });
      },
      immediate: true,
    },
  },
  created() {
    // this.shareUrl = window.location.href;
    // this.requestCafeByEventId(this.event.eventId);//에러남
  },
};
</script>
<style scoped>
.v-card {
  padding: 1.5rem;
}

.text-h5 {
  font-size: 1.75rem;
  font-weight: 500;
}

.v-btn {
  text-transform: none;
  font-weight: 500;
}

.brown.darken-2 {
  background-color: #795548 !important;
}

.v-icon {
  font-size: 1.5rem;
  cursor: pointer;
}

.mdi-share-variant {
  color: #616161;
}

.mdi-share-variant:hover {
  color: #424242;
}
.v-img {
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  margin: 1rem 0;
}
</style>