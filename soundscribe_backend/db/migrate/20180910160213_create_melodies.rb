class CreateMelodies < ActiveRecord::Migration[5.2]
  def change
    create_table :melodies do |t|
      t.integer :song_id
      t.integer :note_id_array, array: true, default: []
      t.timestamps
    end
  end
end
