require 'spec_helper'

describe Noun do
  it 'returns a noun when called' do
    previous_count = Noun.all.count
    player = Noun.create(noun:'Player')
    Noun.create(noun:'Squid')

    expect(Noun.all.count).to eql(previous_count+2)
    expect(Noun.random).to_not eql(nil)
    expect(Noun.all).to include(player)
  end
end
