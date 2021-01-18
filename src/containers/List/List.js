import React, { useEffect, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import usePrevious from '../../hooks/usePrevious';
import calculateBoundingRect from '../../helpers/calcBoundingRect';

const List = ({ children }) => {
  const [boundingBox, setBoundingBox] = useState({});
  const [prevBoundingBox, setPrevBoundingBox] = useState({});
  const prevChildren = usePrevious(children);

  useLayoutEffect(() => {
    const newBoundingRect = calculateBoundingRect(children);
    setBoundingBox(newBoundingRect);
  }, [children]);

  useLayoutEffect(() => {
    const prevBoundingRect = calculateBoundingRect(prevChildren);
    setPrevBoundingBox(prevBoundingRect);
  }, [prevChildren]);

  useEffect(() => {
    const hasPrevBoundingBox = Object.keys(prevBoundingBox).length;

    if (hasPrevBoundingBox) {
      React.Children.forEach(children, (child) => {
        const domNode = child.ref.current;
        const firstBox = prevBoundingBox[child.key];
        const lastBox = boundingBox[child.key];
        const changeInY = firstBox.top - lastBox.top;

        if (changeInY) {
          requestAnimationFrame(() => {
            // Before the DOM paints, invert child to old position
            domNode.style.transform = `translateY(${changeInY}px)`;
            domNode.style.transition = 'transform 0s';

            requestAnimationFrame(() => {
              // After the previous frame, remove
              // the transistion to play the animation
              domNode.style.transform = '';
              domNode.style.transition = 'transform 500ms';
            });
          });
        }
      });
    }
  }, [boundingBox, prevBoundingBox, children]);

  return children;
};

List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default List;
