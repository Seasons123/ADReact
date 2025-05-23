# Scalable (可伸缩广告) 组件文档

## 一、Scalable (可伸缩广告) 组件介绍 (Scalable Component Introduction)

Scalable 组件设计用于展示一个大型的横幅式广告。该广告能够根据指定的位置（`position`），在显示一段时间后自动播放动画（例如滑出或缩小），或者转换到一个更小尺寸的广告版本。此组件依赖于 `LowLevelAnim/SingleAnim` 来实现其动画效果。

## 二、主要功能 (Key Features)

*   **突出展示大广告:** 能够显示一个显眼的大尺寸广告。
*   **自动消失或缩小动画:** 支持大广告在一段时间后自动播放动画消失或缩小。
*   **转换到小尺寸广告:** 在主广告动画结束后，可以平滑过渡到一个较小尺寸的“常规”广告。
*   **位置可配置:** 广告可以出现在屏幕的顶部、底部、左侧或右侧。
*   **手动关闭按钮:** 提供一个关闭按钮，允许用户手动关闭广告。
*   **内容可链接:** 广告内容（图片）可以链接到指定的 URL。

## 三、Props (参数说明)

以下是 Scalable 组件可接受的参数列表：

| Prop 名称       | 类型    | 默认值                 | 描述                                                                                                                                                                                                                           | 示例                                                                         |
| --------------- | ------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| `items`         | Array   | `[]`                   | 定义广告图片及其初始尺寸的对象数组。<br> - `items[0]`: (Object) `{ src, width, height }` - 当 `position` 为 `"top"` 或 `"bottom"` 时，用于小尺寸广告。<br> - `items[1]`: (Object) `{ src, width, height }` - 用于主区域的大尺寸广告。<br> - `items[2]`: (Object) `{ src, width, height }` - 当 `position` 为 `"left"` 或 `"right"` 时，用于小尺寸广告。 | `[{src:'s.jpg',w:'100px',h:'50px'}, {src:'b.jpg',w:'800px',h:'300px'}, ...]` |
| `width`         | String  | `'800px'`              | 大尺寸广告容器的宽度。此属性主要用于当 `position` 为 `"top"` 或 `"bottom"` 时，确保广告内容在其容器内居中显示。通常应与 `items[1].width` 匹配。                                                                              | `'960px'`                                                                    |
| `link`          | String  | `"https://github.com"` | 广告内容点击后跳转的 URL。                                                                                                                                                                                                     | `"https://www.example.com/product"`                                          |
| `position`      | String  | `"right"`              | 广告出现的位置及其动画行为。有效值: `"top"`, `"left"`, `"right"`, `"bottom"`。                                                                                                                                                     | `"bottom"`                                                                   |
| `autoDisappear` | Boolean | `true`                 | 大广告是否在 `delay` 时间后自动执行消失或转换动画。                                                                                                                                                                                | `false`                                                                      |
| `delay`         | Number  | `1600`                 | 如果 `autoDisappear` 为 `true`，则此为动画开始前的延迟时间 (单位: 毫秒)。                                                                                                                                                           | `3000`                                                                       |
| `aotoNormalSize`| Boolean | `true`                 | 当大广告消失时，是否显示一个小尺寸的广告版本。如果为 `false`，大广告将直接消失而不显示小广告。                                                                                                                                       | `false`                                                                      |

## 四、行为说明 (Behavior Details)

*   **自动消失/转换 (Auto Disappear/Transition):**
    当 `autoDisappear` 为 `true` 时，初始展示的大广告 (`items[1]`) 会在 `delay` 属性定义的延迟时间之后，自动播放动画。动画的具体效果取决于 `position` 的值：
    *   `"top"`: 大广告向上滑出。
    *   `"bottom"`: 大广告向下滑出。
    *   `"left"`: 大广告向左滑出，同时可能伴随缩小效果。
    *   `"right"`: 大广告向右滑出，同时可能伴随缩小效果。

*   **转换到小尺寸 (Transition to Normal Size):**
    如果 `aotoNormalSize` (注意: 源码中属性名为 `aotoNormalSize`) 为 `true`，并且 `autoDisappear` 也为 `true`，则在大广告的消失动画完成后，会显示一个小尺寸的广告。
    *   当 `position` 为 `"top"` 或 `"bottom"` 时，使用 `items[0]` 中定义的图片和尺寸作为小广告。
    *   当 `position` 为 `"left"` 或 `"right"` 时，使用 `items[2]` 中定义的图片和尺寸作为小广告。

*   **关闭按钮 (Close Button):**
    无论自动行为如何，用户始终可以通过点击广告右上角的 'X' 按钮来手动关闭当前显示的广告（无论是大广告还是小广告）。关闭后，广告将不再显示。

## 五、使用示例 (Usage Example)

以下是一个基本的 Scalable 组件使用示例：

```jsx
import React from 'react';
import Scalable from './Scalable'; // 路径假设，请根据您的项目结构调整

const SCALABLE_IMAGES = [
    { src: 'path/to/small-horizontal-ad.jpg', width: '800px', height: '80px' }, // items[0]: top/bottom 小广告
    { src: 'path/to/large-main-ad.jpg', width: '800px', height: '380px' },      // items[1]: 主广告
    { src: 'path/to/small-vertical-ad.jpg', width: '80px', height: '450px' }    // items[2]: left/right 小广告
];

function MyScalableAdPage() {
    return (
        <Scalable
            items={SCALABLE_IMAGES}
            width={'800px'} // 通常匹配 items[1].width (主广告宽度)
            link={"http://example.com/product-page"}
            position={"top"} // 广告将从顶部出现，然后向上滑出，显示顶部的小广告
            autoDisappear={true} // 自动消失/转换
            delay={2000}         // 2秒后开始动画
            aotoNormalSize={true} // 转换到小尺寸广告
        />
    );
}

export default MyScalableAdPage;
```

**注意:**
*   请确保 `items` 数组中的图片路径 (`src`) 是正确的，并且图片资源是可访问的。
*   `items` 数组的结构对于组件的正确显示至关重要。`items[1]` 始终是主广告。`items[0]` 和 `items[2]` 分别用于不同 `position` 下的小尺寸广告。

## 六、示例页面 (Example Page)

项目内提供了一个可运行的 Scalable 组件示例，位于：
[`ad/Scalable/example/MainPage.jsx`](./example/MainPage.jsx)

您可以参考此文件来了解 Scalable 组件在实际项目中的具体用法和配置方式。该示例通常会演示组件的多种功能和参数配置，是学习和使用 Scalable 组件的良好起点。
