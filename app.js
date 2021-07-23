// ------------------------------------------
// VARIABLES
// ------------------------------------------
// inputs des colors
const allInputColors = document.querySelectorAll('.inp-color');
const divColors = document.querySelector('.text-colors-group');
// controls
const range = document.querySelector('.range');
const allButtons = document.querySelectorAll('.btn-group button');
const btnPlus = document.querySelector('.btn-group button:first-child');
const btnMoins = document.querySelector('.btn-group button:nth-child(2)');
const btnRandom = document.querySelector('.btn-group button:nth-child(3)');
const btnCopy = document.querySelector('.btn-group button:nth-child(4)');
const resetBtn = document.querySelector('.btn-group button:last-child');
// aperçu du résultat
const apercu = document.querySelector('.apercu');

// messages
const successSpan = document.querySelector('.success-message');
const errorSpan = document.querySelector('.error-message');

// variables d'initialisation
let colors = ['#BA5370', '#F4E2D8'];
let index = 3;
let inclinaison = 50;
// ------------------------------------------
// FONCTIONS
// ------------------------------------------
let regColorHex = /^\#[a-zA-Z0-9]{3,6}/;

// eventListener est accessible de partout et doit êtr emis au début
range.addEventListener('input', (e) => {
    // la range va de 0 à 100 et les degrés d'inclinaison vont -> 360° => on doit donc multiplier par 3.6 la valeur du range
    inclinaison = e.target.value*3.6;
    // console.log(inclinaison);
    // quand on retourne un array js avec ${} => il est transformé en string avec une , en séparateur. On peut sonc utiliser directement ${colors} dans notre linear-gradient
    // console.log(`${colors}`);
    apercu.style.background = `linear-gradient(${inclinaison}deg, ${colors})`;
    copyPaste(`linear-gradient(${inclinaison}deg, ${colors})`);
});

// ACCUEIL
function welcomeScreen(){
    let colors = ['#BA5370', '#F4E2D8'];
    let inclinaison = 50;
// ------------------------------------------
// INITIALISATION DE L'ACCUEIL
// ------------------------------------------
    allInputColors[0].value = colors[0];
    allInputColors[1].value = colors[1];
    allInputColors[0].style.background = colors[0];
    allInputColors[1].style.background = colors[1];

    allInputColors.forEach(inpColor => {
        inpColor.addEventListener('input', updateColors);
    });
    apercu.style.background = `linear-gradient(${inclinaison}deg, ${colors})`;
    copyPaste(`linear-gradient(${inclinaison}deg, ${colors})`);
}

// AJOUTER / SUPPRIMER DES COULEURS 

function addRemoveColor(e){
    let allInputs = document.querySelectorAll('.inp-color');
    // couleur aléatoire en HEXADECIMAL
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
     // il faut recréer une nouvelle const allInputColors à chaque fois pour toujours avoir tous les inputs
    
    if(e.target === btnPlus){
        
        if(allInputs.length > 4){
            return;
        }
        if(index === 5){
            return;
        }
        inputColor = document.createElement('input');
        inputColor.setAttribute('class', 'inp-color');
        inputColor.setAttribute('maxlength', 7);
        inputColor.setAttribute('data-index', index);
        inputColor.value = `#${randomColor}`.toUpperCase();
        inputColor.style.backgroundColor = `#${randomColor}`;
        divColors.appendChild(inputColor);
        colors.push(`#${randomColor}`);
        index++;
        apercu.style.background = `linear-gradient(${inclinaison}deg, ${colors})`;
        // copier/coller
        copyPaste(`linear-gradient(${inclinaison}deg, ${colors})`); 
       
    } else if(e.target === btnMoins){
        if(colors.length === 2){
            // affichage du message d'erreur
            displayMessages(errorSpan, "2 couleurs minimum");
        }else {
            colors.pop();
            divColors.removeChild(divColors.lastChild);
            index--;
            apercu.style.background = `linear-gradient(${inclinaison}deg, ${colors})`;
            // copier/coller
            copyPaste(`linear-gradient(${inclinaison}deg, ${colors})`);
        }
    } 
    allInputs = document.querySelectorAll('.inp-color');
    allInputs.forEach(inp => {
        inp.addEventListener('input', updateColors);
    });
    // console.log(allInputs);  
}

// UTILISER SES PROPRES COULEURS
function updateColors(e){
    let currentIndex = e.target.getAttribute('data-index');
    e.target.value = e.target.value.toUpperCase();
    colors[currentIndex - 1] = e.target.value;
    e.target.style.background = colors[currentIndex - 1];
    apercu.style.background = `linear-gradient(${inclinaison}deg, ${colors})`;
    copyPaste(`linear-gradient(${inclinaison}deg, ${colors})`);
}

// COPIER/COLLER utilisée pour btnCopy

function copyPaste(lineargradient){
    const copiedText = `background: ${lineargradient};`;

    btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(copiedText).then(() => {
            /* clipboard successfully set */
            // on change l'apparence du texte pour montrer qu'il a été copié :
            btnCopy.style.backgroundColor = "#22D555";
            setTimeout(()=> {
                btnCopy.style.backgroundColor = "white";
            }, 1000);
            // affichage du message de succès
            displayMessages(successSpan, "GRADIENT copié aves succès !");
        }, () => {
            /* clipboard failed set */
           displayMessages(errorSpan, 'Le copier/coller a échoué');
        });
    })
}

// AFFICHER LES MESSAGES ERREUR / SUCCESS dans btnMoins et copyPaste()

function displayMessages(selector,text){
    if(selector === successSpan){
        selector.innerText = text;
        selector.style.display = "block";
        setTimeout(() => selector.style.display = "none", 1000);
    }else if(selector === errorSpan){
        selector.innerText = text;
        selector.style.display = "block";
        setTimeout(() => selector.style.display = "none", 1000);
    }
}

// ------------------------------------------
// EVENTLISTENERS
// ------------------------------------------

// GESTION DU CLIC DES BOUTONS
allButtons.forEach(button => {
    button.addEventListener('click', addRemoveColor);
});

// GENERER TOUTES LES COULEURS ALEATOIRES
btnRandom.addEventListener('click', () => {
    range.disabled = true;
    const allInputColors = document.querySelectorAll('.inp-color');
    const colors = [];
    allInputColors.forEach(inputColor => {
        // couleur aléatoire en HEXADECIMAL
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        inputColor.value = `#${randomColor}`.toUpperCase();
        inputColor.style.backgroundColor = `#${randomColor}`;
        colors.push(`#${randomColor}`);
    });
    range.value = (Math.floor(Math.random()*101));
    inclinaison = range.value * 3.6;
    apercu.style.background = `linear-gradient(${inclinaison}deg, ${colors})`;
    // copier/coller
    copyPaste(`linear-gradient(${inclinaison}deg, ${colors})`);
    
});

// RESET INPUT
resetBtn.addEventListener('click',() => {
        document.location.reload();
});
// ------------------------------------------
// MAIN
// ------------------------------------------
welcomeScreen();
