import { IconType } from "../components/shaIcon";
import { DataTypes } from "../interfaces/dataTypes";
import { IPropertyMetadata } from "../interfaces/metadata";
import { camelize } from "../providers/form/utils";

export const getIconByDataType = (dataType: string): IconType => {
  switch (dataType) {
    case DataTypes.array: return 'OrderedListOutlined';
    case DataTypes.object: return 'PartitionOutlined';
    case DataTypes.string: return 'FieldStringOutlined';
    case DataTypes.number: return 'FieldNumberOutlined';
    case DataTypes.entityReference: return 'PartitionOutlined';
    case DataTypes.date: return 'CalendarOutlined';
    case DataTypes.dateTime: return 'FieldTimeOutlined';
    case DataTypes.time: return 'ClockCircleOutlined';
    case DataTypes.guid: return 'LinkOutlined';
    case DataTypes.boolean: return 'CheckSquareOutlined';
    case DataTypes.referenceListItem: return 'BookOutlined';

    default: return null;
  }
}

export const getFullPath = (property: IPropertyMetadata) => {
  const name = camelize(property.path);
  const prefix = property.prefix ? camelize(property.prefix) : null;

  return (prefix ?? '') === ''
    ? camelize(name)
    : `${prefix}.${name}`;
}