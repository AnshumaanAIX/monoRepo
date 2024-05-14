export const configProps = {
  value: '',
  label: 'Picklist Sample',
  placeholder: 'Select...',
  listType: 'associated',
  datasource: [
    {
      key: 'Option 1',
      value: 'Option 1'
    },
    {
      key: 'Option 2',
      value: 'Option 2'
    },
    {
      key: 'Option 3',
      value: 'Option 3'
    }
  ],
  helperText: 'Picklist Helper Text',
  testId: 'picklist-12345678',
  hasSuggestions: false
};

export const stateProps = {
  value: '.PicklistSample',
  placeholder: 'Select...',
  datasource: '.PicklistSample',
  hasSuggestions: false
};
