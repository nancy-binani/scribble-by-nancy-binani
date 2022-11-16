# frozen_string_literal: true

class Api::Admin::UsersController < ApplicationController
  def index
    user = User.first
  end
end
