import React from "react";
import { Breadcrumb } from "antd";
import { IconType } from "react-icons";

interface BreadcrumbWithIconProps {
  icon: IconType;
  text: string;
  iconSize?: number;
  textSize?: string;
}

const BreadcrumbWithIcon: React.FC<BreadcrumbWithIconProps> = ({
  icon: Icon,
  text,
  iconSize = 24,
  textSize = "18px",
}) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <div className="flex justify-start items-center ">
          <div className="w-full h-full rounded-full bg-blue p-2 ">
            <Icon style={{ color: "#ffffff", fontSize: `${iconSize}px` }} />
          </div>

          <span
            style={{
              marginLeft: "8px",
              fontWeight: "bold",
              fontSize: textSize,
            }}
          >
            {text}
          </span>
        </div>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadcrumbWithIcon;
