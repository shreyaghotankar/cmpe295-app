import { createContext } from "react";

export const OutfitsContext = createContext({
     outfits: [],
     removeOutfit: () => {},
     generateOutfits: () => {},
     saveOutfits: () => {}
});