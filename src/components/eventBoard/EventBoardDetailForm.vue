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
              <v-list-item>
                <v-list-item-action>
                  <v-icon color="indigo"> mdi-facebook </v-icon>
                </v-list-item-action>
                <v-card-title>Facebook</v-card-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-icon color="cyan"> mdi-twitter </v-icon>
                </v-list-item-action>
                <v-card-title>Twitter</v-card-title>
              </v-list-item>
              <v-list-item>
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
              value="https://g.co/kgs/nkrK43"
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
  }),
  methods: {
    copy() {
      const markup = this.$refs.link;
      markup.focus();
      document.execCommand("selectAll", false, null);
      this.copied = document.execCommand("copy");
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