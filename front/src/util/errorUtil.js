const ErrorUtil = {};

ErrorUtil.typeCheck = function (a, type) {
  if (typeof a !== type) {
    console.log(`The param is not a ${type}`);
    debugger;
  }
};

ErrorUtil.invalidParam = function (param) {
  if (!param) {
    console.log(`Invalid parameter!! ${param}`);
    debugger;
  }
};

ErrorUtil.notImplemented = function () {
  console.log("Not implemented..!");
  debugger;
};

Object.freeze(ErrorUtil);
export default ErrorUtil;
