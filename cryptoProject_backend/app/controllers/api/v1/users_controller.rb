class Api::V1::UsersController < ApplicationController
  skip_before_action :authorized, only: ['create']

  def create
    @user = User.create(user_params)
    if @user.valid?
      jwt = encode_token(user_id: @user.id)
      render json: { user: UserSerializer.new(@user), jwt: jwt }, status: :created
    else
      render json: { error: 'failed to create user' }, status: :not_acceptable
    end
  end

  def update
    current_user.update(user_params)
    render json: {user: UserSerializer.new(current_user)}, status: :ok
  end

  def destroy
    current_user.delete
  end

  def shelf
    @user = User.find(params[:id])
    render json: { cryptos: @user.cryptos }, status: :ok
  end

  def addCrypto
    @user = current_user
    @crypto = Crypto.find(user_crypto_params[:crypto_id])
    if @user && @crypto
      UserCrypto.create(user: @user, crypto: @crypto)
      render json: { user: UserSerializer.new(@user)}, status: :accepted
    else
      render json: { error: 'Invalid crypto id.'}, status: :not_acceptable
    end
  end
  

  def removeCrypto
    @user = current_user
    @crypto = Crypto.find(params[:id])
    if @user && @crypto
      UserCrypto.find_by(user: @user, crypto: @crypto).delete
      render json: { user: UserSerializer.new(@user)}, status: :accepted
    else
      render json: { error: 'Invalid crypto id.'}, status: :not_acceptable
    end
  end

  def profile
    render json: { user: UserSerializer.new(current_user)}, include: '**', status: :accepted
  end


  private
  def user_params
    params.require(:user).permit(:username, :password)
  end

  def user_crypto_params
    params.permit(:user_id, :crypto_id)
  end

end
