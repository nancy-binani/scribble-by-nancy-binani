# frozen_string_literal: true

class Redirection < ApplicationRecord
  belongs_to :assigned_site, foreign_key: "assigned_site_id", class_name: "Site"

  validate :check_redirection_loop, on: [:create, :update]
  validate :to_and_from_url_not_equal, on: [:create, :update]
  validates :oldurl, uniqueness: true, presence: true

  private

    def check_redirection_loop
      if newurl_exist_in_oldurl? && oldurl_exist_in_newurl?
        errors.add(:base, t("redirection.redirection_loop"))
      end
   end

    def newurl_exist_in_oldurl?
      Redirection.where(newurl: self.oldurl).present?
    end

    def oldurl_exist_in_newurl?
      Redirection.where(oldurl: self.newurl).present?
    end

    def to_and_from_url_not_equal
      if self.oldurl == self.newurl
        errors.add(:base, t("redirection.to_from_check"))
      end
    end
end
