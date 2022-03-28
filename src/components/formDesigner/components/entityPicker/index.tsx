import React from 'react';
import { IToolboxComponent } from '../../../../interfaces';
import { FormMarkup, IConfigurableFormComponent } from '../../../../providers/form/models';
import { EllipsisOutlined } from '@ant-design/icons';
import ConfigurableFormItem from '../formItem';
import settingsFormJson from './settingsForm.json';
import { validateConfigurableComponentSettings } from '../../../../providers/form/utils';
import { EntityPicker } from '../../..';
import { Alert } from 'antd';
import { useForm } from '../../../../providers';
import { DataTypes } from '../../../../interfaces/dataTypes';
import EntityFooter from './entityFooter';

export interface IEntityPickerComponentProps extends IConfigurableFormComponent {
  placeholder?: string;
  items?: [];
  hideBorder?: boolean;
  disabled?: boolean;
  tableId: string;
  entityType: string;
  title?: string;
  displayEntityKey?: string;
  allowNewRecord?: boolean;
  modalFormId?: string;
  modalTitle?: string;
  showModalFooter?: boolean;
  onSuccessRedirectUrl?: string;
  submitHttpVerb?: 'POST' | 'PUT';
}

const settingsForm = settingsFormJson as FormMarkup;

const EntityPickerComponent: IToolboxComponent<IEntityPickerComponentProps> = {
  type: 'entityPicker',
  name: 'Entity Picker',
  icon: <EllipsisOutlined />,
  dataTypeSupported: ({ dataType }) => dataType === DataTypes.entityReference,
  factory: (model: IEntityPickerComponentProps) => {
    const { formMode } = useForm();

    if (formMode === 'designer' && !model?.tableId && !model?.entityType) {
      return (
        <Alert
          showIcon
          message="EntityPicker not configured properly"
          description="Please make sure that you've specified either the 'tableId' or 'entityType' property."
          type="warning"
        />
      );
    }

    return (
      <ConfigurableFormItem model={model} initialValue={model?.defaultValue}>
        <EntityPicker
          formId={model?.id}
          disabled={model.disabled}
          tableId={model?.tableId}
          displayEntityKey={model?.displayEntityKey}
          entityType={model?.entityType}
          entityFooter={<EntityFooter {...model} />}
          configurableColumns={model?.items}
        />
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default EntityPickerComponent;
// { "id": "8400a8ec-577d-4468-9347-5601f952b44c", "label": "Button", "value": "button" },
//         { "id": "cc268f50-47ca-4e4e-966f-7f2abfec902f", "label": "Separator", "value": "separator" },
//         { "id": "b4117249-8c2f-4991-a96c-9ea434293120", "label": "Line", "value": "line" }
