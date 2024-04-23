// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";

// const ProductContext = createContext();

// const ProductProvider = ({ children }) => {
//   const [product, setProduct] = useState(null);
//   const [productDetails, getProductDetails] = useState(null);




//   return (
//     <ProductContext.Provider
//       value={{ product, setProduct, productDetails, getProductDetails }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };
// const useProductContext = () => {
//   return useContext(ProductContext);
// };
// export { ProductProvider, useProductContext };


import { createContext, useState, useContext } from "react";
const FoodContext = createContext()
const FoodProvider = ({ children }) => {
    const [Food, setFood] = useState(null)
    return (
        <FoodContext.Provider value={{ Food, setFood }}>
            {
                children
            }
        </FoodContext.Provider>
    )
}

const useFoodContext = () => {
    return useContext(FoodContext)
}
export { FoodProvider, useFoodContext }