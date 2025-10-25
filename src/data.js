// src/data.js
const flatData = [
  { name: 'Life (placeholder)', parent: null, age: 4000, image: 'images/DNA.png', info: '' },
  { name: 'Animals', parent: 'Life (placeholder)', age: 650, image: 'images/animal.png', info:'info/animals.md' },
  { name: 'Sponges', parent: 'Animals', age: 544, image: 'images/sponge.png', info:'info/porifera.md' },

  { name: 'Eumetazoa', parent: 'Animals', age:600, image: '', info:'' },
  { name: 'Comb jellies', parent: 'Eumetazoa', age: 544, image: 'images/ctenophora.png', info:'' },
  
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
        { name: 'Deuterostomia', parent: 'Bilateria', age: 558, image: '', info:''  },
            { name: 'Xenambulacraria', parent: 'Deuterostomia', age: 0, image: '', info:''  },
                { name: 'Xenacoelomorpha', parent: 'Xenambulacraria', age: 0, image: 'images/xenoturbell.png', info:'info/xenacoelomorpha.md'  },
                    //{ name: 'Xenoturbella', parent: 'Xenacoelomorpha', age: 0, image: 'images/xenoturbell.png', info:''  },                      unnecessary, now within parent group
                { name: 'Ambulacraria', parent: 'Xenambulacraria', age: 533, image: 'images/ambulacraria.png', info:'info/ambulacraria.md'},
                    { name: 'Hemichordata', parent: 'Ambulacraria', age: 0, image: 'images/pterobranch.png', info:'info/hemichordata.md'  },
                    { name: 'Echinodermata', parent: 'Ambulacraria', age: 515, image: 'images/echinodermata.png', info:'info/echinodermata.md'  },
                        { name: 'Crinoidea', parent: 'Echinodermata', age: 487, image: 'images/crinoidea.png', info:''  },
                        { name: 'Eleutherozoa', parent: 'Echinodermata', age: 0, image: '', info:''  },
                            { name: 'Echinozoa', parent: 'Eleutherozoa', age: 487, image: '', info:''  },
                                { name: 'Sea urchins', parent: 'Echinozoa', age: 450, image: 'images/seaurchins.jpg', info:''  },
                                { name: 'Sea cucumbers', parent: 'Echinozoa', age: 470, image: 'images/seacumber.jpg', info:''  },
                            { name: 'Asterozoa', parent: 'Eleutherozoa', age: 488, image: 'images/Somasteroidea.jpg', info:''  },
                                { name: 'Starfish', parent: 'Asterozoa', age: 450, image: 'images/starfish.jpg', info:''  },
                                { name: 'Brittle stars', parent: 'Asterozoa', age: 486, image: 'images/brittlestar.png', info:''  },
            { name: 'Chordata', parent: 'Deuterostomia', age: 539, image: '', info:''  },
                { name: 'Vetulicolia', parent: 'Chordata', age: 520, image: 'images/vetulicolia.jpg', info:'info/vetulicolia.md'  },
                { name: 'Cathaymyrus', parent: 'Chordata', age: 518, image: 'images/cathay.png', info:''  },
                { name: 'Cephalochordates', parent: 'Chordata', age: 518, image: 'images/lancelet.png', info:''  },
                { name: 'Olfactores', parent: 'Chordata', age: 518, image: '', info:''  },
                    { name: 'Tunicates', parent: 'Olfactores', age: 518, image: 'images/tunicate.jpg', info:'info/tunicates.md'  },
                    { name: 'Craniates', parent: 'Olfactores', age: 0, image: '', info:''  },
                        { name: 'Myllokunmingiida', parent: 'Craniates', age: 518, image: 'images/mylo.png', info:''  },
                        { name: 'Vertebrates', parent: 'Craniates', age: 0, image: '', info:''  },
                            { name: 'Cyclostomi', parent: 'Vertebrates', age: 0, image: '', info:''  },
                                { name: 'Hagfish', parent: 'Cyclostomi', age: 0, image: '', info:''  },
                                { name: 'Lamprey', parent: 'Cyclostomi', age: 0, image: '', info:''  },    
                            { name: 'PanGnathostomata', parent: 'Vertebrates', age: 0, image: '', info:''  },
                                { name: 'Heterostracomorphii', parent: 'PanGnathostomata', age: 0, image: '', info:''  },
                                    { name: 'Astraspsis', parent: 'Heterostracomorphii', age: 0, image: '', info:''  },
                                    { name: 'Arandaspida', parent: 'Heterostracomorphii', age: 0, image: '', info:''  },
                                    { name: 'Athenaegis', parent: 'Heterostracomorphii', age: 0, image: '', info:''  },
                                    { name: 'Heterostraci', parent: 'Heterostracomorphii', age: 0, image: '', info:''  },
                                { name: 'Thelodonti', parent: 'PanGnathostomata', age: 0, image: '', info:''  },
                                { name: 'Pituriaspida', parent: 'PanGnathostomata', age: 0, image: '', info:''  },
                                { name: 'Osteostraci', parent: 'PanGnathostomata', age: 433, image: 'images/osteostraci.jpg', info:''  },
                                { name: 'Placodermi', parent: 'PanGnathostomata', age: 0, image: '', info:''  },
                                    { name: 'Antiarcha', parent: 'Placodermi', age: 0, image: '', info:''  },
                                    { name: 'Arthrodira', parent: 'Placodermi', age: 0, image: '', info:''  },
                                    { name: 'CrownGnathostomata', parent: 'Placodermi', age: 0, image: '', info:''  },
                                        { name: 'Cartilaginous fishes', parent: 'CrownGnathostomata', age: 0, image: '', info:''  },
                                        { name: 'Bony fishes', parent: 'CrownGnathostomata', age: 0, image: '', info:''  },




        { name: 'Protostomia', parent: 'Bilateria', age: 558, image: '', info:'' },
        





  { name: 'Plants (placeholder)', parent: 'Life (placeholder)', age: 1000, image: 'images/plant.png', info:'info/monkey.md' },
  { name: 'Orchid', parent: 'Plants (placeholder)', age: 80, image: 'images/Orchid.png', info:''},


];

export default flatData;
