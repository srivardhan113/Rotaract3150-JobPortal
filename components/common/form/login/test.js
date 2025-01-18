const axios = require("axios");

const url = "http://34.93.35.16:8000/api/jobs/12";

axios
  .get(url)
  .then((response) => {
    // Handle the successful response
    console.log(response.data);
  })
  .catch((error) => {
    // Handle errors
    console.error("Error fetching data:", error);
  });
