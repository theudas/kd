---
title: React 高级特性面试
company: 阿里巴巴
position: React 开发工程师
tags: [React, Hooks, 性能优化]
difficulty: Hard
date: 2024-03-10
summary: 深入讨论 React Hooks、虚拟 DOM、性能优化等高级主题
---

# React 高级特性面试

## 1. React Hooks 原理

### 为什么 Hooks 必须在顶层调用？

Hooks 依赖于调用顺序来维护状态。React 使用一个数组来存储每个组件的 hooks 状态。

```javascript
const hooks = [];
let currentIndex = 0;

function useState(initialValue) {
  const index = currentIndex;
  
  if (!hooks[index]) {
    hooks[index] = initialValue;
  }
  
  currentIndex++;
  
  return [
    hooks[index],
    (value) => {
      hooks[index] = value;
      render(); // 触发重新渲染
    }
  ];
}
```

**规则**：
- 不能在条件语句中使用 Hooks
- 不能在循环中使用 Hooks
- 自定义 Hooks 必须以 `use` 开头

---

## 2. 虚拟 DOM 与 Diff 算法

### 虚拟 DOM 的优点

1. **跨平台**：可以在不同平台实现
2. **批量更新**：减少 DOM 操作
3. **性能**：在大多数情况下比直接操作 DOM 更快

### Diff 算法的优化策略

```javascript
// 简化版的 Diff 算法
function diff(oldVNode, newVNode) {
  // 1. 如果类型不同，替换整个节点
  if (oldVNode.type !== newVNode.type) {
    return 'REPLACE';
  }
  
  // 2. 比较属性
  const propsDiff = diffProps(oldVNode.props, newVNode.props);
  
  // 3. 比较子节点（关键优化点）
  const childrenDiff = diffChildren(oldVNode.children, newVNode.children);
  
  return { propsDiff, childrenDiff };
}
```

---

## 3. 性能优化技巧

### React.memo 和 useMemo

```javascript
// 阻止不必要的重新渲染
const MemoComponent = React.memo(({ value }) => {
  return <div>{value}</div>;
});

// 缓存计算结果
function ExpensiveComponent({ items }) {
  const memoizedValue = useMemo(() => {
    return items.filter(item => item.active).sort();
  }, [items]);
  
  return <div>{memoizedValue}</div>;
}
```

### useCallback

```javascript
function List({ items }) {
  // 避免每次渲染时创建新的回调函数
  const handleClick = useCallback((item) => {
    console.log(item);
  }, []);
  
  return items.map(item => (
    <Item key={item.id} item={item} onClick={handleClick} />
  ));
}
```

---

## 4. 状态管理

### 何时使用 Context vs Redux vs Zustand

| 方案 | 用途 | 复杂度 |
|------|------|--------|
| **Context API** | 简单全局状态 | 低 |
| **Redux** | 复杂状态管理 | 高 |
| **Zustand** | 中等状态管理 | 中 |

```javascript
// Zustand 示例
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}));
```

---

## 常见面试问题

- React 在一个事件中是如何批量更新 state 的？
- Fiber 架构的意义是什么？
- 如何优化大列表的性能？
- 讲解一下 React 的时间切片（Time Slicing）
- 为什么需要 Key props？
