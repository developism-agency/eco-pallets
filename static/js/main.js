import customSelect from './custom-select.js';

document.addEventListener('DOMContentLoaded', () => {
  const cstSlct = customSelect(document.querySelectorAll('.custom-select'))

  const customSelectOptions = document.querySelectorAll('.contact-us .custom-select-option')
  customSelectOptions.forEach((option) => {
    const img = document.createElement('img')
    const nativeOption = document.querySelector(`.contact-us option[value="${option.dataset.value}"]`)
    img.src = nativeOption.dataset.src
    option.prepend(img)
  })
  
  const customSelectOpener = document.querySelector('.contact-us .custom-select-opener')
  const img = document.createElement('img')
  const nativeOption = document.querySelector(`.contact-us option[value="${customSelectOpener.textContent}"]`)
  img.src = nativeOption.dataset.src
  customSelectOpener.prepend(img)

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
const addresses = {
  firstAddress: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2564.9143067351333!2d24.277662982750268!3d49.99421604332794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ace56df37893f%3A0xa79093f4a54544f5!2sSchool%20of%20Velyke%20Kolodno!5e0!3m2!1suk!2sua!4v1693070158395!5m2!1suk!2sua",
  secondAddress: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2743.7518396693945!2d15.669558776687664!3d46.55259566016454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476f771770cbf365%3A0x2afd82719b7fc5aa!2zR3VuZHVsacSNZXZhIHVsaWNhIDEyLCAyMDAwIE1hcmlib3IsINCh0LvQvtCy0LXQvdGW0Y8!5e0!3m2!1suk!2sua!4v1693070311213!5m2!1suk!2sua",
}

const map = document.querySelector('.map__map iframe')

document.querySelectorAll('.btn-link').forEach(btn => {
  btn.addEventListener('click', () => {
    if (map.src === addresses[btn.dataset.address]) return
    else map.src = addresses[btn.dataset.address]
    
  })
})