class HomeController < ApplicationController

  def index
    @prompt = "#{Adjective.random} #{Noun.random}"
  end

end
