module User
  class Current
    attr_reader :uid

    def initialize(uid)
      @uid = uid
    end

    def billing_items
      @billing_items ||= User::Finances::BillingItems.new(self)
    end
  end
end