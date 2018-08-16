import React from 'react';
import { shallow } from 'enzyme';
import demand from 'must';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
StyleSheetTestUtils.suppressStyleInjection();
import Footer from '../';

describe('<Footer />', () => {
	it('should render a <footer> tag', () => {
		const component = shallow(<Footer />);
		demand(component.find('footer').type()).eql('footer');
		demand(component.find('footer').length).eql(1);
	});
});
