# frozen_string_literal: true

class Api::UsersController < ApplicationController
  def index
    users = User.all
    respond_with_json({ users: users })
  end
end
