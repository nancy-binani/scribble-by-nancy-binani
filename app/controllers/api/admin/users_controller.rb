# frozen_string_literal: true

class Api::Admin::UsersController < ApplicationController
  def index
    User.first
  end
end
