<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props"> Add new candidate</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add my profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="First name"
                  v-model="myProfile.First_Name__c"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Last name"
                  v-model="myProfile.Last_Name__c"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Years of experience"
                  type="number"
                  min="0"
                  readonly
                  v-model="myProfile.Year_Of_Experience__c"
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
          <v-btn color="blue-darken-1" variant="text" @click="addCandidate">
            Save
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
  name: "Add",
  data: () => ({
    dialog: false,
    myProfile: {
      First_Name__c: "Sami",
      Last_Name__c: "Maachi",
      Year_Of_Experience__c: 1,
    },
  }),

  methods: {
    async addCandidate() {
      try {
        const token = await connectToSalesforce();
        const res = await axios.post(
          "https://soljit35-dev-ed.my.salesforce.com/services/data/v55.0/sobjects/Candidature__c",
          this.myProfile,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
</style>