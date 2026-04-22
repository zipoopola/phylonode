// src/data.js
const flatData = [
  { name: 'Life (placeholder)', parent: null, rank:"root", age: 4000, image: 'images/DNA.png', info: '' },
  { name: 'Animals', parent: 'Life (placeholder)', rank:"kingdom", age: 650, image: 'images/animal.png', info:'info/animals.md' },
  { name: 'Sponges', parent: 'Animals', age: 544, image: 'images/sponge.png', info:'info/porifera.md' },

  { name: 'Eumetazoa', parent: 'Animals', age:600, image: '', info:'' },
  { name: 'Comb jellies', parent: 'Eumetazoa', age: 544, image: 'images/ctenophora.png', info:'' },
  
  { name: 'ParaHoxozoa', parent: 'Eumetazoa', age: 0, image: '', info:'' },
    { name: 'Placozoa', parent: 'ParaHoxozoa', age: 550, image: 'images/placozoa.png', info:'info/placozoa.md' },
    { name: 'Symmetry', parent: 'ParaHoxozoa', age: 0, image: '', info:'' },
    { name: 'Cnidaria', parent: 'Symmetry', rank:"phylum", age: 0, image: '', info:'' },
        { name: 'Anthozoa', parent: 'Cnidaria', age: 0, image: '', info:'' },
            { name: 'Hexacorallia', parent: 'Anthozoa', age: 0, image: '', info:'' },
                { name: 'Sea Anenomes', parent: 'Hexacorallia', age: 0, image: '', info:'' },
                { name: 'Stony Corals', parent: 'Hexacorallia', age: 0, image: '', info:'' },
            { name: 'Soft Corals', parent: 'Anthozoa', age: 0, image: 'images/sea_pen.png', info:'' },
        { name: 'Medusozoa', parent: 'Cnidaria', age: 0, image: '', info:'' },
    { name: 'Bilateria', parent: 'Symmetry',  rank:"clade I", age: 570, image: 'images/bilateria.png', info:'info/bilateria.md' },
        { name: 'Deuterostomia', parent: 'Bilateria',  rank:"super-phylum", age: 558, image: '', info:''  },
            { name: 'Xenambulacraria', parent: 'Deuterostomia', age: 0, image: '', info:''  },
                { name: 'Xenacoelomorpha', parent: 'Xenambulacraria', age: 0, image: 'images/xenoturbell.png', info:'info/xenacoelomorpha.md'  },
                    //{ name: 'Xenoturbella', parent: 'Xenacoelomorpha', age: 0, image: 'images/xenoturbell.png', info:''  },                      unnecessary, now within parent group
                { name: 'Ambulacraria', parent: 'Xenambulacraria', age: 533, image: 'images/ambulacraria.png', info:'info/ambulacraria.md'},
                    { name: 'Hemichordata', parent: 'Ambulacraria', age: 0, image: 'images/pterobranch.png', info:'info/hemichordata.md'  },
                    { name: 'Echinodermata', parent: 'Ambulacraria', rank:"phylum", age: 515, image: 'images/echinodermata.png', info:'info/echinodermata.md'  },
                        { name: 'Crinoidea', parent: 'Echinodermata', age: 487, image: 'images/crinoidea.png', info:''  },
                        { name: 'Eleutherozoa', parent: 'Echinodermata', age: 0, image: '', info:''  },
                            { name: 'Echinozoa', parent: 'Eleutherozoa', age: 487, image: '', info:''  },
                                { name: 'Sea urchins', parent: 'Echinozoa', age: 450, image: 'images/seaurchins.jpg', info:''  },
                                { name: 'Sea cucumbers', parent: 'Echinozoa', age: 470, image: 'images/seacumber.jpg', info:''  },
                            { name: 'Asterozoa', parent: 'Eleutherozoa', age: 488, image: 'images/Somasteroidea.jpg', info:''  },
                                { name: 'Starfish', parent: 'Asterozoa', age: 450, image: 'images/starfish.jpg', info:''  },
                                { name: 'Brittle stars', parent: 'Asterozoa', age: 486, image: 'images/brittlestar.png', info:''  },
            { name: 'Chordata', parent: 'Deuterostomia', rank:"phylum", age: 539, image: '', info:''  },
                { name: 'Vetulicolia', parent: 'Chordata', age: 520, ageEnd: 501, image: 'images/vetulicolia.jpg', info:'info/vetulicolia.md'  },
                { name: 'Cathaymyrus', parent: 'Chordata', age: 518, ageEnd: 0, image: 'images/cathay.png', info:''  },
                { name: 'Cephalochordates', parent: 'Chordata', age: 518, image: 'images/lancelet.png', info:''  },
                { name: 'Olfactores', parent: 'Chordata', age: 518, image: '', info:''  },
                    { name: 'Tunicates', parent: 'Olfactores', age: 518, image: 'images/tunicate.jpg', info:'info/tunicates.md'  },
                    { name: 'Craniates', parent: 'Olfactores', age: 0, image: '', info:''  },
                        { name: 'Myllokunmingia', parent: 'Craniates', age: 518, ageEnd: 0, image: 'images/mylo.png', info:''  },
                        { name: 'Vertebrates', parent: 'Craniates', age: 0, image: '', info:''  },
                            { name: 'Cyclostomi', parent: 'Vertebrates', age: 0, image: '', info:''  },
                                { name: 'Hagfish', parent: 'Cyclostomi', age: 0, image: '', info:''  },
                                { name: 'Lamprey', parent: 'Cyclostomi', age: 0, image: '', info:''  },    
                            { name: 'PanGnathostomata', parent: 'Vertebrates', age: 0, image: '', info:''  },
                                { name: 'Heterostracomorphii', parent: 'PanGnathostomata', age: 0, image: '', info:''  },
                                    { name: 'Astraspsis', parent: 'Heterostracomorphii', age: 467, ageEnd: 433, image: 'images/astraspis.jpg', info:''  },
                                    { name: 'Arandaspida', parent: 'Heterostracomorphii', age: 480, ageEnd: 455, image: 'images/arandaspida.jpg', info:''  },
                                    { name: 'Athenaegis', parent: 'Heterostracomorphii', age: 430, ageEnd: 0, image: 'images/athenaegis.jpg', info:''  },
                                    { name: 'Heterostraci', parent: 'Heterostracomorphii', age: 430, ageEnd: 359, image: 'images/heterostraci.jpg', info:'info/heterostraci.md'  },
                                { name: 'Thelodonti', parent: 'PanGnathostomata', age: 458, ageEnd: 359, image: 'images/thelodonti.png', info:''  },
                                { name: 'Pituriaspida', parent: 'PanGnathostomata', age: 393, ageEnd: 383, image: 'images/pituriaspida.jpg', info:''  },
                                { name: 'Osteostraci', parent: 'PanGnathostomata', age: 433, ageEnd: 359, image: 'images/osteostraci.png', info:''  },
                                { name: 'Placodermi', parent: 'PanGnathostomata', age: 0, image: '', info:''  },
                                    { name: 'Antiarcha', parent: 'Placodermi', age: 426, ageEnd: 359, image: 'images/antiarcha.jpg', info:''  },
                                    { name: 'Arthrodira', parent: 'Placodermi', age: 419, ageEnd: 359, image: '', info:''  },
                                    { name: 'CrownGnathostomata', parent: 'Placodermi',  rank:"clade II", age: 0, image: '', info:''  },
                                        { name: 'Cartilaginous fishes', parent: 'CrownGnathostomata',rank:"clade III", age: 0, image: '', info:''  },
                                            { name: 'Spiny "sharks"', parent: 'Cartilaginous fishes', age: 439, ageEnd: 284, image: '', info:''  },
                                            { name: 'Chondrichthyes', parent: 'Cartilaginous fishes', age: 0, image: '', info:''  },
                                                { name: 'Chimaeraformes', parent: 'Chondrichthyes', age: 421, image: '', info:''  },
                                                { name: 'Elasmobranchii', parent: 'Chondrichthyes', age: 419, image: '', info:''  },
                                                    { name: 'True rays', parent: 'Elasmobranchii', age: 0, image: '', info:''  },
                                                        { name: 'Electric rays', parent: 'True rays', age: 56, image: '', info:''  },
                                                        { name: 'Stingrays', parent: 'True rays', age: 145, image: 'images/stingrays.jpg', info:'info/stingrays.md'},
                                                    { name: 'True sharks', parent: 'Elasmobranchii', age: 0, image: '', info:''  },
                                                        { name: 'Squalomorphi', parent: 'True sharks', age: 0, image: '', info:''  },
                                                        { name: 'Galeomorphi', parent: 'True sharks', age: 0, image: '', info:''  },

                                                    { name: 'Bony fishes', parent: 'CrownGnathostomata',rank:"clade III", age: 0, image: '', info:''  },
                                            { name: 'Ray-finned fish', parent: 'Bony fishes',rank:"clade IV", age: 0, image: '', info:''  },
                                            { name: 'Lobe-finned fish', parent: 'Bony fishes',rank:"clade IV", age: 425, image: 'images/guiyu_oneiros.jpg', info:'info/guiyu_oneiros.md'  },
                                                { name: 'Coelacanths', parent: 'Lobe-finned fish', age: 420, image: 'images/coelacanth.png', info:''  },
                                                { name: 'Rhipidistia', parent: 'Lobe-finned fish', age: 0, image: 'images/rhipidistia.jpg', info:''  },
                                                    { name: 'Lungfish', parent: 'Rhipidistia', age: 415, image: 'images/lungfish.jpg', info:''  },
                                                    { name: 'Tetrapodomorpha', parent: 'Rhipidistia', age: 409,rank:"clade V", image: 'images/tiktaalik.jpg', info:'info/tetrapodomorpha.md'},
                                                        { name: 'Tetrapods', parent: 'Tetrapodomorpha', age: 372, image: '', info:''  },
                                                            { name: 'Anamniota', parent: 'Tetrapods',rank:"clade VI", age: 0, image: '', info:''  }, //incl diadectomorpha
                                                            { name: 'Amniota', parent: 'Tetrapods',rank:"clade VI", age: 0, image: '', info:''  },
                                                                { name: 'Synapsida', parent: 'Amniota',rank:"clade VII", age: 0, image: '', info:''  },
                                                                { name: 'Sauropsida', parent: 'Amniota',rank:"clade VII", age: 316, image: '', info:''  },
                                                                    { name: 'Parareptilia', parent: 'Sauropsida', age: 306, ageEnd: 201, image: '', info:''  }, 
                                                                    { name: 'Eureptilia', parent: 'Sauropsida', age: 0, image: '', info:''  },
                                                                        { name: 'Other Reptiles', parent: 'Eureptilia', age: 314, ageEnd: 247, image: '', info:''  }, //left as a note (top age can be anywehre from 307 to 314 check it fits within parents)
                                                                        { name: 'Crown Reptiles', parent: 'Eureptilia', age: 0, image: '', info:''  },
                                                                            { name: 'Lepidosauria', parent: 'Crown Reptiles',rank:"clade VIII", age: 252, image: '', info:''  }, //check age
                                                                            { name: 'Archelosauria', parent: 'Crown Reptiles',rank:"clade VIII", age: 269, image: '', info:'info/archelosauria.md'},
                                                                                { name: 'Pantestudines', parent: 'Archelosauria', age: 0, image: '', info:''},
                                                                                { name: 'Archosauromorpha', parent: 'Archelosauria', age: 267, image: '', info:''},
                                                                                    { name: 'Marine reptile complex', parent: 'Archosauromorpha', age: 261, ageEnd: 66, image: '', info:''},
                                                                                        { name: 'Thalattosauria', parent: 'Marine reptile complex', age: 250, ageEnd: 212, image: '', info:''}, //possibly slightly later (start and end)
                                                                                        { name: 'Ichthyosauromorpha', parent: 'Marine reptile complex', age: 257, ageEnd: 90, image: '', info:''},
                                                                                        { name: 'Sauropterygomorpha', parent: 'Marine reptile complex', age: 251, ageEnd: 66, image: '', info:'info/sauropterygomorpha.md'},
                                                                                    { name: 'CrownArchosauromorpha', parent: 'Archosauromorpha', age: 264, image: '', info:''},




        { name: 'Protostomia', parent: 'Bilateria',  rank:"superphylum", age: 558, image: '', info:'' },
        





  { name: 'Plants (placeholder)', parent: 'Life (placeholder)', age: 1000, image: 'images/plant.png', info:'info/monkey.md' },
  { name: 'Orchid', parent: 'Plants (placeholder)', age: 80, image: 'images/Orchid.png', info:''},


];

export default flatData;
