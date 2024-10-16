import React from "react";
import { Breadcrumb as AntdBreadcrumb } from "antd";
import { IconType } from "react-icons"; // Import for react-icons

interface BreadcrumbProps {
  IconComponent: IconType;
  name: string;
  size?: "small" | "medium" | "large";
  showSeparator?: boolean;
  separator?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  IconComponent,
  name,
  size = "medium",
  showSeparator = true,
  separator = "/",
}) => {
  const sizeMap = {
    small: { icon: 12, text: "text-sm" },
    medium: { icon: 16, text: "text-lg" },
    large: { icon: 24, text: "text-xl" },
  };

  const currentSize = sizeMap[size];

  return (
    <AntdBreadcrumb>
      <AntdBreadcrumb.Item>
        <div className="flex items-center space-x-2 w-full">
          <div className="flex items-center space-x-1 text-gray-400">
            <IconComponent
              style={{ fontSize: currentSize.icon, color: "gray" }}
            />
          </div>

          {showSeparator && <span className="text-gray-400">{separator}</span>}

          <p className={`font-normal ${currentSize.text}`}>{name}</p>
        </div>
      </AntdBreadcrumb.Item>
    </AntdBreadcrumb>
  );
};

export default Breadcrumb;
