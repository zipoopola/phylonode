// src/data.js
const flatData = [
  { name: 'Life (placeholder)', parent: null, age: 4000, image: 'images/DNA.png', info: '' },
  { name: 'Animals', parent: 'Life (placeholder)', age: 650, image: 'images/animal.png', info:'info/animals.md' },
  { name: 'Porifera', parent: 'Animals', age: 544, image: 'images/sponge.png', info:'info/porifera.md' },

  { name: 'Eumetazoa', parent: 'Animals', age:600, image: '', info:'' },
  { name: 'Ctenophora', parent: 'Eumetazoa', age: 544, image: 'images/ctenophora.png', info:'' },
  
  { name: 'ParaHoxozoa', parent: 'Eumetazoa', age: 0, image: '', info:'' },
    { name: 'Placozoa', parent: 'ParaHoxozoa', age: 550, image: 'images/placozoa.png', info:'info/placozoa.md' },
    { name: 'Symmetry', parent: 'ParaHoxozoa', age: 0, image: '', info:'' },
    { name: 'Cnidaria', parent: 'Symmetry', age: 0, image: '', info:'' },
        { name: 'Anthozoa', parent: 'Cnidaria', age: 0, image: '', info:'' },
            { name: 'Hexacorallia', parent: 'Anthozoa', age: 0, image: '', info:'' },
                { name: 'Sea Anenomes', parent: 'Hexacorallia', age: 0, image: '', info:'' },
                { name: 'Stony Corals', parent: 'Hexacorallia', age: 0, image: '', info:'' },
            { name: 'Soft Corals', parent: 'Anthozoa', age: 0, image: 'images/sea_pen.png', info:'' },
        { name: 'Medusozoa', parent: 'Cnidaria', age: 0, image: '', info:'' },
    { name: 'Bilateria', parent: 'Symmetry', age: 570, image: 'images/bilateria.png', info:'info/bilateria.md' },
        { name: 'Deuterostomia', parent: 'Bilateria', age: 0, image: '', info:''  },
            { name: 'Xenambulacraria', parent: 'Deuterostomia', age: 0, image: '', info:''  },
                { name: 'Xenacoelomorpha', parent: 'Xenambulacraria', age: 0, image: 'images/xenoturbell.png', info:'info/xenacoelomorpha.md'  },
                    //{ name: 'Xenoturbella', parent: 'Xenacoelomorpha', age: 0, image: 'images/xenoturbell.png', info:''  },                      unnecessary, now within parent group
                { name: 'Ambulacraria', parent: 'Xenambulacraria', age: 533, image: 'images/ambulacraria.png', info:'info/ambulacraria.md'},
                    { name: 'Hemichordata', parent: 'Ambulacraria', age: 0, image: 'images/pterobranch.png', info:'info/hemichordata.md'  },
                    { name: 'Echinodermata', parent: 'Ambulacraria', age: 515, image: 'images/echinodermata.png', info:'info/echinodermata.md'  },
                        { name: 'Crinoidea', parent: 'Echinodermata', age: 487, image: 'images/crinoidea.png', info:''  },
                        { name: 'Eleutherozoa', parent: 'Echinodermata', age: 0, image: '', info:''  },
            { name: 'Chordata', parent: 'Deuterostomia', age: 0, image: '', info:''  },





        { name: 'Protostomia', parent: 'Bilateria', age: 0, image: '', info:'' },
        





  { name: 'Plants (placeholder)', parent: 'Life (placeholder)', age: 1000, image: 'images/plant.png', info:'info/monkey.md' },
  { name: 'Orchid', parent: 'Plants (placeholder)', age: 100, image: 'images/Orchid.png', info:''},


];

export default flatData;
