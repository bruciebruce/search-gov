require 'spec_helper'

describe TopNExistsQuery, "#body" do
  let(:query) { TopNExistsQuery.new('aff_name', {field: 'raw', size: 1000}) }

  subject(:body) { query.body }

  it { should == %q({"query":{"filtered":{"filter":{"bool":{"must":[{"term":{"affiliate":"aff_name"}},{"exists":{"field":"modules"}}],"must_not":[{"term":{"useragent.device":"Spider"}},{"term":{"raw":""}}]}}}},"aggs":{"agg":{"terms":{"field":"raw","size":1000}}}})}

end