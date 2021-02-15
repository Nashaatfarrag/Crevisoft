<template>
  <div>
    <Nav></Nav>

    <v-container>
      <v-form :key="updateComponent">
        <v-row
          ><v-col cols="12" md="2">
            <v-switch
              required
              v-model="websiteInfo.Youtube"
              label="YouTube"
              color="success"
              hide-details
              value="true"
            ></v-switch>
          </v-col>
          <v-col cols="12" md="6" v-if="websiteInfo.Youtube === 'true'">
            <v-text-field
              height="55"
              :error-messages="YouTubeLinkErrors"
              @input="$v.websiteInfo.YouTubeLink.$touch()"
              @blur="$v.websiteInfo.YouTubeLink.$touch()"
              required
              outlined
              label="Youtube link"
              v-model="websiteInfo.YouTubeLink"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row> </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              height="55"
              :error-messages="Heading1Errors"
              @input="$v.websiteInfo.Heading1.$touch()"
              @blur="$v.websiteInfo.Heading1.$touch()"
              outlined
              label="Heading 1"
              v-model="websiteInfo.Heading1"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              height="55"
              :error-messages="Heading2Errors"
              @input="$v.websiteInfo.Heading2.$touch()"
              @blur="$v.websiteInfo.Heading2.$touch()"
              required
              outlined
              label="Heading 2"
              v-model="websiteInfo.Heading2"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              height="55"
              :error-messages="Heading3Errors"
              @input="$v.websiteInfo.Heading3.$touch()"
              @blur="$v.websiteInfo.Heading3.$touch()"
              required
              outlined
              label="Heading 3 "
              v-model="websiteInfo.Heading3"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-textarea
              :error-messages="Paragraph1Errors"
              @input="$v.websiteInfo.Paragraph1.$touch()"
              @blur="$v.websiteInfo.Paragraph1.$touch()"
              required
              outlined
              label="Paragraph 1"
              v-model="websiteInfo.Paragraph1"
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="4">
            <v-textarea
              :error-messages="Paragraph2Errors"
              @input="$v.websiteInfo.Paragraph2.$touch()"
              @blur="$v.websiteInfo.Paragraph2.$touch()"
              required
              outlined
              label="Paragraph 2"
              v-model="websiteInfo.Paragraph2"
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="4">
            <v-textarea
              :error-messages="Paragraph3Errors"
              @input="$v.websiteInfo.Paragraph3.$touch()"
              @blur="$v.websiteInfo.Paragraph3.$touch()"
              required
              outlined
              label="Paragraph 3 "
              v-model="websiteInfo.Paragraph3"
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="4">
            <v-textarea
              :error-messages="Paragraph4Errors"
              @input="$v.websiteInfo.Paragraph4.$touch()"
              @blur="$v.websiteInfo.Paragraph4.$touch()"
              required
              outlined
              label="Paragraph 4 "
              v-model="websiteInfo.Paragraph4"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              :items="['Opened' , 'Closed']"
              :error-messages="FrontEndStatusErrors"
              @input="$v.websiteInfo.FrontEndStatus.$touch()"
              @blur="$v.websiteInfo.FrontEndStatus.$touch()"
              v-model="websiteInfo.FrontEndStatus"
              required
              outlined
              label="حالة الفرونت "
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
            :items="['Opened' , 'Closed']"
              :error-messages="BackEndStatusErrors"
              @input="$v.websiteInfo.BackEndStatus.$touch()"
              @blur="$v.websiteInfo.BackEndStatus.$touch()"
              v-model="websiteInfo.BackEndStatus"
              required
              outlined
              label=" حالة الباك"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              :error-messages="StatusExtrasErrors"
              @input="$v.websiteInfo.StatusExtras.$touch()"
              @blur="$v.websiteInfo.StatusExtras.$touch()"
              v-model="websiteInfo.StatusExtras"
              required
              outlined
              label=" حالة إضافية"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6"
             style="direction: ltr; background-color: rgba(255, 255, 255, 0.8)"
          >
            <vue-editor id="editor" direction="ltr" v-model="Terms">
            </vue-editor>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="pa-2">
              <v-card-title style="color: blue"
                >معاينة : {{ Terms.length }} حرف
              </v-card-title>
              <v-card-text v-html="Terms"></v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="updateSite">Save</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import { FieldErrors } from "@/utils/validation";
import { VueEditor } from "vue2-editor";
const api = require("../service/userApi");
import Nav from "./adminNavbar";
export default {
  components: {
    Nav,
    VueEditor,
  },
  mixins: [validationMixin],

  validations: {
    websiteInfo: {
      //   Youtube: {
      //     required,
      //   },
      //   YouTubeLink: {

      //     maxLength: maxLength(10),
      //     minLength: minLength(3),
      //   },
      Heading1: {
        required,
        maxLength: maxLength(100),
        minLength: minLength(3),
      },
      Heading2: {
        required,
        maxLength: maxLength(100),
        minLength: minLength(2),
      },
      Heading3: {
        required,
        maxLength: maxLength(100),
        minLength: minLength(2),
      },
      Paragraph1: {
        required,
        maxLength: maxLength(300),
        minLength: minLength(2),
      },
      Paragraph2: {
        required,
        maxLength: maxLength(300),
        minLength: minLength(2),
      },
      FrontEndStatus: {
        required,
        maxLength: maxLength(300),
        minLength: minLength(2),
      },
      BackEndStatus: {
        required,
        maxLength: maxLength(300),
        minLength: minLength(2),
      },
      StatusExtras: {
        required,
        maxLength: maxLength(300),
        minLength: minLength(2),
      },
      Paragraph3: {
        required,
        maxLength: maxLength(300),
        minLength: minLength(2),
      },
      Paragraph4: {
        required,
        maxLength: maxLength(300),
        minLength: minLength(2),
      },
    },
  },

  methods: {
    async initailize() {
      let value = await api.default.getWebsite();
      if (value) {
        this.websiteInfo = value.data.message[0];
        this.updateComponent++;
      }

      let value1 = await api.default.getTerms();
      if (value1) {
        this.Terms = value1.data.message[0].Terms;
      }
    },
    async updateSite() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let reqBody = this.websiteInfo;
        delete reqBody.ID;
        delete reqBody.FirstIdnetity;
        reqBody.Youtube = new String(reqBody.Youtube);
        if (reqBody.Youtube != "true") {
          reqBody.Youtube = "false";
          reqBody.YouTubeLink =
            "no link cause this field is required .. and I dont know why ";
        }
        let value = await api.default.updateWebsite(reqBody);
        let value1 = await api.default.updateTerms({ Terms: this.Terms });

        if (value && value1) {
          this.initailize();
        }
      }
    },
  },
  mounted() {
    this.$vuetify.rtl = true;
    this.initailize();
  },
  data() {
    return {
      htmlForEditor:
        "<p>الشروط والأحكام :</p><ul><li><strong>بند واحد :</strong> كل عضو له حق المشاركة مرة واحدة</li><li><strong>بند واحد :</strong> كل عضو له حق المشاركة مرة واحدة</li></ul><p><br></p><ol><li>يحق لكل متسابق التقدم إلى لجنة الحكم بطلب إحاطة</li><li>يحق التقدم إلى لجنة الحكم بتغيير الحكم</li><li><br></li></ol>",
      updateComponent: 0,
      Terms: "",
      websiteInfo: {
        Youtube: "",
        YouTubeLink: "",
        Heading1: "",
        Heading2: "",
        Heading3: "",
        Paragraph1: "",
        Paragraph2: "",
        Paragraph3: "",
        Paragraph4: "",
        FrontEndStatus: "",
        BackEndStatus: "",
        StatusExtras: "",
      },
    };
  },
  computed: {
    YoutubeErrors() {
      return FieldErrors(this.$v.websiteInfo.Youtube);
    },

    Heading1Errors() {
      return FieldErrors(this.$v.websiteInfo.Heading1);
    },
    Heading2Errors() {
      return FieldErrors(this.$v.websiteInfo.Heading2);
    },
    Heading3Errors() {
      return FieldErrors(this.$v.websiteInfo.Heading3);
    },

    Paragraph4Errors() {
      return FieldErrors(this.$v.websiteInfo.Paragraph4);
    },
    Paragraph1Errors() {
      return FieldErrors(this.$v.websiteInfo.Paragraph1);
    },
    Paragraph2Errors() {
      return FieldErrors(this.$v.websiteInfo.Paragraph2);
    },
    Paragraph3Errors() {
      return FieldErrors(this.$v.websiteInfo.Paragraph3);
    },

    FrontEndStatusErrors() {
      return FieldErrors(this.$v.websiteInfo.FrontEndStatus);
    },
    BackEndStatusErrors() {
      return FieldErrors(this.$v.websiteInfo.BackEndStatus);
    },
    StatusExtrasErrors() {
      return FieldErrors(this.$v.websiteInfo.StatusExtras);
    },
  },
};
</script>
