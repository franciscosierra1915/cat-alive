# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_08_25_215055) do

  create_table "cats", force: :cascade do |t|
    t.integer "petfinder_id"
    t.string "name"
    t.string "photo"
    t.string "age"
    t.string "description"
    t.string "status"
    t.string "size"
    t.string "gender"
    t.string "petfinder_url"
    t.boolean "fostered"
    t.boolean "adopted"
    t.integer "shelter_id"
    t.integer "user_id"
    t.integer "vet_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["shelter_id"], name: "index_cats_on_shelter_id"
    t.index ["user_id"], name: "index_cats_on_user_id"
    t.index ["vet_id"], name: "index_cats_on_vet_id"
  end

  create_table "shelters", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.integer "distance"
    t.string "state"
    t.string "country"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.boolean "foster"
    t.boolean "adopter"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "vets", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "cats", "shelters"
  add_foreign_key "cats", "users"
  add_foreign_key "cats", "vets"
end
