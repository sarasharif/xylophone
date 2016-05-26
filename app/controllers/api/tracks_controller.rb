class Api::TracksController < ApplicationController

  def create
    @track = Track.new(track_params)

    debugger;
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
