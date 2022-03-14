import React, { FC, useState } from 'react';
import { Select } from 'antd';
import { useNotificationAutocomplete } from 'api/notification';

interface INotificationAutocompleteProps {
  value?: string;
  displayText?: string;
}

const NotificationAutocomplete: FC<INotificationAutocompleteProps> = (props) => {
  const itemsFetcher = useNotificationAutocomplete({ lazy: true });

  const [autocompleteText, setAutocompleteText] = useState(null);
  const options = autocompleteText
    ? itemsFetcher.data?.result?.map((d) => (
        <Select.Option value={d.value} key={d.value}>
          {d.displayText}
        </Select.Option>
      ))
    : props.value && props.displayText
    ? [
        <Select.Option value={props.value} key={props.value}>
          {props.displayText}
        </Select.Option>,
      ]
    : [];

  const handleSearch = (value) => {
    setAutocompleteText(value);
    if (value) {
      itemsFetcher.refetch({ queryParams: { term: value } });
    }
  };

  return (
    <Select
      showSearch
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      notFoundContent={null}
      allowClear={true}
      loading={itemsFetcher.loading}
      {...props}
    >
      {options}
    </Select>
  );
};

export default NotificationAutocomplete;
