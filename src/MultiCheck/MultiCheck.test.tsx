import '@testing-library/jest-dom';

import {fireEvent, getAllByRole, render} from '@testing-library/react';
import React from 'react';

import MultiCheck, {Option} from './MultiCheck';

const options: Option[] = [
  {label: 'aaa', value: '111'},
  {label: 'bbb', value: '222'},
  {label: 'ccc', value: '333'},
  {label: 'ddd', value: '444'},
  {label: 'eee', value: '555'},
  {label: 'fff', value: '666'},
  {label: 'ggg', value: '777'},
  {label: 'hhh', value: '888'},
  {label: 'iii', value: '999'},
];

describe('MultiCheck', () => {
  describe('initialize', () => {
    it('renders correctly without the optional props', () => {
      expect(render(<MultiCheck options={options} />).container).toMatchSnapshot();
    });

    it('renders the label if label provided', () => {
      expect(render(<MultiCheck label="my-multi-check" options={options} />).container).toMatchSnapshot();
    });

    it('renders different column configurations correctly', () => {
      expect(render(<MultiCheck options={options} columns={1} />).container).toMatchSnapshot();
      expect(render(<MultiCheck options={options} columns={2} />).container).toMatchSnapshot();
      expect(render(<MultiCheck options={options} columns={3} />).container).toMatchSnapshot();
    });
  });

  describe('base logic', () => {
    it('checks provided values correctly', () => {
      const numOfCheckedOptions = 2;

      const {container} = render(
        <MultiCheck
          options={options}
          values={options.slice(0, numOfCheckedOptions).map((option) => option.value)}
        />,
      );

      getAllByRole(container, 'checkbox').forEach((element, index) => {
        if (index === 0 || index > numOfCheckedOptions) {
          expect(element).not.toBeChecked();
        } else {
          expect(element).toBeChecked();
        }
      });
    });

    it('returns all checked values correctly when they change', () => {
      const onChange = jest.fn();
      const {container} = render(<MultiCheck options={options} onChange={onChange} />);

      fireEvent.click(getAllByRole(container, 'checkbox')[1]);

      expect(onChange).toHaveBeenCalledWith([options[0].value]);
    });
  });

  describe('select-all logic', () => {
    it('uncheckes select-all by default if any other option is unchecked', () => {
      const {container} = render(
        <MultiCheck options={options} values={options.slice(1).map((option) => option.value)} />,
      );

      expect(getAllByRole(container, 'checkbox')[0]).not.toBeChecked();
    });

    it('returns all options when select-all is checked', () => {
      const onChange = jest.fn();
      const {container} = render(<MultiCheck options={options} onChange={onChange} />);

      fireEvent.click(getAllByRole(container, 'checkbox')[0]);

      expect(onChange).toHaveBeenCalledWith(options.map((option) => option.value));
    });

    it('checkes select-all by default if all other options are checked', () => {
      const {container} = render(
        <MultiCheck options={options} values={options.map((option) => option.value)} />,
      );

      expect(getAllByRole(container, 'checkbox')[0]).toBeChecked();
    });

    it('returns no options when select-all is unchecked', () => {
      const onChange = jest.fn();
      const {container} = render(
        <MultiCheck options={options} onChange={onChange} values={options.map((option) => option.value)} />,
      );

      fireEvent.click(getAllByRole(container, 'checkbox')[0]);

      expect(onChange).toHaveBeenCalledWith([]);
    });
  });
});
