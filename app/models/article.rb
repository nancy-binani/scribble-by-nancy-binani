# frozen_string_literal: true

class Article < ApplicationRecord
  belongs_to :assigned_category, foreign_key: :category_id, class_name: "Category"
  belongs_to :assigned_site, foreign_key: :assigned_site_id, class_name: "Site"

  validates :title, presence: true, length: { maximum: 50 }, format: { with: /\A[a-zA-Z0-9]+\z/ }
  validate :slug_not_changed

  validates :body, presence: true, length: { maximum: 10000 }
  validates :status, presence: true

  before_create :check_status
  before_update :check_status

  private

    def check_status
      if status === "Published"
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
      if slug_changed? && self.persisted?
        errors.add(:slug, t("task.slug.immutable"))
      end
    end
end
