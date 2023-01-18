import useAPI from "./useAPI.js";

const listCases = document.querySelector("#list");
const form = document.querySelector("form");

const BASE_URL = "https://fnd22-shared.azurewebsites.net/api/";

const API = new useAPI(BASE_URL);
const fetchCases = async () => {
    listCases.innerHTML = "";
    const cases = await API.get("Cases");
    const sortedCases = cases.sort((a, b) => new Date(b.created) - new Date(a.created));
    sortedCases.forEach(function (apiCase) {
        listCases.insertAdjacentElement("beforeend", createCaseElement(apiCase));
    });
};

const createCaseElement = (apiCase) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const cardBodyElement = document.createElement("div");
    cardBodyElement.classList.add("card-body");

    const cardTitleElement = document.createElement("h5");
    cardTitleElement.classList.add("card-title");
    cardTitleElement.innerText = `Rubrik: ${apiCase.subject}`;

    const cardEmailElement = document.createElement("h6");
    cardEmailElement.classList.add("card-text");
    cardEmailElement.innerText = `Email: ${apiCase.email}`;

    const paragraphCreatedElement = document.createElement("p");
    paragraphCreatedElement.classList.add("card-footer");
    paragraphCreatedElement.innerText = `Email: ${apiCase.email}`;

    const paragraphStatusElement = document.createElement("p");
    paragraphStatusElement.classList.add("card-footer");
    paragraphStatusElement.innerText = `Skapad: ${apiCase.status.statusName}`;

    const buttonElement = document.createElement("a");
    buttonElement.classList.add("btn");
    buttonElement.classList.add("btn-primary");
    buttonElement.innerText = "Go to case";

    cardElement.appendChild(cardBodyElement);
    cardBodyElement.appendChild(cardTitleElement);
    cardBodyElement.appendChild(cardEmailElement);
    cardBodyElement.appendChild(paragraphCreatedElement);
    cardBodyElement.appendChild(paragraphStatusElement);
    cardBodyElement.appendChild(buttonElement);

    buttonElement.addEventListener("click", () => {
        window.location.href = "cases/?id=" + apiCase.id;
    });

    return cardElement;
};


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get("email");
    const title = formData.get("title");
    const message = formData.get("message");

    const newCase = { email: email, subject: title, message: message };
    const currentDate = new Date();
    const currentDateFormat = `${currentDate.toJSON()}${currentDate.getUTCMilliseconds()}`;

    const response = await API.post("Cases", newCase);
    console.log(response);

    const modfiedCase = { ...newCase, id: response, created: currentDateFormat };
    console.log(modfiedCase);

    fetchCases();
});

fetchCases();
