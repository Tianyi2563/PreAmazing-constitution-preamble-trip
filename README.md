# PreAmazing - 宪法序言交互学习网页

## 📖 关于这个项目

Life is short, I use PreAmazing. (Just kidding.)

Actually, it's a vibe-coding toy I built to survive the boring Sizheng Pre. I just found it way more interesting to vibe-code a website — and interestingly, this time the final creation turned out to be really satisfying (at least for my own presentation).

At first I didn't plan to put it on GitHub, but when I realized it was way more troublesome to find another way for my classmates to access the site, I gave in.

The project name is playful too: "PreAmazing" means an amazing journey through the preamble, and an amazing showtime for your presentation.

Anyway, you can think of it as an interactive constitution preamble website built with vibe coding, designed to be the ultimate "SiZheng-Pre-Killer" — making your Sizheng presentation unforgettable.

For those who excel in web development, please just treat it as a playful toy project, born from a sleepy, desperate student stuck in boring Sizheng classes and drowning in crazy pre deadlines.

---

## 🚀 快速开始

### 方式一：直接打开单文件版本（最简单）
直接双击 `standalone.html` 即可使用，无需任何配置！

### 方式二：本地服务器运行
```bash
# 克隆项目
git clone https://github.com/Tianyi2563/PreAmazing-constitution-preamble-trip.git
cd PreAmazing-constitution-preamble-trip

# 启动本地服务器
python -m http.server 8080

# 打开浏览器访问
# http://localhost:8080/index.html
```

### 方式三：在线访问
如果已启用 GitHub Pages，直接访问：  
`https://tianyi2563.github.io/PreAmazing-constitution-preamble-trip/`

---

## ✨ 功能说明

### 1. 首页 (index.html)
- 🎨 精美的视觉设计，包含浮动圆盘、粒子效果
- 📅 1982年印章设计（繁体书法字体）
- 🧭 四大模块导航卡片
- 🎯 渐进式动画效果

### 2. 宪法序言展示 (preamble.html)
- 📜 完整呈现宪法序言原文
- 🔍 关键词高亮标注
- 📖 分段阅读，滚动渐变效果

### 3. 版本迭代 (versions.html)
- 📚 1954、1975、1978、1982四个版本对比
- 🎯 差异高亮显示
- 📈 历史沿革展示

### 4. 知识闯关 (quiz.html)
- 🎮 随机抽取宪法序言相关题目
- ✅ 即时反馈答题结果
- 📊 得分统计

### 5. 共创序言 (co-create.html)
- ✍️ 用户可以续写"未来宪法序言"
- 🎖️ 关键词匹配，获得"序言写手"徽章
- 📋 班级共创墙，展示所有提交内容
- ❤️ 点赞功能，热门内容置顶

---

## ⚠️ 未完善的功能

### 共创功能的限制
- 当前使用浏览器 `localStorage` 存储数据，不同用户之间无法共享内容
- 没有后端服务支持，无法实现真正的多人实时协作
- 没有用户认证系统，内容可随意修改

### 其他可改进的地方
- [ ] 响应式设计在小屏幕上的优化
- [ ] 添加更多版本迭代的详细内容
- [ ] 知识闯关的题库扩展
- [ ] 共创墙的内容审核机制
- [ ] 导出共创内容的功能
- [ ] 添加音效和更多动画效果

---

## 📁 文件说明

### 核心文件
| 文件 | 说明 |
|------|------|
| `index.html` | 首页（带印章、粒子动画） |
| `standalone.html` | 单文件版本（所有内容整合，双击打开） |
| `preamble.html` | 宪法序言展示页 |
| `versions.html` | 版本迭代页 |
| `quiz.html` | 知识闯关页 |
| `co-create.html` | 共创序言页 |

### 样式文件
| 目录 | 说明 |
|------|------|
| `css/variables.css` | 全局变量（颜色、字体等） |
| `css/base.css` | 基础样式 |
| `css/components.css` | 通用组件样式 |
| `css/index.css` | 首页样式 |
| `css/preamble.css` | 序言页样式 |
| `css/versions.css` | 版本页样式 |
| `css/quiz.css` | 闯关页样式 |
| `css/co-create.css` | 共创页样式 |

### 脚本文件
| 目录 | 说明 |
|------|------|
| `js/main.js` | 通用逻辑（导航、粒子效果） |
| `js/preamble.js` | 序言页交互逻辑 |
| `js/versions.js` | 版本页交互逻辑 |
| `js/quiz.js` | 闯关页交互逻辑 |
| `js/co-create.js` | 共创页交互逻辑 |

### 数据文件
| 目录 | 说明 |
|------|------|
| `data/preamble.json` | 宪法序言原文数据 |
| `data/versions.json` | 版本迭代对比数据 |
| `data/questions.json` | 知识闯关题库数据 |

### 其他
| 文件 | 说明 |
|------|------|
| `writing-guide.md` | 共创序言的写作参考指南 |
| `prompts.md` | 开发过程中使用的AI提示词清单 |

---

## 🧩 提示词清单

详细的提示词清单请查看 `prompts.md` 文件。

---

## 📜 致谢

- 感谢所有参与共创的同学们
- 感谢 GitHub Pages 提供免费托管
- Life is short, keep coding!

---

## 📄 许可证

本项目仅供学习交流使用。