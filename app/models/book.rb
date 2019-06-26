class Book < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :author, presence: true
  validates :pages, presence: true
  validates :publication, presence: true
end  
