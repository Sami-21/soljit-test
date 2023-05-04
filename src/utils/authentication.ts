import axios from "axios";
export async function connectToSalesforce() {
  try {
    const res = await axios.post(
      "https://login.salesforce.com/services/oauth2/token",
      "grant_type=password&client_id=3MVG9I9urWjeUW051PumYX1mbS5HkS3kpZsbCEzYWjgivRyDno1MjvM08EfVf2be52s0vrthHamsgMpQCrm5Z&client_secret=EC97DAFBF9F6F2399DE5E7BADA2E9BBEF6B3B6E832DC435668AA452940AD9501&username=soljit_algeria2@soljit.com&password=entretient_1235zoLmTaUDLiouUaOAN6WhOQPi",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("connected to the API");
    return res.data.access_token;
  } catch (error) {
    console.log(error);
    return;
  }
}
