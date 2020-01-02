export const JSON_MODEL = [
  {
    type: 'INPUT',
    id: 'sampleInput',
    label: 'Sample Input',
    maxLength: 42,
    placeholder: 'Sample input',
  },
  {
    type: 'RADIO_GROUP',
    id: 'sampleRadioGroup',
    label: 'Sample Radio Group',
    options: [
      {
        label: 'Option 1',
        value: 'option-1',
      },
      {
        label: 'Option 2',
        value: 'option-2',
      },
      {
        label: 'Option 3',
        value: 'option-3',
      },
    ],
    value: 'option-3',
  },
  {
    type: 'CHECKBOX',
    id: 'sampleCheckbox',
    label: 'I do agree',
  },
];
