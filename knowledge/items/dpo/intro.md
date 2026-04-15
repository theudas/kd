---
title: DPO 偏好学习机制
category: dpo
order: 1
difficulty: Easy
tags: [DPO, 偏好学习, 策略优化]
---

# DPO 如何直接利用偏好数据？

DPO 将同一提示下的优选回答与劣选回答组成偏好对，直接优化模型对优选回答的相对概率。

## 训练对象

- 输入：prompt + chosen / rejected
- 目标：提高 chosen 的条件概率，压低 rejected 的条件概率

## 关键特点

- 不单独训练奖励模型
- 不引入 PPO 强化学习阶段
- 用监督式训练流程完成偏好对齐

## 适用前提

- 偏好数据质量稳定
- 参考模型与温度系数设置合理
