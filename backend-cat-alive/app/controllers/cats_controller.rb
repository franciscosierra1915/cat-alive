class CatsController < ApplicationController

    before_action :find_cat, only: [:show, :update, :destroy]

    def index
        cats = Cat.all
        render json: cats, include: [:user, :shelter]
    end

    def show
        render json: cat, include: [:user, :shelter]
    end

    def create 
        cat = Cat.create(cat_params)
        render json: cat, include: [:user, :shelter]
    end

    def update
        cat.update(cat_params)
        render json: cat, include: [:user, :shelter]
    end

    def destroy
        cat.destroy
    end

    private 

    def cat_params 
        params.require(:cat).permit(:petfinder_id, :name, :photo, :age, :description, :status, :size, :gender, :petfinder_url, :shelter_id, :user_id, :vet_id)
    end

    def find_cat
        cat = Cat.find(params[:id])
    end

end
