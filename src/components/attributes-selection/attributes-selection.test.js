import React from "react";
import { act, render, cleanup } from '@testing-library/react'

import AttributesSelection from  "./attributes-selection";

it("render attribute options depending on type", () => {

     /* tops */
     act(() => {
          const { queryAllByTestId  } = render(<AttributesSelection/>)
          expect(queryAllByTestId('attributeOptionPill')).toHaveLength(17)
       
          cleanup()
     });

     /* bottoms */
     act(() => {
          const { queryAllByTestId  } = render(<AttributesSelection upper={false}/>)
          expect(queryAllByTestId('attributeOptionPill')).toHaveLength(14)
     
          cleanup()
     });
     
});