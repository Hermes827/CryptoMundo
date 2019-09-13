class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :cryptos

  def cryptos
    ActiveModel::SerializableResource.new(object.cryptos, each_serializer: CryptoSerializer)
  end
end
