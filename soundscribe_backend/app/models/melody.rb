class Melody < ApplicationRecord
  belongs_to :song

  def notes
    self.note_id_array.map{|note| Note.find(note).name}
  end
end
