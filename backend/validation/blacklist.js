const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateInfoChange(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // // testing out this switch statement
  // // -----------------------------------
  // switch (data) {
  //   case data.name:
  //     console.log(data.name, " : This is the dataname part");
  //     if(!Validator.isEmpty(data.name)) {
  //       errors.name = "yeah this is wrong"
  //     }
  //     if(!Validator.isEmail(data.name)) {
  //       errors.name = "yep this switch is working"
  //     }
  //     break;
  //   case data.email:
  //     console.log(data.name, " : This is the dataname part");
  //     break;
  //   case data.password:
  //     console.log(data.name, " : This is the dataname part");
  //     break;
  //   default:
  //     return {
  //       errors,
  //       isValid: isEmpty(errors)
  //     };
  // }
  // // -----------------------------------





  // Name checks
  if(Validator.isEmail(data.name)) {
    errors.name = "yeah this is not an email"
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
