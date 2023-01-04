# frozen_string_literal: true

class Api::Public::Articles::ReportsController < ApplicationController
  def create
    ReportsWorker.perform_async(current_user.id)
  end

  def download
    unless current_user.report.attached?
      respond_with_error("Not found") and return
    end

    send_data current_user.report.download, filename: pdf_file_name, content_type: "application/pdf"
  end

  private

    def report_path
      @_report_path ||= Rails.root.join("tmp/#{pdf_file_name}")
    end

    def pdf_file_name
      "scribble_articles_report.pdf"
    end
end
