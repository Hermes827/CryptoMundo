class Api::V1::CryptosController < ApplicationController
  skip_before_action :authorized

  def searchByName
    Crypto.all.delete_all
    response = HTTParty.get("https://min-api.cryptocompare.com/data/top/mktcapfull?limit=50&tsym=USD&api_key={2eb0a0afcdbd0af89e90104132e9424984ac9324e5c2b62272a6afbe9567cb19}")
    data = JSON.parse(response.to_s)
    addCryptos(data)
    # modify amount of cryptos that API fetches by changing number after limit
    render json: Crypto.all
  end

  def addCryptos(data)
    return if !data['Data']
    data['Data'].each do |crypto|
    Crypto.create({
      name: crypto['CoinInfo']["Name"],
      price: crypto['RAW']['USD']['PRICE'],
      image: crypto['CoinInfo']['ImageUrl'],
      market: crypto['DISPLAY']['USD']['MARKET'],
      volume: crypto['DISPLAY']['USD']['VOLUMEDAYTO'],
      supply: crypto['DISPLAY']['USD']['SUPPLY'],
      highday: crypto['DISPLAY']['USD']['HIGHDAY'],
      lowday: crypto['DISPLAY']['USD']['LOWDAY'],
      lastUpdate: crypto['RAW']['USD']['LASTUPDATE']
        })
    end
  end

end
