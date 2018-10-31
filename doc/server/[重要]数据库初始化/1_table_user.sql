-- 数据库：ZHEditor
-- 表：user
-- 表属性：
-- id			自增主键
-- name	名字，有unique的限制
-- pwd		密码

-- ----------------------------
-- 删除表
-- ----------------------------
-- DROP TABLE IF EXISTS `ZHEditor`.`user`;

-- ----------------------------
-- 创建表
-- ----------------------------
-- CREATE TABLE `ZHEditor`.`user` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(45) DEFAULT NULL,
--   `pwd` VARCHAR(45) DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- ) DEFAULT CHARSET=utf8;

-- ----------------------------
-- 查询
-- ----------------------------
-- SELECT * FROM `ZHEditor`.`user`;
-- SELECT * FROM ZHEditor.user WHERE name = 'a';

-- INSERT INTO `ZHEditor`.`user` (`name`, `pwd`) VALUES ('a', 'a');