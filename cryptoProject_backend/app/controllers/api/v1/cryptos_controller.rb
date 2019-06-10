class Api::V1::CryptosController < ApplicationController
  skip_before_action :authorized

  def searchByName
    # response = HTTParty.get("https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key={2eb0a0afcdbd0af89e90104132e9424984ac9324e5c2b62272a6afbe9567cb19}")
    # data = JSON.parse(response.to_s)
    # addCryptos(data)

    render json: Crypto.all

  end

  def addCryptos(data)
    return if !data['Data']
    data['Data'].each do |crypto|

    Crypto.create({
        name: crypto['CoinInfo']["Name"],
        price: crypto['RAW']['USD']['PRICE']
        })

    end
  end

end
