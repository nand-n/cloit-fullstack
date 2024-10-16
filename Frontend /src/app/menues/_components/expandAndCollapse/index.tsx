"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { expandAll, collapseAll } from "@/lib/store/features/treeSlice/slice";
import { Category } from "@/types/categories";

function ExpandAndCollapse() {
  const dispatch = useDispatch();
  const expandedKeys = useSelector(
    (state: RootState) => state.tree.expandedKeys
  );
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const generateAllKeys = (categories: Category[]) => {
    const keys: string[] = [];
    const traverse = (nodes: Category[]) => {
      nodes.forEach((node) => {
        keys.push(node.id);
        if (node.children) {
          traverse(node.children);
        }
      });
    };
    traverse(categories);
    return keys;
  };

  const handleExpandAll = async () => {
    if (Array.isArray(categories)) {
      const allKeys = generateAllKeys(categories);
      dispatch(await expandAll(allKeys));
    } else {
      console.error("Categories is not an array:", categories);
    }
  };

  const handleCollapseAll = () => {
    dispatch(collapseAll());
  };

  return (
    <div className="flex justify-start items-center gap-4 font-semibold text-md my-4">
      <button
        className={`py-2 px-6 rounded-3xl border-2 ${
          expandedKeys.length
            ? "bg-blue_gray_800 text-white"
            : "bg-white text-black"
        }`}
        onClick={handleExpandAll}
      >
        Expand All
      </button>
      <button
        onClick={handleCollapseAll}
        className={`py-2 px-6 rounded-3xl border-2 ${
          !expandedKeys.length
            ? "bg-blue_gray_800 text-white"
            : "bg-white text-black"
        }`}
      >
        Collapse All
      </button>
    </div>
  );
}

export default ExpandAndCollapse;
