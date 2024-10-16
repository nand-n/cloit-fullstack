import { ConfigProvider } from "antd";

const AntdConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedBg: "#9FF443",
            itemSelectedColor: "#111827",
            itemColor: "#111827",
            itemMarginInline: 8,
          },
          Form: {
            verticalLabelPadding: "0px",
            itemMarginBottom: 12,
          },
          Table: {
            headerBg: "#FAFAFA",
          },
        },

        token: {
          colorPrimary: "#3636F0",
          colorSuccess: "#0CAF60",
          colorError: "#E03137",
          colorWarning: "#FACC15",
          borderRadius: 9,
          fontFamily: "Manrope",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
