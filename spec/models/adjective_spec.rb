require 'spec_helper'

describe Adjective do

  it 'returns a noun when called' do
    previous_count = Adjective.all.count
    doob = Adjective.create(adjective:'A beautiful')
    Adjective.create(adjective:'A horrifying')

    expect(Adjective.all.count).to eql(previous_count+2)
    expect(Adjective.random).to_not eql(nil)
    expect(Adjective.all).to include(doob)
  end
end
