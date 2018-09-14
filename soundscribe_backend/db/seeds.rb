# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
 
#Song data
Song1 = Song.create(title: "The Dance of Munchkins");
Song2 = Song.create(title: "Full Moon Wax");
Song3 = Song.create(title: "Calypso's Folly");

#Melody data
Melody1 = Melody.create(song_id: 1, note_id_array: [1,2,3]);
Melody2 = Melody.create(song_id: 2, note_id_array: [3,2,1]);
Melody3 = Melody.create(song_id: 3, note_id_array: [2,1,3]);
Melody4 = Melody.create(song_id: 1, note_id_array: [4,5,6,7]);
Melody5 = Melody.create(song_id: 2, note_id_array: [7,6,5,4]);
Melody6 = Melody.create(song_id: 3, note_id_array: [6,5,4,7]);

#Note data
C = Note.create(name: "C");
D = Note.create(name: "D");
E = Note.create(name: "E");
F = Note.create(name: "F");
G = Note.create(name: "G");
A = Note.create(name: "A");
B = Note.create(name: "B");
