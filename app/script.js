const CONFIG = {
  APP_NAME: "app_name",
  REPORT_NAME: "report_name",
};

let recordId = null;
document.addEventListener("DOMContentLoaded", () => {
  ZOHO.CREATOR.UTIL.getQueryParams().then(function (response) {
    recordId = response.recordId;
    if (recordId) {
      loadData(recordId);
    }
  });
});

const loadData = (recordId) => {
  const config = {
    app_name: CONFIG.APP_NAME,
    report_name: CONFIG.REPORT_NAME,
    field_config: "all",
    id: recordId,
  };
  ZOHO.CREATOR.DATA.getRecordById(config).then(function (response) {
    const record = response.data;
    console.log("record", record);
  });
};

function submitForm() {
  const payload = {
    data: {
      Email: document.getElementById("email").value,
    },
  };

  const config = {
    app_name: CONFIG.APP_NAME,
    report_name: CONFIG.REPORT_NAME,
    id: recordId,
    payload: payload,
  };

  ZOHO.CREATOR.DATA.updateRecordById(config).then(function (response) {
    if (response.code == 3000) {
      console.log("success", response);
    } else {
      console.log("error", response);
    }
  });
}
