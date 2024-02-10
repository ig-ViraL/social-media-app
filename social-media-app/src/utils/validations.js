/* eslint-disable no-useless-escape */
import * as Yup from "yup";

const usernameEmailReg =
  /^([a-z][a-z0-9_]*|(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/;
const validLinkRegex =
  /^(https:\/\/|http:\/\/)([\w-]+\.)+([a-z]{2,})+([/?].*)?$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

export const validationSchema = {
  check: Yup.boolean().oneOf([true], "Please accept"),
  regularizationData: Yup.array().of(
    Yup.object({
      comment: Yup.string().required("Comment is required"),
    })
  ),
  domain: Yup.string()
    .matches(/^\S*$/, "Whitespace is not allowed")
    .matches(
      /^[a-z0-9]*[a-z]+[a-z0-9]*$/,
      "Enter only Alphanumeric or lowercase characters. Enter domain name without extension."
    )
    .max(15, "Domain is too long - should be 15 characters")
    .min(4, "Domain is too short - should be 4 characters")
    .required("Domain is required"),
  usernameEmail: Yup.string()
    .matches(usernameEmailReg, "Enter valid Username or Email")
    .required("Username or Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(
      8,
      "The password must be at least 8 characters and contain at least 1 lowercase, 1 Uppercase,1 number, and 1 special character"
    )
    .matches(
      "^((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{6,20})$",
      "The password must be at least 8 characters and contain at least 1 lowercase, 1 Uppercase,1 number, and 1 special character"
    ),
  // .matches(/[a-z]/, 'Password can contain letters')
  // .matches(/[A-Z]/, 'Password can contain Capital letters')
  // .matches(/[0-9]/, 'Password can contain numbers')
  // .matches('^\\S*$', 'Whitespace is not allowed')
  // .matches(
  //   /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g,
  //   'Password can contain special characters'
  // )
  confirmPassword: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  }),
  policyName: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z\d\s]+$/, "Name must not contain special characters")
    .matches(/[a-zA-Z]/, "Name must contain at least one alphabet character")
    .matches(/[^\d\s]/, "Name must not contain only numbers")
    .matches(
      /^[^\s]+(\s+[^\s]+)*$/,
      "Name must not contain extra spaces between words"
    )
    .matches(/\S/, "Name must not contain only empty spaces"),
  documentName: Yup.string()
    .matches(/^[a-zA-Z0-9_ -]+$/, "Special characters are not allowed")
    .max(255, "Document name is too long")
    .max(255, "Document name is too long")
    .required("Document name is required"),
  contactPersonName: Yup.string()
    .trim()
    .matches(/^[a-zA-Z]+ [a-zA-Z]+$/, "Please enter a valid full name.")
    .required("Contact person name is required"),
  name: Yup.string()
    .trim()
    .matches(/^[a-zA-Z ]*$/, "Enter only alphabetic value")
    .matches(/\S/, "Name must not contain only empty spaces")
    .min(2, "Your Name Should Contain At least 2 Character")
    .max(20, "Too Long!"),

  link: Yup.string().when({
    is: (exists) => !!exists,
    then: (rule) =>
      rule.matches(validLinkRegex, "Please enter a valid link").required(),
  }),
  /* firstName: Yup.string()
    .max(20, 'Too Long!')
    .matches('^\\S*$', 'Blank spaces not allowed')
    .matches(/^[a-zA-Z ]*$/, 'Only alphabets are allowed for this field ')
    .required('First Name is required'),
  middleName: Yup.string()
    .max(20, 'Too Long!')
    .matches('^\\S*$', 'Blank spaces not allowed')
    .matches(/^[a-zA-Z ]*$/, 'Only alphabets are allowed for this field ')
    .required('Middle Name is required'),
  lastName: Yup.string()
    .max(20, 'Too Long!')
    .matches('^\\S*$', 'Blank spaces not allowed')
    .matches(/^[a-zA-Z ]*$/, 'Only alphabets are allowed for this field ')
    .required('Last Name is required'), */
  email: Yup.string()
    .email("Invalid email address")
    .matches(emailRegex, "Invalid email address")
    .required("Email is required"),

  companyName: Yup.string()
    .matches(/^(?!\s).+$/, "Whitespace is not allowed")
    .matches(/^(?![0-9]*$)/, "Enter only Alphanumeric value")
    .matches(/^[a-zA-Z0-9_ -]+$/, "Special characters are not allowed")
    .matches(
      /^[0-9a-zA-Z\s\r\n@!#\$\^%&*()+=\-\[\]\\\'{};,\.\/\{\}\|\":<>\?]*$/,
      "Only alphanumeric values are allowed for this field "
    )
    .required("Company name is required"),

  username: Yup.string()
    .matches(
      /^[a-z][a-z0-9_]*$/,
      "Enter only Alphanumeric or lowercase characters"
    )
    .min(6, "Username is too short - should be 6 chars minimum")
    .max(30, "Username is too long - should be 30 chars maximum")
    .required("Username is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone can contain numbers")
    .min(10, "Too Short!")
    .max(10, "Enter 10 digit phone number"),
  // .required('Phone Number is required'),

  skype: Yup.string().matches(
    /^[a-z][a-z0-9\.,\-_]{5,31}$/i,
    "Invalid Skype Name"
  ),
  string: Yup.string().required("This field is required"),
  stringValidation: Yup.string(),
  city: Yup.string()
    .matches(
      /^[a-zA-Z][a-zA-Z\s]*$/,
      "Only alphabets are allowed for this field "
    )
    .nullable()
    .required("City field is required"),
  state: Yup.string()
    .matches(
      /^[a-zA-Z][a-zA-Z\s]*$/,
      "Only alphabets are allowed for this field "
    )
    .nullable()
    .required("State field is required"),
  country: Yup.string()
    .matches(
      /^[a-zA-Z][a-zA-Z\s]*$/,
      "Only alphabets are allowed for this field "
    )
    .required("Country field is required"),
  zip: Yup.string()
    .matches(
      /^[^a-zA-Z!”$%&’@$#()*+\/[\]\\^_`{|}~\s]+$/,
      "Enter only 6 digit zipcode"
    )
    .matches(/^[^0][0-9]+$/, "Please enter valid zip.")
    .max(6, "Too long!")
    .min(6, "Too Short!")
    .required("Zip Code is required"),

  shiftName: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .matches(/^[a-zA-Z][a-zA-Z\s]*$/, "Please enter valid shift name.")
    .required("Shift name is required"),
  companySettingNames: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .matches(
      /^[^!”$%&’@$#().*+\/[\]\\^`{|}~]+$/,
      "Enter only Alphanumeric value."
    )
    .matches(/^[^\s0-9]+[aA-zZ\s0-9]+$/, "Enter only Alphanumeric value."),
  // .required('Name is required'),
  deviceName: Yup.string()
    .min(1, "Too Short!")
    .max(20, "Too Long!")
    .matches(/^\S*$/, "Whitespace is not allowed")
    .matches(
      /^[A-Za-z0-9\w!”$%&’@$#()*+/[\]^_`{|}~]*$/,
      "Device name can only contain alphanumeric with special characters"
    )
    .required("Device is required"),
  holidayName: Yup.string()
    .min(1, "Too Short!")
    .max(20, "Too Long!")
    .matches(/^[a-zA-Z][a-zA-Z\s]*$/, "Please enter valid holiday name.")
    .required("Name is required"),
  deviceType: Yup.string()
    .matches(/^[^\s]+[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .nullable()
    .required("Device type is required"),
  ip: Yup.string()
    .matches(
      "/(^127.)|(^192.168.)|(^10.)|(^172.1[6-9].)|(^172.2[0-9].)|(^172.3[0-1].)|(^::1$)|(^[fF][cCdD])/",
      "Enter correct IPV4 address"
    )
    .required("IP is required"),
  port: Yup.string()
    .matches(
      /^(0|[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
      "Only number in range 0-65535 are allowed for this field "
    )
    .required("Port is required"),
  employeeType: Yup.string()
    .matches(/^[^\s]+[aA-zZ]+$/, "Only alphabets are allowed for this field.")
    .matches(
      /^[^0-9!”$%&’@$#()*+\/[\]\\^_`{|}~]+$/,
      "Only alphabets are allowed for this field."
    )
    .required("Employee type is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "minimum 10 characters required"),
  role: Yup.string()
    .matches(/^[^\s]+[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .required("Role is required"),
  number: Yup.string().matches(/^\d+$/, "Enter only Numeric value"),

  deviceId: Yup.string()
    .matches(/^[^\s]+[0-9]/, "Only numbers are allowed for this field ")
    .required("This field is required"),
  address: Yup.string()
    .trim()
    .matches(/^[^\s]+[#.0-9a-zA-Z\s,-\\)\\(]+$/, "Enter valid address.")
    .min(5, "Address is too short - should be 5 chars minimum")
    .required("Address is required"),
  department: Yup.object().nullable().required("Department is required"),
  date: Yup.date()
    .nullable()
    .typeError("Please enter a valid date")
    .required("Please select date"),
  // holidayDate: Yup.date()
  //   .nullable()
  //   .typeError("Please enter a valid date")
  //   .required("Please select date")
  //   .test(
  //     "Holiday Date",
  //     `Please enter a date that falls between tomorrow and ${moment(
  //       `${moment().year() + 1}-12-31`
  //     ).format("MMMM YYYY")}.`,
  //     (value) => {
  //       if (!value) return true;
  //       const dateObject = moment(value, "ddd MMM DD YYYY HH:mm:ss ZZ");
  //       const startDate = moment();
  //       const endDate = moment(`${moment().year() + 1}-12-31`);

  //       const isWithinRange = dateObject.isBetween(
  //         startDate,
  //         endDate,
  //         "days",
  //         "(]"
  //       );

  //       return isWithinRange;
  //     }
  //   ),
  // birthDate: Yup.date()
  //   .nullable()
  //   .typeError("Please enter a valid date")
  //   .required("Please select date")
  //   .test("Date of Birth", "Please enter a valid date", (value) => {
  //     if (!value) return true;
  //     return moment().diff(moment(value), "years") <= 100;
  //   })
  //   .test(
  //     "Date of Birth",
  //     "Person should be at least 18 years old",
  //     (value) => {
  //       if (!value) return true;
  //       return moment().diff(moment(value), "years") >= 18;
  //     }
  //   ),
  time: Yup.string().required("Time is required"),
  array: Yup.array().max(4, "You can select only four employees.").nullable(),
  branchArray: Yup.array()
    .min(1, "Branch field must have at least one item")
    .nullable(),
  object: Yup.object().nullable().required("Reporting Manager is required"),
  selectDate: Yup.string().required("Please select date"),
  minutes: Yup.number()
    .typeError("Minutes must be  number")
    .required("Please enter minutes")
    .min(1)
    .max(60),
  university: Yup.string()
    .matches(/^(?![0-9]*$)/, "Only numbers are not allowed")
    .matches(
      /^(?!\s)(?![\s\S]*\s$)/,
      "Blank space at start and end is not allowed"
    )
    .matches(/^[a-zA-Z0-9'.(),-\s]*$/, "Please enter valid University/board")
    .required("This field is required"),
  course: Yup.string()
    .matches(
      /^(?!\s)(?![\s\S]*\s$)/,
      "Blank space at start and end is not allowed"
    )
    .matches(/^[a-zA-Z\s]*$/, "Please enter valid Course")
    .required("This field is required"),
  grade: Yup.string()
    .matches(/^\d*\.?\d*$/, "Only numbers are allowed for this field ")
    .required("This field is required"),
  reason: Yup.string()
    .required("Please enter reason")
    .min(5, "Reason must be at least 5 characters"),
  approvedPerson: Yup.array()
    .min(1, "Must have at least one item")
    .required("Please select approved person"),
  code: Yup.string()
    .matches(/^[a-zA-Z0-9_.-]*$/, "Please enter valid code")
    .required("Shift Code is required"),
  file: Yup.mixed()
    .required("File is required")
    .test("fileSize", "File size too large, max file size is 5 MB", (file) =>
      file && typeof file === "object" ? file.size <= 5 * 1024 * 1024 : true
    )
    .test(
      "fileType",
      "File does not support. Files type must be gif, png, jpg, jpeg",
      (file) =>
        file && typeof file === "object"
          ? ["image/gif", "image/png", "image/jpg", "image/jpeg"].includes(
              file.type
            )
          : true
    )
    .test(
      "fileRatio",
      "Image should have a minimum resolution of 100 x 100 pixels",
      async (file) => {
        if (file && typeof file === "object") {
          // return await sizeCheck(file);
        }
        return true;
      }
    ),
};
