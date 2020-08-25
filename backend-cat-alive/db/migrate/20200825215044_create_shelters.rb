class CreateShelters < ActiveRecord::Migration[6.0]
  def change
    create_table :shelters do |t|
      t.string :name
      t.string :location
      t.integer :distance
      t.string :state
      t.string :country

      t.timestamps
    end
  end
end
