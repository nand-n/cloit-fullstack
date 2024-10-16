import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TreeState {
  expandedKeys: string[];
}

const initialState: TreeState = {
  expandedKeys: [],
};

const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    expandAll: (state, action: PayloadAction<string[]>) => {
      state.expandedKeys = action.payload; 
    },
    collapseAll: (state) => {
      state.expandedKeys = [];
    },
  },
});

export const { expandAll, collapseAll } = treeSlice.actions;

export default treeSlice.reducer;
