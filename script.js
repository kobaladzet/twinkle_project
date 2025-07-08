const startBtn = document.querySelector('.startbtn');
const dialogBox = document.getElementById('dialog-box');
const nextBtn = document.getElementById('next-btn');
const cancelBtn = document.getElementById('cancel-btn');
const dialogBox2 = document.getElementById('dialog-box2');
const cancelBtn2 = document.getElementById('cancel-btn2');
const nextBtn2 = document.getElementById('next-btn2');
const dialogBox3 = document.getElementById('dialog-box3');
const cancelBtn3 = document.getElementById('cancel-btn3');
const nextBtn3 = document.getElementById('next-btn3');

let data;
const url = "https://tarotapi.dev/api/v1/cards/random?n=3";

const signdivs = document.querySelectorAll('.zodiacs>div');
let selecteddiv;
let selectedSign = ""; 

signdivs.forEach(signdiv => {
  signdiv.addEventListener("click", () => {
      const span = signdiv.querySelector('span');
      console.log(span.textContent);
      
      if (selecteddiv) {
        selecteddiv.classList.remove('selected');
      }
      signdiv.classList.add('selected');
      selecteddiv = signdiv;
      selectedSign = span.textContent.trim().split(' ').pop(); 
      
  })
  
})



let dataSun; 
let dataMoon;
let dataRising;

const cardTexts = document.querySelectorAll('.card-text');

const suntext = document.getElementById('sun-text');
const moontext = document.getElementById('moon-text');
const risingtext = document.getElementById('rising-text');

window.addEventListener("DOMContentLoaded", () => {
  
  fetch(url).then( (response) => response.json()).then( (response) => {
    data = response.cards;
    cardTexts[0].innerHTML = `${data[0].name} <br/> <br/> <br/> ${data[0].meaning_up} <br/> <br/>  ${data[0].meaning_rev}`;
    cardTexts[1].innerHTML = `${data[1].name} <br/> <br/> <br/> ${data[1].meaning_up} <br/> <br/>  ${data[1].meaning_rev}`;
    cardTexts[2].innerHTML = `${data[2].name} <br/> <br/> <br/> ${data[2].meaning_up} <br/> <br/>  ${data[2].meaning_rev}`;
 
  });

  
  fetch("zodiac_traits.json").then((response) => response.json()).then((data) => {    
    nextBtn.addEventListener('click', () => {
      dataSun = data.sun[selectedSign]; 
      suntext.innerHTML = `${dataSun.description}<br/><br/> ${'Your traits:'}<br/> ${dataSun.traits.join(", ")}  `;
    });
    nextBtn2.addEventListener('click', () =>{
      dataMoon = data.moon[selectedSign];
      moontext.innerHTML = `${dataMoon.description}<br/><br/> ${'Your traits:'}<br/> ${dataMoon.traits.join(", ")}  `;
    })
    nextBtn3.addEventListener('click', () =>{
      dataRising = data.ascendant[selectedSign];
      risingtext.innerHTML = `${dataRising.description}<br/><br/> ${'Your traits:'}<br/> ${dataRising.traits.join(", ")}  `;
    })
  });



  const header = document.getElementById("header");
  header.style.position = "sticky";
  header.style.top = "0";
  header.style.zIndex = "1000";
});


const burger = document.getElementById('burger');
const sidebar = document.getElementById('sidebar');

burger.addEventListener('click', () => {
  sidebar.classList.toggle('active');

  if (sidebar.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
  

const wheel = document.querySelector('.wheel');
window.addEventListener('scroll', () => {
  const rotateValue = window.scrollY; 
  wheel.style.transform = `rotate(${rotateValue/4}deg)`;
});


const cards = ['card1-inner', 'card2-inner', 'card3-inner'];

cards.forEach(id => {
  const card = document.getElementById(id);
  const wrapper = card.parentElement; 

  card.addEventListener('click', () => {
    const isFlipped = card.classList.contains('flipped');

    if (isFlipped) {
      card.classList.remove('flipped');
      wrapper.style.zIndex = '1';

      cards.forEach(otherId => {
        const otherCard = document.getElementById(otherId);
        otherCard.style.pointerEvents = 'auto';
        otherCard.style.opacity = '1';
      });
    } else {
      cards.forEach(otherId => {
        const otherCard = document.getElementById(otherId);
        const otherWrapper = otherCard.parentElement;

        if (otherId !== id) {
          otherCard.classList.remove('flipped');
          otherCard.style.pointerEvents = 'none';
          otherCard.style.opacity = '0.5';
          otherWrapper.style.zIndex = '1'; 
        } else {
          otherWrapper.style.zIndex = '10'; 
        }
      });

      card.classList.add('flipped');
    }
  });
});






startBtn.addEventListener('click', () => {
  dialogBox.classList.remove('hidden');
});

cancelBtn.addEventListener('click', () => {
  dialogBox.classList.add('hidden');


});

nextBtn.addEventListener('click', () => {
  dialogBox.classList.add('hidden');
  dialogBox2.classList.remove('hidden');
});

cancelBtn2.addEventListener('click', () => {
  dialogBox2.classList.add('hidden');
});

nextBtn2.addEventListener('click', () =>{
 
  dialogBox2.classList.add('hidden');
  dialogBox3.classList.remove('hidden');
})
cancelBtn3.addEventListener('click', () => {
  dialogBox3.classList.add('hidden');
});
nextBtn3.addEventListener('click', () =>{
  dialogBox3.classList.add('hidden');
})
