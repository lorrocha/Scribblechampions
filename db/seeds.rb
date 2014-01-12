# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'csv'

datafile = Rails.root + "db/data/prompts.csv"

CSV.foreach(datafile, headers:true) do |row|
  noun = row["noun"].delete("'")
  adj = row["adjective"].delete("'")

  Noun.find_or_initialize_by(noun: noun) do |n|
    n.noun = noun
    n.save!
  end
  Adjective.find_or_initialize_by(adjective: adj) do |a|
    a.adjective = adj
    a.save!
  end
end
