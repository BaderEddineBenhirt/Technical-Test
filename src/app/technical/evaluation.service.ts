import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  questions!: any[];
 
  constructor() {
   
  }
 

  loadJavaQuestions() {
    this.questions = [
      {
        id: 1,
        text: "Quelle est l'utilité de l'interface Comparable en Java?",
        options: [
          'Pour comparer des objets entre eux',
          "Pour trier des collections d'objets",
          'Pour effectuer une recherche binaire',
          'Pour gérer les accès concurrents aux données',
        ],
        correctAnswer: "Pour trier des collections d'objets",
        duration: 15,
      },
      {
        id: 2,
        text: 'Quelle est la différence entre une classe abstraite et une interface en Java?',
        options: [
          'Les classes abstraites peuvent avoir des méthodes implémentées, les interfaces ne peuvent pas',
          "Les interfaces peuvent avoir des variables d'instance, les classes abstraites ne peuvent pas",
          'Les classes abstraites peuvent être instanciées, les interfaces ne peuvent pas',
          'Les interfaces peuvent hériter de plusieurs autres interfaces, les classes abstraites ne peuvent pas',
        ],
        correctAnswer:
          'Les classes abstraites peuvent avoir des méthodes implémentées, les interfaces ne peuvent pas',
        duration: 25,
      },
      {
        id: 3,
        text: 'Comment peut-on utiliser le design pattern Singleton en Java?',
        options: [
          'En utilisant une variable statique privée et un constructeur privé',
          "En utilisant une variable d'instance privée et un constructeur public",
          'En utilisant une variable statique publique et un constructeur public',
          "En utilisant une variable d'instance publique et un constructeur privé",
        ],
        correctAnswer:
          'En utilisant une variable statique privée et un constructeur privé',
        duration: 30,
      },
      {
        id: 4,
        text: 'Comment peut-on utiliser les expressions régulières en Java?',
        options: [
          'En utilisant la classe RegEx',
          'En utilisant la classe Pattern et Matcher',
          'En utilisant la fonction match()',
          'En utilisant la fonction search()',
        ],
        correctAnswer: 'En utilisant la classe Pattern et Matcher',
        duration: 7,
      },
      {
        id: 5,
        text: 'Comment peut-on utiliser les annotations en Java?',
        options: [
          "En les ajoutant au-dessus des variables d'instance",
          'En les ajoutant au-dessus des méthodes',
          'En les ajoutant au-dessus des classes',
          'En les ajoutant au-dessus des packages',
        ],
        correctAnswer: 'En les ajoutant au-dessus des méthodes',
        duration: 20,
      },
      {
        id: 6,
        text: 'Comment peut-on utiliser les fonctions Lambda en Java?',
        options: [
          'En les utilisant pour remplacer les méthodes anonymes',
          'En les utilisant pour remplacer les boucles for',
          'En les utilisant pour remplacer les classes anonymes',
          'En les utilisant pour remplacer les interfaces',
        ],
        correctAnswer: 'En les utilisant pour remplacer les méthodes anonymes',
        duration: 10,
      },
      {
        id: 7,
        text: 'Quel est le type de données utilisé pour représenter une valeur booléenne en Java?',
        options: ['int', 'boolean', 'char', 'double'],
        correctAnswer: 'boolean',
        duration: 18,
      },
    ];
  }

  loadSqlQuestions() {
    this.questions = [
      {
        id: 1,
        text: " comment peut-on sélectionner tous les enregistrements d'une table ?",
        options: [
          'SELECT * FROM nom_de_table;',
          'INSERT INTO nom_de_table;',
          'UPDATE nom_de_table;',
          'DELETE nom_de_table;',
        ],
        correctAnswer: 'SELECT * FROM nom_de_table;',
        duration: 15,
      },
      {
        id: 2,
        text: "Comment peut-on sélectionner uniquement certaines colonnes d'une table ?",
        options: [
          'SELECT * FROM nom_de_table;',
          'SELECT nom_colonne1, nom_colonne2 FROM nom_de_table;',
          "SELECT nom_colonne1 FROM nom_de_table WHERE nom_colonne2 = 'valeur';",
          'SELECT nom_colonne1 FROM nom_de_table JOIN nom_de_table2 ON nom_de_table.colonne = nom_de_table2.colonne',
        ],
        correctAnswer: 'SELECT nom_colonne1, nom_colonne2 FROM nom_de_table;',
        duration: 25,
      },
      {
        id: 3,
        text: "Comment peut-on utiliser une clause WHERE pour filtrer les résultats d'une requête SQL ?",
        options: [
          "SELECT * FROM nom_de_table WHERE nom_colonne = 'valeur';",
          'SELECT * FROM nom_de_table JOIN nom_de_table2 ON nom_de_table.colonne = nom_de_table2.colonne;',
          'SELECT * FROM nom_de_table ORDER BY nom_colonne;',
          'SELECT * FROM nom_de_table LIMIT 10;',
        ],
        correctAnswer:
          "SELECT * FROM nom_de_table WHERE nom_colonne = 'valeur';",
        duration: 30,
      },
      {
        id: 4,
        text: "Comment peut-on trier les résultats d'une requête SQL par ordre croissant ou décroissant ?",
        options: [
          "SELECT * FROM nom_de_table WHERE nom_colonne = 'valeur';",
          'SELECT * FROM nom_de_table ORDER BY nom_colonne;',
          'SELECT * FROM nom_de_table JOIN nom_de_table2 ON nom_de_table.colonne = nom_de_table2.colonne;',
          'SELECT * FROM nom_de_table LIMIT 10;',
        ],
        correctAnswer: 'SELECT * FROM nom_de_table ORDER BY nom_colonne;',
        duration: 7,
      },
      {
        id: 5,
        text: 'Comment peut-on utiliser une clause JOIN pour lier des données entre plusieurs tables ?',
        options: [
          'SELECT * FROM nom_de_table JOIN nom_de_table2 ON nom_de_table.colonne = nom_de_table2.colonne;',
          "SELECT * FROM nom_de_table WHERE nom_colonne = 'valeur';",
          'SELECT * FROM nom_de_table ORDER BY nom_colonne;',
          'SELECT * FROM nom_de_table LIMIT 10;',
        ],
        correctAnswer:
          'SELECT * FROM nom_de_table JOIN nom_de_table2 ON nom_de_table.colonne = nom_de_table2.colonne;',
        duration: 20,
      },
      {
        id: 6,
        text: "Comment peut-on utiliser une clause GROUP BY pour regrouper les résultats d'une requête SQL",
        options: [
          'SELECT nom_colonne, COUNT() FROM nom_de_table GROUP BY nom_colonne;',
          "SELECT * FROM nom_de_table WHERE nom_colonne = 'valeur';",
          'SELECT * FROM nom_de_table ORDER BY nom_colonne;',
          'SELECT * FROM nom_de_table JOIN nom_de_table2 ON nom_de_table.colonne = nom_de_table2.colonne;',
        ],
        correctAnswer:
          'SELECT nom_colonne, COUNT() FROM nom_de_table GROUP BY nom_colonne;',
        duration: 10,
      },
      {
        id: 7,
        text: "Comment peut-on utiliser une clause HAVING pour filtrer les groupes d'une requête avec GROUP BY ?",
        options: [
          'SELECT nom_colonne, COUNT() FROM nom_de_table HAVING COUNT() > 5;',
          'SELECT nom_colonne, COUNT() FROM nom_de_table WHERE COUNT() > 5;',
          'SELECT nom_colonne, COUNT() FROM nom_de_table GROUP BY nom_colonne;',
          'SELECT * FROM nom_de_table JOIN nom_de_table2 ON nom_de_table.colonne = nom_de_table2.colonne;',
        ],
        correctAnswer:
          'SELECT nom_colonne, COUNT() FROM nom_de_table HAVING COUNT(*) > 5;',
        duration: 18,
      },
    ];
  }

  loadJavaScriptQuestions() {
    this.questions = [
      {
        id: 1,
        text: 'Comment peut-on déclarer une variable global en JavaScript ?',
        options: [
          'var nom_de_variable;',
          'let nom_de_variable;',
          'let nom_de_variable;',
          'int nom_de_variable;',
        ],
        correctAnswer: 'var nom_de_variable;',
        duration: 15,
      },
      {
        id: 2,
        text: 'Comment peut-on créer une fonction en JavaScript ?',
        options: [
          'function nom_de_fonction() {};',
          'var nom_de_fonction = function() {};',
          'let nom_de_fonction = () => {};',
          'const nom_de_fonction = () => {};',
        ],
        correctAnswer: 'function nom_de_fonction() {};',
        duration: 25,
      },
      {
        id: 3,
        text: 'Comment peut-on utiliser une boucle for en JavaScript ?',
        options: [
          'for (var i = 0; i < 10; i++) {};',
          'while (i < 10) {};',
          'do {} while (i < 10);',
          'forEach(element => {});',
        ],
        correctAnswer: 'for (var i = 0; i < 10; i++) {};',
        duration: 30,
      },
      {
        id: 4,
        text: "Comment peut-on itérer sur les propriétés d'un objet en javascript?",
        options: [
          'for (var property in obj) {};',
          'obj.forEach(function(property){});',
          'for(var i=0;i<obj.length;i++){};',
          'forEach(property in obj => {});',
        ],
        correctAnswer: 'for (var property in obj) {};',
        duration: 7,
      },
      {
        id: 5,
        text: 'Comment peut-on utiliser une condition if-else en JavaScript ?',
        options: [
          'if (condition) {};',
          'switch (condition) {};',
          'while (condition) {};',
          'for (condition) {};',
        ],
        correctAnswer: 'if (condition) {};',
        duration: 20,
      },
      {
        id: 6,
        text: "Comment peut-on ajouter un élément à la fin d'un tableau en JavaScript ?",
        options: [
          'myArray.push(element);',
          'myArray.add(element);',
          'myArray[myArray.length] = element;',
          'myArray.append(element);',
        ],
        correctAnswer: 'myArray.push(element);',
        duration: 10,
      },
      {
        id: 7,
        text: 'Comment peut-on utiliser une boucle while en JavaScript ?',
        options: [
          'while (condition) {};',
          'while (condition) {};',
          'do { } while (condition);',
          'forEach(element => {});',
        ],
        correctAnswer: 'while (condition) {};',
        duration: 18,
      },
    ];
  }

  getQuestions() {
    return this.questions;
  }
}
