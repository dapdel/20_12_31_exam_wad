import './styles.scss';
import { vaccins } from './src/data';

let commandes = [];
let prixTotal = 0;
// création de la structure de la page
document.querySelector('#app').innerHTML = `<h1>Covid Killer</h1>
                                            <header>
                                                <button class="triParPrix">Classement des vaccins par prix</button>
                                                <button class="btnNonApp">Cacher les vaccins non-approuvés</button>
                                            </header>
                                            <main>
                                            </main>
                                            <footer>
                                                <h2>Réservations</h2>
                                                <div class="commandeVaccins">
                                                </div>
                                                <div>
                                                  <button class="btnCommander">passer la commande</button>
                                                  <button class="btnAnnuler">annuler la commande</button>
                                                </div>
                                            </footer>`;

// FCT de REALISATION du MAIN

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
                <p>Prix unitaire: ${arr.prix_unitaire}$</p>
                <p>Approuvé: ${arr.approuve}</p>
                <div class="bas">
                    <input type="number" id="quantity${arr.id}" name="quantity" min="1" max="${arr.quantite}"/>
                    <button id=${arr.id} class="reserve">réserver</button>
                </div>
            </div>
            </div>`;
  }
  html += '</section>';
  document.querySelector('main').innerHTML = html;
}
renderMain(vaccins);

// TRI par ordre de PRIX

const triParPrix = document.querySelector('.triParPrix');
triParPrix.addEventListener('click', () => {
  const vaccinsTriPrix = vaccins.sort((a, b) => a.prix_unitaire - b.prix_unitaire);
  renderMain(vaccinsTriPrix);
});

// BOUTONS du footer en DISABLED

const btnCommander = document.querySelector('.btnCommander');
btnCommander.disabled = true;
const btnAnnuler = document.querySelector('.btnAnnuler');
btnAnnuler.disabled = true;

// FCT de realisation des COMMANDES dans le FOOTER

const commandeVaccins = document.querySelector('.commandeVaccins');
function renderCommandes(array) {
  let htmlCommandes = '';
  for (const arr of array) {
    htmlCommandes += `<div class="reservation">
                        <h3>${arr.nom}</h3>
                        <p><b>Quantité:</b> ${arr.nombre}</p>
                        <p><b>Prix:</b> ${arr.prix_total}$</p>
                      </div>`;
  }
  if (prixTotal !== 0) {
    htmlCommandes += `<h4>Prix total: ${prixTotal}$</h4>`;
  }
  commandeVaccins.innerHTML = htmlCommandes;
}

// TRI vaccins APPROUVES ou pas
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
    const elmtId = e.currentTarget.id;
    const input = document.querySelector(`#quantity${elmtId}`).value;
    // if (input <= vaccins[elmtId - 1].quantite) {
    // calcul du prix
    const prixUnitaire = vaccins[elmtId - 1].prix_unitaire;
    const prixVaccin = (prixUnitaire * input);
    prixTotal += prixVaccin;
    // mise dans commandes
    commandes.push({
      id: `${elmtId}`, nom: `${vaccins[elmtId - 1].nom}`, nombre: `${input}`, prix_total: `${prixVaccin}`,
    });
    // et faire afficher dans footer
    renderCommandes(commandes);
    e.currentTarget.disabled = true;
    document.querySelector(`#quantity${elmtId}`).style.visibility = 'hidden';
    btnCommander.disabled = false;
    btnAnnuler.disabled = false;
    // } else {
    // eslint-disable-next-line no-alert
    // alert('Pas de stock disponible pour cette quantité là');
    // }
  });
}

// PASSER COMMANDES

btnCommander.addEventListener('click', () => {
  document.querySelector('main').innerHTML = `<p>La commande a bien été enregistrée...</p>
                                              <button class="btnComSup">Vers une commande supplémentaire</button>
                                              <button><a href="recapitulatif.html">Vers le récapitulatif de ma commande</a></button>`;
  document.querySelector('header').style.display = 'none';
  document.querySelector('footer').style.display = 'none';
  // modifications de la base de données vaccins
  for (const commande of commandes) {
    vaccins[commande.id - 1].quantite = vaccins[commande.id - 1].quantite - commande.nombre;
  }
  // revenir à la page avec modifications visibles
  const btnComSup = document.querySelector('.btnComSup');
  btnComSup.addEventListener('click', () => {
    renderMain(vaccins);
    document.querySelector('header').style.display = 'block';
    document.querySelector('footer').style.display = 'block';
    commandes = [];
    commandeVaccins.innerHTML = '';
  });
});

// Annuler COMMANDES

btnAnnuler.addEventListener('click', () => {
  renderMain(vaccins);
  commandes = [];
  commandeVaccins.innerHTML = '';
  btnCommander.disabled = true;
  btnAnnuler.disabled = true;
});
