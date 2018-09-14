class Song < ApplicationRecord
  has_many :melodies
  has_many :notes, through: :melodies
end
