import React from 'react';

import { configure, shallow } from 'enzyme'; //enzyme - to render react component
//'shallow' renders the component, but not deeply - nested components are rendered as placeholders
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()}); //connect enzyme

describe('<NavigationItems />', () => { //first arg: description seen in console, second: testing function
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);  //runs that before each 'it' test
  });

  it('should render two <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if authenticated', () => {
    //wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({isAuthenticated: true}); //changing props - here adding 'isAuthenticated' prop
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render an exact "logout" NavigationItem if authenticated', () => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
  });
}); 

//JEST documentation (e.g. expect(), .toHaveLength())
//  https://jestjs.io/docs/en/getting-started
//  https://jestjs.io/docs/en/expect
//  https://jestjs.io/docs/en/mock-function-api
//ENZYME documentation (e.g. shallow(), .setProps(), .find(), .contains()):
//  https://enzymejs.github.io/enzyme/docs/api/