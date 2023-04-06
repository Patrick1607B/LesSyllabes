const flag = document.querySelector("#flag_div").children;
const clavier = document.querySelector("#clavier").children;
const view = document.querySelector(".view");
const del = document.querySelector("#delete");
const flag1 = document.querySelector(".flag");
const sup = document.querySelector("#sup");

let langueData = [
  {
    name: "fr",
    color: "blue",
    img: "fr-bg.jpg",
  },
  {
    name: "de",
    color: "red",
    img: "de-bg.jpg",
  },
  {
    name: "pt",
    color: "yellow",
    img: "pt-bg.jpg",
  },
  {
    name: "es",
    color: "red",
    img: "sp-bg.jpg",
  },
  {
    name: "en",
    color: "pink",
    img: "en-bg.jpg",
  },
  {
    name: "it-IT",
    color: "black",
    img: "it-bg.jpg",
  },
  {
    name: "ja-JP",
    color: "green",
    img: "jp-bg.jpg",
  },
];
let langue = "";
//remise a zero ecran
del.addEventListener("click", function (e) {
  ecran.textContent = "";
});
//recuperation du clavier virtuel plus fonction voice
for (let i = 0; i < clavier.length; i++) {
  clavier[i].addEventListener("click", function (e) {
    const valeur = e.target.dataset.key;
    ajouterLettre(valeur);
  });
}
//changement de langue
for (let i = 0; i < flag.length; i++) {
  flag[i].addEventListener("click", function (e) {
    langue = e.target.dataset.key;
    const langueGet = langueData.find((x) => x.name == langue);
    console.log(langueGet);

    // if (langueGet.color) {
    //   document.body.style.backgroundColor = langueGet.color;

    // }

    if (langueGet.img) {
      document.body.style.backgroundImage = `url("/assets/img/${langueGet.img}")`;
    }
    // console.log(langue);
    let msg = new SpeechSynthesisUtterance();
    msg.lang = langue;
    console.log(msg.lang);
    msg.text = ecran.textContent.toLowerCase();
    window.speechSynthesis.speak(msg);
    [...flag].forEach((element) => {
      element.classList.remove("flag1");
    });
    flag[i].classList.add("flag1");
  });
}
//  lien vers les langues possible https://stackoverflow.com/questions/63019712/add-language-to-web-speech-api
// supprime dernier caractere entée
sup.addEventListener("click", function (e) {
  let efface = ecran.textContent;
  efface = efface.substring(0, efface.length - 1);
  ecran.textContent = efface.toUpperCase();
  // console.log(ecran.textContent);
});

const ajouterLettre = (lettre) => {
  ecran.textContent += lettre.toUpperCase();
  lireRobot(lettre);
};

const lireRobot = (lettre) => {
  let msg = new SpeechSynthesisUtterance();
  msg.lang = langue;
  msg.text = lettre;
  window.speechSynthesis.speak(msg);

  if (ecran.textContent.length > 1) {
    setTimeout(() => {
      let msg = new SpeechSynthesisUtterance();
      msg.lang = langue;
      msg.text = ecran.textContent.toLowerCase();
      window.speechSynthesis.speak(msg);
      view.classList.add("view1");
    }, 400);
    setTimeout(() => {
      view.classList.remove("view1");
    }, 90);
  }
};

//recuperation des touches du clavier physique
const tbDuClavier = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  " ",
];

document.addEventListener("keydown", (e) => {
  const valeur = e.key;
  if (tbDuClavier.includes(valeur)) {
    ajouterLettre(valeur);
    console.log(valeur, "valeur");
  } else {
    alert(
      'La touche " ' +
        valeur +
        " \" n'est pas une touche valide. Veuillez saisir seulement des touches de l'alphabet. "
    );
  }
});
