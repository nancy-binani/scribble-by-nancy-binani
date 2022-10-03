# frozen_string_literal: true

class ArticlesController < ApplicationController
  def index
    tasks = Task.all
    render status: :ok, json: { tasks: tasks }
  end
end
