<template>
  <div class="container">
    <v-row>
      <v-col cols="8">
        <h2>Candidates</h2>
      </v-col>
      <v-col cols="2">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props">Types</v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-btn
                width="100%"
                :color="selectedType === '' ? 'primary' : ''"
                @click="candidatesFilterReset"
              >
                All
              </v-btn>
            </v-list-item>
            <v-list-item v-for="(type, index) in candidatesType" :key="index">
              <v-btn
                :color="selectedType === type.Type__c ? 'primary' : ''"
                width="100%"
                @click="selectedType = type.Type__c"
              >
                {{ type.Type__c ? type.Type__c : "none" }}
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col cols="2">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props"> Actions</v-btn>
          </template>
          <v-list>
            <v-list-item>
              <Add></Add>
            </v-list-item>
            <v-list-item>
              <Details></Details>
            </v-list-item>
            <v-list-item>
              <Edit></Edit>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-row>
              <v-text-field
                v-model="searchQuery"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-btn
                icon="mdi-magnify"
                variant="plain"
                @click="searchCandidate"
              ></v-btn>
            </v-row>
          </v-card-title>
          <v-data-table :headers="headers" :items="candidates"></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
import Add from "./partials/Add.vue";
import Details from "./partials/Details.vue";
import Edit from "./partials/Edit.vue";
import { connectToSalesforce } from "@/utils/authentication";
export default {
  components: { Add, Details, Edit },

  data() {
    return {
      itemsPerPage: 10,
      searchQuery: "",
      candidatesType: [],
      selectedType: "",
      headers: [
        {
          title: "ID",
          align: "start",
          key: "Id",
        },
        { title: "Name", align: "start", key: "Name" },
      ],
      candidates: [],
    };
  },

  watch: {
    async selectedType() {
      await this.filterCandidateByType();
    },
  },

  methods: {
    async getCandidates() {
      try {
        const token = await connectToSalesforce();
        const url =
          "https://soljit35-dev-ed.my.salesforce.com/services/data/v55.0/sobjects/Candidature__c/";
        const headers = {
          Authorization: "Bearer " + token,
        };
        const res = await axios.get(url, {
          headers,
        });
        this.candidates = res.data.recentItems;
      } catch (error) {
        console.log(error);
      }
    },

    async getCandidatesTypes() {
      try {
        const token = await connectToSalesforce();
        const url =
          "https://soljit35-dev-ed.my.salesforce.com/services/data/v55.0/query/?q=SELECT+Type__c+from+Candidature__c+GROUP+BY+Type__c";
        const headers = {
          Authorization: "Bearer " + token,
        };
        const res = await axios.get(url, {
          headers,
        });
        this.candidatesType = res.data.records;
      } catch (error) {
        console.log(error);
      }
    },

    async searchCandidate() {
      this.searchQuery = this.searchQuery.trimStart();
      if (this.searchQuery === "") {
        await this.getCandidates();
        return;
      } else {
        try {
          const token = await connectToSalesforce();
          const url = `https://soljit35-dev-ed.my.salesforce.com/services/data/v55.0/query?q=SELECT+Id,Name+FROM+Candidature__c+WHERE+First_Name__c+=${
            "'" + this.searchQuery + "'"
          }+OR+Last_Name__c+=${"'" + this.searchQuery + "'"}`;
          const headers = {
            Authorization: "Bearer " + token,
          };
          const res = await axios.get(url, {
            headers,
          });
          this.candidates = res.data.recentItems;
        } catch (error) {
          console.log(error);
        }
      }
    },

    async filterCandidateByType() {
      try {
        const token = await connectToSalesforce();
        const url = `https://soljit35-dev-ed.my.salesforce.com/services/data/v55.0/query/?q=SELECT+Id,Name+from+Candidature__c+WHERE+Type__c+=${
          this.selectedType ? "'" + this.selectedType + "'" : "NULL"
        }`;
        const headers = {
          Authorization: "Bearer " + token,
        };
        const res = await axios.get(url, {
          headers,
        });
        this.candidates = res.data.records;
      } catch (error) {
        console.log(error);
      }
    },

    async candidatesFilterReset() {
      await this.getCandidates();
      this.selectedType = "";
    },
  },

  async mounted() {
    await this.getCandidates();
    await this.getCandidatesTypes();
  },
};
</script>
 <style>
.container {
  padding: 20px;
}
</style>


"https://soljit35-dev-ed.my.salesforce.com/services/data/v55.0/query?q=SELECT+Id,Name,+FROM+Candidature__c+WHERE+First_Name__c+='SAMi'+OR+Last_Name__c+='SAMi'"