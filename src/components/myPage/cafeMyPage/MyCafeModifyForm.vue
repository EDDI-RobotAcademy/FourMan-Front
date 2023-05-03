<template>
    <form @submit.prevent="onSubmit">
        <div style="margin-left: 100px; margin-right: 100px;">
            <div class="mt-5 mb-5" style="border: 1px solid #ccc; border-radius: 10px;">
                <div style="margin: 20px">
                    <div class="mb-5">
                        <span class="HANNA">
                        <h2>{{ myCafeInfo.cafeName }}</h2>
                        </span>
                    </div>
                    <v-divider class="mt-3 mb-3"></v-divider>
                    <div style="display: flex;">
                        <span style="width: 30%; color: gray; font-size: 15px;">주소</span>
                        <span><v-text-field type="text" v-model="cafeAddress" dense /></span>
                    </div>
                    <v-divider class="mt-3 mb-3"></v-divider>
                    <div style="display: flex;">
                        <span style="width: 30%; color: gray; font-size: 15px;">전화번호</span>
                        <span><v-text-field type="text" v-model="cafeTel" dense /></span>
                    </div>
                    <v-divider class="mt-3 mb-3"></v-divider>
                    <div style="display: flex;">
                        <span style="width: 25%; color: gray; font-size: 15px;">영업시작</span>
                        <span>
                            <v-select
                                v-model="startTime"
                                :items="this.times"
                                label="영업 시작 시간"
                                style="width: 200px"
                                outlined
                                dense
                            />
                        </span>
                        <span style="width: 20%;"></span>
                        <span style="width: 25%; color: gray; font-size: 15px;">영업종료</span>
                        <span>
                            <v-select
                                v-model="endTime"
                                :items="this.times"
                                label="영업 종료 시간"
                                style="width: 200px"
                                outlined
                                dense
                            />
                        </span>
                    </div>
                    <v-divider class="mt-3 mb-3"></v-divider>
                    <div style="display: flex;">
                        <span style="width: 30%; color: gray; font-size: 15px;">카페 간단 설명</span>
                        <span><v-text-field type="text" v-model="subTitle" dense /></span>
                    </div>
                    <v-divider class="mt-3 mb-3"></v-divider>
                    <div style="display: flex;">
                        <span style="width: 30%; color: gray; font-size: 15px;">카페 상세 설명</span>
                        <span>
                            <v-textarea
                                cols="50"
                                rows="5"
                                placeholder="카페의 상세한 설명을 입력해주세요"
                                v-model="description"
                            />
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <v-btn class="mb-6 brown darken-2 white--text" type="submit" style="float: right;">
                    정보 수정
                </v-btn>
            </div>
        </div>
    </form>
</template>

<script>
import { mapActions } from 'vuex';
const myPageModule= 'myPageModule'

export default {
    name: 'MyCafeModifyForm',
    props: {
        myCafeInfo: {
            type: Object
        }
    },
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
    data () {
        return {
            cafeId: this.myCafeInfo.cafeId,
            cafeAddress: this.myCafeInfo.cafeAddress,
            cafeTel: this.myCafeInfo.cafeTel,
            startTime: this.myCafeInfo.startTime,
            endTime: this.myCafeInfo.endTime,
            subTitle: this.myCafeInfo.subTitle,
            description: this.myCafeInfo.description,
            times: [],
        }
    },
    methods: {
        ...mapActions(myPageModule,[
            'requestPasswordCheckToSpring'
        ]),
        onSubmit () {
            const { cafeId, cafeAddress, cafeTel, startTime, endTime, subTitle, description } = this
            this.$emit('submit', { cafeId, cafeAddress, cafeTel, startTime, endTime, subTitle, description })
        },
    }
}
</script>