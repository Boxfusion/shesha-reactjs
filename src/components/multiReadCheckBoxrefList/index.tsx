import { CheckCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useReferenceListGetItems } from '../../apis/referenceList';
import { DisplayFormItem, ShaSpin } from '../../';
import React, { FC } from 'react';

export interface IMultiReadCheckBoxRefListProps {
  readonly listName: string;
  readonly listNamespace: string;
  readonly value?: number;
  readonly display?: 'boolean' | 'check' | 'component' | 'yn';
}

export const binaryToList = (val: number) => {
  const total = [];
  let currentVal = 1;

  while (currentVal <= val) {
    if ((val & currentVal) === currentVal) total.push(currentVal);
    currentVal *= 2;
  }

  return total;
};

export const MultiReadCheckBoxRefList: FC<IMultiReadCheckBoxRefListProps> = ({
  listName,
  listNamespace,
  value,
  display = 'component',
}) => {
  const { data, loading } = useReferenceListGetItems({
    queryParams: { name: listName, namespace: listNamespace },
  });

  const list = binaryToList(value);

  const result = data?.result?.map(i => ({ ...i, checked: list.includes(i?.itemValue) }));

  const displayText = (checked: boolean) => {
    switch (display) {
      case 'boolean':
        return checked ? 'True' : 'False';
      case 'check':
        return checked ? 'Checked' : 'N/A';
      case 'component':
        return checked ? <CheckCircleOutlined /> : <MinusCircleOutlined />;
      case 'yn':
        return checked ? 'Yes' : 'No';

      default:
        return null;
    }
  };

  return (
    <ShaSpin spinning={loading}>
      {result?.map(({ item, checked }) => (
        <DisplayFormItem label={item}>{displayText(checked)}</DisplayFormItem>
      ))}
    </ShaSpin>
  );
};

export default MultiReadCheckBoxRefList;
