# frozen_string_literal: true

class ReportsWorker
  include Sidekiq::Worker
  include ActionView::Helpers::TranslationHelper

  def perform(user_id, report_path)
    ActionCable.server.broadcast(user_id, { message: t("report.render"), progress: 25 })
    articles = Article.accessible_to(user_id)

    content = ApplicationController.render(
      assigns: {
        articles: articles
      },
      template: "api/public/articles/report/download",
      layout: "pdf"
    )
    ActionCable.server.broadcast(user_id, { message: t("report.generate"), progress: 50 })
    pdf_report = WickedPdf.new.pdf_from_string content
    current_user = User.find(user_id)
    ActionCable.server.broadcast(user_id, { message: t("report.upload"), progress: 75 })
    File.open(report_path, "wb") do |f|
      f.write(pdf_report)
    end
    ActionCable.server.broadcast(user_id, { message: t("report.attach"), progress: 100 })
  end
end
