# frozen_string_literal: true

class Api::UsersController < ApplicationController
  def index
    user = User.first
  end
end
