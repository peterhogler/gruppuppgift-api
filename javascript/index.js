import useAPI from './useAPI.js'

const listCases = document.querySelector('#list')


const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/'

const API = new useAPI(BASE_URL)

const fetchCases = async () =>{
  const cases = await API.get('Cases')
  console.log(listCases)
  //console.log(cases)
  cases.forEach(function(apiCase){
   listCases.insertAdjacentHTML('beforeend', `<div class="card">
   <div class="card-body">
       <h5 class="card-title fs-2 font-weight-bold">Rubrik: ${apiCase.subject}</h5>
       <h6 class= "card-text fs-5"> Email: ${apiCase.email}</h6>
       <p class="card-footer fs-7">Skapad: ${apiCase.created}</p>
       
       <p class="card-footer fs-7">Ärendestatus: ${apiCase.status.statusName}</p>
       <a href="#" class="btn btn-primary">Go to case</a>
   </div>
</div> `)
console.log(apiCase)
  })
}

fetchCases()

