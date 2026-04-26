# Banner Component Documentation

[中文版](./README.zh-CN.md)

## 1. Banner Component Introduction

The Banner component is one of the core components of the `ad` library, primarily used for displaying a series of items (such as images or videos) on a webpage. It supports various animation effects, making content transitions more vivid and interesting. Developers can easily implement common features like carousels and advertisement banners through simple configurations. The component is flexibly designed, allowing for customization of various behaviors and styles to meet different business requirements.

## 2. Key Features

*   **Customizable Dimensions:** Supports setting the width and height of the Banner.
*   **Auto Play:** Configurable automatic carousel with adjustable playback speed (`autoPlaySpeed`).
*   **Pause on Hover:** Automatic playback can be paused when the mouse hovers over the Banner (`pause`).
*   **Navigation Controls:**
    *   **Arrow Navigation:** Provides left and right arrow buttons for manual switching (`arrow`).
    *   **Thumbnail Navigation:** Supports switching to corresponding items via thumbnail clicks (`thumb`).
*   **Rich Animation Types:** Built-in multiple animation effects (`animType`), such as slider, fade, grid, etc.
*   **Text Overlay:** Supports overlaying titles and descriptive text on each carousel item, with customizable text color and position.

## 3. Props

The following is the list of parameters accepted by the Banner component:

| Prop Name       | Type    | Description                                                                 | Example                                                                                                                                                           |
| --------------- | ------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`         | Array   | Array of carousel items. Each item is an object that can contain:<br> - `src`: (String) Path to the image or video (required).<br> - `alt`: (String) Alt text for the image.<br> - `textHeader`: (String) Title text.<br> - `textOne`: (String) First line of descriptive text.<br> - `textTwo`: (String) Second line of descriptive text.<br> - `textColor`: (String) Text color.<br> - `textPosition`: (String) Text position. | `[{ src: 'img.jpg', alt: 'image', textHeader: 'Title', textColor: '#fff', textPosition: 'center' }]`                                                                    |
| `width`         | String  | Width of the Banner.                                                      | `'960px'`                                                                                                                                                      |
| `height`        | String  | Height of the Banner.                                                     | `'380px'`                                                                                                                                                      |
| `delay`         | Number  | Delay before the animation starts (in milliseconds).                                   | `0`                                                                                                                                                            |
| `duration`      | Number  | Duration of the animation transition (in milliseconds).                                     | `1450`                                                                                                                                                         |
| `autoPlaySpeed` | Number  | Speed/interval of auto play (in milliseconds).                               | `5000`                                                                                                                                                         |
| `autoPlay`      | Boolean | Whether to auto play.                                                       | `true`                                                                                                                                                         |
| `pause`         | Boolean | Whether to pause playback on mouse hover.                                               | `false`                                                                                                                                                        |
| `arrow`         | Boolean | Whether to display left and right navigation arrows.                                                 | `true`                                                                                                                                                         |
| `arrowDefault`  | Boolean | Whether to use default arrow styles/behavior (if `false`, usually means custom arrows or specific logic via `animType` like `customArrow`). | `true`                                                                                                                                                         |
| `thumb`         | Boolean | Whether to display thumbnail navigation.                                                   | `true`                                                                                                                                                         |
| `animType`      | String  | Animation type. Default is `'Default'`. Options include: `'slider'`, `'fade'`, `'across'`, `'acrossOverlay'`, `'grid'`, `'gridBar'`, `'vertical'`, `'verticalOverlay'`, `'customArrow'`, `'customThumb'`, `'followMouse'`, `'videoBg'`, `'fullScreenAnim'`. | `'fade'`                                                                                                                                                       |

## 4. Usage Example

Here is a basic usage example of the Banner component:

```jsx
import React from 'react';
import Banner from './Banner'; // Assuming Banner component is in the current directory or path is correctly configured

const BANNER_ITEMS = [
    {
        src: 'path/to/your/image1.jpg',
        alt: 'Image 1',
        textHeader: 'Title 1',
        textOne: 'Some descriptive text to enrich the content',
        textColor: '#FFFFFF',
        textPosition: 'center' // e.g., upLeft, upRight, center, downLeft, downRight
    },
    {
        src: 'path/to/your/video.mp4', // Banner also supports video
        // Videos typically don't have alt, textHeader, etc., unless specifically handled by the component
    },
    {
        src: 'path/to/your/image2.jpg',
        alt: 'Image 2',
        textHeader: 'Image Title 2',
        textOne: 'Description for the second image',
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
                delay={0} // Delay before animation starts, in ms
                duration={1000} // Animation transition time, in ms
                autoPlaySpeed={3000} // Auto play interval, in ms
                autoPlay={true} // Whether to auto play
                pause={true} // Whether to pause on hover
                arrow={true} // Whether to show arrows
                thumb={true} // Whether to show thumbnails
                animType={"fade"} // Animation type, e.g., slider, fade, vertical
            />
        </div>
    );
}

export default MyPageComponent;
```

**Note:**
*   Ensure the `src` paths in `BANNER_ITEMS` are correct and resources are accessible.
*   Available values for `textPosition` may include: `upLeft`, `upRight`, `center`, `downLeft`, `downRight`, etc., depending on the implementation.

## 5. Example Page

An executable Banner component example is available in the project at:
[`ad/Banner/example/MainPage.jsx`](./example/MainPage.jsx)

You can refer to this file to understand the specific usage and configuration of the Banner component in a real project. This example typically demonstrates various features and parameter configurations.
