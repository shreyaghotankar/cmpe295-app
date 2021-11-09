import { createContext } from "react";

export const ItemsContext = createContext({
     items: [],
     addItem: () => {},
     removeItem: () => {},
     updateItem: () => {}
});