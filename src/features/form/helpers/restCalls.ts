import { IOrder } from "../types/types";

export const placeOrder = async (order: IOrder) => {
  const response = await fetch(
    "https://frosty-wood-6558.getsandbox.com:443/dishes and ",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }
  );

  return response.json();
};
