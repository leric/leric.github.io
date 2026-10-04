# CMP 中文版写作指南

用于把 `src/content/research/cmp/<part>/<slug>.mdx` 改写成中文版 `src/content/research/zh/cmp/<part>/<slug>.mdx`。

## 原则

- 面向中文技术读者重写，而不是逐句翻译。保留每一个论点、例子、定义、公式、代码、表格和章节结构，不增删观点。
- 用自然的中文书面表达：拆分英文长句，避免"被"字句堆叠和"……的……的……"长定语，避免"进行""实现了……的"一类翻译腔。英文的修辞性重复、排比可按中文习惯合并或调整。
- 语气：清晰、克制、有判断力的技术写作，类似优秀的中文技术专栏。不要口水化，不要网络流行语。
- 标点用中文全角标点（，。：；？！""「」可用""），中英文之间加空格（如"AI 智能体"、"Clean Architecture 的边界"）。
- 代码块、行内代码、数学公式、URL 原样保留；代码中的注释和字符串可保持英文。

## 术语表（全书统一）

| English | 中文 |
|---|---|
| Context Minimization Principle (CMP) | 上下文最小化原则（CMP） |
| context cost / context acquisition cost | 上下文成本 / 上下文获取成本 |
| sufficient context | 充分上下文 |
| modification | 修改 |
| modifier | 修改者 |
| coding agent / agent | 编程智能体 / 智能体 |
| harness | 智能体框架（harness），首次出现保留英文 |
| depth / breadth | 深度 / 广度 |
| focal artifact | 焦点构件 |
| artifact | 构件（指代码、文档、配置等工件） |
| modification closure | 修改闭包 |
| context transformation | 上下文变换 |
| boundary / locality | 边界 / 局部性 |
| contract | 契约 |
| context routing | 上下文路由 |
| omission | 遗漏 |
| testability | 可测试性 |
| verification context | 验证上下文 |
| design bet / context bet | 设计押注 / 上下文押注 |
| post-task design reflection | 任务后设计反思 |
| seam | 接缝 |
| bounded context | 限界上下文 |
| vertical slice | 垂直切片 |
| Clean Architecture / Hexagonal / Ports & Adapters | 整洁架构（Clean Architecture）/ 六边形架构 / 端口与适配器 |
| over-engineering / YAGNI | 过度设计 / YAGNI |
| DRY / SRP | DRY / 单一职责原则（SRP） |
| implicit knowledge / explicit knowledge | 隐性知识 / 显性知识 |
| trustworthy (boundary) | 可信（边界） |

首次出现的核心术语可用"中文（English）"形式标注一次。

## 文件格式

- Frontmatter：`title`、`description` 改写为中文；`lang: zh`；`canonicalUrl` 改为 `https://www.contextcost.dev/zh/research/cmp/<part>/<slug>/`；其余字段（book、part、order、status、version、日期、tags、standalone）与英文版一致。
- 文件比英文版深一层目录，所有相对 import 路径需多加一级 `../`（例如 `'../../../../assets/x.png'` → `'../../../../../assets/x.png'`）。
- 站内章节链接 `/research/cmp/...` 改为 `/zh/research/cmp/...`；`/cmp/` 改为 `/zh/cmp/`。其他链接不变。
- 标题锚点由中文标题自动生成；若正文中有 `#some-anchor` 形式的页内链接，需改成对应中文标题生成的锚点（rehype-slug：小写、空格转 `-`、去除大部分标点，中文字符保留）。
