import React from "react";
import { act, render, cleanup } from '@testing-library/react'

import UpdateItem from "./update-item";

it("renders with or without a item/image", () => {

     /* no input*/
     act(() => {
          const { getByTestId } = render(<UpdateItem />)
          expect(getByTestId('updateImage')).toHaveStyle(`background-image: url('/defaultImg.png')`);
          cleanup()
     });

     /* wrong attribute name */
     act(() => {
          const item = {
               attributes: ['f_floral'],
               type: 'TOP'
          }
          const { container } = render(<UpdateItem image={'http://test.png'} item={item}/>)
          expect(container).toBeDefined();          
          cleanup()
     });

     /* attribute exist name */
     act(() => {
          const item = {
               attributes: ['t_floral'],
               type: 'TOP'
          }
          const { getByText } = render(<UpdateItem image={'http://test.png'} item={item}/>)
          expect(getByText('Floral')).toBeInTheDocument();          
          cleanup()
     });

     /* only image */
     act(() => {
          const { getByTestId } = render(<UpdateItem image={'http://test.png'}/>)
          expect(getByTestId('updateImage')).toHaveStyle(`background-image: url('http://test.png')`);
          cleanup()
     });

});
