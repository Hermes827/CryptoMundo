class CreateUserCryptos < ActiveRecord::Migration[5.2]
  def change
    create_table :user_cryptos do |t|
      t.integer :crypto_id
      t.integer :user_id
    end
  end
end
