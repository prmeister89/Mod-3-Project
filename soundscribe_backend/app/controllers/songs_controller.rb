class SongsController < ApplicationController
  def index
    render json: Song.all
  end

  def create
    render json: Song.create(title: params[:title])
  end
end
