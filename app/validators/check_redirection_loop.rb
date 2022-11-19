# frozen_string_literal: true

class CheckRedirectionLoop < ActiveModel::Validator
  include ActionView::Helpers::TranslationHelper
  def check_redirection_loop(record)
    is_cycle_present = false
    current_to = record.to

    while !is_cycle_present
      if Redirection.where(from: current_to).present?
        current_to = Redirection.find_by!(from: current_to).to
        if record.from == current_to
          is_cycle_present = true
          break
        end
      else
        break
      end
    end
    if is_cycle_present
      record.errors.add(:base, t("redirection.check_redirection_loop"))
    end
  end

  def validate(record)
    if record.from == record.to
      record.errors.add(:base, t("redirection.to_from_check"))
    elsif check_redirection_loop(record)
    end
  end
end
