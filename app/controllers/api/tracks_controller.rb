require 'byebug'

class Api::TracksController < ApplicationController

  def create
    @track = Track.new(track_params)
    @track.name = @track.name.titleize
    if @track.save
      render json: @track
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def show
    @track = Track.find(params[:id])
    render json: @track
  end

  def index
    @tracks = Track.all
    render json: @tracks
  end

  def destroy
    @track = Track.find(params[:id])

    @track.destroy
    render json: @track, status: 200
  end

  private
  def track_params
    params.require(:track).permit(:name, :roll)
  end
end
