class CreateCats < ActiveRecord::Migration[6.0]
  def change
    create_table :cats do |t|
      t.integer :petfinder_id
      t.string :name
      t.string :photo
      t.string :age
      t.string :description
      t.string :status
      t.string :size
      t.string :gender
      t.string :petfinder_url
      t.references :shelter, null: true, foreign_key: true
      t.references :user, null: true, foreign_key: true
      t.references :vet, null: true, foreign_key: true

      t.timestamps
    end
  end
end
