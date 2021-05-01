import React from 'react';
import loremlist from './loremlist';

function LoremIpsum({ paragraphNo }) {

  const x = paragraphNo ? paragraphNo : 0;

  return (
    <>
      {
        loremlist.slice(0, x).map((x, i) => (
          <p key={i}>
            {x}
          </p>
        ))
      }
    </>
  );
}

export default LoremIpsum;