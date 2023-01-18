import useAPI from "./useAPI.js";
const subject = document.querySelector("#subject")
const email = document.querySelector("#email")
const message = document.querySelector("#message")
const created = document.querySelector("#created")
const status = document.querySelector("#status")

const id = new URLSearchParams(window.location.search).get("id");
console.log(id)
const BASE_URL = "https://fnd22-shared.azurewebsites.net/api/";
const API = new useAPI(BASE_URL);

const getCases = async function(){
    const case1 = await API.get(`Cases/${id}`)
    console.log(case1)
    caseGetInfo (case1)
}

const caseGetInfo = function(oneCase){
    subject.innerText = oneCase.subject;
    email.innerText = oneCase.email;
    message.innerText = oneCase.message;
    created.innerText = oneCase.created;
    status.innerText = oneCase.status.statusName;
}


getCases()