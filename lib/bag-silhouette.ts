/**
 * Ligne de crête du sac détouré du hero (`public/img/sac-face-avant.webp`).
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
  0.096, 0.071, 0.055, 0.045, 0.039, 0.033, 0.029, 0.025, 0.022, 0.019, 0.018,
  0.016, 0.015, 0.013, 0.012, 0.011, 0.01, 0.008, 0.007, 0.007, 0.006, 0.006,
  0.006, 0.005, 0.005, 0.004, 0.004, 0.003, 0.003, 0.003, 0.003, 0.002, 0.002,
  0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.003, 0.003,
  0.003, 0.004, 0.004, 0.004, 0.005, 0.005, 0.006, 0.006, 0.006, 0.007, 0.008,
  0.009, 0.01, 0.011, 0.013, 0.014, 0.016, 0.018, 0.02, 0.022, 0.025, 0.029,
  0.033, 0.039, 0.045, 0.055, 0.069, 0.093,
];

/** Dimensions natives du fichier détouré. */
export const BAG_IMAGE = { width: 654, height: 1077 };
