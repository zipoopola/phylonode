// src/data.js
const flatData = [
  { name: 'Life', parent: null, age: 4000, image: 'images/monkey.png' },
  { name: 'Animals', parent: 'Life', age: 800, image: '' },
  { name: 'Monkey', parent: 'Animals', age: 100, image: 'images/monkey.png' },
  { name: 'Spider-Monkey', parent: 'Monkey', age: 50, image: '' },

  { name: 'Ape', parent: 'Animals', age: 100, image: 'images/monkey.png' },
  { name: 'Plants', parent: 'Life', age: 1000, image: 'images/monkey.png' },
  { name: 'Orchid', parent: 'Plants', age: 100, image: 'images/monkey.png' },

];

export default flatData;
