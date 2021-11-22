import React from "react";
import { act, render, cleanup } from '@testing-library/react'

import ItemCart from "./item-cart";

it("renders with or without a item/image", () => {

     /* no input*/
     act(() => {
          const { getByTestId } = render(<ItemCart />)
          expect(getByTestId('itemBackground')).toHaveStyle(`background-image: url('/defaultImg.png')`)
          cleanup()
     });

     /* only image is the input*/
     act(() => {
          const { getByTestId } = render(<ItemCart image={'http://test.png'}/>)
          expect(getByTestId('itemBackground')).toHaveStyle(`background-image: url('http://test.png')`)
          cleanup()
     });

     /* both image and item are passed as params*/
     act(() => {
          const item = {
               type: 'TOP',
               attributes: ["f_floral"]
          }
          const { getByTestId } = render(<ItemCart image={'http://test.png'} item={item}/>)
          expect(getByTestId('numberOfAttributes')).toHaveTextContent(`(${item.attributes.length})`)
     });

});
