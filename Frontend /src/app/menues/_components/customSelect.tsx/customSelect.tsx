import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import {
  fetchCategoriesStart,
  fetchParentsStart,
} from "@/lib/store/features/categories/slice";

const { Option } = Select;

const CustomSelect = () => {
  const dispatch = useDispatch();

  // Select parent categories, loading, and error states from the store
  const parentCategories = useSelector(
    (state: RootState) => state.categories.parentCategories
  );
  const loading = useSelector(
    (state: RootState) => state.categories.parentLoading
  );
  const error = useSelector((state: RootState) => state.categories.parentError);

  // Fetch parent categories when the component mounts
  useEffect(() => {
    dispatch(fetchParentsStart());
  }, [dispatch]);

  // Handle change event
  const handleChange = (value: string) => {
    dispatch(fetchCategoriesStart(value));
  };

  return (
    <div style={{ width: 300, padding: 10, marginTop: 10 }}>
      <label style={{ fontSize: 12, color: "#888" }}>Menus</label>
      <Select
        onChange={handleChange}
        placeholder="Select a Menu"
        className="bg-gray_300"
        style={{ width: "100%", borderRadius: 10, height: 40 }}
        dropdownStyle={{ borderRadius: 10 }}
        loading={loading} // Show loading state if categories are being fetched
      >
        {/* Handle error case */}
        {error ? (
          <Option disabled>{error}</Option>
        ) : (
          parentCategories.map((category: { id: string; name: string }) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))
        )}
      </Select>
    </div>
  );
};

export default CustomSelect;
