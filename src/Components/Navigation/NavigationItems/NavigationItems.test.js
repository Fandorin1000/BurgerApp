import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems/>', () => {
    it('should two <NavigationItem/> elements is authenticated', () => {
        const wrapper = shallow(<NavigationItems isAuth />);
        expect(wrapper.find(NavigationItem)).toHaveLength(4);
    })
});
