class Track < ActiveRecord::Base
  validates :name, :roll, presence: true
end
