import { DesignerToolbarSettings } from '@shesha/reactjs';

export const tagSettingsForm = new DesignerToolbarSettings()
  .addSectionSeparator({
    id: 'd498f566-4251-11ec-81d3-0242ac130003',
    name: 'separator1',
    parentId: 'root',
    label: 'Display',
    sectionName: '',
  })
  .addTextField({
    id: 'd498f76e-4251-11ec-81d3-0242ac130003',
    name: 'name',
    parentId: 'root',
    label: 'Name',
    validate: { required: true },
  })
  .addTextField({
    id: 'd498f91c-4251-11ec-81d3-0242ac130003',
    name: 'color',
    parentId: 'root',
    label: 'Color',
  })
  .addTextField({
    id: 'd498fb60-4251-11ec-81d3-0242ac130003',
    name: 'text',
    parentId: 'root',
    label: 'Text',
  })

  .addTextArea({
    id: 'd498fc14-4251-11ec-81d3-0242ac130003',
    name: 'customVisibility',
    parentId: 'root',
    label: 'Custom Visibility',
    autoSize: false,
    showCount: false,
    allowClear: false,
    description:
      'Enter custom visibility code.  You must return true to show the component. The global variable data is provided, and allows you to access the data of any form component, by using its API key.',
  }).settings;
