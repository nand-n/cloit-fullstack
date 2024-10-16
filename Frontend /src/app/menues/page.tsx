"use client";
import React, { useCallback, useEffect, useState } from "react";
import { PlusOutlined, DeleteOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tree } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
import { DataNode, EventDataNode } from "antd/es/tree";
import Breadcrumb from "@/components/commons/bradCramp";
import BreadcrumbWithIcon from "@/components/commons/breadCrambWtihIcon";
import { AiOutlineAppstore, AiOutlineFolder } from "react-icons/ai";
import CustomSelect from "@/app/menues/_components/customSelect.tsx/customSelect";
import { RootState } from "@/lib/store/store";
import ExpandAndColapse from "./_components/expandAndCollapse";
import LoadingTreeSkeleton from "./_components/loading/page";
import { Category, UpdateCategoryData } from "@/types/categories";
import { v4 as uuidv4 } from "uuid";
import { expandAll } from "@/lib/store/features/treeSlice/slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import {
  addChildCategoryStart,
  deleteCategoryStart,
  fetchCategoriesStart,
  updateCategoryStart,
} from "@/lib/store/features/categories/slice";
import { findNodeByKey } from "@/utils/findNode";
import { MdDelete } from "react-icons/md";

export interface CustomDataNode extends DataNode {
  depth?: number;
  parent?: string;
}

const App: React.FC = () => {
  const {
    categories,
    rootNodeId,
    sucessfullyAdded,
    loading,
    updateLoading,
    deleteLoading,
  } = useAppSelector((state: RootState) => state.categories);

  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<DataNode | null>(null);
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const mapCategoriesToTreeData = useCallback(
    (categories: Category[]): TreeDataNode[] => {
      return categories.map((category) => ({
        title: category.name,
        key: category.id,
        parent: category.parentId,
        depth: category.depth,
        children: category.children
          ? mapCategoriesToTreeData(category.children)
          : [],
      }));
    },
    [categories]
  );
  useEffect(() => {
    if (categories.length > 0) {
      const mappedData = mapCategoriesToTreeData(categories);
      setTreeData(mappedData);
    }
  }, [categories]);

  const expandedKeys = useAppSelector(
    (state: RootState) => state.tree.expandedKeys
  );

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    if (selectedKeys.length) {
      const key = selectedKeys[0];
      const { title, depth, parent } =
        info.node as EventDataNode<CustomDataNode>;
      setSelectedNode({ ...info.node, key });
      form.setFieldsValue({
        menuId: key,
        name: title,
        depth: depth,
        parent: parent || null,
      });
    } else {
      setSelectedNode(null);
    }
  };

  const handleAddItem = (data: CustomDataNode) => {
    if (!selectedNode) return;

    const updatedTree = [...treeData];
    const newItem: CustomDataNode = {
      title: "New Item",
      key: uuidv4(),
      parent: String(data.key),
      depth: (data.depth || 0) + 1,
    };

    const node = findNodeByKey(String(selectedNode.key), updatedTree);
    if (node) {
      node.children = node.children ? [...node.children, newItem] : [newItem];
      dispatch(
        addChildCategoryStart({
          parentId: newItem.parent ?? null,
          name: String(newItem.title),
          depth: Number(newItem.depth),
          id: String(newItem.key),
          children: [],
        })
      );
    }
  };

  useEffect(() => {
    dispatch(fetchCategoriesStart(rootNodeId));
  }, [sucessfullyAdded]);

  const titleRender: (node: CustomDataNode) => React.ReactNode = (node) => {
    return (
      <div className="flex items-center">
        <span>{String(node.title)}</span>
        {selectedNode && selectedNode.key === node.key && (
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="small"
            className="ml-2"
            onClick={() => handleAddItem(node)}
          />
        )}
      </div>
    );
  };

  const updateMenuItem = (values: any) => {
    if (selectedNode) {
      const data: UpdateCategoryData = {
        id: String(selectedNode.key),
        updateData: {
          name: String(values.name),
          parentId: values.parent ? String(values.parent) : null,
        },
      };

      dispatch(updateCategoryStart(data));
    }
  };
  const handleDelete = (id: string) => {
    dispatch(deleteCategoryStart(id));
  };

  const onExpand = (newExpandedKeys: any[]) => {
    dispatch(expandAll(newExpandedKeys));
  };

  return (
    <div className="container mx-auto p-4">
      <Breadcrumb
        IconComponent={AiOutlineFolder}
        name="Menus"
        size="large"
        showSeparator={true}
        separator="/"
      />

      <br className="mt-4" />
      <div className="hidden md:block">
        <BreadcrumbWithIcon
          icon={AiOutlineAppstore}
          text="Menus"
          iconSize={26}
          textSize="30px"
        />
      </div>

      <CustomSelect />

      {treeData.length > 0 && <ExpandAndColapse />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="py-4">
          {loading ? (
            <LoadingTreeSkeleton />
          ) : (
            <Tree
              showLine
              blockNode
              expandedKeys={expandedKeys.length > 0 ? expandedKeys : []}
              switcherIcon={<DownOutlined />}
              onSelect={onSelect}
              onExpand={onExpand}
              treeData={treeData}
              titleRender={titleRender}
            />
          )}
        </div>
        <div className="grid p-4">
          {selectedNode && (
            <Form layout="vertical" form={form} onFinish={updateMenuItem}>
              <div className="flex justify-center items-center gap-4 w-full">
                <Form.Item label="Menu ID" name="menuId" className="w-full">
                  <Input readOnly className="h-12 " />
                </Form.Item>
                <Button
                  loading={deleteLoading}
                  danger
                  onClick={() => handleDelete(String(selectedNode.key))}
                  icon={<MdDelete size={20} />}
                  className="flex items-center gap-2"
                />
              </div>

              <div className="w-full lg:w-1/2">
                <Form.Item label="Depth" name="depth">
                  <Input readOnly className="h-12 bg-gray-200" />
                </Form.Item>
                <Form.Item label="Name" name="name">
                  <Input className="h-12" />
                </Form.Item>
                <Form.Item label="Parent" name="parent">
                  <Input readOnly className="h-12 bg-gray-200" />
                </Form.Item>

                <div className="w-full h-16">
                  <Button
                    loading={updateLoading}
                    block
                    type="primary"
                    htmlType="submit"
                    className="mb-4 h-full"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
