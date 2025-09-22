# 全栈博客项目 (Full-Stack Blog Project)

这是一个使用现代化技术栈构建的简易全栈博客项目，旨在练习和展示全栈开发能力。项目包含独立的前端和后端服务，实现了用户认证、文章管理等核心功能。

## 技术栈 (Technology Stack)

<details>
  <summary><strong>后端 (Backend) - `blog-server`</strong></summary>

  - **框架 (Framework):** [Koa.js](https://koajs.com/) - 一个更小、更富有表现力、更健壮的 Node.js Web 框架。
  - **语言 (Language):** [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集，提供静态类型检查。
  - **数据库 (Database):** [MongoDB](https://www.mongodb.com/) - 一个基于分布式文件存储的 NoSQL 数据库。
  - **ORM / ODM:** [Mongoose](https://mongoosejs.com/) - 优雅的 MongoDB 对象建模工具。
  - **路由 (Routing):** `koa-router`
  - **认证 (Authentication):** `Cookie + Redis` (会话管理), `bcryptjs` (密码加密)
  - **环境 (Runtime):** [Node.js](https://nodejs.org/)

</details>

<details>
  <summary><strong>前端 (Frontend) - `blog-page`</strong></summary>

  - **框架 (Framework):** [Next.js](https://nextjs.org/) - 一个用于生产环境的 React 框架。
  - **语言 (Language):** [TypeScript](https://www.typescriptlang.org/)
  - **UI 库 (UI Library):** [React](https://reactjs.org/)
  - **CSS 方案 (Styling):** (待定, 例如 Tailwind CSS, Styled Components)
  - **状态管理 (State Management):** (待定, 例如 Redux Toolkit, Zustand)
  - **数据请求 (Data Fetching):** `axios` 或 `fetch`

</details>

---

## 项目启动 (Getting Started)

### 环境要求

- [Node.js](https://nodejs.org/) (v16.x 或更高版本)
- [npm](https://www.npmjs.com/) 或 [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (确保数据库服务已在本地运行)
- [Redis](https://redis.io/docs/getting-started/) (确保 Redis 服务已在本地运行)

### 1. 环境准备 (后端)

在启动后端服务前，请确保 Redis 服务已经启动。

```bash
# 检查 Redis 服务是否在运行
redis-cli ping
# 如果返回 PONG，则服务正常。
# 如果连接失败，请启动 Redis 服务。

# (macOS, 如果使用 Homebrew 安装)
brew services start redis
```

### 2. 启动后端服务

```bash
# 进入后端项目目录
cd blog-server

# 安装依赖
npm install

# 启动开发服务器 (会自动监听文件变化并重启)
npm run dev
```
> 👉 后端服务将运行在 `http://localhost:3001`。

### 3. 启动前端页面

```bash
# (在另一个终端中) 进入前端项目目录
cd blog-page

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```
> 👉 前端应用将运行在 `http://localhost:3000`。

---

## 项目结构 (Project Structure)

```
blog-fullstack/
├── blog-page/      # 前端 Next.js 项目
│   ├── src/
│   └── ...
└── blog-server/    # 后端 Koa.js 项目
    ├── src/
    │   ├── config/         # 配置文件 (例如数据库、Redis连接)
    │   ├── controllers/    # 控制器 (处理业务逻辑)
    │   ├── models/         # Mongoose 数据模型
    │   └── routes/         # 路由定义
    ├── package.json
    └── tsconfig.json
```

---

## API 端点 (API Endpoints)

### 用户认证 (Authentication)

#### `POST /api/users/register`
注册一个新用户。

- **请求体 (Request Body):**
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **成功响应 (201 Created):**
  ```json
  {
    "message": "User registered successfully!",
    "user": {
      "id": "...",
      "username": "your_username"
    }
  }
  ```
- **错误响应:**
  - `400 Bad Request`: 如果 `username` 或 `password` 缺失。
  - `409 Conflict`: 如果 `username` 已存在。

#### `POST /api/users/login`
用户登录并创建会话。

- **请求体 (Request Body):**
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **成功响应 (200 OK):**
  - **响应头 (Headers):** 会包含一个 `Set-Cookie` 头，用于在浏览器中设置 `sessionId`。
    ```
    Set-Cookie: sessionId=...; path=/; expires=...; httponly
    ```
  - **响应体 (Body):**
    ```json
    {
      "message": "Logged in successfully!",
      "user": {
        "id": "...",
        "username": "your_username"
      }
    }
    ```
- **错误响应:**
  - `400 Bad Request`: 如果 `username` 或 `password` 缺失。
  - `401 Unauthorized`: 如果用户名不存在或密码错误。

---

## 待办事项 (To-Do)

- [x] 搭建后端 Koa + TypeScript 项目框架
- [x] 实现用户注册 API 及密码加密存储
- [x] 实现用户登录 API (Cookie + Redis 会话)
- [ ] 搭建前端 Next.js + TypeScript 项目框架
- [ ] 实现前端登录/注册页面
- [ ] 实现需要登录保护的路由中间件
- [ ] 实现文章的增删改查 (CRUD) API
- [ ] 实现前端文章列表及详情页
