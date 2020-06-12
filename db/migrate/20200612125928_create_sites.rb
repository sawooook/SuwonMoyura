class CreateSites < ActiveRecord::Migration[6.0]
  def change
    create_table :sites do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.float :lat
      t.float :lng
      t.string :category

      t.timestamps
    end
  end
end
