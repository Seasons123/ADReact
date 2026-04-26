# Marquee Component Documentation

[中文版](./README.zh-CN.md)

## 1. Marquee Component Introduction

The Marquee component is used to create horizontal scrolling text effects on a webpage, typically for displaying announcements, notifications, news headlines, or any brief information that needs to dynamically catch the user's attention. It allows static text content to be displayed in a loop with animation.

## 2. Key Features

*   **Horizontal Text Scrolling:** Primarily implements text scrolling from right to left or left to right.
*   **Customizable Content:** Supports custom text content for scrolling.
*   **Configurable Style:** Allows customization of font size, color, and font family.
*   **Hyperlink Support:** The scrolling text can act as a whole link to a specified URL.
*   **Scrolling Behavior Control:**
    *   Adjustable scrolling speed (defined via `interval` for single scroll duration).
    *   Configurable CSS animation timing function (`timingFunction`).
    *   Specifiable scrolling direction (`direction`).
*   **Loop Control:** Supports infinite looping or a fixed number of scrolls.
*   **Pause on Hover:** Text scrolling can be paused when the mouse hovers over the Marquee component.

## 3. Props

The following is the list of parameters accepted by the Marquee component:

| Prop Name        | Type    | Default Value                        | Description                                                                     | Example                         |
| ---------------- | ------- | ------------------------------------ | ------------------------------------------------------------------------ | ---------------------------- |
| `text`           | String  | `'After all , tomorrow is another day '` | The text content to scroll.                                                       | `'Latest News: Sunny weather today'`     |
| `fontSize`       | String  | `'20px'`                             | Font size of the text.                                                         | `'16px'`                     |
| `fontColor`      | String  | `'#323232'`                          | Color of the text.                                                             | `'#FF0000'`                  |
| `fontFamily`     | String  | `'Microsoft YaHei'`                  | Font family of the text.                                                             | `'Arial, sans-serif'`        |
| `link`           | String  | `"https://github.com/Seasons123"`    | URL to jump to when text is clicked. If empty or not provided, text is not clickable.            | `'https://www.example.com'`  |
| `autoRoll`       | Boolean | `true`                               | Whether to scroll infinitely. If `true`, the `rollCount` parameter is ignored.         | `false`                      |
| `rollCount`      | Number  | `2`                                  | Total number of times to scroll when `autoRoll` is `false`.                          | `3`                          |
| `interval`       | Number  | `20`                                 | Time required to complete one full scroll (in seconds). Smaller values mean faster speed.           | `10`                         |
| `timingFunction` | String  | `'linear'`                           | CSS animation timing function to control the scroll's acceleration curve.                               | `'ease-in-out'`              |
| `direction`      | String  | `'left'`                             | Direction of text scrolling. Usually supports `'left'` and `'right'`. | `'right'`                    |

## 4. Usage Example

Here is a basic usage example of the Marquee component:

```jsx
import React from 'react';
import Marquee from './Marquee'; // Assuming Marquee component is in the current directory or path is correctly configured

function MyNewsTicker() {
    return (
        <div>
            <Marquee
                text="This is an important scrolling news, click here for details!"
                fontSize="18px"
                fontColor="#FF0000"
                fontFamily="SimSun, serif"
                link="http://example.com/news-article"
                autoRoll={true} // Infinite scrolling
                interval={15}   // 15 seconds per scroll
                direction="left" // Scroll left
                timingFunction="linear"
            />

            <Marquee
                text="This message scrolls only 3 times."
                fontSize="16px"
                fontColor="#0000FF"
                autoRoll={false} // Disable infinite scroll
                rollCount={3}    // Scroll 3 times
                interval={10}
            />
        </div>
    );
}

export default MyNewsTicker;
```

## 5. Example Page

An executable Marquee component example is available in the project at:
[`ad/Marquee/example/MainPage.jsx`](./example/MainPage.jsx)

You can refer to this file to understand the specific usage and configuration of the Marquee component in a real project. This example typically demonstrates various features and parameter configurations.
