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



// move back and forth between employee detail windows when the modal window is open.


const prev = document.querySelector('.prev')
const next = document.querySelector('.next')

let currentSlide = 0;

next.addEventListener('click', () => {
    changeSlide(currentSlide + 1)
    
});
prev.addEventListener('click', () => {
    changeSlide(currentSlide - 1 )
    
});

function changeSlide(move) {
    if(move >= modalContainer.length) {
        move = 0;
    } if (move < 0 ) {
        move = modalContainer.length - 1 ;
    }
    currentSlide = move;
}
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





