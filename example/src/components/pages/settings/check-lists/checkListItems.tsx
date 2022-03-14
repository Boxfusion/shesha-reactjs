import React, { FC, useState, useEffect } from 'react';
import { Tree, Row, Col, Button, Alert } from 'antd';
import { EventDataNode } from 'rc-tree/lib/interface';
import CheckListItemDetails from './checkListItemDetails';
import {
  CheckListItemDto,
  CheckListTreeItemDto,
  useCheckListItemGetChildTreeItems,
  useCheckListItemUpdateChildItems,
  useCheckListItemCreate,
} from 'api/checkListItem';
import { DataNode } from 'rc-tree/lib/interface';
import { CollapsiblePanel, GenericCreateModal } from '@shesha/reactjs';

export interface IProps {
  checklistId: string;
}

interface NodeWithData extends DataNode {
  data: CheckListTreeItemDto;
  parent?: NodeWithData;
}

export const CheckListItems: FC<IProps> = ({ checklistId }) => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const { mutate: fetchItems } = useCheckListItemGetChildTreeItems({});
  const { mutate: updateChilds } = useCheckListItemUpdateChildItems({});

  const updateLevel = (parent?: NodeWithData): PromiseLike<void> =>
    new Promise((resolve, reject) => {
      fetchItems({ checkListId: checklistId, parentId: parent?.data?.id })
        .then((d) => {
          const currentLevelState = parent ? (parent.children as NodeWithData[]) ?? [] : treeData;

          // remove deleted nodes
          const updatedNodes = currentLevelState.filter((cn) => d.result.find((nn) => nn.id == cn.key));

          // add new nodes
          d.result.forEach((nn, idx) => {
            if (!currentLevelState.find((cn) => cn.data.id == nn.id)) {
              const node: NodeWithData = { ...mapItem(nn), parent: parent };
              updatedNodes.splice(idx, 0, node);
            }
          });

          if (parent) {
            parent.children = updatedNodes;
            parent.isLeaf = parent.children.length == 0;
            setTreeData([...treeData]);
          } else setTreeData([...updatedNodes]);

          resolve();
        })
        .catch((e) => {
          console.log(e);
          reject();
        });
    });

  const mapItem = (item: CheckListTreeItemDto): NodeWithData => {
    return {
      data: item,
      key: item.id,
      title: item.name,
      parent: null,
      isLeaf: !item.hasChilds,
    };
  };

  useEffect(() => {
    fetchItems({ checkListId: checklistId, parentId: null }).then((d) => {
      // add parent
      const items = (d?.result ?? []).map((n) => mapItem(n));
      setTreeData(items);
    });
  }, []);

  const [selectedNode, setSelectedNode] = useState<NodeWithData>(null);
  const [treeData, setTreeData] = useState<Array<NodeWithData>>([]);

  const handleSelect = (_selectedKeys, { selectedNodes }) => {
    const selectedRef = selectedNodes.length > 0 ? selectedNodes[0] : null;
    setSelectedNode(selectedRef);
  };

  // const handleExpand = () => {};

  function updateTreeData(list, key, children) {
    return list.map((node) => {
      if (node.key === key) {
        return { ...node, children };
      }

      if (node.children) {
        return { ...node, children: updateTreeData(node.children, key, children) };
      }

      return node;
    });
  }

  const handleLoadData = (treeNode: EventDataNode): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (treeNode.children) {
        resolve();
        return;
      }

      const parent = treeNode['data'] as CheckListTreeItemDto;

      fetchItems({ checkListId: checklistId, parentId: parent.id })
        .then((d) => {
          const loadedChilds = d?.result.map<NodeWithData>((a) => ({ ...mapItem(a), parent: null })) ?? [];
          setTreeData((data) => updateTreeData(data, parent.id, loadedChilds));
          resolve();
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  };

  const handleUpdated = (model) => {
    selectedNode.title = model.name;
    setTreeData([...treeData]);
  };

  const handleDeleted = () => {
    if (selectedNode) {
      const data = [...treeData];

      loop(data, selectedNode.data.id, ({ index, level, parent }) => {
        level.splice(index, 1);
        if (parent) parent.hasChilds = parent.children.length > 0;
      });
      setTreeData(data);
    }
    setSelectedNode(null);
  };

  const loop = (data, key, callback, parent = null) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === key) {
        return callback({
          item: data[i],
          index: i,
          level: data,
          parent: parent,
        });
      }
      if (data[i].children) {
        loop(data[i].children, key, callback, data[i]);
      }
    }
  };

  const handleDrop = (info) => {
    const dropId = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const save = (parentId, childIds, newData) => {
      updateChilds({ checkListId: checklistId, parentId: parentId, childIds: childIds }).then(() => {
        setTreeData([...newData]);
      });
    };

    // reursively search item in the array and execute callback
    const data = [...treeData];

    // Find dragObject and remove from the source level
    let dragObj;
    loop(data, dragKey, ({ item, index, level, parent }) => {
      level.splice(index, 1);
      if (parent) parent.hasChilds = parent.children.length > 0;

      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropId, ({ item }) => {
        item.children = item.children || [];
        // where to insert
        item.children = [...item.children];
        item.children.unshift(dragObj);
        item.hasChilds = item.children.length > 0;
        save(
          dropId,
          item.children.map((i) => i.key),
          data
        );
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropId, ({ item, parent }) => {
        item.children = item.children || [];
        // where to insert
        item.children.unshift(dragObj);
        if (parent) parent.hasChilds = parent.children.length > 0;
        save(
          parent?.data?.id,
          item.children.map((i) => i.key),
          data
        );
      });
    } else {
      loop(data, dropId, ({ index, level, parent }) => {
        if (dropPosition === -1) {
          level.splice(index, 0, dragObj);
        } else {
          level.splice(index + 1, 0, dragObj);
        }
        if (parent) parent.hasChilds = parent.children.length > 0;
        save(
          parent?.data?.id,
          level.map((i) => i.key),
          data
        );
      });
    }
  };

  const handleItemCreated = () => {
    setCreateModalVisible(false);
    const parent = selectedNode;

    updateLevel(parent);
  };

  const prepareNewItem = (values) => {
    const prepared: CheckListItemDto = {
      ...values,
      checkListId: checklistId,
      parentId: selectedNode?.key,
    };
    return prepared;
  };

  return (
    <CollapsiblePanel
      header="Check list items"
      extra={<Button onClick={() => setCreateModalVisible(true)}>Add</Button>}
    >
      <Row>
        <Col span={10}>
          <div style={{ backgroundColor: 'white' }}>
            <Tree
              defaultExpandParent={true}
              draggable={true}
              loadData={handleLoadData}
              showLine={true}
              onSelect={handleSelect}
              // onExpand={handleExpand}
              onDrop={handleDrop}
              treeData={treeData}
            ></Tree>
          </div>
        </Col>
        <Col span={14}>
          {selectedNode && (
            <CheckListItemDetails
              id={selectedNode?.data?.id}
              onUpdated={handleUpdated}
              onDeleted={handleDeleted}
            ></CheckListItemDetails>
          )}
          {selectedNode == null && <Alert message="Select item to view details" type="info" />}
        </Col>
        {createModalVisible && (
          <GenericCreateModal
            visible={createModalVisible}
            onCancel={() => setCreateModalVisible(false)}
            onSuccess={handleItemCreated}
            updater={useCheckListItemCreate}
            title="Create"
            formPath="/check-list-item/create"
            prepareValues={prepareNewItem}
          ></GenericCreateModal>
        )}
      </Row>
    </CollapsiblePanel>
  );
};

export default CheckListItems;
