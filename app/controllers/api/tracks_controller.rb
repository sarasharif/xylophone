class Api::TracksController < ApplicationController

  def create
    @track = Track.new(track_params)
<<<<<<< cd9cfc8b5621f7040429c272c178e7af51a8ebe7
=======

>>>>>>> remove debugger
    if @track.save
      render json: @track
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def index
    @tracks = Track.all
    render json: @tracks
  end

  def delete
    @track = Track.find(params[:id])
    @track.destroy
    render json: @track
  end

  private
  def track_params
    params.require(:track).permit(:name, :roll)
  end
end
