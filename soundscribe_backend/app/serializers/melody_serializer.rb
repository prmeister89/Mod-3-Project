class MelodySerializer < ActiveModel::Serializer
  belongs_to :song
  attributes :id, :notesArray

  def notesArray
    object.notes
  end
end
