<template>
  <div style="padding-top: 5%; margin-top: 20px">
    <v-row v-if="done">
      <v-col class="text-center">
        <h2>تم إستقبال الطلب بنجاح وسيتم التواصل معكم قريباً</h2>
      </v-col>
    </v-row>

    <div v-else>
      <v-row
        style="border-bottom: solid 1px rgba(255, 255, 255, 0.3)"
        class="text-center"
      >
        <v-col
          :style="
            e1 === 1
              ? 'border-bottom: 3px solid white; font-size: 0.8rem'
              : 'font-size: 0.8rem'
          "
        >
          معلومات المشروع
        </v-col>
        <v-col
          :style="
            e1 === 2
              ? 'border-bottom: 3px solid white; font-size: 0.8rem'
              : 'font-size: 0.8rem'
          "
        >
          معلومات الفريق
        </v-col>
        <v-col
          :style="
            e1 === 3
              ? 'border-bottom: 3px solid white; font-size: 0.8rem'
              : 'font-size: 0.8rem'
          "
        >
          التسليم
        </v-col>
      </v-row>
      <v-row v-if="loading" justify="center">
        <v-col cols="1">
          <v-progress-circular
            :width="4"
            color="white"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
      <v-row v-else justify="center">
        <!-- <div style="opacity:0">
          <v-file-input
            required
            dark
            v-model="attachments"
            solo
            accept="application/pdf"
            label=" المرفقات "
          >
          </v-file-input>
        </div> -->
        <v-dialog max-width="400px" elevation="0" dark v-model="alert">
          <v-alert dark border="left">
            {{ msg }}
          </v-alert>
        </v-dialog>
        <v-scroll-x-reverse-transition>
          <v-col v-if="e1 === 1">
            <v-form>
              <v-container>
                <v-row>
                  <v-col>
                    <p class="formSubTitle">تقديم الطلب</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      :error-messages="ApplicantFNameErrors"
                      @input="$v.reqBody.ApplicantFName.$touch()"
                      @blur="$v.reqBody.ApplicantFName.$touch()"
                      v-model="reqBody.ApplicantFName"
                      dark
                      height="55"
                      background-color="rgba(255, 255, 255, 0.3)"
                      solo
                      label="إسم مقدم الطلب"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      :error-messages="ApplicantLNameErrors"
                      @input="$v.reqBody.ApplicantLName.$touch()"
                      @blur="$v.reqBody.ApplicantLName.$touch()"
                      required
                      v-model="reqBody.ApplicantLName"
                      dark
                      height="55"
                      background-color="rgba(255, 255, 255, 0.3)"
                      solo
                      label="إسم  العائلة"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      style="direction: ltr"
                      :disabled="fileUploaded || fileUploading"
                      :error-messages="ApplicantPhoneErrors"
                      @input="
                        $v.reqBody.ApplicantPhone.$touch(),
                          changeArbic(reqBody.ApplicantPhone)
                      "
                      @blur="$v.reqBody.ApplicantPhone.$touch()"
                      required
                      prefix="+966"
                      type="tel"
                      prepend-inner-icon="mdi-phone"
                      v-model="reqBody.ApplicantPhone"
                      dark
                      hint="يرجي إدخال الرقم بدون صفر"
                      height="55"
                      background-color="rgba(255, 255, 255, 0.3)"
                      solo
                      label="رقم الجوال "
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      :error-messages="EmailErrors"
                      @input="$v.reqBody.Email.$touch()"
                      @blur="$v.reqBody.Email.$touch()"
                      required
                      v-model="reqBody.Email"
                      dark
                      height="55"
                      background-color="rgba(255, 255, 255, 0.3)"
                      solo
                      label=" البريد الإلكتروني "
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-select
                      :menu-props="{
                        auto: true,
                        offsetY: true,
                        dark: true,
                        color: 'rgba(255, 255, 255, 0.3)',
                      }"
                      required
                      style="font-size:0.8rem"
                      :error-messages="ApplicantGenderErrors"
                      @input="$v.reqBody.ApplicantGender.$touch()"
                      @blur="$v.reqBody.ApplicantGender.$touch()"
                      v-model="reqBody.ApplicantGender"
                      :items="[
                        { text: 'ذكر', value: 'Male' },
                        { text: 'أنثى', value: 'Female' },
                      ]"
                      label="الجنس "
                      solo
                      dark
                      color="white"
                      height="55"
                      background-color="rgba(255, 255, 255, 0.3)"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p class="formSubTitle">تفاصيل المشروع</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      :error-messages="ProjectNameErrors"
                      @input="$v.reqBody.ProjectName.$touch()"
                      @blur="$v.reqBody.ProjectName.$touch()"
                      v-model="reqBody.ProjectName"
                      dark
                      color="white"
                      height="55"
                      background-color="rgba(255, 255, 255, 0.3)"
                      solo
                      label="إسم المشروع"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select
                      :menu-props="{
                        auto: true,
                        offsetY: true,
                        dark: true,
                        color: 'rgba(255, 255, 255, 0.3)',
                      }"
                      :error-messages="ProjectTypeErrors"
                      @input="$v.reqBody.ProjectType.$touch()"
                      @blur="$v.reqBody.ProjectType.$touch()"
                      required
                      v-model="reqBody.ProjectType"
                      :items="projectTypeMenu"
                      dark
                      height="55"
                      background-color="rgba(255, 255, 255, 0.3)"
                      solo
                      label="نوع المشروع"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select
                      :menu-props="{
                        auto: true,
                        offsetY: true,
                        dark: true,
                        color: 'rgba(255, 255, 255, 0.3)',
                      }"
                      :error-messages="BudgetErrors"
                      @input="$v.reqBody.Budget.$touch()"
                      @blur="$v.reqBody.Budget.$touch()"
                      required
                      v-model="reqBody.Budget"
                      :items="projectBudgetMenu"
                      dark
                      height="55"
                      background-color="rgba(255, 255, 255, 0.3)"
                      solo
                      label="الميزانية المتوقعة للمشروع "
                    >
                    </v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="3">
                    <v-file-input
                      :disabled="
                        $v.reqBody.ApplicantPhone.$invalid ||
                          $v.reqBody.Email.$invalid
                      "
                      @change="fileSend"
                      required
                      dark
                      hint="حجم الملف لا يتعدى ٢٠ ميجابايت والإمتداد PDF. فقط"
                      v-model="attachments"
                      height="55"
                      background-color="rgba(255, 255, 255, 0.3)"
                      solo
                      placeholder=" مرفق (حقل إختياري)"
                      show-size
                      :rules="[
                        (value) =>
                          !value ||
                          value.size < 20000000 ||
                          'حجم المرفق لا يجب أن يتعدي  ٢٠ ميجا بايت',
                        (value) =>
                          !value ||
                          value.type === 'application/pdf' ||
                          ' إمتداد غير معروف ',
                      ]"
                      accept="application/pdf"
                      label=" المرفقات "
                    >
                      <template v-if="fileUploaded" v-slot:append-outer>
                        <v-icon color="success">mdi-check-circle</v-icon>
                      </template>
                    </v-file-input>
                    <!-- <v-icon color="success">mdi-check-circle</v-icon> -->
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-textarea
                      :error-messages="ProjectSummeryErrors"
                      @input="$v.reqBody.ProjectSummery.$touch()"
                      @blur="$v.reqBody.ProjectSummery.$touch()"
                      required
                      v-model="reqBody.ProjectSummery"
                      dark
                      height="100"
                      background-color="rgba(255, 255, 255, 0.3)"
                      solo
                      label="وصف المشروع"
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-col>
        </v-scroll-x-reverse-transition>
        <v-scroll-x-reverse-transition>
          <v-col v-if="e1 === 2">
            <v-form>
              <v-container>
                <!-- <v-row v-if="addTeam" justify="center">
              <v-col cols="12" sm="8" md="6" class="text-center">
                <v-card dark color="rgba(0,0,0,0.4)">
                  <v-card-title>
                    هل يوجد أعضاء إضافيين ؟
                  </v-card-title>
                  <v-card-actions>
                    <v-row>
                      <v-col>
                        <v-btn
                          background-color="rgba(255,255,255,0.4)"
                          x-large
                          text
                          @click="addTeam = false"
                        >
                          نعم
                        </v-btn>
                      </v-col>
                      <v-col>
                        <v-btn
                          background-color="rgba(255,255,255,0.4)"
                          x-large
                          text
                          @click="continueWithoutTeam"
                        >
                          لا
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row> -->
                <div>
                  <v-row justify="space-around">
                    <v-col cols="12" md="3">
                      <p class="formSubTitle">أعضاء الفريق</p>
                    </v-col>
                    <v-col cols="12" md="" class="text-center">
                      <v-btn
                        class="ma-1"
                        dark
                        height="55"
                        :disabled="TeamMembers.length >= 8"
                        color="rgba(150, 255, 150, 0.3)"
                        @click="addTeamMember"
                        >إضافة عضو
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row
                    v-for="(i, index) in TeamMembers"
                    :key="index"
                    style="margin-top:-20px"
                  >
                    <v-col>
                      <v-row :style="index === 0 ? 'display:none' : ''"
                        ><v-col class="text-md-right text-center">
                          العضو {{ index + 1 }}</v-col
                        ></v-row
                      >
                      <v-row
                        :style="index === 0 ? 'display:none' : ''"
                        align="start"
                      >
                        <v-col cols="12" sm="6" md="2">
                          <v-text-field
                            @input="
                              $v.TeamMembers.$each.$iter[
                                index
                              ].FirstName.$touch()
                            "
                            :error-messages="
                              generateErrors(
                                $v.TeamMembers.$each.$iter[index].FirstName
                              )
                            "
                            required
                            v-model="i.FirstName"
                            label=" الإسم الاول "
                            dark
                            height="55"
                            color="white"
                            :disabled="index === 0"
                            large
                            background-color="rgba(255, 255, 255, 0.3)"
                            solo
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="2">
                          <v-text-field
                            @input="
                              $v.TeamMembers.$each.$iter[
                                index
                              ].LastName.$touch()
                            "
                            :error-messages="
                              generateErrors(
                                $v.TeamMembers.$each.$iter[index].LastName
                              )
                            "
                            required
                            v-model="i.LastName"
                            label="الإسم الأخير "
                            dark
                            color="white"
                            :disabled="index === 0"
                            height="55"
                            background-color="rgba(255, 255, 255, 0.3)"
                            solo
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            @input="
                              $v.TeamMembers.$each.$iter[index].Phone.$touch()
                            "
                            :error-messages="
                              generateErrors(
                                $v.TeamMembers.$each.$iter[index].Phone
                              )
                            "
                            required
                            style="direction: ltr"
                            prefix="+966 "
                            type="tel"
                            prepend-inner-icon="mdi-phone"
                            v-model="i.Phone"
                            label="رقم الجوال"
                            :disabled="index === 0"
                            dark
                            color="white"
                            height="55"
                            background-color="rgba(255, 255, 255, 0.3)"
                            solo
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="2">
                          <v-select
                            @input="
                              $v.TeamMembers.$each.$iter[index].Gender.$touch()
                            "
                            :error-messages="
                              generateErrors(
                                $v.TeamMembers.$each.$iter[index].Gender
                              )
                            "
                            :menu-props="{
                              auto: true,
                              offsetY: true,
                              dark: true,
                              color: 'rgba(255, 255, 255, 0.3)',
                            }"
                            required
                            v-model="i.Gender"
                            :items="[
                              { text: 'ذكر', value: 'Male' },
                              { text: 'أنثي', value: 'Female' },
                            ]"
                            label="الجنس "
                            style="font-size:0.8rem"
                            :disabled="index === 0"
                            solo
                            dark
                            color="white"
                            height="55"
                            background-color="rgba(255, 255, 255, 0.3)"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="1" class="text-center">
                          <v-btn
                            class="ma-1"
                            dark
                            :disabled="TeamMembers.length === 1"
                            height="55"
                            color="rgba(255, 150, 150, 0.4)"
                            @click="TeamMembers.splice(index, 1)"
                            >إزالة العضو</v-btn
                          ></v-col
                        >
                        <v-col></v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </div>

                <v-row>
                  <v-dialog v-model="viewTerms" max-width="900px">
                    <v-card dark style="direction: rtl" class="pa-4">
                      <v-card-text v-html="TermsTxt"></v-card-text>
                    </v-card>
                  </v-dialog>
                  <v-col>
                    <v-checkbox
                      required
                      @input="$v.terms.$touch()"
                      @blur="$v.terms.$touch()"
                      :error-messages="termsErrors"
                      dark
                      v-model="terms"
                    >
                      <template v-slot:label>
                        <v-btn text @click="viewTerms = true">
                          أوافق على
                          <span style="text-decoration:underline"
                            >الشروط والأحكام</span
                          >
                        </v-btn>
                      </template>
                    </v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-col>
        </v-scroll-x-reverse-transition>

        <v-scroll-x-reverse-transition>
          <v-col v-if="e1 === 3">
            <v-card dark class="mb-12" color="rgba(255, 255, 255, 0.3)">
              <v-card-text>
                <v-row>
                  <v-col class="text-center">
                    <h3 style="color:white">
                      الرجاء إرسال رمز التحقق المرسل إلى رقم الجوال
                      {{ reqBody.ApplicantPhone }}
                    </h3>
                  </v-col>
                </v-row>
                <!-- <div
                  style="display: flex; flex-direction: row;direction:ltr;justify-content:center;padding:2%"
                >
                  <v-otp-input
                    ref="otpInput"
                    input-classes="otp-input"
                    separator="-"
                    :num-inputs="4"
                    :should-auto-focus="true"
                    :is-input-num="true"
                    @on-change="handleOnChange"
                    @on-complete="handleOnComplete"
                  />

                  <button @click="handleClearInput()">مسح الرمز</button>
                </div> -->
                <v-row justify="center">
                  <v-col cols="8" class="text-center">
                    <v-text-field
                      background-color="rgba(255, 255, 255, 0.3)"
                      :error-messages="OTPTokenErrors"
                      @input="$v.OTPToken.$touch()"
                      @blur="$v.OTPToken.$touch()"
                      label="4 digit OTP"
                      solo
                      type="tel"
                      v-model="OTPToken"
                      placeholder="رمز التحقق"
                      required
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="space-around">
                  <v-col class="text-center"
                    ><v-btn color="rgba(255, 255, 255, 0.3)" @click="next"
                      >تحقق</v-btn
                    ></v-col
                  >
                  <v-col class="text-center"
                    ><v-btn
                      :disabled="resendTime != 0"
                      color="rgba(255, 255, 255, 0.3)"
                      @click="SubmitReq"
                      >إعادة إرسال</v-btn
                    ></v-col
                  >
                </v-row>
                <v-row justify="space-around">
                  <v-col v-if="updateComponent" class="text-center"
                    >الوقت المتبقى {{ resendTime }}</v-col
                  >
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-scroll-x-reverse-transition>
      </v-row>
      <v-row justify="end">
        <v-col cols="6" md="1" class="forward text-center">
          <v-btn :disabled="resendTime != 0" @click="back" dark x-large text>
            <v-icon color="white">mdi-arrow-right</v-icon> السابق</v-btn
          >
        </v-col>
        <v-col
          v-if="e1 != 3"
          @click="next"
          cols="6"
          md="1"
          class="forward text-center"
        >
          <v-progress-circular
            v-if="fileUploading"
            :width="4"
            color="white"
            indeterminate
          ></v-progress-circular>
          <v-btn v-else dark x-large text
            >التالى <v-icon color="white">mdi-arrow-left</v-icon></v-btn
          ></v-col
        >
      </v-row>
    </div>
  </div>
</template>
<style scoped lang="scss">
$text-field-line-height: 50px;

.formSubTitle {
  font-size: 2rem;
  font-family: mySecondFont;
  text-decoration: underline;
  /* text-decoration-style: wavy; */
}

.forward {
  font-size: 1.5rem;
  font-family: mySecondFont;
}
</style>

<script>
const axios = require("axios");
const api = require("../service/userApi");
var _ = require("lodash");
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  minLength,
} from "vuelidate/lib/validators";
import {
  EmailErrors,
  FieldErrors,
  UniqueFieldErrors,
} from "@/utils/validation";

export default {
  mixins: [validationMixin],

  validations: {
    TeamMembers: {
      $each: {
        FirstName: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(15),
        },
        LastName: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(15),
        },
        Gender: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(10),
        },
        Phone: {
          required,
          minLength: minLength(9),
          maxLength: maxLength(9),
        },
      },
    },
    terms: {
      required,
    },
    OTPToken: {
      required,
      maxLength: maxLength(4),
      minLength: minLength(4),
    },
    reqBody: {
      ProjectName: {
        required,
        maxLength: maxLength(30),
        minLength: minLength(3),
      },
      ApplicantFName: {
        required,
        maxLength: maxLength(15),
        minLength: minLength(2),
      },
      ApplicantLName: {
        required,
        maxLength: maxLength(15),
        minLength: minLength(2),
      },
      ApplicantGender: {
        required,
        maxLength: maxLength(10),
        minLength: minLength(3),
      },
      Email: { required, email },
      ApplicantPhone: {
        required,
        maxLength: maxLength(9),
        minLength: minLength(9),
      },
      Budget: {
        required,
        maxLength: maxLength(25),
        minLength: minLength(2),
      },
      ProjectType: {
        required,
        maxLength: maxLength(10),
        minLength: minLength(1),
      },
      ProjectSummery: {
        required,
        maxLength: maxLength(250),
        minLength: minLength(30),
      },
    },
  },
  async mounted() {
    let value1 = await api.default.getTerms();

    if (value1) {
      this.TermsTxt = value1.data.message[0].Terms;
    }
  },
  methods: {
    // otpChange() {
    //   this.OTPToken = this.changeArbic(this.OTPToken);
    // },
    changeArbic(num) {
      let arabicArr = {
        "٠": 0,
        "١": 1,
        "٢": 2,
        "٣": 3,
        "٤": 4,
        "٥": 5,
        "٦": 6,
        "٧": 7,
        "٨": 8,
        "٩": 9,
      };

      let output = new String(num);
      let out = "";
      for (let i = 0; i < output.length; i++) {
        let arabicD = output[i];
        let digit = arabicArr[arabicD];
        if (digit >= 0) {
          let number = new String(digit);
          out += number;
        } else {
          out += output[i];
        }
      }
      return out;
    },
    // continueWithoutTeam() {
    //   this.terms = true;
    //   this.SubmitReq();
    // },
    next() {
      // this.e1++
      if (this.e1 === 1) {
        this.$v.reqBody.$touch();
        if (!this.$v.reqBody.$invalid) {
          if (!this.attachments) {
            this.firstCheck();
          } else if (
            this.attachments.size < 20000000 &&
            this.attachments.type === "application/pdf"
          ) {
            this.firstCheck();
          }
        }
      } else if (this.e1 === 2) {
        this.$v.TeamMembers.$touch();
        if (!this.$v.TeamMembers.$invalid) {
          this.SubmitReq();
        }
      } else if (this.e1 === 3) {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          this.sendOTP();
        }
      }
    },
    back() {
      if (this.e1 === 1) {
        this.$emit("removeForm");
      } else {
        this.e1--;
      }
    },
    generateErrors(val) {
      const errors = [];
      if (!val.$dirty) return errors;
      !val.required && errors.push("هذا الحقل مطلوب");
      !val.minLength && errors.push("  عدد الحروف قليل");
      !val.maxLength && errors.push("  عدد الحروف زائد عن الحد");
      return errors;
    },
    validateDuplicate(key) {
      if (this.duplicationErr.columns) {
        for (let i = 0; i < this.duplicationErr.columns.length; i++) {
          if (key === this.duplicationErr.columns[i]) return true;
        }
      } else return false;
    },
    setAlert(msg) {
      this.alert = true;
      this.msg = msg;
    },
    // handleOnComplete(value) {
    //   this.reqBody.OTPToken = value;
    // },
    // handleOnChange(value) {
    //   console.log("OTP changed: ", value);
    //   value = this.changeArbic(value);
    // },
    // handleClearInput() {
    //   this.$refs.otpInput.clearInput();
    // },

    sendOTP() {
      // this.fileSend();
      let formData = new FormData();
      let req = _.cloneDeep(this.reqBody);
      req.ApplicantPhone = "+966" + req.ApplicantPhone;

      if (this.fileUploaded === false) {
        formData.append("file", "false");
      } else {
        // if (this.attachments) {
        //   if (this.attachments.size < 20000000) {
        //     if (this.fileUploaded) {
        formData.append("file", this.fileUploaded);
        //     }
        //   }
        // }
      }

      for (let i in req) {
        formData.append(i, req[i]);
      }
      req.TeamMembers = _.cloneDeep(this.TeamMembers);
      req.TeamMembers.forEach((element) => {
        element.Phone = "+966" + element.Phone;
      });
      formData.append("TeamMembers", JSON.stringify(req.TeamMembers));
      let otp = new String(this.OTPToken);
      formData.append("OTPToken", otp);
      this.loading = true;

      axios
        .post("/api/project/OTPVerify", formData, {
          onUploadProgress: (progressEvent) =>
            console.log(progressEvent.loaded),
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.done = true;
        })
        .catch(() => this.setAlert("رمز تحقق خاطئ"))
        .finally(() => {
          this.optSentTime = new Date();
          this.loading = false;
        });
    },
    SubmitReq() {
      // this.fileSend();
      this.$v.$touch();
      if (!this.$v.TeamMembers.$invalid && this.terms) {
        let req = _.cloneDeep(this.reqBody);
        // let req = Object.assign({}, this.reqBody);
        // delete req.OTPToken;

        req.TeamMembers = _.cloneDeep(this.TeamMembers);
        req.ApplicantPhone = "+966" + req.ApplicantPhone;
        req.TeamMembers = req.TeamMembers.map((element) => {
          element.Phone = "+966" + element.Phone;
          return element;
        });
        this.loading = true;
        axios
          .post("/api/project/OTPSend", req)
          .then(() => {
            this.e1 = 3;
            this.optSentTime = new Date();
            setInterval(() => {
              this.updateComponent++;
            }, 1000);
          })
          .catch((err) => {
            this.duplicationErr = err.response.data;
            this.setAlert("غير قادر على إرسال رسالة التأكيد");
            this.e1 = 1;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.e1 = 2;
      }
    },
    // reSendReq() {
    //   let test = {
    //     ApplicantGender: "Male",
    //     Email: "test@test.com",
    //     ProjectName: "Mohamed NA",
    //     ApplicantFName: "fdgsdfg",
    //     ApplicantLName: "sdfgsdfg",
    //     ApplicantPhone: "582270661",
    //     Budget: "لا أعلم",
    //     ProjectType: "أخرى",
    //     ProjectSummery:
    //       "sdfgjsdlfgjsdlkgjlkddfgjnsdfgkjhsdkjfhgsdkjfsjglksdjglksdjglkdsjglksdjglkjsdflgkjdslkfgjsdlkjgsldfkjg",
    //   };

    //   axios.post("/api/project/OTPSend", test);
    // },
    fileSend() {
      let formData = new FormData();
      formData.append("ApplicantPhone", "+966" + this.reqBody.ApplicantPhone);
      formData.append("Email", this.reqBody.Email);
      if (this.attachments) {
        if (this.attachments.size < 20000000) {
          formData.append("file", this.attachments);
          this.fileUploading = true;
          axios
            .post("/api/project/fileSend", formData, {
              onUploadProgress: (progressEvent) =>
                console.log(progressEvent.loaded),
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then(() => {
              this.fileUploaded = "true";
            })
            .catch((err) => {
              this.setAlert("فشل في رفع المرفق");
              this.attachments = undefined;
              this.duplicationErr = err.response.data;
            })
            .finally(() => {
              this.fileUploading = false;
            });
        }
      }
    },
    firstCheck() {
      let req = _.cloneDeep(this.reqBody);
      req.ApplicantPhone = "+966" + req.ApplicantPhone;
      // this.fileSend();
      axios
        .post("/api/project/firstCheck", req)
        .then(() => {
          // console.log(res);
          this.e1++;
        })
        .catch((err) => {
          // this.e1--;
          this.duplicationErr = err.response.data;
        });

      if (!this.TeamMembers.length) {
        this.TeamMembers.push({
          FirstName: this.reqBody.ApplicantFName,
          LastName: this.reqBody.ApplicantLName,
          Phone: this.reqBody.ApplicantPhone,
          Gender: this.reqBody.ApplicantGender,
        });
      }
    },
    addTeamMember() {
      this.TeamMembers.push({
        FirstName: "",
        LastName: "",
        Phone: "",
        Gender: "",
      });
    },
  },
  watch: {
    reqBody: {
      handler(val) {
        // console.log(this.joiValidationErrors.reqBody);
        this.reqBody.ApplicantPhone = this.changeArbic(val.ApplicantPhone);
      },
      deep: true,
    },

    OTPToken(val) {
      this.OTPToken = this.changeArbic(val);
    },

    TeamMembers: {
      handler() {
        this.TeamMembers.forEach((element) => {
          element.Phone = this.changeArbic(element.Phone);
        });
      },
      deep: true,
    },
  },

  data() {
    return {
      fileUploading: false,
      loading: false,
      updateComponent: 0,
      optSentTime: "",
      projectTypeMenu: ["تقني", "صناعي", "منتجات", "غذائي", "أخرى"],
      projectBudgetMenu: [
        "لا أعلم",
        "٠ الى ١٠،٠٠٠ ريال",
        "١٠،٠٠٠ الى ٤٠،٠٠٠ ريال",
        "٤٠،٠٠٠ الى ١٠٠،٠٠٠ ريال",
        "١٠٠،٠٠ ريال فأكثر",
      ],
      addTeam: true,
      alert: false,
      msg: "",
      duplicationErr: {},
      viewTerms: false,
      terms: false,
      TermsTxt: "الشروط والأحكام ",
      done: false,
      TeamMembers: [],
      fileUploaded: false,
      reqBody: {
        Email: "",
        ProjectName: "",
        ApplicantFName: "",
        ApplicantLName: "",
        ApplicantPhone: "",
        Budget: "",
        ApplicantGender: "",
        ProjectType: "",
        ProjectSummery: "",
      },
      testFile: undefined,
      attachments: undefined,
      OTPToken: "",
      // reqBody: {
      //   ApplicantGender: "Male",
      //   Email: "test@test.com",
      //   ProjectName: "Mohamed NA",
      //   ApplicantFName: "fdgsdfg",
      //   ApplicantLName: "sdfgsdfg",
      //   ApplicantPhone: "582000661",
      //   Budget: "لا أعلم",
      //   ProjectType: "أخرى",
      //   ProjectSummery:
      //     "sdfgjsdlfgjsdlkgjlkddfgjnsdfgkjhsdkjfhgsdsjglksdjglkjsdflgkjdslkfgjsdlkjgsldfkjg",
      // },
      e1: 1,
    };
  },
  computed: {
    // joiValidationSchemaObject() {
    //   return this.$joi.object({
    //     reqBody: this.$joi.object({
    //       Email: this.$joi.string().email({ minDomainSegments: 2 }),
    //     }),
    //   });
    // },
    resendTime() {
      let x = 60 - Math.floor(Math.abs(Date.now() - this.optSentTime) / 1000);
      if (this.updateComponent) return x > 0 ? x : 0;
      else return x > 0 ? x : 0;
    },
    OTPTokenErrors() {
      return FieldErrors(this.$v.OTPToken);
    },
    ProjectNameErrors() {
      return FieldErrors(this.$v.reqBody.ProjectName);
    },
    ApplicantFNameErrors() {
      return FieldErrors(this.$v.reqBody.ApplicantFName);
    },
    ApplicantLNameErrors() {
      return FieldErrors(this.$v.reqBody.ApplicantLName);
    },
    ApplicantPhoneErrors() {
      return UniqueFieldErrors(
        this.$v.reqBody.ApplicantPhone,
        this.validateDuplicate("ApplicantPhone")
      );
    },
    BudgetErrors() {
      return FieldErrors(this.$v.reqBody.Budget);
    },
    EmailErrors() {
      return EmailErrors(
        this.$v.reqBody.Email,
        this.validateDuplicate("Email")
      );
    },
    ProjectTypeErrors() {
      return FieldErrors(this.$v.reqBody.ProjectType);
    },
    ProjectSummeryErrors() {
      return FieldErrors(this.$v.reqBody.ProjectSummery);
    },
    ApplicantGenderErrors() {
      return FieldErrors(this.$v.reqBody.ApplicantGender);
    },
    termsErrors() {
      const errors = [];
      if (!this.$v.terms.$dirty) return errors;
      // !this.$v.terms.required && errors.push("هذا الحقل مطلوب");
      !this.terms === true &&
        errors.push("لا تنسي الموافقة على الشروط والأحكام");

      return errors;
    },
  },
};
</script>

<style lang="scss">
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  &.error {
    border: 1px solid red !important;
  }
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
