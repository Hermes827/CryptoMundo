class CreateCryptos < ActiveRecord::Migration[5.2]
  def change
    create_table :cryptos do |t|
      t.string :name
      t.string :price
      t.string :image
      t.string :market
      t.string :volume
      t.string :supply
      t.string :highday
      t.string :lowday
    end
  end
end
