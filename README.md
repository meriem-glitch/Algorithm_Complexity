# Algorithm_Complexity

## 🚀 Description

Algorithm_Complexity est une application web interactive qui permet de comparer les performances de différents algorithmes (tri, recherche, etc.) sur des jeux de données variés. Elle mesure et affiche en temps réel la complexité observée (temps d’exécution, éventuellement mémoire) afin d’illustrer le lien entre la complexité théorique et les résultats pratiques.

---

## 📚 Fonctionnalités

- Sélection et exécution d’algorithmes classiques (tri à bulles, tri rapide, recherche linéaire, etc.)
- Génération automatique de jeux de données de tailles variables
- Mesure du temps d’exécution pour chaque algorithme
- Visualisation graphique des résultats (courbes taille vs temps)
- Explications sur la complexité théorique (O(n), O(n²), O(log n), …)
- Possibilité de soumettre un algorithme personnalisé (optionnel)
- Export des résultats (CSV ou image des graphiques) (optionnel)

---

## 🏗️ Technologies utilisées

- **Frontend** : React (ou Vue/Angular), Chart.js/D3.js
- **Backend** : Node.js (Express) ou Flask (optionnel)
- **Déploiement** : Netlify, Vercel, Heroku

---

## 🛠️ Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/meriem-glitch/Algorithm_Complexity.git
   cd Algorithm_Complexity
   ```

2. **Installer les dépendances**
   - Frontend :  
     ```bash
     cd frontend
     npm install
     ```
   - Backend (si utilisé) :  
     ```bash
     cd backend
     npm install
     ```

3. **Lancer l’application**
   - Frontend :  
     ```bash
     npm start
     ```
   - Backend :  
     ```bash
     npm start
     ```

4. **Accéder à l’application**
   - Par défaut : `http://localhost:3000`

---

## 🎬 Exemple d’utilisation

1. Sélectionner un algorithme dans la liste (ex : tri à bulles)
2. Choisir la taille du jeu de données à générer
3. Lancer le benchmark pour mesurer le temps d’exécution
4. Visualiser le résultat sur le graphique
5. Comparer avec d’autres algorithmes

---

## 📖 Documentation

- Explications sur la complexité algorithmique dans la section [docs](docs/complexity.md)
- Types d’algorithmes disponibles
- Méthodologie de mesure des performances

---

## ⚠️ Sécurité

Si la soumission de code personnalisé est activée, veillez à filtrer et sécuriser l’exécution côté serveur.

---

## 👩‍💻 Auteur

Meriem – Master 1 Génie Logiciel  
[LinkedIn](https://www.linkedin.com/in/meriem-glitch) | [GitHub](https://github.com/meriem-glitch)

---

## 📄 Licence

Projet open-source sous licence MIT.
