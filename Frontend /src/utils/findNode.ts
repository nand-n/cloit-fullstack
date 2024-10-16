import { DataNode } from "antd/es/tree";

export const findNodeByKey = (key: string, nodes: DataNode[]): DataNode | null => {
    for (const node of nodes) {
      if (node.key === key) {
        return node;
      }
      if (node.children) {
        const result = findNodeByKey(key, node.children);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };