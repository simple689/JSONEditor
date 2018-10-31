-- 数据库：ZHEditor
-- 表：fileBrowser
-- 表属性：
-- id			自增主键
-- name	名字，有unique的限制
-- personal		个人文件目录
-- ----------------------------
-- 删除表
-- ----------------------------
-- DROP TABLE IF EXISTS `ZHEditor`.`fileBrowser`;

-- ----------------------------
-- 创建表
-- ----------------------------
-- CREATE TABLE `ZHEditor`.`fileBrowser` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(45) DEFAULT NULL,
--   `personal` MEDIUMTEXT DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- ) DEFAULT CHARSET=utf8;

-- ----------------------------
-- 查询
-- ----------------------------
SELECT * FROM `ZHEditor`.`fileBrowser`;
-- SELECT * FROM ZHEditor.fileBrowser WHERE name = 'b';
-- SELECT id FROM ZHEditor.fileBrowser WHERE name = 'b';

-- INSERT INTO `ZHEditor`.`fileBrowser` (`name`, `personal`) VALUES ('a', 'a');
-- INSERT INTO `ZHEditor`.`fileBrowser` (`name`, `personal`) VALUES ('b', 'b');
-- UPDATE `ZHEditor`.`fileBrowser` SET personal = 'b' WHERE name = 'a'; 

-- DELETE FROM `ZHEditor`.`fileBrowser` WHERE id = '8'; 
-- DELETE FROM `ZHEditor`.`fileBrowser` WHERE name = 'a'; 