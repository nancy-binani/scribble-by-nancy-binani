# frozen_string_literal: true

class Redirection < ApplicationRecord
  belongs_to :site
  validate :check_if_redirection_cycle_present, on: [:create, :update]
  validates :to, uniqueness: { scope: :from }

  private

    def check_redirection_loop
      is_cycle_present = true
      current_to = self.to

      while self.from != current_to
        if Redirection.where(from: current_to).present?
          current_to = Redirection.find_by!(from: current_to).to
        else
          is_cycle_present = false
          break
        end
      end
      if is_cycle_present
        errors.add(:base, t("redirection.check_redirection_loop"))
      end
    end

    def check_if_redirection_cycle_present
      if self.from == self.to
        errors.add(:redirection, t("redirection.to_from_check"))
      elsif check_redirection_loop
      end
    end
end
