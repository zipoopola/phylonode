// src/data.js
const flatData = [
  { name: 'Life', parent: null, age: 4000, image: 'images/monkey.png', info: '' },
  { name: 'Animals', parent: 'Life', age: 650, image: 'images/animal.png', info:'' },
  { name: 'Monkey', parent: 'Animals', age: 100, image: 'images/monkey.png', info:'info/monkey.md' },
  { name: 'Spider-Monkey', parent: 'Monkey', age: 50, image: '', info:'' },

  { name: 'Ape', parent: 'Animals', age: 100, image: 'images/monkey.png', info:'' },
  { name: 'Plants', parent: 'Life', age: 1000, image: 'images/monkey.png', info:'' },
  { name: 'Orchid', parent: 'Plants', age: 100, image: 'images/monkey.png', info:''},

];

export default flatData;
