class UserCrypto < ApplicationRecord
  belongs_to :user
  belongs_to :crypto

end
