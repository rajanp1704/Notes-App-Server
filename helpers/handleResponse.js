const successMessage = (res, message) => {
  return res.status(200).json({ status: 1, message });
};
const successMessageWithData = (res, message, data) => {
  return res.status(200).json({ status: 1, message, data });
};
const errorMessage = (res, message) => {
  return res.status(500).json({ status: 0, message });
};
const errorMessageWithData = (res, message, data) => {
  return res.status(500).json({ status: 0, message, data });
};
const validationError = (res, message, data) => {
  return res.status(400).json({ status: 0, message, data });
};
const forbiddenError = (res, message) => {
  return res.status(401).json({ status: 0, message });
};

module.exports = {
  successMessage,
  successMessageWithData,
  errorMessage,
  errorMessageWithData,
  validationError,
  forbiddenError,
};
