import useAPI from './useAPI.js'

const listCases = document.querySelector('#list')
const form = document.querySelector('form')

const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/'

const API = new useAPI(BASE_URL)

const fetchCases = async () =>{
  listCases.innerHTML = ''
  const cases = await API.get('Cases')
  const sortedCases = cases.sort((a, b) => new Date(b.created) - new Date(a.created))
  sortedCases.forEach(function(apiCase){
   listCases.insertAdjacentHTML('beforeend', `<div class="card">
   <div class="card-body">
       <h5 class="card-title fs-2 font-weight-bold">Rubrik: ${apiCase.subject}</h5>
       <h6 class= "card-text fs-5"> Email: ${apiCase.email}</h6>
       <p class="card-footer fs-7">Skapad: ${apiCase.created}</p>
       
       <p class="card-footer fs-7">Ärendestatus: ${apiCase.status.statusName}</p>
       <a href="#" class="btn btn-primary">Go to case</a>
   </div>
</div> `)

  })
}

form.addEventListener ("submit", async (e) => {
  e.preventDefault()
  const formData = new FormData(form)
  const email = formData.get('email')
  const title = formData.get('title')
  const message = formData.get('message')

  const newCase = {email: email, subject: title, message: message}
  const currentDate = new Date();
  const currentDateFormat = `${currentDate.toJSON()}${currentDate.getUTCMilliseconds()}`;
  
  const response = await API.post('Cases', newCase)
  console.log(response)

  const modfiedCase = {...newCase, id: response, created: currentDateFormat}
  console.log(modfiedCase)

  fetchCases()
})


fetchCases()




