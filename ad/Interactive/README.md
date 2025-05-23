# Interactive (交互式) 组件文档

## 一、Interactive (交互式) 组件介绍 (Interactive Component Introduction)

Interactive 组件是一个多功能的容器或调度器，旨在集成和展示多种类型的交互式数据可视化。它可以根据传入的类型参数，动态渲染不同的交互效果，例如焦点图 (Focus Graph) 或力导向图 (Force-Directed Graph)。这使得开发者可以在一个统一的组件接口下，实现丰富的动态数据展示。

## 二、主要功能 (Key Features)

*   **支持多种交互式可视化类型:** 能够根据配置渲染不同类型的交互图表。
*   **可自定义尺寸:** 允许开发者设置组件的宽度 (width) 和高度 (height)。
*   **数据驱动:** 组件的行为和展示内容由传入的 `content` 数据决定。

## 三、Props (参数说明)

以下是 Interactive 组件可接受的参数列表：

| Prop 名称 | 类型           | 默认值        | 描述                                                                                                                               | 示例                                                                 |
| --------- | -------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `content` | Array\|String  | `[]`          | 交互内容的数据。通常是一个包含对象的数组，每个对象描述一个可视化元素 (例如，用于图形节点或logo)。数据结构可能因 `type` 不同而异。 | `[{src: 'path/to/image.svg'}, {src: 'path/to/another.svg'}]`         |
| `width`   | String         | `'800px'`     | 组件的宽度。                                                                                                                       | `'900px'`                                                            |
| `height`  | String         | `'600px'`     | 组件的高度。 (注意: 源码中 `defaultProps` 可能存在 '600ox' 的笔误，此处为推荐的正确值)                                                 | `'500px'`                                                            |
| `type`    | String         | `'logoGather'`| 指定要渲染的交互组件类型。有效值包括: `'graphFocus'`, `'forceDirectedGraph'`。 `'logoGather'` 可能是预期或未来的类型，但当前主要支持前两者。 | `'graphFocus'`                                                       |

## 四、使用示例 (Usage Example)

以下是一个基本的 Interactive 组件使用示例，展示了如何渲染一个焦点图：

```jsx
import React from 'react';
import Interactive from './Interactive'; // 假设 Interactive 组件在当前目录或已正确配置路径

const INTERACTIVE_DATA = [
    { src: 'path/to/your/image.svg', width: 100, height: 100 }, // 节点可以有自己的属性
    { src: 'path/to/another/image.svg', width: 80, height: 80 },
    // ...更多节点数据
];

function MyInteractiveDisplay() {
    return (
        <div>
            <Interactive
                content={INTERACTIVE_DATA}
                width={'900px'}
                height={'500px'}
                type={'graphFocus'}
            />
        </div>
    );
}

export default MyInteractiveDisplay;
```

**注意:**
*   请确保 `INTERACTIVE_DATA` 中的 `src` 路径是正确的。
*   `content` 中对象的具体属性 (如 `width`, `height` 用于 `graphFocus` 的节点) 取决于所选的 `type`。

## 五、支持的类型 (Supported Types)

目前主要支持以下交互可视化类型：

*   **`graphFocus`**: 一种图形聚焦的交互效果。用户可以通过交互（如鼠标悬停或点击）使特定图形元素突出显示，同时其他元素相应地淡化或移动，形成视觉焦点。通常用于展示一组相关的图标或小型图片。
*   **`forceDirectedGraph`**: 力导向图布局。通过模拟物理系统中的力（如弹簧力和斥力）来排列节点和边，使得连接紧密的节点靠近，而连接稀疏的节点远离。适用于展示网络结构、关系图等。

## 六、示例页面 (Example Page)

项目内提供了可运行的 Interactive 组件示例，您可以参考这些文件来了解不同类型交互组件在实际项目中的具体用法和配置方式：

*   **焦点图示例 (graphFocus):**
    [`ad/Interactive/example/MainPage.jsx`](./example/MainPage.jsx)
    该文件演示了 `type='graphFocus'` 时的配置和效果。

*   **力导向图示例 (forceDirectedGraph):**
    [`ad/Interactive/example/MainPage_ForceDirectedGraph.jsx`](./example/MainPage_ForceDirectedGraph.jsx)
    该文件演示了 `type='forceDirectedGraph'` 时的配置和效果。

这些示例通常会展示组件的多种功能和参数配置，是学习和使用 Interactive 组件的良好起点。
