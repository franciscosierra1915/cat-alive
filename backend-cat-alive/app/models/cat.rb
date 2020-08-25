class Cat < ApplicationRecord
  belongs_to :shelter
  belongs_to :user, optional: true
  belongs_to :vet, optional: true
end
