// src/data.js
const flatData = [
  { name: 'Life', parent: null, age: 4000, image: 'images/monkey.png', info: '' },
  { name: 'Animals', parent: 'Life', age: 650, image: 'images/animal.png', info:'info/animal.md' },
  { name: 'Sponge', parent: 'Animals', age: 544, image: 'images/sponge.png', info:'info/Sponge.md' },

  { name: 'Eumetazoa', parent: 'Animals', age:600, image: '', info:'' },
  { name: 'Ctenophora', parent: 'Eumetazoa', age: 544, image: 'images/Ctenophora.png', info:'' },





  { name: 'Plants', parent: 'Life', age: 1000, image: 'images/monkey.png', info:'info/monkey.md' },
  { name: 'Orchid', parent: 'Plants', age: 100, image: 'images/monkey.png', info:''},

];

export default flatData;
