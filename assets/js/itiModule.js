const input = document.querySelector("#phone-select");
const iti = window.intlTelInput(input, {
  initialCountry: "ua",
  separateDialCode: true,
  onlyCountries: ["ua", "en", "de", "fr", "it", "us", "pl"],
  utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
});
