import React, { FC, useEffect, useState } from 'react';
import { Form, Spin, Button, Divider, Popconfirm } from 'antd';
import { useCheckListItemGet, useCheckListItemUpdate, CheckListItemDto } from 'api/checkListItem';
import { useMutate } from 'restful-react';
import { CollapsiblePanel, ConfigurableForm, ValidationErrors } from '@shesha/reactjs';

interface ICheckListItemDetailsProps {
  id: string;
  onDeleted?: () => void;
  onUpdated?: (updated: CheckListItemDto) => void;
}

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

const CheckListItemDetails: FC<ICheckListItemDetailsProps> = ({ id, onDeleted, onUpdated }) => {
  const [editMode, setEditMode] = useState(false);
  const {
    loading: loading,
    refetch: doFetch,
    error: fetchError,
    data: serverData,
  } = useCheckListItemGet({
    lazy: true,
  });

  const { mutate: deleteItem } = useMutate({
    queryParams: {}, // Important if you'll be calling this as a side-effect
    path: '/api/services/app/CheckListItem/Delete',
    verb: 'DELETE',
  });
  const [editForm] = Form.useForm();
  const [detailsForm] = Form.useForm();

  const fetchData = async () => {
    await doFetch({ queryParams: { id } });
  };

  useEffect(() => {
    fetchData().then(() => {
      detailsForm.resetFields();
    });
    if (editMode) setEditMode(false);
  }, [id]);

  const model = serverData?.result;

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEditClick = () => {
    // reset fields
    setEditMode(false);
  };

  const { mutate: saveItem } = useCheckListItemUpdate({});
  const handleSubmit = (values) => {
    saveItem(values).then((response) => {
      // update local data
      fetchData().then(() => {
        detailsForm.resetFields();
      });

      // update parent
      if (onUpdated) onUpdated(response.result);

      setEditMode(false);
    });
  };

  const handleDeleteClick = () => {
    deleteItem('', { queryParams: { id: id } }).then(() => {
      if (onDeleted) onDeleted();
    });
  };

  return (
    <Spin spinning={loading}>
      <ValidationErrors error={fetchError} />
      {model && (
        <React.Fragment>
          <CollapsiblePanel header="Item Details">
            {!editMode && (
              <ConfigurableForm
                mode="edit"
                {...formItemLayout}
                form={detailsForm}
                path="/check-list-item/details"
                initialValues={model}
              />
            )}
            {editMode && (
              <ConfigurableForm
                mode="edit"
                {...formItemLayout}
                form={editForm}
                onFinish={handleSubmit}
                path="/check-list-item/edit"
                initialValues={model}
              />
            )}

            <Divider></Divider>
            <div>
              <Button.Group>
                <Popconfirm title="Are you sure want to delete this item?" onConfirm={handleDeleteClick}>
                  <Button danger>Delete</Button>
                </Popconfirm>
              </Button.Group>

              {!editMode && (
                <Button.Group>
                  <Button type="default" onClick={handleEditClick}>
                    Edit
                  </Button>
                </Button.Group>
              )}

              {editMode && (
                <Button.Group>
                  <Button type="default" onClick={handleCancelEditClick}>
                    Cancel
                  </Button>
                  <Button type="primary" onClick={() => editForm.submit()}>
                    Save
                  </Button>
                </Button.Group>
              )}
            </div>
          </CollapsiblePanel>
        </React.Fragment>
      )}
    </Spin>
  );
};

export default CheckListItemDetails;
