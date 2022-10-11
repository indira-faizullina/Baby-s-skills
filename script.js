const skillsArr = [
  {
    id: '1665474698659',
    skillDate: '05.01.2022',
    skillName: 'Первая улыбка',
  },
  {
    id: '1665474725035',
    skillDate: '01.10.2022',
    skillName: 'Первые шаги',
  },
]

const newSkillInputForm = document.querySelector('form')
newSkillInputForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const newSkillInputName = newSkillInputForm.querySelector('#new_skill')
  const newSkillName = newSkillInputName.value
  const newSkillInputDate = newSkillInputForm.querySelector('.input_date')
  const newSkillDate = newSkillInputDate.value

  //checking the correctness of the entered data

  const errorWindowExist = newSkillInputForm.querySelector('.error_window')
  const skillNameExist = skillsArr.some((item) => {
    return item.skillName === newSkillName
  })
  if (newSkillName.trim() === '' || newSkillDate === '') {
    if (errorWindowExist) {
      errorWindowExist.remove()
    }
    createErrorWindow('Заполните все поля!')
  } else if (skillNameExist) {
    if (errorWindowExist) {
      errorWindowExist.remove()
    }
    createErrorWindow('Такой навык уже существует!')
  } else {
    if (errorWindowExist) {
      errorWindowExist.remove()
    }
    addNewSkill(newSkillName, newSkillDate)
  }
})

// function to create a new item

function addNewSkill(skill, date) {
  const newItemSkillTd = document.createElement('td')
  newItemSkillTd.textContent = skill

  const newItemDateTd = document.createElement('td')
  newItemDateTd.textContent = date.split('-').reverse().join('.')

  const newItemTr = document.createElement('tr')
  newItemTr.append(newItemDateTd, newItemSkillTd)

  const table = document.querySelector('table')
  table.append(newItemTr)

  // to create a new array element
  const newElemOfSkillsArr = {
    id: Date.now().toString(),
    skillDate: date,
    skillName: skill,
  }
  skillsArr.push(newElemOfSkillsArr)
  console.log(skillsArr)
}

// function to create a error window

const createErrorWindow = (text) => {
  const errorWindow = document.createElement('span')
  errorWindow.className = 'error_window'
  errorWindow.textContent = text

  const addItemButton = newSkillInputForm.querySelector('button')
  addItemButton.insertAdjacentElement('beforebegin', errorWindow)
}
