---
title: Rank 的含义
category: lora
order: 2
difficulty: Medium
tags: [LoRA, rank, 参数]
---

# LoRA 中的 Rank

Rank 是LoRA 中最重要的超参数。

## 什么是 Rank？

在 LoRA 中，我们使用两个低秩矩阵 A 和 B：
- A: (d, r)
- B: (r, d)  
- r 就是 rank 值

## Rank 的影响

- rank 越大：表现更好，参数越多
- rank 越小：参数少，但可能表现下降

## 常见 Rank 值

- 8, 16, 32, 64
