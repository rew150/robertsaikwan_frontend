import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

const models = [
  'Model1',
]

export const defaultModel = models[0];

function ModelOptions(props) {
  return (
    <Select {...props}>
      {
        models.map(v => (
          <Option value={v} key={v}>
            {v}
          </Option>
        ))
      }
    </Select>
  );
}

export default ModelOptions;
