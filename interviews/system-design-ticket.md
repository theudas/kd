---
title: 系统设计面试：设计一个抢票系统
company: 滴滴出行
position: 高级后端工程师
tags: [系统设计, 高并发, 数据库, Go]
difficulty: Hard
date: 2024-03-08
summary: 讨论如何设计一个支持高并发的抢票系统，包括架构设计、技术选型、优化方案
---

# 系统设计面试：设计一个抢票系统

## 背景

设计一个支持百万级用户同时抢票的系统。

---

## 需求分析

### 功能需求

- 用户可以浏览可用的演唱会/电影信息
- 用户可以选择座位并下单
- 支持秒杀级的流量（可能 99% 的请求都是失败的）
- 支持库存管理和订单记录

### 非功能需求

- **高可用性**：99.99% 可用性
- **高并发**：支持 100 万+ 并发请求
- **低延迟**：响应时间 < 200ms
- **数据一致性**：座位不能超售
- **可扩展性**：支持水平扩展

---

## 架构设计

### 整体架构图

```
┌─────────────┐
│  用户请求   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────┐
│   API Gateway (Nginx)       │   ← 限流、路由
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  Redis Cache Layer          │   ← 抢票队列、票库存
├─────────────────────────────┤
│  - 库存签名验证             │
│  - 排队队列                 │
│  - 黑名单                   │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  业务处理服务               │   ← 并发控制、锁
├─────────────────────────────┤
│  - 验证库存                 │
│  - 生成订单                 │
│  - 更新座位状态             │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  数据库 (MySQL/PostgreSQL) │   ← 持久化存储
├─────────────────────────────┤
│  - Orders Table             │
│  - Seats Table              │
│  - Events Table             │
└─────────────────────────────┘
```

---

## 关键实现

### 1. 库存验证

**问题**：如何防止超售？

**解决方案**：使用 Redis + Lua 脚本

```lua
-- redis_script.lua
-- KEYS[1] = 演唱会ID:库存
-- ARGV[1] = 用户ID
-- ARGV[2] = 座位数

local stock_key = KEYS[1]
local user_id = ARGV[1]
local seats = tonumber(ARGV[2])

local current_stock = tonumber(redis.call('get', stock_key) or 0)

if current_stock >= seats then
    redis.call('decrby', stock_key, seats)
    redis.call('lpush', stock_key .. ':queue', user_id)
    return 1
else
    return 0
end
```

### 2. 排队机制

使用 Redis 队列实现公平排队：

```python
# Python 示例
import redis
import json

redis_client = redis.Redis(host='localhost', port=6379)

def add_to_queue(event_id, user_id):
    """将用户添加到排队队列"""
    queue_key = f"ticket_queue:{event_id}"
    queue_entry = {
        'user_id': user_id,
        'timestamp': time.time()
    }
    redis_client.rpush(queue_key, json.dumps(queue_entry))
```

### 3. 数据库设计

**Orders Table**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | 订单 ID |
| user_id | INT | 用户 ID |
| event_id | INT | 演唱会 ID |
| seats | JSON | 座位列表 |
| status | ENUM | pending/success/failed |
| created_at | TIMESTAMP | 创建时间 |
| expires_at | TIMESTAMP | 过期时间（15 分钟） |

**Seats Table**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | 座位 ID |
| event_id | INT | 演唱会 ID |
| seat_no | VARCHAR | 座位号 |
| status | ENUM | available/locked/sold |
| locked_by | INT | 锁定用户 |
| locked_until | TIMESTAMP | 锁定截止时间 |

### 4. 分布式锁

```python
# 使用 Redis 实现分布式锁
import time

def acquire_seat_lock(event_id, seat_id, user_id, timeout=30):
    """尝试锁定座位"""
    lock_key = f"seat_lock:{event_id}:{seat_id}"
    lock_value = f"{user_id}:{time.time()}"
    
    # SET NX EX: 只有当 key 不存在时才设置，设置过期时间
    result = redis_client.set(
        lock_key, 
        lock_value, 
        nx=True, 
        ex=timeout
    )
    
    return result is True
```

---

## 优化策略

### 1. 限流（Rate Limiting）

```go
// Go 示例 - 使用令牌桶算法
import "golang.org/x/time/rate"

limiter := rate.NewLimiter(
    rate.Every(time.Second / 1000),  // 每秒 1000 请求
    1000,                             // 突发容量
)

if !limiter.Allow() {
    return errors.New("rate limit exceeded")
}
```

### 2. CDN + 静态资源

- 将前端页面、图片等部署到 CDN
- 减少主服务器压力

### 3. 库存预热

```python
# 预热 Redis 缓存
def warm_up_cache(event_id, stock_count):
    """在活动开始前预加载库存到 Redis"""
    cache_key = f"inventory:{event_id}"
    redis_client.set(cache_key, stock_count)
```

### 4. 异步处理

```python
# 使用消息队列处理订单
import celery

@celery.task
def process_order_async(order_id):
    """异步处理订单"""
    order = Order.get(order_id)
    
    # 扣减数据库库存
    reduce_inventory(order.event_id, order.quantity)
    
    # 更新订单状态
    order.status = 'completed'
    order.save()
    
    # 发送确认邮件
    send_confirmation_email(order)
```

---

## 监控和告警

### 关键指标

- **QPS**（Queries Per Second）：每秒查询数
- **P99 延迟**：99 分位数响应时间
- **库存准确率**：实际库存 vs Redis 库存
- **成功率**：成功下单 vs 总请求

### 告警阈值

```yaml
alerts:
  - high_latency: P99 > 500ms
  - low_success_rate: success_rate < 95%
  - inventory_mismatch: |actual - redis| > 10
```

---

## 常见问题讨论

### Q1: 如何处理 Redis 缓存与数据库的一致性？

**答**：
- 使用双写一致性保证
- 定期同步验证
- 降级方案：当 Redis 宕机时，直接读写数据库

### Q2: 订单超时（15 分钟未支付）如何处理？

**答**：
- 使用 Redis Expire 自动释放座位锁
- 定时任务检查过期订单并释放库存

### Q3: 如何防止黄牛刷票？

**答**：
- IP 限流
- 用户行为分析（机器学习）
- 验证码/人机验证
- 黑名单管理

### Q4: 高并发下数据库瓶颈如何突破？

**答**：
- 数据库分片（按演唱会 ID）
- 读写分离
- 使用 NoSQL 存储临时数据

---

## 总结

此系统设计展示了如何在高并发场景下保证数据一致性和用户体验。核心思路是：

1. **缓存优先**：90% 流量在 Redis 层处理
2. **同步到异步**：关键路径同步，非关键路径异步
3. **分布式锁**：确保原子性操作
4. **监控完善**：及时发现和处理问题
