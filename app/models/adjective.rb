class Adjective < ActiveRecord::Base
  validates_presence_of :adjective

  def self.random
    Adjective.all.shuffle.pop.adjective
  end
end
