# Blog 文章添加指南

本文档记录向个人 blog 添加新文章的常规操作和格式要求。

## 文章位置

所有文章应放在 `src/content/blog/` 目录下，文件格式为 `.md`。

## Frontmatter 格式要求

每篇文章必须在文件开头包含 YAML frontmatter，用 `---` 包围。

### 必需字段

- **title** (string): 文章标题，使用双引号包裹，标题中的单引号需转义或使用不同的引号
- **description** (string): 文章描述/摘要，用于 SEO 和文章列表展示
- **pubDate** (string): 发布日期，格式为 "MMM DD YYYY"（例如 "Jan 10 2026" 或 "Dec 23 2025"）

### 可选字段

- **updatedDate** (string): 更新日期，格式同 pubDate
- **heroImage** (string): 文章封面图 URL，支持：
  - Unsplash 图片 URL（推荐格式）：`https://images.unsplash.com/photo-{photo-id}?w=1920&q=80`
  - 其他外部图片 URL
  - 本地图片路径（使用 `image()` 函数）
- **category** (string): 文章分类，例如 "AI Agents", "Software Architecture", "AI & Software Engineering"
- **tags** (array): 标签数组，例如 `["AI", "Software Engineering", "Clean Architecture"]`
- **featured** (boolean): 是否为精选文章，例如 `true` 或 `false`

## Frontmatter 示例

```yaml
---
title: "From Clean Architecture to Balatro: When 'Bureaucracy' Meets 'Emergence'"
description: "Exploring how game development's ECS paradigm challenges traditional Clean Architecture, and why sometimes perfect order is the enemy of joy. A reflection on bureaucracy vs. emergence in software design."
pubDate: "Jan 10 2026"
heroImage: "https://images.unsplash.com/photo-1667833153581-07750fc1370e?w=1920&q=80"
category: "Software Architecture"
tags: ["Clean Architecture", "ECS", "Game Development", "Software Design", "Balatro"]
---
```

## 文章内容格式

### 标题层级

- 文章正文的第一级标题应该与 frontmatter 中的 title 保持一致
- 使用 `##` 作为第一级标题（对应 frontmatter title）
- 使用 `###` 作为第二级标题
- 使用 `####` 作为第三级标题

### Markdown 语法

- 支持标准 Markdown 语法
- 可以使用 **粗体**、*斜体*、`代码` 等格式
- 可以使用链接、列表、代码块等元素

### 引用和脚注

- 支持 Markdown 引用语法 `>`
- 支持脚注格式 `[^1]` 和脚注定义

## 添加新文章的操作步骤

1. **创建文件**
   - 在 `src/content/blog/` 目录下创建新的 `.md` 文件
   - 文件名使用小写字母和连字符，例如 `my-new-article.md`

2. **添加 Frontmatter**
   - 在文件开头添加 `---` 分隔符
   - 填写必需的字段：title, description, pubDate
   - 根据需要添加可选字段：heroImage, category, tags, featured, updatedDate
   - 在末尾添加 `---` 分隔符
   - 在 frontmatter 后添加一个空行

3. **编写文章内容**
   - 第一行应该是与 frontmatter title 一致的一级标题（`##`）
   - 按照 Markdown 格式编写正文内容

4. **选择封面图**
   - 访问 Unsplash 搜索相关主题的图片
   - 使用 Unsplash 图片 URL 格式：`https://images.unsplash.com/photo-{photo-id}?w=1920&q=80`
   - 确保图片与文章主题相关

5. **验证格式**
   - 检查 frontmatter 格式是否正确（使用双引号包裹字符串）
   - 确保日期格式正确（"MMM DD YYYY"）
   - 确保 tags 是数组格式
   - 确保 heroImage URL 有效

6. **测试**
   - 运行开发服务器查看文章是否正确显示
   - 检查 frontmatter 是否符合 schema 要求（参考 `src/content.config.ts`）

## Schema 验证

所有文章必须符合 `src/content.config.ts` 中定义的 schema：

- `title`: z.string() - 必需
- `description`: z.string() - 必需
- `pubDate`: z.coerce.date() - 必需，字符串会被转换为 Date
- `updatedDate`: z.coerce.date().optional() - 可选
- `heroImage`: z.union([image(), z.string()]).optional() - 可选，支持本地图片或 URL 字符串
- `category`: z.string().optional() - 可选
- `tags`: z.array(z.string()).optional() - 可选，字符串数组
- `featured`: z.boolean().optional() - 可选

## 常见问题

### 标题中包含引号

如果标题中包含单引号，在 YAML frontmatter 中使用双引号包裹整个标题即可：

```yaml
title: "When 'Bureaucracy' Meets 'Emergence'"
```

### 日期格式

日期必须使用 "MMM DD YYYY" 格式，月份缩写：
- Jan, Feb, Mar, Apr, May, Jun
- Jul, Aug, Sep, Oct, Nov, Dec

### 图片 URL

推荐使用 Unsplash 图片，格式：
```
https://images.unsplash.com/photo-{photo-id}?w=1920&q=80
```

可以通过 Unsplash 搜索相关关键词找到合适的图片，例如：
- poker, cards, joker (扑克牌相关)
- architecture, code (代码/架构相关)
- AI, robots (AI 相关)

## 参考示例

可以参考现有文章：
- `balastro-architecture.md` - 包含完整的 frontmatter 示例
- `skills-containerized-knowledge.md` - 包含分类和标签示例
- `beyond-vibe-coding.md` - 包含 featured 字段示例
