<template>
    <!-- <div class="mt-5" style="margin-left: 100px; margin-right: 100px;"> -->
    <div class="mt-5">
        <div class="ms-3">
            <h4>MONTH</h4>
        </div>
        <div class="text-center mb-5 pt-2 pb-2 ps-2 pe-2" style="display: flex;">
            <div class="me-3 pt-5 pb-5" style="width: 33%; border: 1px solid #ccc; border-radius: 10px;">
                 매출액 {{ myCafeInfo.monthTotalSales?.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' }) }}
                <v-progress-linear
                    :height="10"
                    :value="myCafeInfo.monthTotalSales / 300000"
                    color="blue"
                    background-color="grey lighten-2"
                />
            </div>
            <div class="me-3 pt-5 pb-5" style="width: 33%; border: 1px solid #ccc; border-radius: 10px;">
                예약건수 {{ myCafeInfo.monthReservationCount }}
                <v-progress-linear
                    :height="10"
                    :value="myCafeInfo.monthReservationCount / 15"
                    color="blue"
                    background-color="grey lighten-2"
                />
            </div>
            <div class="pt-5 pb-5" style="width: 33%; border: 1px solid #ccc; border-radius: 10px;">
                포장건수 {{ myCafeInfo.monthOrderCount }}
                <v-progress-linear
                    :height="10"
                    :value="myCafeInfo.monthOrderCount / 15"
                    color="blue"
                    background-color="grey lighten-2"
                />
            </div>
        </div>
        <div class="ms-3">
            <h4>DAY</h4>
        </div>
        <div class="text-center mb-5 pt-2 pb-2 ps-2 pe-2" style="display: flex;">
            <div class="me-3 pt-5 pb-5" style="width: 33%; border: 1px solid #ccc; border-radius: 10px;">
                매출액 {{ myCafeInfo.dayTotalSales?.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' }) }}
                <v-progress-linear
                    :height="10"
                    :value="myCafeInfo.dayTotalSales / 10000"
                    color="blue"
                    background-color="grey lighten-2"
                />
            </div>
            <div class="me-3 pt-5 pb-5" style="width: 33%; border: 1px solid #ccc; border-radius: 10px;">
                예약건수 {{ myCafeInfo.dayReservationCount }}
                <v-progress-linear
                    :height="10"
                    :value="myCafeInfo.dayReservationCount * 2"
                    color="blue"
                    background-color="grey lighten-2"
                />
            </div>
            <div class="pt-5 pb-5" style="width: 33%; border: 1px solid #ccc; border-radius: 10px;">
                포장건수 {{ myCafeInfo.dayOrderCount }}
                <v-progress-linear
                    :height="10"
                    :value="myCafeInfo.dayOrderCount * 2"
                    color="blue"
                    background-color="grey lighten-2"
                />
            </div>
        </div>
        <!-- <div>
            <v-btn class="mb-6 brown darken-2 white--text" style="float: right;" @click="openDialog()">
                    정보 수정
            </v-btn>
            <v-dialog
            v-model="dialog"
            @open-dialog="openDialog"
            width="400px"
            height="300px"> -->
                <!-- dialog에 나올 UI -->
                <!-- <v-card width="460">
                                <v-card-text class="text-center px-12 py-16">
                                <div class="text-h4 font-weight-black mb-10">
                                    <span class="HANNA">비밀번호 확인</span>
                                </div>

                                <div class="d-flex">
                                    <v-text-field
                                    v-model="password"
                                    label="비밀번호"
                                    :rules="password_rule"
                                    clearable
                                    prepend-icon="mdi-lock-outline"
                                    :counter="15"
                                    color="orange"
                                    :type="inputType"
                                    />
                                </div>
                                <div>
                                    <v-checkbox
                                        v-model="showPassword"
                                        label="비밀번호 보기"
                                    />
                                </div>

                                <v-btn
                                    type="submit"
                                    block
                                    x-large
                                    rounded
                                    color="orange lighten-1"
                                    class="mt-6 brown darken-2 white--text"
                                    @click="passwordCheck()"
                                    :disabled="false"
                                    dialog =false
                                    >확인</v-btn
                                >
                                </v-card-text>
                            </v-card>
            </v-dialog>
        </div> -->
    </div>
</template>

<script>
import { mapActions } from 'vuex';
const myPageModule= 'myPageModule'

export default {
    name: 'MyCafeManagementForm',
    props: {
        myCafeInfo: {
            type: Object
        }
    },
    data () {
        return {
            email: JSON.parse(localStorage.getItem('userInfo')).email,
            password: '',
            dialog: false,
            showPassword: false,
            password_rule: [
            (v) =>
            this.state === "ins"
                ? !!v || "패스워드는 필수 입력사항입니다."
                : true,
            (v) =>
            !(v && v.length > 20) || "패스워드는 20자를 초과 입력할 수 없습니다.",
            ],
            monthTotalSales: 0,
        }
    },
    methods: {
        ...mapActions(myPageModule,[
            'requestPasswordCheckToSpring'
        ]),
        openDialog () {
            this.dialog = !this.dialog;
        },
        async passwordCheck() {
            const { email, password } = this;
            const boolean = await this.requestPasswordCheckToSpring({ email, password })
            if(boolean) {
                await this.$router.push({
                    name: 'CafeIntroBoardModifyPage',
                    params: { cafeId: this.myCafeInfo.cafeId.toString() }
                })
            }
        },
    },
    computed: {
        inputType() {
            return this.showPassword ? 'text' : 'password';
        },
    },
}
</script>