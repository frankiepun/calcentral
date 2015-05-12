describe Webcast::SignUpEligible do

  let (:eligible_for_webcast_json_uri) { URI.parse "#{Settings.webcast_proxy.base_url}/eligible-for-webcast.json" }

  context 'a fake proxy' do
    subject { Webcast::SignUpEligible.new({:fake => true}) }

    context 'fake data' do
      it 'should return all test data' do
        terms = subject.get
        expect(terms).to have(3).items
        expect(terms['2015-spring']).to contain_exactly(5916, 51991)
        expect(terms['2015-fall']).to contain_exactly(5917, 51992)
        expect(terms['2016-spring']).to be_empty
      end

    end
  end

  context 'a real, non-fake proxy' do
    subject { Webcast::SignUpEligible.new }

    context 'real data', :testext => true do
      it 'should return at least one term' do
        expect(subject.get.keys).to have_at_least(1).items
      end
    end

    context 'when webcast feature is disabled' do
      before { Settings.features.videos = false }
      after { Settings.features.videos = true }
      it 'should return an empty hash' do
        expect(subject.get).to be_empty
      end
    end
  end

end
