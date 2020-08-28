class SheltersController < ApplicationController

    before_action :find_shelter, only: [:show, :update, :destroy]

    def index
        shelters = Shelter.all
        render json: shelters
    end

    def show
        render json: shelter
    end

    def create 
        shelter = Shelter.create(shelter_params)
        render json: shelter
    end

    def update
        shelter.update(shelter_params)
        render json: shelter
    end

    def destroy
        shelter.destroy
    end

    private 

    def shelter_params 
        params.require(:shelter).permit()
    end

    def find_shelter
        shelter = Shelter.find(params[:id])
    end
end
