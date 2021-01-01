import './styles.scss';
import { vaccins } from './src/data';

const commandes = [];

document.querySelector('#app').innerHTML = `<h1>Covid Killer</h1>
                                            <header>
                                                <button>Classement des vaccins par prix</button>
                                                <button class="btnNonApp">Cacher les vaccins non-approuvés</button>
                                            </header>
                                            <main>
                                            </main>
                                            <footer>
                                                <div class="commandes">
                                                </div>
                                                <button class="commander">passer la commande</button>
                                            </footer>`;

// REALISATION du MAIN

function renderMain(array) {
  let html = '<section class="vaccins">';
  for (const arr of array) {
    html += `<div id="vaccin${arr.id}" class="vaccin">
            <img src="${arr.image}" alt="${arr.nom}" />
            <div>
                <h2 id="nom${arr.id}">${arr.nom}</h2>
                <p>Inventeur(s): ${arr.inventeurs}</p>
                <p>Lieu de production: ${arr.lieux_de_production}</p>
                <p>Technologie: ${arr.technologie}</p>
                <p>Quantité: ${arr.quantite}</p>
                <p>Prix unitaire: ${arr.prix_unitaire}</p>
                <p>Approuvé: ${arr.approuve}</p>
                <div>
                    <input type="number" id="quantity${arr.id}" name="quantity"/>
                    <button id=${arr.id} class="reserve">réserver</button>
                </div>
            </div>
            </div>`;
  }
  html += '</section>';
  document.querySelector('main').innerHTML = html;
}
renderMain(vaccins);

// REALISATION des commandes dans le Footer

function renderCommandes(array) {
  let htmlCommandes = '';
  for (const arr of array) {
    htmlCommandes += `<div>
    <h2>${arr.nom}</h2>
    <p>${arr.nombre}</p>
              </div>`;
  }
  document.querySelector('.commandes').innerHTML = htmlCommandes;
}
renderCommandes(commandes);

// voir vaccins APPROUVES ou pas
const btnNonApp = document.querySelector('.btnNonApp');
btnNonApp.addEventListener('click', () => {
  const vaccinsApprouve = [];
  if (btnNonApp.innerHTML === 'voir tous') {
    renderMain(vaccins);
    btnNonApp.innerHTML = 'Cacher les vaccins non-approuvés';
  } else {
    for (const vaccin of vaccins) {
      if (vaccin.approuve === 'oui') {
        vaccinsApprouve.push(vaccin);
      }
    }
    renderMain(vaccinsApprouve);
    btnNonApp.innerHTML = 'voir tous';
  }
});

// gestion des RESERVATIONS
const btnsReserve = document.querySelectorAll('.reserve');
for (const btnReserve of btnsReserve) {
  btnReserve.addEventListener('click', (e) => {
    console.log(e.currentTarget);
    const elmtId = e.currentTarget.id;
    const input = document.querySelector(`#quantity${elmtId}`).value;
    console.log(input);
    console.log(vaccins[elmtId - 1].nom);
    commandes.push({ nom: `${vaccins[elmtId - 1].nom}`, nombre: `${input}` });
    console.log(commandes);
    renderCommandes(commandes);
    e.currentTarget.disabled = true;
    document.querySelector(`#quantity${elmtId}`).style.visibility = 'hidden';
  });
}

// PASSER COMMANDES
const commander = document.querySelector('.commander');
commander.addEventListener('click', () => {
  console.log('cloc');
  document.querySelector('body').innerHTML = 'La commande a bien été enregistrée...';
});
