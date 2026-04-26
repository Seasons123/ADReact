# Scalable (Scalable Advertisement) Component Documentation

[中文版](./README.zh-CN.md)

## 1. Scalable Component Introduction

The Scalable component is designed to display a large banner-style advertisement. This ad can automatically play an animation (e.g., sliding out or shrinking) after being displayed for a certain period based on a specified position (`position`), or transition to a smaller version of the ad. This component relies on `LowLevelAnim/SingleAnim` for its animation effects.

## 2. Key Features

*   **Prominent Large Ad Display:** Capable of showing a noticeable large-sized advertisement.
*   **Auto-disappear or Shrink Animation:** Supports the large ad automatically animating away or shrinking after a set time.
*   **Transition to Small Ad:** Can smoothly transition to a smaller "normal" version of the ad after the main ad animation ends.
*   **Configurable Position:** Ads can appear at the top, bottom, left, or right of the screen.
*   **Manual Close Button:** Provides a close button allowing users to manually close the ad.
*   **Linkable Content:** Ad content (image) can link to a specified URL.

## 3. Props

The following is the list of parameters accepted by the Scalable component:

| Prop Name       | Type    | Default Value          | Description                                                                                                                                                                                                                           | Example                                                                         |
| --------------- | ------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| `items`         | Array   | `[]`                   | Array of objects defining ad images and initial sizes.<br> - `items[0]`: (Object) `{ src, width, height }` - Used for the small version when `position` is `"top"` or `"bottom"`.<br> - `items[1]`: (Object) `{ src, width, height }` - Used for the main large ad.<br> - `items[2]`: (Object) `{ src, width, height }` - Used for the small version when `position` is `"left"` or `"right"`. | `[{src:'s.jpg',w:'100px',h:'50px'}, {src:'b.jpg',w:'800px',h:'300px'}, ...]` |
| `width`         | String  | `'800px'`              | Width of the large ad container. Mainly used when `position` is `"top"` or `"bottom"` to ensure content is centered within its container. Should typically match `items[1].width`.                                                                              | `'960px'`                                                                    |
| `link`          | String  | `"https://github.com"` | URL to jump to when the ad content is clicked.                                                                                                                                                                                                     | `"https://www.example.com/product"`                                          |
| `position`      | String  | `"right"`              | Position where the ad appears and its animation behavior. Valid values: `"top"`, `"left"`, `"right"`, `"bottom"`.                                                                                                                                                     | `"bottom"`                                                                   |
| `autoDisappear` | Boolean | `true`                 | Whether the large ad automatically executes the disappear or transition animation after `delay` time.                                                                                                                                                 | `false`                                                                      |
| `delay`         | Number  | `1600`                 | Delay time before the animation starts if `autoDisappear` is `true` (in milliseconds).                                                                                                                                                           | `3000`                                                                       |
| `aotoNormalSize`| Boolean | `true`                 | Whether to display a small version of the ad when the large ad disappears. If `false`, the large ad will just disappear.                                                                                                                                       | `false`                                                                      |

## 4. Behavior Details

*   **Auto Disappear/Transition:**
    When `autoDisappear` is `true`, the initially displayed large ad (`items[1]`) will automatically animate after the delay defined by the `delay` property. The specific effect depends on the `position` value:
    *   `"top"`: Large ad slides out upwards.
    *   `"bottom"`: Large ad slides out downwards.
    *   `"left"`: Large ad slides out to the left, possibly with a shrinking effect.
    *   `"right"`: Large ad slides out to the right, possibly with a shrinking effect.

*   **Transition to Normal Size:**
    If `aotoNormalSize` (Note: property name in source code is `aotoNormalSize`) is `true`, and `autoDisappear` is also `true`, a small version of the ad will be shown after the large ad's disappearance animation completes.
    *   When `position` is `"top"` or `"bottom"`, the image and size defined in `items[0]` are used for the small ad.
    *   When `position` is `"left"` or `"right"`, the image and size defined in `items[2]` are used for the small ad.

*   **Close Button:**
    Regardless of automatic behavior, users can always manually close the currently displayed ad (large or small) by clicking the 'X' button in the upper right corner. Once closed, the ad will no longer be shown.

## 5. Usage Example

Here is a basic usage example of the Scalable component:

```jsx
import React from 'react';
import Scalable from './Scalable'; // Adjust path based on your project structure

const SCALABLE_IMAGES = [
    { src: 'path/to/small-horizontal-ad.jpg', width: '800px', height: '80px' }, // items[0]: small ad for top/bottom
    { src: 'path/to/large-main-ad.jpg', width: '800px', height: '380px' },      // items[1]: main large ad
    { src: 'path/to/small-vertical-ad.jpg', width: '80px', height: '450px' }    // items[2]: small ad for left/right
];

function MyScalableAdPage() {
    return (
        <Scalable
            items={SCALABLE_IMAGES}
            width={'800px'} // typically matches items[1].width
            link={"http://example.com/product-page"}
            position={"top"} // ad appears from top, then slides up to reveal small top ad
            autoDisappear={true}
            delay={2000}         // animate after 2 seconds
            aotoNormalSize={true}
        />
    );
}

export default MyScalableAdPage;
```

**Note:**
*   Ensure `src` paths in `items` are correct and accessible.
*   The structure of the `items` array is crucial. `items[1]` is always the main ad. `items[0]` and `items[2]` are used for small ads under different `position` settings.

## 6. Example Page

An executable example for the Scalable component is available at:
[`ad/Scalable/example/MainPage.jsx`](./example/MainPage.jsx)

You can refer to this file for the specific usage and configuration of the Scalable component in a real project. It typically demonstrates various features and parameter configurations.
