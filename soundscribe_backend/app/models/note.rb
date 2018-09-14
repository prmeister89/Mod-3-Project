class Note < ApplicationRecord
  has_many :melodies
  has_many :songs, through: :melodies
end
