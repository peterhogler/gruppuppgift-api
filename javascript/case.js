import useAPI from "./useAPI.js";
const subject = document.querySelector("#subject")
const email = document.querySelector("#email")
const message = document.querySelector("#message")
const created = document.querySelector("#created")
const status = document.querySelector("#status")
const commentList = document.querySelector("#comments-post")
const dropDown = document.querySelector('select[name=caseStatus]')

const id = new URLSearchParams(window.location.search).get("id");

const BASE_URL = "https://fnd22-shared.azurewebsites.net/api/";
const API = new useAPI(BASE_URL);

const getCases = async function(){
    const case1 = await API.get(`Cases/${id}`)
    
    caseGetInfo (case1)

    getComments(case1.comments)

    console.log(case1)
    
}

const getComments = (caseComments) => { 
    commentList.innerHTML = ""
    console.log(caseComments)
    caseComments.forEach(function (comment) {
        console.log(comment.message)
        commentList.insertAdjacentHTML("beforeend", `<li class="card mb-3 p-2">
        ${comment.message} <br>
        ${comment.email} <br>
        ${comment.created} 
        </li>`)
        

    })
}


const caseGetInfo = function(oneCase){
    subject.innerText = oneCase.subject;
    email.innerText = oneCase.email;
    message.innerText = oneCase.message;
    created.innerText = oneCase.created;
    status.innerText = oneCase.status.statusName;
}

const form = document.getElementById("comment-form")

form.addEventListener("submit", async function(e){
    e.preventDefault()

    const comment = document.getElementById("comment").value
    const email = document.getElementById("email-comment").value

    const newComment = {caseId: id, email: email, message: comment}
    
    const respone = await API.post("Comments", newComment)

   
    getCases()
})

dropDown.addEventListener('change', async (e) => {
console.log(dropDown.value)

const statusObject = {
    id: id,
    statusId: dropDown.value
}
const response = await API.put(`Cases/${id}`, statusObject)
getCases()

})

getCases()

