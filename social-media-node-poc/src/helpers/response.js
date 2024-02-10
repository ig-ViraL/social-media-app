module.exports.error = function (res, message = null, statusCode = 403) {
  var response = {};
  response.success = false;
  response.message = message;
  return res.status(statusCode).send(response);
};

// <button class="text-white text-sm tracking-wide bg-red rounded w-full my-8 p-4 ">CONFIRM EMAIL ADRESS</button>
