// eslint-disable

<template>
  <div>
    <Nav></Nav>
    <v-container>
      <v-dialog v-model="dialog" max-width="650px">
        <v-card>
          <v-card-title># {{ selectedProject.ID }}</v-card-title>

          <v-card-text>
            <h3>تفاصيل المشروع</h3>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>إسم المشروع :</td>
                    <td>{{ selectedProject.ProjectName }}</td>
                  </tr>
                  <tr>
                    <td>إسم المتقدم :</td>
                    <td>
                      {{
                        selectedProject.ApplicantFName +
                          " " +
                          selectedProject.ApplicantLName
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td>رقم جوال المتقدم :</td>
                    <td>{{ selectedProject.ApplicantPhone }}</td>
                  </tr>
                  <tr>
                    <td>البريد الإليكتروني :</td>
                    <td>{{ selectedProject.Email }}</td>
                  </tr>
                  <tr>
                    <td>نوع المشروع :</td>
                    <td>{{ selectedProject.ProjectType }}</td>
                  </tr>
                  <tr>
                    <td>الميزانية المتوقعة :</td>
                    <td>{{ selectedProject.Budget }}</td>
                  </tr>

                  <tr height="200px">
                    <td>نبدة عن المشروع :</td>
                    <td>
                      <p style="max-width:250px" class="text-justify">
                        {{ selectedProject.ProjectSummery }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>المرفقات :</td>
                    <td>
                      <a :href="selectedProject.AttachmentLink">PDF</a>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-text v-if="selectedProject.TeamMembers.length">
            <h3>أعضاء الفريق</h3>
            <v-data-table
              :headers="Teamheaders"
              :items="selectedProject.TeamMembers"
              hide-default-header
              hide-default-footer
            >
            </v-data-table>
            <!-- <div v-for="i in selectedProject.TeamMembers" :key="i.id">
              إسم العضو :
              <strong> {{ i.FirstName + " " + i.LastName }}</strong> | رقم
              الجوال : <strong> {{ i.Phone + "   " }}</strong> | الجنس :
              <strong> {{ i.Gender + "  " }}</strong>

              <br />
            </div> -->
          </v-card-text>
          <v-card-actions
            ><v-btn
              @click="favProject(selectedProject)"
              v-if="selectedProject.Favorite != 'true'"
              >favourites<v-icon color="yellow">mdi-star</v-icon></v-btn
            ></v-card-actions
          >
        </v-card>
      </v-dialog>
      <v-row align="center">
        <v-col>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-col class="text-right align-content-end">
          <v-btn @click="downloadCSV">
            Export To CSV
            <v-img
              width="16"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Microsoft_Excel_2013_logo.svg/611px-Microsoft_Excel_2013_logo.svg.png
          "
            ></v-img>
          </v-btn>
        </v-col>
        <v-col class="text-right align-content-end">
          عدد المشاريع : {{ projects.length }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            :key="updateCompoent"
            :headers="headers"
            :items="projects"
            :search="search"
            :page.sync="page"
            :loading="loading"
            :items-per-page="itemsPerPage"
            hide-default-footer
            class="elevation-1"
            @page-count="pageCount = $event"
          >
            <template v-slot:item.fav="{ item }">
              <v-icon
                class="mr-2"
                :color="item.Favorite === 'true' ? 'yellow' : 'black'"
                @click="favProject(item)"
              >
                mdi-star
              </v-icon>
            </template>
            <template v-slot:item.ApplicantName="{ item }">
              {{ item.ApplicantFName + " " + item.ApplicantLName }}
            </template>
            <template v-slot:item.AttachmentLink="{ item }">
              <div v-html="item.AttachmentLink"></div>
            </template>

            <template v-slot:item.details="{ item }">
              <v-icon class="mr-2" @click="viewProject(item)"> mdi-eye </v-icon>
            </template>
          </v-data-table>
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const Papa = require("papaparse");
const api = require("../service/userApi");
import Nav from "./adminNavbar";
export default {
  components: {
    Nav,
  },
  methods: {
    async viewProject(item) {
      let value = await api.default.getProjectByID(item.ID);
      if (value) {
        this.dialog = true;
        this.selectedProject = value.data;
      }
    },
    async favProject(item) {
      this.dialog = false;
      this.loading = true;
      let value = await api.default.toggleFav(item.ID);
      if (value) {
        this.initailize();
      }
    },
    async downloadCSV() {
      let parsed = Papa.unparse(this.projects);

      if (parsed) {
        let csv = {
          title: "Projects.csv",
          head: "",
          body: parsed,
        };
        let csvContent = csv.body;
        if (!csvContent.match(/^data:text\/csv/i)) {
          csvContent = "data:text/csv;charset=utf-8,\ufeff" + csvContent; // use 'data:text/csv;charset=utf-8,\ufeff', if you consider using the excel
        }
        var data = encodeURI(csvContent);

        var link = document.createElement("a");
        link.href = data;
        link.download = csv.title;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    async initailize() {
      let value = await api.default.getAllProjects();
      if (value) {
        this.projects = value.data.message;
        this.loading = false;
        this.updateCompoent++;
        this.projects.forEach((Element) => {
          Element.AttachmentLink === "none"
            ? (Element.AttachmentLink = "لا يوجد")
            : (Element.AttachmentLink = `<a href="${Element.AttachmentLink}">PDF</a>`);
        });
      }
    },
  },
  mounted() {
    this.$vuetify.rtl = true;
    this.initailize();
  },
  data() {
    return {
      dialog: false,
      selectedProject: {
        TeamMembers: [],
      },
      value: 1,
      loading: true,
      updateCompoent: 1,
      //ApplicantFName: "dfgdfgfdgf"
      // ApplicantLName: "fdgdfg"
      // ApplicantPhone: "45456"
      // Budget: "454"
      // Email: "dsffs@ewx.om"
      // Favorite: "false"
      // ID: 1
      // ProjectName: "dfgdfgfdgfd"
      // ProjectSummery: "gfhfgh"
      // ProjectType: "test"
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      search: "",
      headers: [
        {
          align: "start",
          sortable: false,
          value: "fav",
        },
        {
          text: "رقم الطلب",
          value: "ID",
        },
        { text: "إسم المشروع", value: "ProjectName" },
        { text: "إسم مقدم الطلب", value: "ApplicantName" },
        { text: "رقم جوال مقدم الطلب", value: "ApplicantPhone" },
        { text: "البريد الإليكتروني", value: "Email" },
        { text: " ميزانية المشروع", value: "Budget" }, 
        { text: "  عدد الأعضاء", value: "TeamCount" },
        { text: " المرفقات", value: "AttachmentLink" },
        { text: " عرض التفاصيل", value: "details" },
      ],
      Teamheaders: [
        {
          text: "رقم الطلب",
          value: "FirstName",
        },
        { text: "إسم المشروع", value: "LastName" },
        { text: "إسم مقدم الطلب", value: "Phone" },
        { text: "رقم الطلب", value: "Gender" },
      ],
      projects: [
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },
};
</script>
