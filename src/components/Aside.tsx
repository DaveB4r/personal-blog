import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const Aside: FC<Props> = ({ children }) => {
  return (
    <aside className="fixed w-[10%] top-20 left-32 border-l-1 border-l-gray-500 hidden sm:block md:invisible lg:visible">
      {children}
    </aside>
  );
};

export default Aside;
