const dropdownModule = (function () {
  let label
  let options

  function init(dropdownId) {
    label = document.querySelector(`#${dropdownId} .dropdown__filter-selected`)
    options = Array.from(document.querySelectorAll(`#${dropdownId} .dropdown__select-option`))

    setupEventListeners()
    closeDropdownOnClickOutside()
  }


  function setupEventListeners() {
    options.forEach((option) => {
      option.addEventListener('click', () => {
        label.textContent = option.textContent
      })
    })
  }

  // Close dropdown onclick outside
  function closeDropdownOnClickOutside() {
    document.addEventListener('click', (e) => {
      const toggle = document.querySelector('.dropdown__switch')
      const element = e.target
  
      if (element == toggle) return;
  
      const isDropdownChild = element.closest('.dropdown__filter')		
      
      if (!isDropdownChild) {
        toggle.checked = false
      }
    })
  }

  return { init }
})()

export default dropdownModule