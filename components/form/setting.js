import _ from "lodash";
import { isBool } from "../../utils";

export const componentMap = {
  input: "el-input",
  number: "el-input-number",
  radio: "v-radio",
  checkbox: "v-checkbox",
  "number-range": "v-number-range",
  date: "el-date-picker",
  time: "el-time-picker",
  datetime: "el-date-picker",
  slider: "el-slider",
  upload: "el-upload",
  transfer: "el-transfer",
  color: "el-color-picker",
  rate: "el-rate",
  select: "v-select",
  switch: "el-switch"
};

export const formOptions = {
  inline: false,
  labelPosition: "right",
  labelWidth: "100px",
  submitButton: {
    show: true,
    type: "primary",
    text: "提交"
  },
  cancelButton: {
    show: true,
    type: "info",
    text: "取消"
  }
};

export function makeFormOptions(options) {
  options = options || {};
  if (isBool(options.submitButton)) {
    options.submitButton = { show: options.submitButton };
  }

  if (isBool(options.cancelButton)) {
    options.cancelButton = { show: options.cancelButton };
  }

  console.log(2222, options.cancelButton);

  return _.merge({}, formOptions, options);
}
