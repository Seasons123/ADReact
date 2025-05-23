# PopUp (弹出窗口) 组件文档

## 一、PopUp (弹出窗口) 组件介绍 (PopUp Component Introduction)

PopUp 组件用于在屏幕的特定位置展示内容，例如广告、通知或重要提示。它可以将内容固定在屏幕的角落、中央，或者以“对联”的形式显示在页面的两侧。这使得它成为一种灵活的方式来吸引用户的注意力或传递信息。

## 二、主要功能 (Key Features)

*   **多种定位选项:** 支持将弹窗固定在屏幕的四个角落（左上、右上、左下、右下）、屏幕中央，或作为页面两侧的对联广告。
*   **可点击内容:** 弹窗内的内容（通常是图片）可以链接到一个指定的 URL。
*   **手动关闭按钮:** 提供一个关闭按钮，允许用户手动关闭弹窗。
*   **可选背景遮罩:** 可以选择在弹窗出现时显示一个覆盖页面的背景遮罩层。
*   **可选自动消失:** 弹窗可以在设定的时间后自动关闭。
*   **可自定义尺寸和内容:** 允许开发者自定义弹窗的宽度、高度以及显示的图片内容。

## 三、Props (参数说明)

以下是 PopUp 组件可接受的参数列表：

| Prop 名称       | 类型    | 默认值              | 描述                                                                                                                                                              | 示例                                                                                               |
| --------------- | ------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `items`         | Array   | `[]`                | 内容数组，每个元素是包含 `src` (图片路径) 的对象。<br> - 对于大多数 `position` (如 `center`, `bottomRight` 等)，使用 `items[0].src` 作为弹窗内容。<br> - 对于 `position: "couplet"`，左侧对联使用 `items[1].src`，右侧对联使用 `items[2].src` (`items[0]` 在此模式下通常不使用或可为空对象)。 | `[{src: 'img1.jpg'}, {src: 'img2.jpg'}, {src: 'img3.jpg'}]`                                        |
| `width`         | String  | `'135px'`           | 弹出窗口的宽度。对于 `couplet` 类型，此为单个对联的宽度。                                                                                                               | `'200px'`                                                                                          |
| `height`        | String  | `'180px'`           | 弹出窗口的高度。对于 `couplet` 类型，此为单个对联的高度。                                                                                                               | `'250px'`                                                                                          |
| `link`          | String  | `""`                | 点击弹出窗口内容时跳转的 URL。如果为空字符串，则内容不可点击。                                                                                                            | `"https://www.example.com"`                                                                        |
| `position`      | String  | `"bottomRight"`     | 弹出窗口的位置。有效值包括: `"bottomRight"`, `"bottomLeft"`, `"upRight"`, `"upLeft"`, `"center"`, `"couplet"`。                                                         | `"center"`                                                                                         |
| `distanceX`     | String  | `"20px"`            | 水平边距。对于角位置，指距离屏幕边缘的距离；对于 `couplet`，指单个对联距离页面内容区域左右边缘的距离。`center` 位置不使用此属性。                                                | `"50px"`                                                                                           |
| `distanceY`     | String  | `"30px"`            | 垂直边距。对于角位置，指距离屏幕边缘的距离；对于 `couplet`，指对联距离页面顶部的距离。`center` 位置不使用此属性。                                                              | `"60px"`                                                                                           |
| `mask`          | Boolean | `false`             | 是否显示背景遮罩层。当弹窗出现时，背景内容将被遮罩覆盖。                                                                                                                | `true`                                                                                             |
| `maskColor`     | String  | `'rgba(0,0,0,0.3)'` | 遮罩层的颜色 (有效的 CSS 颜色值)。                                                                                                                                    | `'rgba(0, 0, 0, 0.5)'`                                                                             |
| `autoDisappear` | Boolean | `false`             | 是否在指定时间后自动消失。                                                                                                                                            | `true`                                                                                             |
| `duration`      | Number  | `1000`              | 如果 `autoDisappear` 为 `true`，则为自动消失前的持续时间 (单位: 毫秒)。                                                                                                 | `3000`                                                                                             |

## 四、使用示例 (Usage Example)

### 居中弹出 (Center PopUp):

```jsx
import React from 'react';
import PopUp from './PopUp'; // 路径假设，请根据您的项目结构调整

const POPUP_ITEM_CENTER = [{src: 'path/to/your/center-image.jpg'}];

function MyCenterPopup() {
    return (
        <PopUp
            items={POPUP_ITEM_CENTER}
            width={'400px'}
            height={'300px'}
            link={"http://example.com/promo"}
            position={"center"}
            mask={true} // 显示遮罩层
            autoDisappear={true} // 5秒后自动消失
            duration={5000}
        />
    );
}

export default MyCenterPopup;
```

### 对联广告 (Couplet PopUp):

```jsx
import React from 'react';
import PopUp from './PopUp'; // 路径假设，请根据您的项目结构调整

const POPUP_ITEMS_COUPLET = [
    {}, // items[0] 通常不用于 "couplet" 类型，可以是一个空对象或占位
    {src: 'path/to/your/left-couplet-image.jpg'}, // 左侧对联图片
    {src: 'path/to/your/right-couplet-image.jpg'} // 右侧对联图片
];

function MyCoupletAds() {
    return (
        <PopUp
            items={POPUP_ITEMS_COUPLET}
            width={'120px'} // 单个对联的宽度
            height={'300px'} // 单个对联的高度
            link={"http://example.com/campaign"}
            position={"couplet"}
            distanceX={"10px"} // 对联与页面内容区域的水平间距
            distanceY={"50px"} // 对联与页面顶部的垂直间距
        />
    );
}

export default MyCoupletAds;
```

**注意:**
*   请确保 `items` 中的 `src` 路径是正确的，并且图片资源是可访问的。
*   `distanceX` 和 `distanceY` 对于 `couplet` 类型是控制对联与页面主要内容区域的间距，而不是屏幕边缘。

## 五、示例页面 (Example Pages)

项目内提供了多个可运行的 PopUp 组件示例，您可以参考这些文件来了解不同类型弹窗在实际项目中的具体用法和配置方式：

*   **对联广告示例:**
    [`ad/PopUp/example/couplet/MainPage.jsx`](./example/couplet/MainPage.jsx)
    (该文件演示了 `position="couplet"` 类型的弹窗)

*   **居中弹窗示例:**
    [`ad/PopUp/example/no-couplet/MainPage-center.jsx`](./example/no-couplet/MainPage-center.jsx)
    (该文件演示了 `position="center"` 类型的弹窗)

*   **右下角弹窗示例:**
    [`ad/PopUp/example/no-couplet/MainPage-bottomRight.jsx`](./example/no-couplet/MainPage-bottomRight.jsx)
    (该文件演示了 `position="bottomRight"` 类型的弹窗)

这些示例是学习和使用 PopUp 组件的良好起点，展示了组件的多种功能和参数配置。
