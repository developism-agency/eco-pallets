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

    const validityArr = ['email', 'phone-required', 'phone-valid', 'product-type']

    if (emailValue !== '' && !isEmail(emailValue)) {
      setErrorFor(email, email.dataset.messageValid)
    } else {
      validityArr.splice(validityArr.indexOf('email'), 1)
    }
    
    if (phoneValue === '') {
      setErrorFor(phone, phone.dataset.messageRequired)
    } else {
      validityArr.splice(validityArr.indexOf('phone-required'), 1)
    }

    if (!iti.isValidNumber()) {
      setErrorFor(phone, phone.dataset.messageValid)
    } else {
      validityArr.splice(validityArr.indexOf('phone-valid'), 1)
    }

    if (!productTypeValue.length) {
      setErrorFor(productType, productType[0].dataset.messageRequired)
    } else {
      validityArr.splice(validityArr.indexOf('product-type'), 1)
    }

    if (validityArr.length === 0) {
      return true
    } else {
      return false
    }
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

      if (!validateInputs()) {
        console.log('not valid')
        return
      }
    
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
      } catch (error) {
          console.error(error);
      }
    })
  }

  function displaySuccesSubmit() {
    const btn = form.querySelector('.btn-submit')
    const originalText = btn.querySelector('.name').innerHTML
    btn.querySelector('.name').innerHTML = btn.dataset.submitMessage
    btn.classList.add('submited')

    setTimeout(() => {
      btn.classList.remove('submited')
      btn.querySelector('.name').innerHTML = originalText
    }, 5000)
  }

  return { init }
})()
