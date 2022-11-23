# frozen_string_literal: true

class Article < ApplicationRecord
  MAX_TITLE_LENGTH = 255
  VALID_TITLE_REGEX = /\A[a-zA-Z0-9]+\z/

  belongs_to :category
  belongs_to :user

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }, format: { with: VALID_TITLE_REGEX }
  validate :slug_not_changed
  validates :body, presence: true
  validates :status, presence: true

  before_create :set_slug, if: -> { status == "published" }
  before_update :set_slug, if: -> { slug.nil? && status == "published" }

  private

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
