import customSelect from './custom-select.js';

document.addEventListener('DOMContentLoaded', () => {
  const cstSlct = customSelect(document.querySelectorAll('.custom-select'))
})

//burger menu
const burger = document.getElementById('burger')
const menu = document.getElementById('menu')
const header = document.querySelector('.header')

burger.addEventListener('click', () => {
  burger.querySelector('.burger__inner').classList.toggle('active')
  menu.classList.toggle('active')
  header.classList.toggle('menu-active')
})

//accordion

let accordion = document.querySelector('.text-accordion')
let accordionBtn = accordion.querySelector('#accordion-trigger')
let accordionContent = accordion.querySelector('.text-accordion__content')

accordionBtn.addEventListener('click', function (e) {
  this.parentNode.classList.toggle('active')
  if (accordionContent.style.maxHeight) {
    accordionContent.style.maxHeight = null
  } else {
    accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'
  }
})

//add class "hide" to header when scroll down and remove when scroll up
let lastScroll = 0
window.addEventListener('scroll', () => {
  let currentScroll = window.scrollY
  if (currentScroll <= 60) {
    header.classList.remove('hide')
    return
  }
  if (currentScroll > lastScroll && !header.classList.contains('hide')) {
    //scroll down
    header.classList.add('hide')
  } else if (currentScroll < lastScroll && header.classList.contains('hide')) {
    //scroll up
    header.classList.remove('hide')
  }
  lastScroll = currentScroll
})

//scroll down btn
const scrollDownBtn = document.querySelector('#scrollDown')

scrollDownBtn.addEventListener('click', () => {
  document.querySelector('#about').scrollIntoView({
    behavior: 'smooth',
  })
})

//embed map address
const map = document.querySelector('.map__map iframe')

document.querySelectorAll('.btn-link').forEach(btn => {
  btn.addEventListener('click', () => {
    if (map.src === btn.dataset.address) return
    else map.src = btn.dataset.address
    
  })
})

//send form
document.getElementById("contact-form").addEventListener("submit", async function(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  // const responseContainer = document.getElementById("response-form");
  
  try {
      const response = await fetch("/.netlify/functions/submitForm", {
          method: "POST",
          body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      
      const data = await response.json();
      // responseContainer.textContent = data.message;
  } catch (error) {
      // responseContainer.textContent = "Error submitting form.";
      console.error(error);
  }
});

//init country code select
const input = document.querySelector("#phone-select");
window.intlTelInput(input, {
  initialCountry: "ua",
  formatOnDisplay: true,
  utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
});

//open/close product modal
let activeModal;
const body = document.querySelector('body')

const modalBg = document.querySelector('.modal-bg')

modalBg.addEventListener('click', () => {
  if (activeModal) {
    activeModal.classList.remove('active')
    modalBg.classList.remove('active')
    body.classList.remove('fixed')
  }
})

const products = document.querySelectorAll('.product')

products.forEach(product => {
  const btnOpen = product.querySelector('[data-modal-trigger]')
  const modal = product.querySelector('.product-modal')
  const btnClose = modal.querySelector('.close')

  btnOpen.addEventListener('click', () => {
    activeModal = modal
    modal.classList.add('active')
    modalBg.classList.add('active')
    body.classList.add('fixed')
  })

  btnClose.addEventListener('click', () => {
    activeModal = null
    modal.classList.remove('active')
    modalBg.classList.remove('active')
    body.classList.remove('fixed')
  })
})
