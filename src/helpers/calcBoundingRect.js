import React from 'react';

const calculateBoundingRect = (children) => {
  const boundingRects = {};

  React.Children.forEach(children, (child) => {
    const domNode = child.ref.current;
    const nodeBoundingRect = domNode.getBoundingClientRect();

    boundingRects[child.key] = nodeBoundingRect;
  });

  return boundingRects;
};

export default calculateBoundingRect;
