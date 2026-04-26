# PopUp Component Documentation

[中文版](./README.zh-CN.md)

## 1. PopUp Component Introduction

The PopUp component is used to display content at specific positions on the screen, such as advertisements, notifications, or important alerts. It can fix content to screen corners, the center, or display it in a "couplet" form on both sides of the page. This makes it a flexible way to capture user attention or deliver information.

## 2. Key Features

*   **Multiple Positioning Options:** Supports fixing popups at the four corners (topLeft, topRight, bottomLeft, bottomRight), screen center, or as couplet ads on both sides.
*   **Clickable Content:** Content within the popup (usually an image) can link to a specified URL.
*   **Manual Close Button:** Provides a close button allowing users to manually close the popup.
*   **Optional Background Mask:** Optionally displays a background mask layer covering the page when the popup appears.
*   **Optional Auto Disappear:** Popups can automatically close after a set duration.
*   **Customizable Dimensions and Content:** Allows developers to customize width, height, and the image content of the popup.

## 3. Props

The following is the list of parameters accepted by the PopUp component:

| Prop Name       | Type    | Default Value       | Description                                                                                                                                                              | Example                                                                                               |
| --------------- | ------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `items`         | Array   | `[]`                | Array of content objects, each containing `src` (image path).<br> - For most `position` values (e.g., `center`, `bottomRight`), `items[0].src` is used.<br> - For `position: "couplet"`, the left couplet uses `items[1].src` and the right uses `items[2].src` (`items[0]` is usually unused or a placeholder in this mode). | `[{src: 'img1.jpg'}, {src: 'img2.jpg'}, {src: 'img3.jpg'}]`                                        |
| `width`         | String  | `'135px'`           | Width of the popup. For `couplet` type, this is the width of a single couplet.                                                                                                               | `'200px'`                                                                                          |
| `height`        | String  | `'180px'`           | Height of the popup. For `couplet` type, this is the height of a single couplet.                                                                                                               | `'250px'`                                                                                          |
| `link`          | String  | `""`                | URL to jump to when clicking the popup content. If empty, the content is not clickable.                                                                                                            | `"https://www.example.com"`                                                                        |
| `position`      | String  | `"bottomRight"`     | Position of the popup. Valid values: `"bottomRight"`, `"bottomLeft"`, `"upRight"`, `"upLeft"`, `"center"`, `"couplet"`.                                                         | `"center"`                                                                                         |
| `distanceX`     | String  | `"20px"`            | Horizontal margin. For corner positions, distance from screen edge; for `couplet`, distance from the left/right edges of the page content area. Not used for `center`.                                                | `"50px"`                                                                                           |
| `distanceY`     | String  | `"30px"`            | Vertical margin. For corner positions, distance from screen edge; for `couplet`, distance from the top of the page. Not used for `center`.                                                              | `"60px"`                                                                                           |
| `mask`          | Boolean | `false`             | Whether to display a background mask layer. When the popup appears, background content will be covered.                                                                                                                | `true`                                                                                             |
| `maskColor`     | String  | `'rgba(0,0,0,0.3)'` | Color of the mask layer (valid CSS color value).                                                                                                                                    | `'rgba(0, 0, 0, 0.5)'`                                                                             |
| `autoDisappear` | Boolean | `false`             | Whether to automatically disappear after a specified duration.                                                                                                                                            | `true`                                                                                             |
| `duration`      | Number  | `1000`              | Duration before auto disappearance if `autoDisappear` is `true` (in milliseconds).                                                                                                 | `3000`                                                                                             |

## 4. Usage Example

### Center PopUp:

```jsx
import React from 'react';
import PopUp from './PopUp'; // Adjust path based on your project structure

const POPUP_ITEM_CENTER = [{src: 'path/to/your/center-image.jpg'}];

function MyCenterPopup() {
    return (
        <PopUp
            items={POPUP_ITEM_CENTER}
            width={'400px'}
            height={'300px'}
            link={"http://example.com/promo"}
            position={"center"}
            mask={true} // Show mask layer
            autoDisappear={true} // Auto disappear after 5 seconds
            duration={5000}
        />
    );
}

export default MyCenterPopup;
```

### Couplet Ads:

```jsx
import React from 'react';
import PopUp from './PopUp'; // Adjust path based on your project structure

const POPUP_ITEMS_COUPLET = [
    {}, // items[0] usually not used for "couplet" type
    {src: 'path/to/your/left-couplet-image.jpg'}, // left couplet image
    {src: 'path/to/your/right-couplet-image.jpg'} // right couplet image
];

function MyCoupletAds() {
    return (
        <PopUp
            items={POPUP_ITEMS_COUPLET}
            width={'120px'} // width of a single couplet
            height={'300px'} // height of a single couplet
            link={"http://example.com/campaign"}
            position={"couplet"}
            distanceX={"10px"} // horizontal distance from page content
            distanceY={"50px"} // vertical distance from page top
        />
    );
}

export default MyCoupletAds;
```

**Note:**
*   Ensure `src` paths in `items` are correct and accessible.
*   `distanceX` and `distanceY` for `couplet` type control spacing from the main page content area, not screen edges.

## 5. Example Pages

Multiple executable examples for the PopUp component are provided. You can refer to these files for specific usage and configuration:

*   **Couplet Ad Example:**
    [`ad/PopUp/example/couplet/MainPage.jsx`](./example/couplet/MainPage.jsx)
    (Demonstrates `position="couplet"` type)

*   **Center PopUp Example:**
    [`ad/PopUp/example/no-couplet/MainPage-center.jsx`](./example/no-couplet/MainPage-center.jsx)
    (Demonstrates `position="center"` type)

*   **Bottom Right PopUp Example:**
    [`ad/PopUp/example/no-couplet/MainPage-bottomRight.jsx`](./example/no-couplet/MainPage-bottomRight.jsx)
    (Demonstrates `position="bottomRight"` type)

These examples are great starting points for learning and using the PopUp component.
