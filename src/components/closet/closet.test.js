import React from "react";
import { act, render, cleanup } from '@testing-library/react'

import Closet from "./closet";

it("renders with or without a items", () => {

     /* no input*/
     act(() => {
          const { getByTestId } = render(<Closet />)
          expect(getByTestId('emptyCloset')).toHaveTextContent(`No items in your Closet yet`)
          cleanup()
     });

     /* no input*/
     act(() => {
          const items = [{}]
          const { getByTestId } = render(<Closet items={items}/>)
          expect(getByTestId('emptyCloset')).toHaveTextContent(`No items in your Closet yet`)
          cleanup()
     });

     /* no input*/
     act(() => {
          const items = []
          const { getByTestId } = render(<Closet items={items}/>)
          expect(getByTestId('emptyCloset')).toHaveTextContent(`No items in your Closet yet`)
          cleanup()
     });

     /* no input*/
     act(() => {
          const items = [{ type: 'TOP' }]
          const { getByTestId } = render(<Closet items={items}/>)
          expect(getByTestId('closetExists')).toBeDefined()
          cleanup()
     });
});