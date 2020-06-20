class CreateInstallationSites < ActiveRecord::Migration[6.0]
  def change
    create_table :installation_sites do |t|
      t.string :name
      t.string :capital
      t.string :address
      t.string :phone
      t.float :lat
      t.float :lng
      t.boolean :card_currency
      t.boolean :mobile_currency
      t.boolean :paper_currency
      t.string :category
      t.text :extra
      t.timestamps
    end
  end
end
