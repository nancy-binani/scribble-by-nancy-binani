# frozen_string_literal: true

class Article < ApplicationRecord
  MAX_TITLE_LENGTH = 255
  VALID_TITLE_REGEX = /\A[a-zA-Z0-9]+\z/
  MAX_PAGINATES = 10
  MAX_PAGES = 25
  max_paginates_per MAX_PAGINATES
  max_pages MAX_PAGES
  enum status: { draft: "draft", published: "published" }
  has_paper_trail
  has_many :visits
  belongs_to :category
  belongs_to :user

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }, format: { with: VALID_TITLE_REGEX }
  validate :slug_not_changed
  validate :scheduled_times_cannot_be_same
  validate :check_valid_scheduled_datetime
  validate :scheduled_datetime_should_not_be_in_past
  validates :body, presence: true
  before_create :set_slug, if: -> { status.to_sym == :published }
  before_update :set_slug, if: -> { slug.nil? && status.to_sym == :published }
  acts_as_list scope: :category

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

    def scheduled_times_cannot_be_same
      if self.scheduled_publish && self.scheduled_unpublish && self.scheduled_publish == self.scheduled_unpublish
        errors.add(:article, t("article.schedule_time_cannot_be_same"))
      end
    end

    def check_valid_scheduled_datetime
      if self.scheduled_unpublish && self.scheduled_publish
        if self.status == "published" && self.scheduled_unpublish > self.scheduled_publish
          errors.add(:article, t("article.invalid_publish_datetime"))
        end
        if self.status == "draft" && self.scheduled_publish > self.scheduled_unpublish
          errors.add(:article, t("article.invalid_unpublish_datetime"))
        end
      end
    end

    def scheduled_datetime_should_not_be_in_past
      if self.scheduled_publish.present? && self.scheduled_publish.past?
        errors.add(:article, t("article.invalid_schedule_time"))
      end
      if self.scheduled_unpublish.present? && self.scheduled_unpublish.past?
        errors.add(:article, t("article.invalid_schedule_time"))
      end
    end
end
