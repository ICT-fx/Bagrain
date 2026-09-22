/**
 * Ligne de crête du sac détouré du hero (`public/img/sac-hero-capuche-repliee.webp`,
 * rendu « capuche repliée derrière la coque », plaque logo bleue centrée sur
 * la face haute et grande poche avant noire).
 *
 * 72 relevés du premier pixel opaque, en fraction de la hauteur de l'image ;
 * `1` signalerait une colonne vide. C'est ce profil qui arrête la pluie du
 * hero : l'abri sec a exactement la forme de la capuche, il n'y a aucun dôme
 * dessiné par-dessus. Une goutte est interceptée dès qu'elle passe sous cette
 * ligne — tout ce qui est en dessous du sac reste donc sec, comme sous un
 * vrai auvent.
 *
 * À régénérer si l'image change : premier pixel opaque (alpha > 0,5) de
 * chaque colonne, relevé par bandes de 1/72e de largeur.
 */
export const BAG_TOP_EDGE = [
  0.249, 0.205, 0.18, 0.16, 0.145, 0.123, 0.102, 0.085, 0.071, 0.061, 0.052,
  0.044, 0.038, 0.032, 0.028, 0.024, 0.02, 0.018, 0.016, 0.015, 0.013, 0.011,
  0.01, 0.009, 0.008, 0.007, 0.006, 0.006, 0.005, 0.004, 0.004, 0.003, 0.003,
  0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.003, 0.003, 0.004,
  0.005, 0.006, 0.007, 0.007, 0.009, 0.01, 0.011, 0.013, 0.015, 0.016, 0.018,
  0.02, 0.024, 0.028, 0.033, 0.038, 0.044, 0.052, 0.06, 0.07, 0.084, 0.101,
  0.121, 0.139, 0.157, 0.176, 0.2, 0.241,
];

/** Dimensions natives du fichier détouré. */
export const BAG_IMAGE = { width: 943, height: 1223 };
