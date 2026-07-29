# ad Project Documentation

This repository is an open-source implementation of my master’s thesis, *Design and Implementation of a React-Based Frontend Advertising Component Library* (Shandong University, 2018). It has been continuously maintained and refactored since graduation, so some implementation details may differ from the original thesis. For academic references, please rely on the thesis text; for the latest engineering implementation, please refer to this repository.

## 1. Project Introduction

`ad` is a React-based component library designed to help developers quickly build dynamic and interactive advertising elements as well as other rich web content. This library features high flexibility and extensibility, adapting to various complex application scenarios beyond just advertisements, and can be used to create engaging user interface elements.

## 2. Key Components

This library provides a set of preset components for developers to use directly:

*   **Banner:** Used for creating image or content carousel effects, supporting multiple configurations like auto-play and manual switching.
*   **Interactive:** Tools for building interactive charts or dynamic elements to enhance user engagement.
*   **LowLevelAnim (Low-level Animation Library):** Encapsulates low-level animation implementations, providing animation support for upper-level components and allowing developers to customize complex animations.
*   **Marquee:** Implements scrolling text or content display effects, commonly used for notifications, announcements, etc.
*   **PopUp:** Used for creating modal dialogs, alerts, and other pop-up windows.
*   **Scalable:** A container component that can dynamically adjust its size based on the content or parent container.

## 3. Installation

Run the following command in the project root directory to install the required dependencies:

```bash
npm install
```

## 4. Development

This project uses Express (`devServer.js`) as a local development server for running example pages or for local development and debugging of components. Execute the following command to start the development server:

```bash
npm run server
```
This command will start a hot-reloading development environment, making it easy to see code changes in real-time.

## 5. Building

Depending on the environment's needs, you can execute the following commands to package the project:

### Development Build

This command packages the project in development mode and watches for file changes to automatically rebuild:

```bash
npm run build
```

### Production Build

This command packages the project in production mode, performing code compression and optimization, suitable for deployment to production environments:

```bash
npm run dist
```

---

**Note:**
*   The `npm run build` script is typically configured as `NODE_ENV=development webpack --progress --colors --watch`.
*   The `npm run dist` script is typically configured as `NODE_ENV=production webpack --progress --colors`.
Refer to the `scripts` section in the `package.json` file for specific configurations.
