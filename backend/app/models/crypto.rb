class Crypto < ApplicationRecord
  has_many :userCryptos
  has_many :users, through: :userCryptos

end
