---
title: DPO vs RLHF
category: dpo
order: 2
difficulty: Hard
tags: [DPO, RLHF, 对比, 算法]
---

# DPO 与 RLHF 的对比

## 架构对比

### RLHF
- 第1步：收集偏好数据
- 第2步：训练奖励模型
- 第3步：使用 PPO 训练策略

### DPO
- 第1步：收集偏好数据  
- 第2步：直接训练策略

## 数学原理

DPO 通过以下损失函数直接优化：

$$\mathcal{L}_{DPO} = -\log\sigma(\beta \log \frac{\pi_\theta(y_w|x)}{\pi_\theta(y_l|x)})$$

## 优缺点

### DPO 优点
- 训练更快
- 参数更少
- 更稳定

### DPO 缺点
- 可能过度优化
- 需要良好的偏好数据
