class CryptoSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :image, :market, :volume, :supply, :highday, :lowday
end
