# Algonius Web Console

<div align="center">
  <h3>Algonius 量化交易平台的 Web 控制台</h3>
  <p>一个现代化的 MEME 交易策略管理平台</p>

  [![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![License](https://img.shields.io/github/license/algonius/algonius-web)](LICENSE)
  [![Build Status](https://github.com/algonius/algonius-web/workflows/build/badge.svg)](https://github.com/algonius/algonius-web/actions)
</div>

## 功能特性

- 📊 策略管理与监控
  - 策略创建和配置
  - 实时运行状态
  - 性能指标分析
  - 历史交易记录

- 💰 资产管理
  - 多链资产概览
  - 交易明细查询
  - 收益分析报表
  - 充值提现操作

- 👥 用户管理
  - 账户管理
  - API 密钥管理
  - 权限控制
  - 操作日志

- 🔔 消息通知
  - 自定义通知规则
  - 多渠道集成
  - 消息模板配置

## 技术栈

- 🔧 框架: React 18 + TypeScript
- 🎨 UI: Ant Design 5.0
- 📊 图表: ECharts 5
- 🚦 状态管理: Redux Toolkit
- 🛣️ 路由: React Router 6
- 🌐 网络: Axios
- 📝 表单: React Hook Form
- 🔐 认证: JWT
- 📦 构建: Vite
- 🧪 测试: Jest + React Testing Library

## 快速开始

### 开发环境配置

1. 克隆仓库
```bash
git clone https://github.com/algonius/algonius-web.git
cd algonius-web
```

2. 安装依赖
```bash
pnpm install
```

3. 启动开发服务器
```bash
pnpm dev
```

4. 访问 http://localhost:3000

### 构建部署

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 项目结构

```
algonius-web/
├── src/
│   ├── api/           # API 接口定义
│   ├── assets/        # 静态资源
│   ├── components/    # 公共组件
│   ├── config/        # 配置文件
│   ├── hooks/         # 自定义 Hooks
│   ├── layouts/       # 页面布局
│   ├── pages/         # 页面组件
│   ├── store/         # Redux store
│   ├── styles/        # 全局样式
│   ├── types/         # TypeScript 类型
│   └── utils/         # 工具函数
├── public/            # 公共资源
├── tests/             # 测试文件
└── vite.config.ts     # Vite 配置
```

## 组件示例

### 策略配置表单
```tsx
import { Form, Input, Select } from 'antd';
import { useStrategyForm } from '@/hooks/useStrategyForm';

export const StrategyForm = () => {
  const { form, onFinish } = useStrategyForm();

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="name" label="策略名称">
        <Input />
      </Form.Item>
      <Form.Item name="type" label="策略类型">
        <Select>
          <Select.Option value="bot">AI Bot</Select.Option>
          <Select.Option value="rule">规则策略</Select.Option>
        </Select>
      </Form.Item>
      {/* ... other form items */}
    </Form>
  );
};
```

## 开发规范

### 代码风格
- 使用 ESLint + Prettier 进行代码格式化
- 遵循 TypeScript 严格模式
- 使用 Conventional Commits 规范

### 组件开发
- 优先使用函数组件和 Hooks
- 遵循 Presentational/Container 模式
- 使用 PropTypes 或 TypeScript 类型声明

### 状态管理
- 局部状态使用 useState/useReducer
- 全局状态使用 Redux Toolkit
- 按功能模块拆分 Redux store

## 环境配置

### 开发环境
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080
VITE_ENV=development
```

### 生产环境
```env
VITE_API_BASE_URL=https://api.algonius.com
VITE_WS_URL=wss://api.algonius.com
VITE_ENV=production
```

## 测试

```bash
# 运行单元测试
pnpm test

# 运行端到端测试
pnpm test:e2e

# 生成测试覆盖率报告
pnpm test:coverage
```

## 部署

支持多种部署方式:

### Docker 部署
```bash
# 构建镜像
docker build -t algonius-web .

# 运行容器
docker run -p 80:80 algonius-web
```

### Kubernetes 部署
```bash
# 部署到开发环境
kubectl apply -f k8s/dev/

# 部署到生产环境
kubectl apply -f k8s/prod/
```

## 本地化

- 使用 react-i18next 支持多语言
- 默认支持中英文
- 可扩展其他语言支持

## 问题反馈

如果你在使用过程中遇到任何问题，请:

1. 查看 [常见问题](docs/FAQ.md)
2. 搜索 [已有 issues](https://github.com/algonius/algonius-web/issues)
3. 创建新的 [issue](https://github.com/algonius/algonius-web/issues/new)

## 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交变更
4. 创建 Pull Request

详见 [贡献指南](CONTRIBUTING.md)

## 更新日志

详见 [CHANGELOG.md](CHANGELOG.md)

## 许可证

[MIT](LICENSE)
