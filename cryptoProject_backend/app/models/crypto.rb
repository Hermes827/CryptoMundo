class Crypto < ApplicationRecord
  has_many :userCryptos
  has_many :users, through: :userCryptos

  def self.addCryptos(data)
    return if !data['Data']
    data['Data'].each do |crypto|
    Crypto.create({
        name: crypto['CoinInfo']["Name"],
        price: crypto['RAW']['USD']['PRICE'],
        image: crypto['CoinInfo']['ImageUrl'],
        market: crypto['DISPLAY']['USD']['MARKET'],
        volume: crypto['DISPLAY']['USD']['VOLUMEDAY'],
        supply: crypto['DISPLAY']['USD']['SUPPLY'],
        highday: crypto['DISPLAY']['USD']['HIGHDAY'],
        lowday: crypto['DISPLAY']['USD']['LOWDAY']
        })

    end
  end

  def self.clear
    Crypto.all.delete_all
  end

end
