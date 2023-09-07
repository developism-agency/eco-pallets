const accordionModule = (function () {
  let accordion
  let accordionBtn
  let accordionContent

  function init(accordionId) {
    accordion = document.querySelector(`#${accordionId}`)
    accordionBtn = accordion.querySelector('#accordion-trigger')
    accordionContent = accordion.querySelector('.text-accordion__content')

    setupEventListeners()
  }

  function setupEventListeners() {
    accordionBtn.addEventListener('click', function (e) {
      this.parentNode.classList.toggle('active')
      if (accordionContent.style.maxHeight) {
        accordionContent.style.maxHeight = null
      } else {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'
      }
    })
  }

  return { init }
})()