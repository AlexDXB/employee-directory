// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
 
// fetch data from API

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;

    let employeeHTML = " ";

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;


    employeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
        `
    });
gridContainer.innerHTML = employeeHTML;


}

function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { 
        name, 
        dob, 
        phone, 
        email, 
        location: { city, street, state, postcode},
        picture 
    } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <a class="prev">&#10094;</a>
    <a class="next">&#10095;</a>
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.number}, ${street.name}, ${state} ${postcode}</p>
            <p>Birthday:
                ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;

                // move back and forth between employee detail windows


    let empCards = employees.indexOf(employees[index]);
    function nextCard() {
        if (empCards < 12 ) {
            displayModal((empCards += 1))
        }
    }
    function prevCard() {
        if (empCards > 0) {
            displayModal((empCards -= 1));
        }
    }


    let prev = document.querySelector('.prev')
    let next = document.querySelector('.next')

    next.addEventListener('click', nextCard);
    prev.addEventListener('click', prevCard);

}

gridContainer.addEventListener('click', e => {
            // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
            // select the card element based on its proximity to actual element clicked
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});

                        // search for user 
function searchUsers() {
    let input = document.getElementById('search').value.toLowerCase();
    let users = document.getElementsByClassName('name');
    let card = document.getElementsByClassName('card');
    for (let i = 0; i < users.length; i++) {
        if (users[i].innerHTML.toLowerCase().includes(input) === false) {
            card[i].style.display = "none";
        }
        else {
            card[i].style.display = "";
        }
    }
}