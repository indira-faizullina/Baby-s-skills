const skillsArray = [
  {
    id: '1665474698659',
    skillDate: '2022-01-05',
    skillName: 'Первая улыбка',
  },
  {
    id: '1665474725035',
    skillDate: '2022-10-01',
    skillName: 'Первые шаги',
  },
]

const containerNode = document.querySelector('.container')
const formNode = containerNode.querySelector('#add-form')
const newSkillInputNode = formNode.querySelector('#new-skill')
const dateInputNode = formNode.querySelector('.input-date')
const submitButtonNode = formNode.querySelector('.submit-button')
const tableNode = containerNode.querySelector('table')

// слушатель на кнопку добавления нового навыка + валидация
submitButtonNode.addEventListener('click', (event) => {
  event.preventDefault()

  const isSkillExists = skillsArray.find(
    (skill) =>
      skill.skillName.toLowerCase() ===
      newSkillInputNode.value.toLowerCase().trim()
  )

  if (isSkillExists) {
    removeErrorMessage()
    createErrorMessage('Данный навык уже существует.')
  } else if (!newSkillInputNode.value || !dateInputNode.value) {
    removeErrorMessage()
    createErrorMessage('Заполните все поля!')
  } else {
    removeErrorMessage()
    addNewSkill(dateInputNode.value, newSkillInputNode.value)
  }
})

// слушатель на кнопку удаления навыка
tableNode.addEventListener('click', (event) => {
  if (event.target.closest('.delete-button')) {
    const nodeToDelete = event.target.closest('tr')

    // deleteSkill(nodeToDelete)
    createModal(nodeToDelete)
  }
})

//функция удаления навыка
function deleteSkill(skillNode) {
  const skillNodeId = skillNode.getAttribute('id')
  const IdtoDelete = skillsArray.findIndex((skill) => skill.id === skillNodeId)
  skillsArray.splice(IdtoDelete, 1)

  deleteModal()
  skillNode.remove()
}

//функция добавления ошибки
function createErrorMessage(text) {
  const errorMessage = document.createElement('span')
  errorMessage.className = 'error-message'
  errorMessage.textContent = text

  newSkillInputNode.insertAdjacentElement('afterend', errorMessage)
}

//функция удаления ошибки
function removeErrorMessage() {
  const errorMessageNode = document.querySelector('.error-message')
  if (errorMessageNode) {
    errorMessageNode.remove()
  }
}

//функция добавления нового навыка
function addNewSkill(date, skill, id = Date.now().toString()) {
  const newSkilltr = document.createElement('tr')
  newSkilltr.id = id

  const newSkilltd_1 = document.createElement('td')
  const newSkilltd_2 = document.createElement('td')
  const newSkilltd_3 = document.createElement('td')

  newSkilltd_1.textContent = date.split('-').reverse().join('.')
  newSkilltd_2.textContent = skill.trim()

  const deleteSkillButton = document.createElement('button')
  deleteSkillButton.className = 'delete-button'
  deleteSkillButton.textContent = '✖'

  newSkilltd_3.append(deleteSkillButton)
  newSkilltr.append(newSkilltd_1, newSkilltd_2, newSkilltd_3)
  tableNode.append(newSkilltr)

  skillsArray.push({
    id: id,
    skillDate: date,
    skillName: skill.trim(),
  })
}

//функция добавления модального окна
function createModal(skillNode) {
  const modal = document.createElement('div')
  modal.className = 'modal'
  modal.insertAdjacentHTML(
    'afterbegin',
    `<div class="modal-back">
  <div class="modal-window">
    <p class="modal-question">Вы действительно хотите удалить навык?</p>
    <div class="modal-buttons">
      <button class="confirm">Да</button>
      <button class="cancel">Отмена</button>
    </div>
  </div>
</div>`
  )

  containerNode.append(modal)
  //слушатели на кнопки модального окна
  const confirmButtonNode = document.querySelector('.confirm')
  const cancelButtonNode = document.querySelector('.cancel')

  confirmButtonNode.addEventListener('click', () => deleteSkill(skillNode))

  cancelButtonNode.addEventListener('click', () => deleteModal())
}

//функция удаления модального окна
function deleteModal() {
  const modalNode = document.querySelector('.modal')
  modalNode.remove()
}
