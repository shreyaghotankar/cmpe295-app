import React from "react";
import { act, render, cleanup } from '@testing-library/react'

import Section from './section';

it("renders with or without a item/image", () => {

     /* no input*/
     act(() => {
          const { getByText } = render(<Section section={'Test'}/>)
          expect( getByText ('Test')).toBeTruthy()
          cleanup()
     });

});
