# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Vet.destroy_all
Shelter.destroy_all

user_one = User.create(name: 'Francisco Sierra', email: 'franciscosierra@gmail.com', password: 'cat123', foster: true, adopter: false)
user_two = User.create(name: 'Michael Puente', email: 'michaelpuente@gmail.com', password: 'cat123', foster: true, adopter: false)
vet_one = Vet.create(name: 'Jennifer Lange', email: 'jenniferlange@vet.com', password: 'cat123')
shelter = Shelter.create(name: 'Houston Pets Alive', location: '2800 Antoine Dr #2854, Houston, TX 77092', distance: 30, state: 'Texas', country: 'USA')