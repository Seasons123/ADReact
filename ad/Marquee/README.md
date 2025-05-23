# Marquee (跑马灯) 组件文档

## 一、Marquee (跑马灯) 组件介绍 (Marquee Component Introduction)

Marquee 组件用于在网页中创建水平滚动的文本效果，通常用于展示公告、通知、新闻头条或任何需要动态吸引用户注意力的简短信息。它可以使静态文本内容以动画的形式循环展示。

## 二、主要功能 (Key Features)

*   **水平文本滚动:** 主要实现文本从右向左或从左向右的滚动效果。
*   **内容可定制:** 支持自定义滚动的文本内容。
*   **样式可配置:** 允许自定义文本的字体大小、颜色和字体家族。
*   **超链接支持:** 滚动的文本可以作为一个整体链接到指定的URL。
*   **滚动行为控制:**
    *   可调整滚动速度 (通过 `interval` 定义单次滚动时长)。
    *   可设置 CSS 动画的时间函数 (`timingFunction`)。
    *   可指定滚动方向 (`direction`)。
*   **循环控制:** 支持无限循环滚动或固定次数的滚动。
*   **悬停暂停:** 当鼠标悬停在 Marquee 组件上时，可以暂停文本的滚动。

## 三、Props (参数说明)

以下是 Marquee 组件可接受的参数列表：

| Prop 名称        | 类型    | 默认值                               | 描述                                                                     | 示例                         |
| ---------------- | ------- | ------------------------------------ | ------------------------------------------------------------------------ | ---------------------------- |
| `text`           | String  | `'After all , tomorrow is another day '` | 要滚动的文本内容。                                                       | `'最新消息：今日天气晴朗'`     |
| `fontSize`       | String  | `'20px'`                             | 文本的字体大小。                                                         | `'16px'`                     |
| `fontColor`      | String  | `'#323232'`                          | 文本的颜色。                                                             | `'#FF0000'`                  |
| `fontFamily`     | String  | `'Microsoft YaHei'`                  | 文本的字体。                                                             | `'Arial, sans-serif'`        |
| `link`           | String  | `"https://github.com/Seasons123"`    | 文本点击后跳转的URL。如果为空字符串或未提供，则文本不可点击。            | `'https://www.example.com'`  |
| `autoRoll`       | Boolean | `true`                               | 是否无限循环滚动。如果设置为 `true`，则 `rollCount` 参数将被忽略。         | `false`                      |
| `rollCount`      | Number  | `2`                                  | 当 `autoRoll` 为 `false` 时，文本滚动的总次数。                          | `3`                          |
| `interval`       | Number  | `20`                                 | 完成一次完整的滚动所需的时间 (单位: 秒)。此值越小，滚动速度越快。           | `10`                         |
| `timingFunction` | String  | `'linear'`                           | CSS 动画的时间函数，控制滚动的加速度曲线。                               | `'ease-in-out'`              |
| `direction`      | String  | `'left'`                             | 文本滚动的方向。通常支持 `'left'` (向左滚动) 和 `'right'` (向右滚动)。 | `'right'`                    |

## 四、使用示例 (Usage Example)

以下是一个基本的 Marquee 组件使用示例：

```jsx
import React from 'react';
import Marquee from './Marquee'; // 假设 Marquee 组件在当前目录或已正确配置路径

function MyNewsTicker() {
    return (
        <div>
            <Marquee
                text="这是一条重要的滚动新闻，点击这里查看详情！"
                fontSize="18px"
                fontColor="#FF0000"
                fontFamily="SimSun, serif"
                link="http://example.com/news-article"
                autoRoll={true} // 无限滚动
                interval={15}   // 15秒完成一次滚动
                direction="left" // 向左滚动
                timingFunction="linear"
            />

            <Marquee
                text="此消息仅滚动3次。"
                fontSize="16px"
                fontColor="#0000FF"
                autoRoll={false} // 关闭无限滚动
                rollCount={3}    // 滚动3次
                interval={10}
            />
        </div>
    );
}

export default MyNewsTicker;
```

## 五、示例页面 (Example Page)

项目内提供了一个可运行的 Marquee 组件示例，位于：
[`ad/Marquee/example/MainPage.jsx`](./example/MainPage.jsx)

您可以参考此文件来了解 Marquee 组件在实际项目中的具体用法和配置方式。该示例通常会演示组件的多种功能和参数配置。
