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
const map = document.querySelector('.map__map iframe')

document.querySelectorAll('.btn-link').forEach(btn => {
  btn.addEventListener('click', () => {
    if (map.src === btn.dataset.address) return
    else map.src = btn.dataset.address
    
  })
})