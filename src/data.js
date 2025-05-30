// src/data.js
const flatData = [
  { name: 'Life', parent: null, age: 4000, image: 'images/monkey.png', info: '' },
  { name: 'Animals', parent: 'Life', age: 650, image: 'images/animal.png', info:'info/animals.md' },
  { name: 'Porifera', parent: 'Animals', age: 544, image: 'images/sponge.png', info:'info/porifera.md' },

  { name: 'Eumetazoa', parent: 'Animals', age:600, image: '', info:'' },
  { name: 'Ctenophora', parent: 'Eumetazoa', age: 544, image: 'images/ctenophora.png', info:'' },
  
  { name: 'ParaHoxozoa', parent: 'Eumetazoa', age: 0, image: '', info:'' },
    { name: 'Placozoa', parent: 'ParaHoxozoa', age: 550, image: 'images/placozoa.png', info:'info/placozoa.md' },
    { name: 'Symmetry', parent: 'ParaHoxozoa', age: 0, image: '', info:'' },
    { name: 'Bilateria', parent: 'Symmetry', age: 570, image: 'images/bilateria.png', info:'info/bilateria.md' },
    { name: 'Cnidaria', parent: 'Symmetry', age: 0, image: '', info:'' },
        { name: 'Anthozoa', parent: 'Cnidaria', age: 0, image: '', info:'' },
            { name: 'Hexacorallia', parent: 'Anthozoa', age: 0, image: '', info:'' },
                { name: 'Sea Anenomes', parent: 'Hexacorallia', age: 0, image: '', info:'' },
                { name: 'Stony Corals', parent: 'Hexacorallia', age: 0, image: '', info:'' },
            { name: 'Soft Corals', parent: 'Anthozoa', age: 0, image: 'images/sea_pen.png', info:'' },
        { name: 'Medusozoa', parent: 'Cnidaria', age: 0, image: '', info:'' },





  { name: 'Plants', parent: 'Life', age: 1000, image: 'images/monkey.png', info:'info/monkey.md' },
  { name: 'Orchid', parent: 'Plants', age: 100, image: 'images/monkey.png', info:''},

];

export default flatData;
