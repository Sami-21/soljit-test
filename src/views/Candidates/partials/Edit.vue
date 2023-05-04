<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props"> Edit last name</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit last name</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Last name"
                  v-model="Last_Name__c"
                  readonly
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
          <v-btn color="blue-darken-1" variant="text" @click="editCandidate">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { connectToSalesforce } from "@/utils/authentication";
import axios from "axios";
export default {
  name: "Edit",
  data: () => ({
    dialog: false,
    Last_Name__c: "Maachi",
  }),

  methods: {
    async editCandidate() {
      try {
        const token = await connectToSalesforce();
        const res = await axios.patch(
          "https://soljit35-dev-ed.my.salesforce.com/services/data/v55.0/sobjects/Candidature__c/a004L000002gCJK",
          { Last_Name__c: this.Last_Name__c },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        this.dialog = false;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
</style>