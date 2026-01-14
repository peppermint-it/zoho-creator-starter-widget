const CONFIG = {
  APP_NAME: "app_name",
  REPORT_NAME: "report_name",
};

function isZohoAvailable() {
  return (
    typeof window !== "undefined" &&
    window.ZOHO?.CREATOR?.UTIL &&
    window.ZOHO?.CREATOR?.DATA
  );
}

async function getQueryParams() {
  if (!isZohoAvailable()) return {};
  return await window.ZOHO.CREATOR.UTIL.getQueryParams();
}

async function getWidgetParams() {
  if (!isZohoAvailable() || !window.ZOHO.CREATOR.UTIL.getWidgetParams) return {};
  return await window.ZOHO.CREATOR.UTIL.getWidgetParams();
}

export async function getRecordId() {
  const queryParams = await getQueryParams();
  if (queryParams?.recordId) return String(queryParams.recordId).trim();

  const widgetParams = await getWidgetParams();
  if (widgetParams?.recordId) return String(widgetParams.recordId).trim();

  return null;
}

export async function zohoUpdateEmail({ recordId, email }) {
  if (!isZohoAvailable()) {
    throw new Error(
      "ZOHO SDK not available. Run the widget inside Zoho Creator (or via external hosting inside Creator).",
    );
  }

  const config = {
    app_name: CONFIG.APP_NAME,
    report_name: CONFIG.REPORT_NAME,
    id: recordId,
    payload: {
      data: {
        Email: email,
      },
    },
  };

  return await window.ZOHO.CREATOR.DATA.updateRecordById(config);
}

