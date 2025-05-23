# ad 项目文档

## 一、项目介绍 (Project Introduction)

`ad` 是一个基于 React 的组件库，旨在帮助开发者快速构建动态、交互式的广告元素及其他丰富的网页内容。本组件库具有高度的灵活性和可扩展性，能够适应多种复杂的应用场景，不仅仅局限于广告，还可以用于创建各种引人入胜的用户界面元素。

## 二、主要组件 (Key Components)

本库提供了一系列预设组件，方便开发者直接使用：

*   **Banner (轮播图):** 用于创建图片或内容轮播效果，支持自动播放、手动切换等多种配置。
*   **Interactive (交互式图表/元素):** 提供构建交互式图表或动态元素的工具，增强用户参与度。
*   **LowLevelAnim (底层动画库):** 封装了底层的动画实现，为上层组件提供动画支持，也方便开发者自定义复杂动画。
*   **Marquee (跑马灯):** 实现文字或内容的滚动展示效果，常用于通知、公告等场景。
*   **PopUp (弹出窗口):** 用于创建模态对话框、提示框等弹出式窗口。
*   **Scalable (可缩放容器):** 提供一个可以根据内容或父容器动态调整大小的容器组件。

## 三、安装 (Installation)

在项目根目录下运行以下命令来安装项目所需的依赖：

```bash
npm install
```

## 四、开发 (Development)

本项目使用 Express (`devServer.js`) 作为本地开发服务器，用于运行示例页面或进行组件的本地开发调试。执行以下命令启动开发服务器：

```bash
npm run server
```
该命令会启动一个热更新的开发环境，方便实时查看代码变更的效果。

## 五、构建 (Building)

根据不同环境的需要，可以执行以下命令来打包项目：

### 开发构建 (Development Build)

此命令会以开发模式打包，并监听文件变化进行自动重新构建：

```bash
npm run build
```

### 生产构建 (Production Build)

此命令会以生产模式打包，进行代码压缩和优化，适用于部署到生产环境：

```bash
npm run dist
```

---

**注意:**
*   `npm run build` 脚本通常配置为 `NODE_ENV=development webpack --progress --colors --watch`。
*   `npm run dist` 脚本通常配置为 `NODE_ENV=production webpack --progress --colors`。
具体配置请参考 `package.json` 文件中的 `scripts` 部分。
