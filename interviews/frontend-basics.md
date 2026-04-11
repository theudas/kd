---
title: 前端基础面试题
company: 字节跳动
position: 前端工程师
tags: [JavaScript, CSS, HTML]
difficulty: Medium
date: 2024-03-15
summary: 关于 JavaScript 闭包、事件循环、原型链等核心概念的深度讨论
---

# 前端基础面试题

## 1. 闭包（Closure）

### 什么是闭包？
闭包是一个函数和其周围状态（词法环境）的组合。闭包可以访问其外层函数作用域中的变量。

```javascript
function outer() {
  const message = "Hello";
  
  function inner() {
    console.log(message); // 可以访问外层函数的变量
  }
  
  return inner;
}

const fn = outer();
fn(); // 输出: Hello
```

### 闭包的应用场景

- **数据私有化**：创建私有变量
- **函数工厂**：生成具有特定配置的函数
- **事件处理**：在事件监听器中保存状态
- **回调函数**：异步操作中保存上下文

---

## 2. 事件循环（Event Loop）

### 执行顺序

1. **同步代码**：直接执行
2. **微任务（Microtasks）**：Promise.then/catch/finally、MutationObserver
3. **宏任务（Macrotasks）**：setTimeout、setInterval、I/O 操作

### 示例

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3');
  });

console.log('4');

// 输出顺序: 1, 4, 3, 2
```

---

## 3. 原型链（Prototype Chain）

### 原型链的继承机制

每个 JavaScript 对象都有一个内部的 [[Prototype]] 引用，指向另一个对象。当访问一个属性时，如果在对象本身找不到，就会沿着原型链向上查找。

```javascript
const obj = {
  name: 'test'
};

const child = Object.create(obj);
console.log(child.name); // 'test' - 通过原型链访问

// ES6 class 语法
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks`);
  }
}

const dog = new Dog('Rex');
dog.speak(); // 输出: Rex barks
```

---

## 预期讨论点

- 理解闭包如何捕获外层作用域
- 能够解释事件循环中任务的执行顺序
- 能够实现简单的继承模式
- 理解 this 的绑定规则
