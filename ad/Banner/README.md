# Banner (轮播图) 组件文档

## 一、Banner (轮播图) 组件介绍 (Banner Component Introduction)

Banner 组件是 `ad` 组件库中的核心组件之一，主要用于在网页中展示一系列的项目（例如图片或视频）。它支持多种动画效果，使得内容切换更加生动有趣。开发者可以通过简单的配置，实现常见的轮播图、广告横幅等功能。该组件设计灵活，允许开发者自定义各种行为和样式，以适应不同的业务需求。

## 二、主要功能 (Key Features)

*   **可自定义尺寸:** 支持设置 Banner 的宽度 (width) 和高度 (height)。
*   **自动播放:** 可以配置自动轮播，并能调整播放速度 (autoPlaySpeed)。
*   **悬停暂停:** 当鼠标悬停在 Banner 上时，可以暂停自动播放 (pause)。
*   **导航控件:**
    *   **箭头导航:** 提供左右切换的箭头按钮 (arrow)。
    *   **缩略图导航:** 支持通过缩略图点击切换到对应的轮播项 (thumb)。
*   **丰富的动画类型:** 内置多种动画效果 (animType)，如滑动、淡入淡出、网格等。
*   **文字覆盖:** 支持在每个轮播项上叠加标题和描述性文字，并可自定义文字颜色和位置。

## 三、Props (参数说明)

以下是 Banner 组件可接受的参数列表：

| Prop 名称       | 类型    | 描述                                                                 | 示例                                                                                                                                                           |
| --------------- | ------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`         | Array   | 轮播项目数组。每个项目是一个对象，可以包含以下属性：<br> - `src`: (String) 图片或视频的路径 (必需).<br> - `alt`: (String) 图片的替代文本.<br> - `textHeader`: (String) 标题文字.<br> - `textOne`: (String) 第一行描述文字.<br> - `textTwo`: (String) 第二行描述文字.<br> - `textColor`: (String) 文字颜色.<br> - `textPosition`: (String) 文字位置. | `[{ src: 'img.jpg', alt: '图片', textHeader: '标题', textColor: '#fff', textPosition: 'center' }]`                                                                    |
| `width`         | String  | Banner 的宽度。                                                      | `'960px'`                                                                                                                                                      |
| `height`        | String  | Banner 的高度。                                                      | `'380px'`                                                                                                                                                      |
| `delay`         | Number  | 动画开始前的延迟时间 (单位: 毫秒)。                                   | `0`                                                                                                                                                            |
| `duration`      | Number  | 动画过渡的持续时间 (单位: 毫秒)。                                     | `1450`                                                                                                                                                         |
| `autoPlaySpeed` | Number  | 自动播放的速度/间隔时间 (单位: 毫秒)。                               | `5000`                                                                                                                                                         |
| `autoPlay`      | Boolean | 是否自动播放。                                                       | `true`                                                                                                                                                         |
| `pause`         | Boolean | 鼠标悬停时是否暂停播放。                                               | `false`                                                                                                                                                        |
| `arrow`         | Boolean | 是否显示左右导航箭头。                                                 | `true`                                                                                                                                                         |
| `arrowDefault`  | Boolean | 是否使用默认箭头样式/行为 (若为 `false`，通常意味着将使用自定义箭头或通过 `animType` 如 `customArrow` 来实现特定箭头逻辑)。 | `true`                                                                                                                                                         |
| `thumb`         | Boolean | 是否显示缩略图导航。                                                   | `true`                                                                                                                                                         |
| `animType`      | String  | 动画类型。默认为 `'Default'`。可选项包括: `'slider'`, `'fade'`, `'across'`, `'acrossOverlay'`, `'grid'`, `'gridBar'`, `'vertical'`, `'verticalOverlay'`, `'customArrow'`, `'customThumb'`, `'followMouse'`, `'videoBg'`, `'fullScreenAnim'`。 | `'fade'`                                                                                                                                                       |

## 四、使用示例 (Usage Example)

以下是一个基本的 Banner 组件使用示例：

```jsx
import React from 'react';
import Banner from './Banner'; // 假设 Banner 组件在当前目录或已正确配置路径

const BANNER_ITEMS = [
    {
        src: 'path/to/your/image1.jpg',
        alt: '图片1',
        textHeader: '这是标题1',
        textOne: '一些描述文字，让内容更丰富',
        textColor: '#FFFFFF',
        textPosition: 'center' // 例如: upLeft, upRight, center, downLeft, downRight
    },
    {
        src: 'path/to/your/video.mp4', // Banner 也支持视频
        // 视频通常没有 alt, textHeader 等属性，除非你的组件特殊处理
    },
    {
        src: 'path/to/your/image2.jpg',
        alt: '图片2',
        textHeader: '图片标题二',
        textOne: '这是第二张图片的描述',
        textColor: '#333333',
        textPosition: 'downLeft'
    }
];

function MyPageComponent() {
    return (
        <div>
            <Banner
                items={BANNER_ITEMS}
                width={'960px'}
                height={'380px'}
                delay={0} // 动画开始前的延迟，单位毫秒
                duration={1000} // 动画过渡时间，单位毫秒
                autoPlaySpeed={3000} // 自动播放间隔，单位毫秒
                autoPlay={true} // 是否自动播放
                pause={true} // 鼠标悬停时是否暂停
                arrow={true} // 是否显示左右箭头
                thumb={true} // 是否显示缩略图导航
                animType={"fade"} // 动画类型，例如: slider, fade, vertical
            />
        </div>
    );
}

export default MyPageComponent;
```

**注意:**
*   请确保 `BANNER_ITEMS` 中的 `src` 路径是正确的，并且资源文件存放在可访问的位置。
*   `textPosition` 的可选值可能包括：`upLeft`, `upRight`, `center`, `downLeft`, `downRight` 等，具体取决于组件的实现。

## 五、示例页面 (Example Page)

项目内提供了一个可运行的 Banner 组件示例，位于：
[`ad/Banner/example/MainPage.jsx`](./example/MainPage.jsx)

您可以参考此文件来了解 Banner 组件在实际项目中的具体用法和配置方式。该示例通常会演示组件的多种功能和参数配置。
