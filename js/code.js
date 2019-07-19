// ============>  SCROLL TO

const services = document.querySelector('#services');
const contact = document.querySelector('#contact');

const sectionServices = document.querySelector('.services');
const sectionContact = document.querySelector('footer');

function scrollTo(element, e) {
  e.preventDefault();
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.getBoundingClientRect().top - 50 + window.scrollY
  });
}

services.addEventListener('click', (e) => scrollTo(sectionServices, e));
contact.addEventListener('click', (e) => scrollTo(sectionContact, e));

// ============> IMG TO HEADER

const headerBgc = document.querySelectorAll('header');
headerBgc.forEach(head =>{
head.style.backgroundImage = `url("./img/headerBGC.png")`;
})

// ============> IMG TO SERVICES

const tabOfImg = ['img/odzywienie.jpg', 'img/hybrydy.jpg', 'img/relaks.jpg', 'img/sciananie.jpg', 'img/odzywieniewlosow.jpg',
  'img/farbowanie.jpg',
  'img/weselny.jpg',
  'img/przedluzanie.jpg',
  'img/brwi.jpg'
];

const nodeListOfImage = document.querySelectorAll('.image');

nodeListOfImage.forEach((img, index) => {
  img.style.backgroundImage = `url('${tabOfImg[index]}')`;

})

//---> ANIMATION ON IMG
const pricesServices = [120, 100, 150, 60, 150, 120, 100, 50, 30];

for (let i = 0; i < nodeListOfImage.length; i++) {
  nodeListOfImage[i].setAttribute('data-title', `${pricesServices[i]}zł`)
}

// ============> POPUPS

// ============> SALES

const btnSales = document.querySelector('#salesBtn');
const sales = document.querySelector('#sales');
const close = document.querySelector('span.close');


btnSales.addEventListener("click", () => sales.style.display = "block");
close.addEventListener("click", () => sales.style.display = "none");

window.onclick = function (event) {
  if (event.target == sales) {
    sales.style.display = "none";
  }
}

// ============> RESERVATION


const btnReservation = document.querySelector('#reservationBtn');
const reservation = document.querySelector('#reservation');
const closeRes = document.querySelector('span.closeRes');


btnReservation.addEventListener("click", () => reservation.style.display = "block");

closeRes.addEventListener("click", () => {
  let r = confirm("Czy na pewno chcesz wyjść z rezerwacji usługi?");
  if(r){
    reservation.style.display = "none"
  } else {
    return;
  }
});

const tabOfServices = ['Odżywienie paznokci', 'Hybrydy', 'Relaks dłoni', 'Strzyżenie', 'Odżywienie włosów', 'Farbowanie', 'Makijaż weselny', 'Przedłużanie rzęs', 'Wyrównywanie brwi'];

const serviceToChoose = document.querySelector("#serviceToChoose");

for (let i = 0; i < tabOfServices.length; i++) {
  const option = document.createElement('option')
  let valueText = tabOfServices[i];
  option.value = valueText;
  option.textContent = valueText;
  serviceToChoose.appendChild(option);
}

// ============> SHOW DATA FROM FORM
const form = document.querySelector('form');
const reg = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{3,}$/g;

let errors = [];
let nameValid = false;
let surnameValid = false;
let phoneValid = false;

let mesName;
let mesSurname;
let mesPhone;
let ifCode;

// ====> validate of name

const minSize = 3;
const maxSize = 15;

const validateName = () => {

  const nameValue = document.querySelector("#name").value;

  if (!nameValue.length) {
    return errors.push('Nie wpisałeś żadnej wartości w pole Imię.');
  } else if (nameValue.length < minSize) {
    return errors.push('Imię jest za krótkie (min. 3 znaki).');
  } else if (nameValue.length > maxSize) {
    return errors.push('Imię jest za długie (max 15. znaków).');
  } else if (!reg.test(nameValue)) {
    return errors.push('Co to za dziwne imię?');
  } else {
    mesName = `${nameValue}`;
    nameValid = true;
  }
}

// ====> validate of surname

const validateSurname = () => {

  const surnameValue = document.querySelector('#surname').value;
  const regSur = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźżŻ]{3,}$/g;

  if (!surnameValue.length) {
    return errors.push('Nie wpisałeś żadnej wartości w pole Nazwisko.)');
  } else if (surnameValue.length < minSize) {
    return errors.push('Nazwisko jest za krótkie (min. 3 znaki).');
  } else if (surnameValue.length > maxSize) {
    return errors.push('Nazwisko jest za długie (max. 15 znaków).');
  } else if (!regSur.test(surnameValue)) {
    return errors.push('Co to za dziwne nazwisko?');
  } else {
    surnameValid = true;
    mesSurname = ` ${surnameValue}`;
  }

}

// ====> validate of phone number

const validatePhone = () => {
  const phoneValue = document.querySelector('#phone').value;
  let size = 9;

  if (!phoneValue.length) {
    return errors.push('Nie wpisałeś żadnej wartości w pole: Numer telefonu.)');
  } else if (phoneValue.length !== size) {
    return errors.push('Numer jest za krótki lub za długi (9 znaków).');
  } else {
    phoneValid = true;
    mesPhone = `, twój numer to: ${phoneValue}. `;
  }
}

// ====> validate of dscount code 

const validateCode = () => {

  const codeDisc = document.querySelector('#codeDisc').value;
  const sizeCode = 15;

  if (codeDisc.length !== sizeCode && codeDisc > 0) {
    ifCode ='Kod jest błedny - nie masz zniżki';
  } else if (codeDisc.length == sizeCode) {
    ifCode = ` Otrzymałeś zniżkę 30%`;
  } else {
    ifCode = "";
  }
}

//====> RESET ALL INPUTS
const resetAll = () => {
  form.reset();
  message = "";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  validateName();
  validateSurname();
  validatePhone();
  validateCode();

  //====> other values without validate 
  const selectValue = document.querySelector('#serviceToChoose').value;
  let mesSel = `Wybrano usługę: ${selectValue}`;

  const dateValue = document.querySelector('#formDate').value;
  let mesDate = `, która odbędzie się:  ${dateValue}. Do zobaczenia!`;

   //====> to show values from form
  const comunicat = document.querySelector('#comunicat');
  let message = "";
  message += mesName + mesSurname + mesPhone + mesSel + mesDate + ifCode;


  if (nameValid && surnameValid && phoneValid) {
    comunicat.textContent = message;
    resetAll();
  } else {
    comunicat.textContent = `${errors.join("\n \n")}`;
    errors = [];
  }

});



// ============> NAV FOR MOBILE

const ham = document.querySelector('.ham');
const nav = document.querySelector('#nav');
const divLinks = document.querySelectorAll('div.links a');
// const bgcNav = document.querySelector('.bgcNav');

const addOrDelete = () => {
  nav.classList.toggle('active');
  bgcNav.classList.toggle('active'); 
}

divLinks.forEach(el => {
  el.addEventListener('click', addOrDelete)
});



ham.addEventListener('click', addOrDelete);

// ============> CODE GENERATOR

const generator = document.querySelector('#generator');
const discountCode = document.querySelector("#discountCode");
const chars = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbn';
const charsNumber = 12;

const randomCode = () => {
  generator.disabled = true;
  let code = "";
  for (let i = 0; i < charsNumber; i++) {
    const index = Math.floor(Math.random() * 61);
    code += chars[index];
  }
  discountCode.textContent = code;
}

generator.addEventListener('click', randomCode);


