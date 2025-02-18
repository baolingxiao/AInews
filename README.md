# 新闻门户网站

此项目是一个使用 React 和 Vite 构建的新闻门户网站。以下是项目中每个文件的功能描述：

## 项目结构

- **src/**: 源代码目录。
  - **App.tsx**: 应用的主组件，设置主题和布局。
  - **index.css**: 全局样式文件，定义了基本的样式规则。
  - **main.tsx**: 应用的入口文件，渲染根组件。
  - **components/**: 存放所有的 React 组件。
    - **Header/**: 头部组件，包含导航和时间显示。
      - **Header.tsx**: 定义了头部的布局和样式。
    - **Clock/**: 时钟组件，显示不同城市的时间。
      - **Clock.tsx**: 显示数字时钟。
      - **AnalogClock.tsx**: 显示模拟时钟。
    - **Globe/**: 地球动画组件。
      - **Globe.tsx**: 使用 Three.js 渲染旋转的地球。
  - **types/**: 类型定义文件。
    - **topojson.d.ts**: 为 TopoJSON 客户端库提供类型定义。

## 配置文件

- **vite.config.ts**: Vite 的配置文件，定义了开发服务器和构建选项。
- **package.json**: 项目的依赖和脚本配置。

## 其他文件

- **index.html**: 应用的 HTML 模板。
- **README.md**: 项目的说明文件。

## 运行项目

1. 安装依赖：`npm install`
2. 启动开发服务器：`npm run dev`

项目将在本地的 `http://localhost:5173` 上运行。
