class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :name
      t.json :roll

      t.timestamps null: false
    end
  end
end
