import accordionModule from './accordionModule.js'
import dropdownModule from './dropdownModule.js'
import formModule from './formModule.js'

document.addEventListener("DOMContentLoaded", function(event) {
  //burger menu
  const burger = document.getElementById('burger')
  const menu = document.getElementById('menu')
  const header = document.querySelector('.header')

  burger.addEventListener('click', () => {
    burger.querySelector('.burger__inner').classList.toggle('active')
    menu.classList.toggle('active')
    header.classList.toggle('menu-active')
  })

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.querySelector('.burger__inner').classList.remove('active')
      menu.classList.remove('active')
      header.classList.remove('menu-active')
    })
  })

  //add class "hide" to header when scroll down and remove when scroll up
  let lastScroll = 0
  window.addEventListener('scroll', () => {
    let currentScroll = window.scrollY
    if (currentScroll <= 60) {
      header.classList.remove('hide')
      header.classList.remove('scroll')
      return
    }
    if (currentScroll > lastScroll && !header.classList.contains('hide')) {
      //scroll down
      header.classList.add('hide')
      header.classList.remove('scroll')
      burger.querySelector('.burger__inner').classList.remove('active')
      menu.classList.remove('active')
      header.classList.remove('menu-active')
    } else if (currentScroll < lastScroll && header.classList.contains('hide')) {
      //scroll up
      burger.querySelector('.burger__inner').classList.remove('active')
      menu.classList.remove('active')
      header.classList.remove('menu-active')
      header.classList.remove('hide')
      header.classList.add('scroll')
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

  let activeModal;

  const btnsOpenForm = document.querySelectorAll('[data-form-trigger]')

  btnsOpenForm.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.querySelector('.form-modal')
      //move form from .contact-us section to .from-modal
      const form = document.querySelector('.contact-us__form')
      modal.appendChild(form)
  
      activeModal = modal
      modal.classList.add('active')
      modalBg.classList.add('active')
      body.classList.add('fixed')
    })
  })

  document.querySelector('.form-modal .close').addEventListener('click', () => {
    const form = document.querySelector('.contact-us__form')
    const section = document.querySelector('.contact-us .contact-us__content')
    section.prepend(form)
    document.querySelector('.form-modal').classList.remove('active')
    modalBg.classList.remove('active')
    body.classList.remove('fixed')
  })

  const body = document.querySelector('body')

  const modalBg = document.querySelector('.modal-bg')

  modalBg.addEventListener('click', () => {
    if (activeModal.classList.contains('form-modal')) {
      const form = document.querySelector('.contact-us__form')
      const section = document.querySelector('.contact-us .contact-us__content')
      section.prepend(form)
    }
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

  accordionModule.init('accordion')
  dropdownModule.init('dropdown')
  formModule.init('contact-form')
})