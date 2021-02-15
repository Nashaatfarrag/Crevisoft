const axios = require("axios");

module.exports = {
    getData() {
        return axios
            .get("https://run.mocky.io/v3/90e1d920-afca-4101-8a97-9097310d7e8a")
            .finally(() => {
            });
    }
}
