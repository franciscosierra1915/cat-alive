class VetsController < ApplicationController

    before_action :find_vet, only: [:show, :update, :destroy]

    def index
        vets = Vet.all
        render json: vets
    end

    def show
        render json: vet
    end

    def create 
        vet = Vet.create(vet_params)
        render json: vet
    end

    def update
        vet.update(vet_params)
        render json: vet
    end

    def destroy
        vet.destroy
    end

    private 

    def vet_params 
        params.require(:vet).permit()
    end

    def find_vet
        vet = Vet.find(params[:id])
    end

end
