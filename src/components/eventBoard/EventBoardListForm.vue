<template>
  <div>
    <v-container class="event-list">
      <div
        class="empty_event"
        v-if="
          !eventLists || (Array.isArray(eventLists) && eventLists.length === 0)
        ">
        <p>이벤트가가 존재하지 않습니다.</p>
      </div>
      <v-row>
      <v-col v-for="(event, index) in calData" :key="index" cols="12" sm="6" md="4">
          <EventBoardCardForm :event="event"></EventBoardCardForm >

      </v-col>
      </v-row>
    </v-container>

    <v-pagination
      v-model="curPageNum"
      :length="numOfPages"
      color="brown darken-2"
      class="mt-10"
      flat
    ></v-pagination>
  </div>
</template>

<script>
import EventBoardCardForm from "@/components/eventBoard/EventBoardCardForm.vue";

export default {
  name: "EventBoardListForm",
  components: {
    EventBoardCardForm
  },
  props: {
    eventLists: {
      type: Array,
    },
  },
  data() {
    return {
      dataPerPage: 6,
      curPageNum: 1,
    };
  },
  methods: {
    
  },
  created(){
      console.log("eventLists:",this.eventLists)
  },
  computed: {
    startOffset() {
      return (this.curPageNum - 1) * this.dataPerPage;
    },
    endOffset() {
      return this.startOffset + this.dataPerPage;
    },
    numOfPages() {
      return Math.ceil(this.eventLists.length / this.dataPerPage);
    },
    calData() {
      return this.eventLists.slice(this.startOffset, this.endOffset);
    },
  },
};
</script>
