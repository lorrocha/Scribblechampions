class Noun < ActiveRecord::Base
  validates_presence_of :noun
  def self.random
    Noun.all.shuffle.pop.noun
  end
end
