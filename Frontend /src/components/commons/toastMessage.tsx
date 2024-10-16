import React from "react";
import { notification } from "antd";
import { useAppSelector } from "@/lib/store/hook";

const ToastMessage: React.FC = () => {
  const toast = useAppSelector((state) => state.toast);

  React.useEffect(() => {
    if (toast.visible) {
      if (toast.type === "success") {
        notification.success({ message: toast.message });
      } else if (toast.type === "error") {
        notification.error({
          message: toast.message,
        });
      }
    }
  }, [toast]);

  return null;
};

export default ToastMessage;
