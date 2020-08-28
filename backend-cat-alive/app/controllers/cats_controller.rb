class CatsController < ApplicationController

    before_action :find_cat, only: [:show, :update, :destroy]

    def index
        cats = Cat.all
        render json: cats
    end

    def show
        render json: cat
    end

    def create 
        cat = Cat.create(cat_params)
        render json: cat
    end

    def update
        cat.update(cat_params)
        render json: cat
    end

    def destroy
        cat.destroy
    end

    private 

    def cat_params 
        params.require(:cat).permit()
    end

    def find_cat
        cat = Cat.find(params[:id])
    end

end
