-- 智汇社区数据库初始化脚本
-- 在 MySQL 中运行此脚本创建数据库

-- 创建数据库
CREATE DATABASE IF NOT EXISTS zhihui_community 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE zhihui_community;

-- 注意：表结构由 JPA 自动创建（ddl-auto: update）
-- 测试数据由 DataInitializer.java 自动初始化

-- 如果需要手动创建表，可以使用以下语句：

-- 1. 居民表
CREATE TABLE IF NOT EXISTS residents (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(11) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(50),
    avatar VARCHAR(255),
    address VARCHAR(255),
    volunteer_id VARCHAR(50),
    volunteer_hours DECIMAL(10,2) DEFAULT 0,
    points INT DEFAULT 0,
    created_at DATETIME,
    updated_at DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. 社工表
CREATE TABLE IF NOT EXISTS social_workers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    work_id VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(50) NOT NULL,
    avatar VARCHAR(255),
    phone VARCHAR(11),
    specialty TEXT,
    status TINYINT DEFAULT 1,
    created_at DATETIME,
    updated_at DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. 轮播图表
CREATE TABLE IF NOT EXISTS banners (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    image_url VARCHAR(255) NOT NULL,
    link_type VARCHAR(20),
    link_id BIGINT,
    sort_order INT DEFAULT 0,
    status TINYINT DEFAULT 1,
    created_by BIGINT,
    created_at DATETIME,
    updated_at DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. 咨询师表
CREATE TABLE IF NOT EXISTS counselors (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    avatar VARCHAR(255),
    specialty TEXT,
    introduction TEXT,
    qualification VARCHAR(255),
    status TINYINT DEFAULT 1,
    created_at DATETIME,
    updated_at DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

