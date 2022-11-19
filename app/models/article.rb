# frozen_string_literal: true

class Article < ApplicationRecord
  MAX_TITLE_LENGTH = 255
  REGEX = /\A[a-zA-Z0-9]+\z/

  belongs_to :category
  belongs_to :user

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }, format: { with: /\A[a-zA-Z0-9]+\z/ }
  validate :slug_not_changed
  validates :body, presence: true
  validates :status, presence: true
  enum status: { draft: "draft", published: "published" }, _default: :draft

  before_create :check_status_of_article_on_submit
  before_update :check_status_of_article_on_submit

  private

    def check_status_of_article_on_submit
      if status === "published"
        set_slug
      end
    end

    def set_slug
      itr = 1
      loop do
        title_slug = title.parameterize
        slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
        break self.slug = slug_candidate unless Article.exists?(slug: slug_candidate)

        itr += 1
      end
    end

    def slug_not_changed
      if slug && slug_changed? && self.persisted?
        errors.add(:slug, t("article.slug.immutable"))
      end
    end
end
