import { FC } from "react";

const ActionTable: FC<{ children?: any }> = ({ children }) => {
  return (
    <div className="flex gap-[14px] justify-center items-center">
      {children}
    </div>
  );
};

export default ActionTable;
