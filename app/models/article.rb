# frozen_string_literal: true

class Article < ApplicationRecord
  before_create :set_slug

  validates :title, presence: true, length: { maximum: 50 }
  validates :body, length: { maximum: 1000 }
  validates :author, presence: true
  validates :category, presence: true
  validates :status, presence: true
  validates :slug, uniqueness: true
  validate :slug_not_changed

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
      if slug_changed? && self.persisted?
        errors.add(:slug, "is immutable!")
      end
    end
end
