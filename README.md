# 智汇社区后端 (Spring Boot)

## 技术栈
- Java 17
- Spring Boot 3.2.0
- Spring Security + JWT
- Spring Data JPA
- MySQL 8.0

## 快速开始

### 1. 环境要求
- JDK 17+
- Maven 3.6+
- MySQL 8.0+

### 2. 数据库配置
在 MySQL 中创建数据库：
```sql
CREATE DATABASE zhihui_community CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. 修改配置
编辑 `src/main/resources/application.yml`，修改数据库连接信息：
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/zhihui_community
    username: root
    password: 你的密码
```

### 4. 运行项目
```bash
mvn spring-boot:run
```
或在 IDEA 中运行 `ZhihuiCommunityApplication.java`

### 5. 访问地址
- API 服务：http://localhost:3000
- 健康检查：http://localhost:3000/health

## 测试账号

### 居民端
| 手机号 | 密码 | 姓名 |
|--------|------|------|
| 13800000001 | 123456 | 张三 |
| 13800000002 | 123456 | 李四 |

### 社工端
| 工号 | 密码 | 姓名 |
|------|------|------|
| SW001 | 123456 | 王社工 |
| SW002 | 123456 | 赵社工 |

## API 接口

### 认证接口
- POST `/api/auth/resident/register` - 居民注册
- POST `/api/auth/resident/login` - 居民登录
- POST `/api/auth/worker/login` - 社工登录

### 轮播图接口
- GET `/api/banners` - 获取轮播图列表

### 咨询师接口
- GET `/api/counselors` - 获取咨询师列表

