class Shelter < ApplicationRecord
    has_many :cats
    has_many :users, through: :cats
    has_many :vets, through: :cats
end
