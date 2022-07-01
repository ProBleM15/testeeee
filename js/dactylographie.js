class typeWriting {

  constructor(element) {
    this.element = element; // Sélecteur
    this.words = JSON.parse(element.getAttribute('data-words')); // Mots d'entrée
    this.speed = parseInt(element.getAttribute('data-speed'), 10) || 100; // retirer 100 ms
    this.delay = parseInt(element.getAttribute('data-delay'), 10) || 1000; // retirer 1000 ms
    this.loop = element.getAttribute('data-loop');
    this.char = ''; // lettres de mot
    this.counter = 0; // compteur de boucle
    this.isDeleting = false; // vérifier lors de la suppression de lettres
    this.type(); // Méthode de frappe
  }

  type() {
    // Définir l'index des mots
    const index = this.loop === 'yes' ? this.counter % this.words.length : this.counter;
    // Obtenez le mot complet
    const fullWord = this.words[index];
    // vitesse de frappe
    let typeSpeed = this.speed;

    if (this.isDeleting) {
      // Diviser la vitesse par 2
      typeSpeed /= 2;
      // Ajouter des caractères
      this.char = fullWord.substring(0, this.char.length - 1);
    } else {
      // Suprimer des caractères
      this.char = fullWord.substring(0, this.char.length + 1);
    }
    // Affichage sur DOM
    this.element.innerHTML = `<span class="write">${this.char}</span><span class="blinking-cursor">|</span>`;
    // Lorsque le mot est terminé
    if (!this.isDeleting && this.char === fullWord) {
      // Rompre la boucle avant la suppression
      if (this.loop === "no" && this.counter >= this.words.length - 1) {
        return;
      }
      // Définissez la suppression de caractères sur true
      this.isDeleting = true;
      // Définir le délai avant le nouveau mot
      typeSpeed = this.delay;
    } else if (this.isDeleting && this.char === '') {
      this.isDeleting = false;
      // Passer au mot suivant
      this.counter++;
    }
    // Délai d'attente
    setTimeout(() => this.type(), typeSpeed);

  }

}

// Appelez la classe sur DOMContentLoaded
document.addEventListener('DOMContentLoaded', init)
// Sélectionnez tous les éléments et déclenchez la classe
function init() {
  document.querySelectorAll('.typewrite').forEach(e => new typeWriting(e));
}
