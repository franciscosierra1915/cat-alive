class User < ApplicationRecord
  has_many :cats
  has_many :vets, through: :cats
  has_many :shelters, through: :cats
  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  

end
