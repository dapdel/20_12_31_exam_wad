Difficultés rencontrées :

CSS
J’ai voulu mettere les photos en background-image au début, mais je nai jamais réussi à trouver le lien vers mes images…  Pq ? J’ai pourtant tout essayé au niveau du lien en ayant donnée une taille en largeur et en hauteur à mon image (la cadre était lui bien visible):
D’abord :
<div class="image" style="background-image: url(`./static/${vaccin.image}`)"></div>
Puis:
<div class="image" style="background-image: url(`${vaccin.image}`)"></div>
Puis:
<div class="image" style="background-image: url(`../static/${vaccin.image}`)"></div>
Puis:
<div class="image" style="background-image: url(`static/${vaccin.image}`)"></div>
Puis:
<div class="image" style="background-image: url(`i3-wad20-epreuve-js/static/${vaccin.image}`)"></div>
… dans ma console, cela se présentait bien (donc pas de problèmes de « ,’ ‘ ou autre) mais RIEN n’a fonctionné… PQ ?

JS
Après l’annulation de commande … Plus possible de refaire ue commande… PQ ?
Après le tri par ordre de prix ou par approuvés… Plus possible de refaire ue commande …PQ ?
PQ est ce que la direction vers ma page recapitulatif.html me mène vers ma page principale au lieu d’être vide… je n’ai pourtant rien dans cet html ? PQ ?
Si je décommente les lignes 108, 123-126 pour limiter les rentrées d’input, c’est la porte ouverte au bugs… parfois ma conditions fonctionne mais souvent non… de manière tout à fait aléatoire (à mes yeux). Je ne vois pas la logique et cela me semble fort capricieux… très bizarre… PQ ?
