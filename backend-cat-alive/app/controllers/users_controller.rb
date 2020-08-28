class UsersController < ApplicationController
    before_action :find_user, only: [:show, :update, :destroy]
    # before_action :define_current_user

    def index
        users = User.all
        render json: users
    end

    def show
        render json: user
    end

    def create 
        user = User.create(user_params)
        render json: user
    end

    def update
        user.update(user_params)
        render json: user
    end

    def destroy
        user.destroy
    end

    private 

    def user_params 
        params.require(:user).permit()
    end

    def find_user
        user = User.find(params[:id])
    end

    # def define_current_user
    #     if params[:id]
    #         @current_user = User.find(params[:id])
    #     else
    #         @current_user = User.new
    #     end
    # end
    
    # def current_user
    #     @current_user
    # end

end
