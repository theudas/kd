---
title: DPO 基础介绍
category: dpo
order: 1
difficulty: Easy
tags: [DPO, 偏好, 基础]
---

# DPO 是什么？

DPO（Direct Preference Optimization）直接从人类偏好数据中优化。

## 核心思想

不需要训练奖励模型，而是直接使用偏好对（preferred, dispreferred）。

## 优势

- 简化流程
- 训练更稳定
- 参数高效

## 对比 RLHF

传统 RLHF 需要：
1. 训练奖励模型
2. 使用 RL 优化策略

DPO 直接优化策略。
