# LowLevelAnim (Low-level Animation Library) Overview

[中文版](./README.zh-CN.md)

## 1. LowLevelAnim Overview

The `LowLevelAnim` directory contains a set of low-level animation components and tools used for building complex animation effects. These components provide fine-grained animation control and serve as the foundation for many high-level components in the project (such as dynamic switching effects in Banner) to achieve complex visual results.

The library primarily consists of two core components:

*   **`SingleAnim`**: Used for fine-grained timeline-based animation control of a single element.
*   **`MultiAnim`**: Based on Velocity.js, used for managing enter and leave animations for a group of child elements.

## 2. `SingleAnim` Component

### Purpose

The `SingleAnim` component is used for precise timeline-controlled animation of a single React element (or HTML tag). It allows developers to achieve complex, accurately controlled animation effects by defining detailed animation sequences and attribute changes.

### Core Concepts

*   **Timeline Control**: Every frame of the animation is precisely controlled based on an internal timeline (`TimeLine`).
*   **Animation Definition**: The `animation` prop is used to define animation keyframes, target property values (such as `x`, `opacity`, `width`, `height`, and SVG-specific attributes like `d`, `fill`, etc.), duration, delay, and easing effects.
*   **Playback Control**: Supports playing, pausing, and reversing animations, as well as jumping to any specific time point on the timeline via the `moment` prop.
*   **Pluggable Extensions**: Support for different types of animation properties can be extended through a plugin mechanism, such as standard CSS style animations and SVG attribute animations.
*   `SingleAnim` also comes with `OneTweenGroup` (for combining multiple easing effects, primarily for internal use or advanced customization) and `easing` (containing a set of preset easing functions).

### Key Props

| Prop Name   | Type          | Default Value | Description                                                                                                 |
| ----------- | ------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| `component` | Any           | `'div'`   | The React component type or HTML tag name to wrap the animated element.                                                          |
| `animation` | Object\|Array |           | Core property for defining the animation sequence. Can be a single animation object or an array of objects for continuous sequences. Each object can contain target states, `duration`, `delay`, `ease`, etc. |
| `style`     | Object        |           | Initial inline styles applied to the animated element.                                                                         |
| `paused`    | Boolean       | `false`   | Controls whether the animation is paused. Set to `true` to pause, `false` to play.                                                       |
| `reverse`   | Boolean       | `false`   | Controls whether the animation plays in reverse.                                                                                 |
| `moment`    | Number        |           | Controls the current time point of the animation playback (in milliseconds). Directly setting this value jumps to a specific frame.                                |
| `attr`      | String        | `'style'` | Specifies the type of attributes the animation affects. `'style'` for standard CSS properties, `'attr'` for SVG element attributes (e.g., `d`, `stroke-width`). |
| `onChange`  | Function      |           | Callback function for each frame change of the animation. It receives the current frame's style/attribute object as an argument.                                       |

### Conceptual Usage

```jsx
import React from 'react';
import SingleAnim from './SingleAnim'; // Assuming SingleAnim is in the current or accessible path

function MyAnimatedElement() {
  // Define an animation: opacity from 0 to 1, while x moves from 0 to 100 over 1 second
  const animationConfig = {
    opacity: [0, 1], // [start, end]
    x: [0, 100],     // horizontal movement
    duration: 1000,  // duration (ms)
    ease: 'easeInOutQuad' // easing function
  };

  return (
    <SingleAnim
      animation={animationConfig}
      component="p" // apply animation to a <p> tag
      style={{ opacity: 0 }} // initial style
    >
      I am an animated element
    </SingleAnim>
  );
}

export default MyAnimatedElement;
```

## 3. `MultiAnim` Component (based on Velocity.js)

### Purpose

The `MultiAnim` component (integrating the `velocity-animate` library internally) is specifically designed for managing enter and leave animations for a group of child elements. It is ideal for list items or scenarios where content is dynamically added or removed, automatically handling animation transitions during child element changes.

### Core Concepts

*   **Key-Based Tracking**: Tracks and manages the animation state of each child element using a unique `key` prop.
*   **Auto-Triggering**: When the list of child elements in the `children` prop changes (added, removed, or reordered), `MultiAnim` automatically triggers the predefined enter or leave animations for the respective child elements.
*   **Animation Configuration**: Supports using preset animation types (`type` prop) or providing custom Velocity.js animation configuration objects (`animConfig` prop).
*   **Dynamic Parameters**: Animation `interval`, `duration`, `delay`, and `ease` can be fixed values or functions. If a function, it can dynamically generate these parameters based on each child's `key` and `index`, allowing for more flexible animation sequences.

### Key Props

| Prop Name           | Type          | Default Value                           | Description                                                                                                                               |
| ------------------- | ------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `component`         | Any           | `'div'`                                 | The React component type or HTML tag name to wrap the list of child elements.                                                                                      |
| `children`          | ReactNode     |                                         | List of child elements to undergo enter/leave animations. **Each direct child must have a unique `key` prop.**                                                         |
| `type`              | Any           | `'right'`                               | Preset enter/leave animation type. Can be a string (e.g., `'right'`, `'left'`, `'scale'`) or a function `(key, index) => [enterType, leaveType]` for customization. |
| `animConfig`        | Any           |                                         | Custom Velocity.js animation configuration. Can be a single object or a function `(key, index) => [enterAnimConfig, leaveAnimConfig]`. This prop takes precedence over `type`. |
| `interval`          | Any           | `0`                                     | Interval time between child element animations (ms). Can be a number or function `(key, index) => number`.                                                                |
| `duration`          | Any           | `450`                                   | Duration of the animation (ms). Can be a number or function `(key, index) => number`.                                                                        |
| `delay`             | Any           | `0`                                     | Delay before the animation starts (ms). Can be a number or function `(key, index) => number`.                                                                   |
| `ease`              | Any           | `'easeOutQuart'`                        | Easing function for the animation (Velocity.js supported easing string or array). Can be a string or function `(key, index) => string|[number, number, number, number]`. |
| `appear`            | Boolean       | `true`                                  | Whether to play enter animations for child elements when the component initially loads.                                                                                             |
| `onEnd`             | Function      |                                         | Callback function when a single child element's animation completes. Arguments: `({ key, type: 'enter' | 'leave' })`.                                                         |
| `animatingClassName`| Array         | `['queue-anim-entering', 'queue-anim-leaving']` | CSS class names applied to entering and leaving elements during animation. Format: `[enterClassName, leaveClassName]`.                                         |

### Conceptual Usage

```jsx
import React, { useState, useEffect } from 'react';
import MultiAnim from './MultiAnim'; // Assuming MultiAnim is in current or accessible path

function MyAnimatedList({ initialItems }) {
  const [items, setItems] = useState(initialItems || []);

  // Example: add a new item after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(prevItems => [
        ...prevItems,
        { id: `item-${Date.now()}`, text: `New Item ${prevItems.length + 1}` }
      ]);
    }, 3000);
    return () => clearTimeout(timer);
  }, [items]); // triggers on items change, in practice might depend on external props

  return (
    <MultiAnim
      type="left" // enter from left, leave from left
      ease="easeOutQuart" // use "easeOutQuart" easing
      interval={100} // 100ms interval between child animations
      duration={500} // 500ms duration for each animation
      component="ul" // use <ul> as wrapper
      style={{ listStyle: 'none', padding: 0 }}
    >
      {items.map(item => (
        <li key={item.id} style={{ border: '1px solid #ccc', margin: '5px', padding: '10px' }}>
          {item.text}
        </li>
      ))}
    </MultiAnim>
  );
}

export default MyAnimatedList;
```

## 4. Summary

The `SingleAnim` and `MultiAnim` components under the `LowLevelAnim` directory provide a powerful animation foundation for other parts of the project. `SingleAnim` focuses on fine-grained timeline animations for single elements, while `MultiAnim` simplifies managing enter/leave animations for lists and dynamic content. These low-level components enable complex, high-performance animation effects in higher-level components like Banner and PopUp, serving as key tools for building rich user experiences.
