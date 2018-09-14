class MelodiesController < ApplicationController
  def index
    render json: Melody.all
  end

  def create
    render json: Melody.create(song_id: params[:song_id], note_id_array: params[:note_id_array])
  end

  def show
    render json: Melody.find(params[:id])
  end

  def destroy
    render json: Melody.find(params[:id]).destroy()
  end

  def update
    Melody.find(params[:id]).update(melody_params)
    render json: Melody.find(params[:id])
  end

  private

  def melody_params
    params.require(:melody).permit(:song_id, :note_id_array => [])
  end


end
