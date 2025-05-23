# LowLevelAnim (底层动画库) 概览

## 一、LowLevelAnim (底层动画库) 概览 (LowLevelAnim Overview)

`LowLevelAnim` 目录包含了一系列用于构建复杂动画效果的底层动画组件和工具。这些组件提供了精细的动画控制能力，是项目中许多高级组件（例如 Banner 中的动态切换效果）实现复杂视觉效果的基础。

该库主要包含两个核心组件：

*   **`SingleAnim`**: 用于对单个元素进行基于时间轴的精细动画控制。
*   **`MultiAnim`**: 基于 Velocity.js，用于管理一组子元素的进场和出场动画。

## 二、`SingleAnim` 组件

### 用途 (Purpose)

`SingleAnim` 组件用于对单个 React 元素（或 HTML 标签）进行精细的时间轴控制动画。它允许开发者通过定义详细的动画序列和属性变化，来实现复杂的、可精确控制的动画效果。

### 核心概念 (Core Concepts)

*   **时间轴控制**: 动画的每一帧都基于内部的时间轴 (`TimeLine`) 进行精确控制。
*   **动画定义**: 通过 `animation` prop 定义动画的关键帧、目标属性值（如 `x`, `opacity`, `width`, `height`, 以及 SVG 特有的属性如 `d`, `fill` 等）、持续时间、延迟和缓动效果。
*   **播放控制**: 支持动画的播放、暂停、反向播放，以及通过 `moment` prop 跳转到时间轴上的任意特定时间点。
*   **插件化扩展**: 可以通过插件机制扩展对不同类型动画属性的支持，例如标准的 CSS 样式动画和 SVG 属性动画。
*   `SingleAnim` 还附带了 `OneTweenGroup` (用于组合多个缓动效果，但主要供内部使用或高级定制) 和 `easing` (包含一系列预设的缓动函数)。

### 主要 Props (Key Props)

| Prop 名称   | 类型          | 默认值    | 描述                                                                                                 |
| ----------- | ------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| `component` | Any           | `'div'`   | 包装动画元素的 React 组件类型或 HTML 标签名。                                                          |
| `animation` | Object\|Array |           | 定义动画序列的核心属性。可以是单个动画对象或一个动画对象数组，用于创建连续的动画序列。每个对象可以包含目标状态、`duration`、`delay`、`ease` 等。 |
| `style`     | Object        |           | 应用于动画元素的初始内联样式。                                                                         |
| `paused`    | Boolean       | `false`   | 控制动画是否暂停。设置为 `true` 暂停，`false` 播放。                                                       |
| `reverse`   | Boolean       | `false`   | 控制动画是否反向播放。                                                                                 |
| `moment`    | Number        |           | 控制动画播放的当前时间点 (单位: 毫秒)。可以直接设置此值来跳转到动画的特定帧。                                |
| `attr`      | String        | `'style'` | 指定动画作用的属性类型。 `'style'` 用于标准的 CSS 样式属性，`'attr'` 用于 SVG 元素的属性 (例如 `d`, `stroke-width`)。 |
| `onChange`  | Function      |           | 动画每一帧发生变化时的回调函数。它接收当前帧的样式/属性对象作为参数。                                       |

### 简易使用概念 (Conceptual Usage)

```jsx
import React from 'react';
import SingleAnim from './SingleAnim'; // 假设 SingleAnim 在当前或可访问路径

function MyAnimatedElement() {
  // 定义一个动画：透明度从 0 到 1，同时 x 坐标从 0 移动到 100，持续1秒
  const animationConfig = {
    opacity: [0, 1], // [起始值, 结束值]
    x: [0, 100],     // 水平移动
    duration: 1000,  // 持续时间 (ms)
    ease: 'easeInOutQuad' // 缓动函数
  };

  return (
    <SingleAnim
      animation={animationConfig}
      component="p" // 将动画应用在一个 <p> 标签上
      style={{ opacity: 0 }} // 初始样式
    >
      我是一个动画元素
    </SingleAnim>
  );
}

export default MyAnimatedElement;
```

## 三、`MultiAnim` 组件 (基于 Velocity.js)

### 用途 (Purpose)

`MultiAnim` 组件（内部集成了 `velocity-animate` 库）专门用于管理一组子元素的进场 (enter) 和出场 (leave) 动画。它非常适合用于列表项、动态添加或移除内容的场景，能够自动处理子元素增删时的动画过渡。

### 核心概念 (Core Concepts)

*   **Key-Based Tracking**: 通过子元素上唯一的 `key` prop 来追踪和管理每个子元素的动画状态。
*   **自动触发**: 当 `children` prop 中的子元素列表发生变化（增加、删除或重新排序）时，`MultiAnim` 会自动为相应的子元素触发预定义的进场或出场动画。
*   **动画配置**: 支持使用预设的动画类型 (`type` prop) 或提供自定义的 Velocity.js 动画配置对象 (`animConfig` prop)。
*   **动态参数**: 动画的间隔 (`interval`)、时长 (`duration`)、延迟 (`delay`) 和缓动 (`ease`) 都可以是固定值，也可以是函数。如果为函数，它可以根据每个子元素的 `key` 和 `index` 动态生成这些参数，实现更灵活的动画序列。

### 主要 Props (Key Props)

| Prop 名称           | 类型          | 默认值                                  | 描述                                                                                                                               |
| ------------------- | ------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `component`         | Any           | `'div'`                                 | 包装子元素列表的 React 组件类型或 HTML 标签名。                                                                                      |
| `children`          | ReactNode     |                                         | 需要进行进出场动画的子元素列表。**每个直接子元素必须拥有一个唯一的 `key` prop。**                                                         |
| `type`              | Any           | `'right'`                               | 预设的进出场动画类型。可以是字符串 (如 `'right'`, `'left'`, `'scale'`) 或一个函数 `(key, index) => [enterType, leaveType]` 来自定义每个子元素的进出场动画。 |
| `animConfig`        | Any           |                                         | 自定义的 Velocity.js 动画配置。可以是单个配置对象，或一个函数 `(key, index) => [enterAnimConfig, leaveAnimConfig]`。此 prop 优先于 `type`。 |
| `interval`          | Any           | `0`                                     | 子元素之间动画的间隔时间 (ms)。可为数字或函数 `(key, index) => number`。                                                                |
| `duration`          | Any           | `450`                                   | 动画的持续时间 (ms)。可为数字或函数 `(key, index) => number`。                                                                        |
| `delay`             | Any           | `0`                                     | 动画开始前的延迟时间 (ms)。可为数字或函数 `(key, index) => number`。                                                                   |
| `ease`              | Any           | `'easeOutQuart'`                        | 动画的缓动函数 (Velocity.js 支持的缓动字符串或数组)。可为字符串或函数 `(key, index) => string|[number, number, number, number]`。 |
| `appear`            | Boolean       | `true`                                  | 是否在组件初始加载时播放子元素的进场动画。                                                                                             |
| `onEnd`             | Function      |                                         | 单个子元素动画完成时的回调函数。参数为 `({ key, type: 'enter' | 'leave' })`。                                                         |
| `animatingClassName`| Array         | `['queue-anim-entering', 'queue-anim-leaving']` | 动画执行期间分别应用于进场和出场元素的 CSS 类名。格式为 `[enterClassName, leaveClassName]`。                                         |

### 简易使用概念 (Conceptual Usage)

```jsx
import React, { useState, useEffect } from 'react';
import MultiAnim from './MultiAnim'; // 假设 MultiAnim 在当前或可访问路径

function MyAnimatedList({ initialItems }) {
  const [items, setItems] = useState(initialItems || []);

  // 示例：3秒后添加一个新项目
  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(prevItems => [
        ...prevItems,
        { id: `item-${Date.now()}`, text: `新项目 ${prevItems.length + 1}` }
      ]);
    }, 3000);
    return () => clearTimeout(timer);
  }, [items]); // 依赖 items 触发添加，实际应用中可能根据外部props变化

  return (
    <MultiAnim
      type="left" // 子元素从左侧进入，从左侧离开
      ease="easeOutQuart" // 使用 "easeOutQuart" 缓动
      interval={100} // 每个子元素动画间隔 100ms
      duration={500} // 每个动画持续 500ms
      component="ul" // 使用 <ul> 作为包裹元素
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

// 使用示例
// const initialData = [
//   { id: 'item-1', text: '项目 1' },
//   { id: 'item-2', text: '项目 2' },
// ];
// <MyAnimatedList initialItems={initialData} />

export default MyAnimatedList;
```

## 四、总结 (Summary)

`LowLevelAnim` 目录下的 `SingleAnim` 和 `MultiAnim` 组件为项目的其他部分提供了强大的动画基础。`SingleAnim` 专注于单个元素的精细时间轴动画，而 `MultiAnim` 则简化了列表和动态内容的进出场动画管理。这些底层组件使得在更高级别的组件（如 Banner、PopUp 等）中实现复杂的、高性能的动画效果成为可能，是构建丰富用户体验的关键工具。
