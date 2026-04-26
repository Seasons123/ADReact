# Interactive Component Documentation

[中文版](./README.zh-CN.md)

## 1. Interactive Component Introduction

The Interactive component is a versatile container or scheduler designed to integrate and display various types of interactive data visualizations. It can dynamically render different interactive effects based on passed type parameters, such as Focus Graph or Force-Directed Graph. This allows developers to achieve rich dynamic data presentation under a unified component interface.

## 2. Key Features

*   **Supports Multiple Interactive Visualization Types:** Able to render different types of interactive charts based on configuration.
*   **Customizable Dimensions:** Allows developers to set the width and height of the component.
*   **Data-Driven:** The behavior and display content of the component are determined by the passed `content` data.

## 3. Props

The following is the list of parameters accepted by the Interactive component:

| Prop Name | Type           | Default Value | Description                                                                                                                               | Example                                                                 |
| --------- | -------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `content` | Array\|String  | `[]`          | Data for interactive content. Usually an array of objects, each describing a visualization element (e.g., for graph nodes or logos). Structure may vary by `type`. | `[{src: 'path/to/image.svg'}, {src: 'path/to/another.svg'}]`         |
| `width`   | String         | `'800px'`     | Width of the component.                                                                                                                       | `'900px'`                                                            |
| `height`  | String         | `'600px'`     | Height of the component. (Note: `defaultProps` in source code might have a typo '600ox', this is the recommended correct value)                                                 | `'500px'`                                                            |
| `type`    | String         | `'logoGather'`| Specifies the type of interactive component to render. Valid values include: `'graphFocus'`, `'forceDirectedGraph'`. `'logoGather'` might be a future or intended type, but currently the first two are primarily supported. | `'graphFocus'`                                                       |

## 4. Usage Example

Here is a basic usage example of the Interactive component, showing how to render a Focus Graph:

```jsx
import React from 'react';
import Interactive from './Interactive'; // Assuming Interactive component is in the current directory or path is correctly configured

const INTERACTIVE_DATA = [
    { src: 'path/to/your/image.svg', width: 100, height: 100 }, // Nodes can have their own attributes
    { src: 'path/to/another/image.svg', width: 80, height: 80 },
    // ...more node data
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

**Note:**
*   Ensure the `src` paths in `INTERACTIVE_DATA` are correct.
*   Specific attributes of objects in `content` (e.g., `width`, `height` for nodes in `graphFocus`) depend on the selected `type`.

## 5. Supported Types

Currently, the following interactive visualization types are mainly supported:

*   **`graphFocus`**: A graphical focus interaction effect. Users can highlight specific graphic elements through interaction (like mouse hover or click), while other elements fade or move accordingly, creating a visual focus. Commonly used to display a set of related icons or small images.
*   **`forceDirectedGraph`**: Force-Directed Graph layout. Arranges nodes and edges by simulating forces in a physical system (like spring forces and repulsion), making closely connected nodes stay together and sparsely connected nodes stay apart. Suitable for displaying network structures, relationship maps, etc.

## 6. Example Pages

Executable examples for the Interactive component are provided within the project. You can refer to these files to understand the specific usage and configuration for different types of interactive components:

*   **Focus Graph Example (graphFocus):**
    [`ad/Interactive/example/MainPage.jsx`](./example/MainPage.jsx)
    Demonstrates configuration and effect for `type='graphFocus'`.

*   **Force-Directed Graph Example (forceDirectedGraph):**
    [`ad/Interactive/example/MainPage_ForceDirectedGraph.jsx`](./example/MainPage_ForceDirectedGraph.jsx)
    Demonstrates configuration and effect for `type='forceDirectedGraph'`.

These examples are good starting points for learning and using the Interactive component, demonstrating various features and configurations.
