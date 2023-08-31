const input = document.querySelector("#phone-select");
const iti = window.intlTelInput(input, {
  initialCountry: "ua",
  formatOnDisplay: true,
  autoInsertDialCode: true,
  nationalMode: false,
  utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
});

export default iti;