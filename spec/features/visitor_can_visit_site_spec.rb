require 'spec_helper'

feature 'A user can visit the site' do
  it 'sees the home page' do
    Adjective.create(adjective:'teeest')
    Noun.create(noun:'more test')

    visit root_path
    save_and_open_page
    expect(page).to have_content('ScribbleChampions!')
    expect(page).to have_content('teeest more test')
  end
end
