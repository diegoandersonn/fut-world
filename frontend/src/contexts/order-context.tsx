import { createContext, ReactNode, SetStateAction, useState } from "react";
import { OrderType } from "../../../shared/types/orderType";

type OrderContextType = {
  order: OrderType;
  setOrder: React.Dispatch<SetStateAction<OrderType>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const OrderContext = createContext<OrderContextType>(
  {} as OrderContextType
);

type OrderProviderType = {
  children: ReactNode;
};

export const OrderProvider = ({ children }: OrderProviderType) => {
  const [order, setOrder] = useState<OrderType>({
    order: "Ascending",
    value: "name",
  });
  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
