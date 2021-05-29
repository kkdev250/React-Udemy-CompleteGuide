//aby testować kontenery (class components) połączone przez 'connect' z redux'em
//należy dodać 'export' przed klasą, którą chcemy testować:
//change:        class BurgerBuilder extends Component {
//into:   export class BurgerBuilder extends Component {
//a potem można zaimportować taki komponent i można testować go W ODERWANIU(!) od redux'a
//ustawiając w testach różne wartości propsów, które oryginalnie pochodziły z reduxa.

import { BurgerBuilder } from './BurgerBuilder'; //pamiętać o dodaniu 'export' w oryginalnym pliku!
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import React from 'react';
import { configure, shallow } from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });

  it('should render <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({ings: {salad: 0}});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});