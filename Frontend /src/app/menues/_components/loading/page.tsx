import React from "react";
import { Skeleton, Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";

const LoadingTreeSkeleton: React.FC = () => {
  const treeData = Array.from({ length: 3 }, (_, index) => ({
    title: (
      <div className="flex items-center">
        <Skeleton.Button
          active
          size="small"
          style={{ width: "20px", marginRight: "8px" }}
        />
        <Skeleton active paragraph={false} title={{ width: 100 }} />
      </div>
    ),
    key: `parent-${index}`,
    children: Array.from({ length: 3 }, (_, childIndex) => ({
      title: (
        <div className="flex items-center">
          <Skeleton.Button
            active
            size="small"
            style={{ width: "20px", marginRight: "8px" }}
          />
          <Skeleton active paragraph={false} title={{ width: 80 }} />
        </div>
      ),
      key: `child-${index}-${childIndex}`,
      children: [],
    })),
  }));

  return (
    <Tree
      showLine
      blockNode
      defaultExpandAll
      switcherIcon={<DownOutlined />}
      treeData={treeData}
      className="loading-tree-skeleton"
    />
  );
};

export default LoadingTreeSkeleton;
