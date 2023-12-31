//MODAL CONSTS
const openButton = document.querySelectorAll('[data-popup]');
const closeButton = document.querySelectorAll('[data-popup-close]');
const allPopups = document.querySelectorAll('.modal');
const modalBackdrop = document.querySelector('.backdrop');
const fixedElements = [].filter.call(document.all, e => getComputedStyle(e).position == 'fixed');
const body = document.querySelector('.body');
const popupBody = document.querySelectorAll('.popup__body');
const root = document.querySelector('.js-assets').value;
let bodyPadding = window.innerWidth - document.querySelector('.main').offsetWidth;

//SENDMAIL CONSTS
const forms = document.querySelectorAll('.form');
const inputs = document.querySelectorAll('input, textarea');
const agree = document.querySelectorAll('.agree');
const addErrorText = true;
const minSymbols = 3;
const pageUrlText = window.location.href;

let errorSymbols = 'Минимум символа!';
let errorEmptyInput = 'Заполните поле!';
let errorNameInput = 'Имя не может содержать цифры!';
let errorEmailInput = 'Не верный формат E-mail!';
let errorPhoneInput = 'Не верный формат телефона!';
let errorMinNumber = 'Максимальное значение';
let errorMaxNumber = 'Минимальное значение';
let defaultPopupInfo = [
  'request',
  'Отправить заявку',
  'Отправить заявку',
  'Заполните форму и наш менеджер <br />свяжется с вами в ближайшее время!',
  'Отправить',
];

if (pageUrlText.includes('en/')) {
  errorSymbols = 'Minimum characters!';
  errorEmptyInput = 'The field must not be empty!';
  errorNameInput = 'Name cannot contain digits!';
  errorEmailInput = 'Wrong E-mail format!';
  errorPhoneInput = 'Wrong phone format!';
  errorMinNumber = 'Maximum value';
  errorMaxNumber = 'Minimum value';
  defaultPopupInfo = ['request', 'Send request', 'Send request', 'Fill out the form and our <br />manager will contact you shortly!', 'Send'];
}
if (pageUrlText.includes('et/')) {
  errorSymbols = 'Vähemalt tähemärki!';
  errorEmptyInput = 'Täitke väli!';
  errorNameInput = 'Nimi ei tohi sisaldada numbreid!';
  errorEmailInput = 'Ebakorrektne E-mail vorming!';
  errorPhoneInput = 'Vale telefoni formaat!';
  errorMinNumber = 'Maksimaalne väärtus';
  errorMaxNumber = 'Minimaalne väärtus';
  defaultPopupInfo = ['request', 'Saada taotlus', 'Saada taotlus', 'Täitke vorm ja meie juht <br />võtab teiega peagi ühendust!', 'Saada'];
}

window.addEventListener('resize', scrollbarWidthModify);
popupBody.forEach(bodyPopup => {
  bodyPopup.addEventListener('click', e => {
    if (e.target.classList.contains('popup__body')) {
      popupClose();
      modalClose();
    }
  });
});

function scrollbarWidthModify() {
  bodyPadding = window.innerWidth - document.querySelector('.main').offsetWidth;
}

inputs.forEach(input => {
  let parentContainer = input.closest('.label');
  if (input.type === 'checkbox' || input.type === 'radio') {
    parentContainer = input.closest('.fieldset');
  }

  //INPUT CLEAR ON FOCUS
  input.addEventListener('focus', function () {
    const redInputs = parentContainer.querySelectorAll('.red');
    redInputs.forEach(redInput => {
      redInput.classList.remove('red');
      if (addErrorText == true && redInput.closest('.label').querySelector('.label__error') !== null) {
        redInput.closest('.label').querySelector('.label__error').classList.remove('active');
        setTimeout(function () {
          redInput.closest('.label').querySelector('.label__error').remove();
        }, 250);
      }
    });
  });

  //INPUT VALIDATE ON BLUR
  input.addEventListener('blur', function () {
    if (this.value !== '') {
      let inputChecker = checkForm(parentContainer);
      if (inputChecker === true) {
        this.classList.add('valid');
      }
    }
  });
});

//POLICY DISABLE
agree.forEach(policy => {
  policy.addEventListener('change', function () {
    let disabled = true;
    let agree = this.closest('.form').querySelectorAll('.agree');
    let agreeLength = agree.length;
    let agreeChecked = 0;
    agree.forEach(agree => {
      if (agree.checked) {
        agreeChecked++;
      }
    });
    if (agreeLength == agreeChecked) {
      disabled = false;
    }
    this.closest('.form').querySelector('[type=submit]').disabled = disabled;
  });
});

//FORMS SUBMIT
forms.forEach(form => {
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    let answer = checkForm(this);
    if (answer != false) {
      popup('loading');
      const formData = new FormData(this);
      jQuery.ajax({
        type: 'POST',
        processData: false,
        contentType: false,
        url: root + '/sendmail/send.php',
        data: formData,
        success: function () {
          setTimeout(function () {
            popup('ok');
            formsReset();
            // if (google_target != "") {
            //   ga("send", "event", "" + google_target, "" + google_target);
            // }
            // if (yandex_target != "") {
            //   yaCounterXXXXXXXXXXXXX.reachGoal("" + yandex_target);
            // }
          }, 2000);
        },
      });
    }
    return false;
  });
});

//FORMS VALIDATION
function checkForm(formId) {
  let checker = true;
  formId.querySelectorAll('[required]').forEach(required => {
    let requiredLabel = required.parentNode;
    let requiredInput = required;
    if (required.value.length === 0) {
      addError(requiredLabel, errorEmptyInput);
    } else {
      if (required.value.length < minSymbols && required.type !== 'number') {
        let minSymbolsErrorText = errorSymbols.split(' ');
        addError(requiredLabel, minSymbolsErrorText[0] + ' ' + minSymbols + ' ' + minSymbolsErrorText[1]);
      } else {
        //type Name
        if (required.name == 'name' && /[^A-zА-яЁё\+ ()\-]/.test(required.value)) {
          addError(requiredLabel, errorNameInput);
        }
        //type email
        if (required.type == 'email' && !/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(required.value)) {
          addError(requiredLabel, errorEmailInput);
        }
        //type tel
        if (required.type == 'tel' && /[^0-9\+ ()\-]/.test(required.value)) {
          addError(requiredLabel, errorPhoneInput);
        }
        //type number
        if (required.type == 'number') {
          if (required.min && Number(required.value) < Number(required.min)) {
            addError(requiredLabel, errorMinNumber + ' ' + required.min);
          }
          if (required.max && Number(required.value) > Number(required.max)) {
            addError(requiredLabel, errorMaxNumber + ' ' + required.max);
          }
        }
      }
    }
    //type checkbox
    if (required.type == 'checkbox' && !required.checked) {
      checkerFalse();
    }
    //type radio
    if (required.type == 'radio' && !required.checked) {
      const radioList = formId.querySelectorAll('[name="' + required.name + '"]');
      let isChecked = false;
      for (let i = 0; i < radioList.length; i++) {
        if (radioList[i].checked === true) {
          isChecked = true;
          break;
        }
      }
      if (isChecked === false) {
        checkerFalse();
      }
    }

    //ERROR TEXT CREATE
    function addError(correntLabel, text) {
      if (addErrorText === true) {
        let errors = correntLabel.querySelectorAll('.label__error').length;
        if (errors < 1) {
          correntLabel.insertAdjacentHTML('beforeend', '<div class="label__error">' + text + '</div>');
          setTimeout(function () {
            correntLabel.querySelector('.label__error').classList.add('active');
          }, 5);
        }
      }
      checkerFalse();
    }

    //ADD "RED" CLASS TO INPUTS
    function checkerFalse() {
      required.classList.add('red');
      checker = false;
    }
  });
  return checker;
}

//OLL FORMS RESET
function formsReset() {
  forms.forEach(form => {
    form.reset();
    form.querySelectorAll('.label__error').forEach(errors => {
      errors.classList.remove('active');
      setTimeout(function () {
        errors.remove();
      }, 250);
    });
    form.querySelectorAll('[required]').forEach(required => {
      required.classList.remove('red');
      required.classList.remove('valid');
    });
    if (form.querySelectorAll('.agree').length > 0) {
      form.querySelector('[type=submit]').disabled = true;
    }
  });
}

//MODAL OPEN BUTTON CLICK
openButton.forEach(btn => {
  btn.addEventListener('click', function (event) {
    event.preventDefault();
    let info = this.dataset.popup.split('|');
    popup(info[0], info[1], info[2], info[3], info[4]);
  });
});

//MODAL CLOSE BUTTON CLICK
closeButton.forEach(closeBtn => {
  closeBtn.addEventListener('click', modalClose);
});

//POPUP OPEN FUNCTION
function popup(id, subject, title, subtitle, btn) {
  if (id == 'request') {
    const popupSubject = document.querySelector('#request .subject');
    const popupTitle = document.querySelector('#request .popup-title');
    const popupSubtitle = document.querySelector('#request .popup-subtitle');
    const popupButton = document.querySelector('#request .button[type="submit"]');
    if (popupSubject !== null) {
      if (subject != undefined) {
        document.querySelector('#request .subject').value = subject;
      } else {
        document.querySelector('#request .subject').value = defaultPopupInfo[1];
      }
    }
    if (popupTitle !== null) {
      if (title != undefined) {
        document.querySelector('#request .popup-title').innerHTML = title;
      } else {
        document.querySelector('#request .popup-title').innerHTML = defaultPopupInfo[2];
      }
    }
    if (popupSubtitle !== null) {
      if (subtitle != undefined) {
        document.querySelector('#request .popup-subtitle').innerHTML = subtitle;
      } else {
        document.querySelector('#request .popup-subtitle').innerHTML = defaultPopupInfo[3];
      }
    }
    if (popupButton !== null) {
      if (btn != undefined) {
        document.querySelector('#request .button[type="submit"]').innerHTML = btn;
      } else {
        document.querySelector('#request .button[type="submit"]').innerHTML = defaultPopupInfo[4];
      }
    }
  }
  popupClose();
  if (modalBackdrop.classList.contains('is-hidden')) {
    modalBackdrop.classList.remove('is-hidden');
    scrollbarModify();
  }
  document.getElementById(id).classList.remove('is-hidden');
}

//POPUP CLOSE FUNCTION
function popupClose() {
  allPopups.forEach(popup => {
    popup.classList.add('is-hidden');
    setTimeout(function () {
      popup.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 300);
  });
}

//MODAL CLOSE FUNCTION
function modalClose() {
  popupClose();
  modalBackdrop.classList.add('is-hidden');
  setTimeout(function () {
    scrollbarModify();
    formsReset();
  }, 300);
}

//SCROLL BAR MODIFY
function scrollbarModify() {
  body.classList.toggle('lock');
  fixedElements.forEach(fixedElement => {
    if (body.classList.contains('lock')) {
      body.style.paddingRight = bodyPadding + 'px';
      fixedElement.style.paddingRight = bodyPadding + 'px';
    } else {
      body.style.paddingRight = '0px';
      fixedElement.style.paddingRight = '0px';
    }
  });
}
