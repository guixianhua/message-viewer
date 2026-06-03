# Message Viewer

本地查看 **ChatML / JSON / Markdown** 消息的单文件 Web 应用，可选打包为 macOS / Windows 桌面 App。

![status](https://img.shields.io/badge/status-stable-brightgreen)
![platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Browser-blue)

## 功能

- **ChatML / JSON / Markdown** 三种输入格式自动识别
- **JSON 图形化视图**：节点/边可视化，支持平移、缩放、嵌套钻取与逐级返回
- **JSON 聚合**：从 Markdown / ChatML 文本里一键提取所有 JSON 块（含裸文本中的 JSON），按大小排序，标注源文件中的行列位置
- **弹窗内 `stringValue` 渲染**：JSON 字符串值可点开按 Markdown / ChatML 渲染，同样支持 JSON 聚合
- **明暗主题** 一键切换
- **Cmd/Ctrl + F** 触发自定义页内搜索（高亮 + 计数 + 上一项/下一项）
- **LLM 标签透传**：`<think>` `<answer>` `<tool_call>` 等保留为原文显示，不会被 HTML 解析吞掉
- **外链** 在系统浏览器中打开
- **完全离线**：桌面 App 把 marked / highlight.js / github-markdown-css 全部内联进 HTML

## 使用方式

### 1. 浏览器（最简单）

直接打开 `message-viewer.html` 即可。需要联网加载 CDN 资源。

```bash
open message-viewer.html        # macOS
```

### 2. 下载桌面 App（离线可用）

到 [Releases](https://github.com/guixianhua/message-viewer/releases) 下载：

| 平台 | 推荐文件 |
|---|---|
| Apple Silicon Mac | `Message Viewer-1.0.0-arm64.dmg` |
| Intel Mac | `Message Viewer-1.0.0.dmg` |
| Windows (任意架构) | `Message Viewer 1.0.0.exe`（portable，双击即跑） |
| Windows zip | `Message Viewer-1.0.0-win.zip` / `…-arm64-win.zip` |

> 未做代码签名。首次启动 macOS 需 **右键 → 打开**；Windows 在 SmartScreen 弹窗点 **更多信息 → 仍要运行**。

### 3. 从源码运行 / 打包

```bash
npm install            # 安装 electron + electron-builder（仅首次）
npm start              # 本地开发：内联资源 + 启动 Electron
npm run dist           # 打包 macOS：release/*.dmg、*.zip
npm run dist:win       # 打包 Windows：release/*.exe (portable)、*.zip
npm run dist:all       # macOS + Windows 一起打
```

## 项目结构

```
message-viewer.html          # 主应用（所有 HTML / CSS / JS 都在这里）
electron/
  main.js                    # Electron 入口
  inline-cdn.js              # 构建时把 CDN 资源内联进 HTML
  vendor/                    # marked / highlight.js / github-markdown-css 本地副本
package.json                 # Electron + electron-builder 构建配置
AGENTS.md                    # 项目协作规范
```

构建产物（git 忽略）：
- `build/message-viewer.html` —内联后的离线 HTML
- `release/` — `.dmg` / `.zip` / portable `.exe`

## 开发约定

- 主应用保持单文件，不拆分 `.css` / `.js`，除非有明确需要
- 2 空格缩进，JS 保留分号，`camelCase` 标识符，HTML/CSS 用 `kebab-case`
- 没有自动化测试，改动后请手动验证：ChatML / JSON / Markdown 渲染、主题切换、Cmd+F 搜索、外链跳转
- 更多细节见 [AGENTS.md](AGENTS.md)

## 许可

未指定。如需开源使用请先开 issue 沟通。
