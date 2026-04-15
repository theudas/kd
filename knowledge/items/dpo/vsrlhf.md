---
title: DPO 与 RLHF 的核心差异
category: dpo
order: 2
difficulty: Hard
tags: [DPO, RLHF, 流程, 取舍]
---

# DPO 与 RLHF 的核心差异

## 训练链路

- RLHF：偏好数据 -> 奖励模型 -> PPO 更新策略
- DPO：偏好数据 -> 直接更新策略模型

## 工程取舍

- DPO 链路更短，训练更稳，适合快速完成偏好对齐
- RLHF 控制能力更强，但训练组件更多、调参成本更高

## 什么时候优先选 DPO

- 训练数据已经是成对偏好样本
- 希望减少奖励模型和强化学习依赖
- 更关注实现效率与训练稳定性
