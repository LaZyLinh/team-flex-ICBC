// Note: untested

import React from "react";
import Button from "@material-ui/core/Button";
import OfficeLendingApi from "../../api/OfficeLendingApi";
import { saveAs } from "file-saver";

const FILENAME = "CSV_Template.csv";

function getCsvString(featureNames) {
  let str = "OfficeID,EmployeeID";
  for (const fn of featureNames) {
    str += ",";
    str += fn;
  }
  str += "\n";
  return str;
}

async function handleClick() {
  const featureNames = await OfficeLendingApi.getFeatures();
  const csvContentStr = getCsvString(featureNames);
  const blob = new Blob([csvContentStr], { type: "text/plain;charset=utf-8" });
  saveAs(blob, FILENAME);
}

function DownloadCsvTemplateButton() {
  return <Button onClick={handleClick}>Download CSV Template</Button>;
}

export default DownloadCsvTemplateButton;
