<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props"> Details about a candidate</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Candidate Details</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="First name"
                  v-model="candidate.First_Name__c"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Last name"
                  v-model="candidate.Last_Name__c"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Years of experience"
                  type="number"
                  min="0"
                  readonly
                  v-model="candidate.Year_Of_Experience__c"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
import { connectToSalesforce } from "@/utils/authentication";
export default {
  name: "Details",
  data: () => ({
    dialog: false,
    candidate: {
      First_Name__c: "",
      Last_Name__c: "",
      Years__c: null,
      Year_Of_Experience__c: null,
    },
  }),

  methods: {
    async getCandidate() {
      try {
        const token = await connectToSalesforce();
        const res = await axios.get(
          "https://soljit35-dev-ed.my.salesforce.com/services/data/v55.0/sobjects/Candidature__c/a004L000002gCJK?fields=First_Name__c,Last_Name__c,Year__c,Year_Of_Experience__c",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);
        this.candidate = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.getCandidate();
  },
};
</script>
<style>
</style>