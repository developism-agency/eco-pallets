import iti from './itiModule.js'

const formModule = (function() {
  let form
  let email
  let phone
  let productType
  let formData

  function init(formId) {
    form = document.querySelector(`#${formId}`)
    email = form.querySelector('[name="email"]')
    phone = form.querySelector('[name="phone_number"]')
    productType = form.querySelectorAll('[name="product_type"]')

    setupSubmit()
  }
  
  function validateInputs() {
    clearValidationClasses()
    const emailValue = email.value
    const phoneValue = phone.value
    const productTypeValue = formData.getAll('product_type')

    if (emailValue !== '' && !isEmail(emailValue)) {
      setErrorFor(email, email.dataset.messageValid)
    }
    
    if (phoneValue === '') {
      setErrorFor(phone, phone.dataset.messageRequired)
    }

    if (!iti.isValidNumber()) {
      setErrorFor(phone, phone.dataset.messageValid)
    }

    if (!productTypeValue.length) {
      setErrorFor(productType, productType[0].dataset.messageRequired)
    }

    if ((emailValue !== '' && !isEmail(emailValue)) && phoneValue !== '' && productTypeValue.some(value => value !== '')) {
      clearValidationClasses()
      return true
    } else { return false }
  }

  function setErrorFor(input, message) {
    const formControl = (input instanceof NodeList) ? input.item(0).closest('.error-message') : input.closest('.error-message')

    const small = formControl.querySelector('small')

    if (small) {
      small.innerText = message
    }

    formControl.classList.add('error')
  }

  function clearValidationClasses() {
    const erroredItems = document.querySelectorAll('.error')
    erroredItems.forEach(item => {
      console.log(item)
      item.classList.remove('error')
      item.querySelector('small').innerText = ''
    })
  }

  function isEmail(email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
  }

  function setupSubmit() {
    form.addEventListener("submit", async function(event) {
      event.preventDefault();
      formData = new FormData(form);

      if (!validateInputs()) return
    
      const body = {
        ...Object.fromEntries(formData.entries()),
        product_type: formData.getAll('product_type')
      }
      const responseContainer = document.getElementById("response-form");
      
      try {
          const response = await fetch("/.netlify/functions/submitForm", {
              method: "POST",
              body: JSON.stringify(body),
          });
          
          const data = await response.json();
          displaySuccesSubmit()
          // responseContainer.textContent = data.message;
      } catch (error) {
          // responseContainer.textContent = "Error submitting form.";
          console.error(error);
      }
    })
  }

  function displaySuccesSubmit() {
    const btn = form.querySelector('.btn-submit')
    btn.querySelector('.name').innerHTML = btn.dataset.submitMessage
    btn.classList.add('submited')

    setTimeout(() => {
      btn.classList.remove('submited')
    })
  }

  return { init }
})()

export default formModule
