class User < ApplicationRecord
  has_many :userCryptos
  has_many :cryptos, through: :userCryptos
  has_secure_password
end
