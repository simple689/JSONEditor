<h1 id='catalog'>目录</h1>
<!-- TOC -->

- [模块](#模块)
    - [mysql](#mysql)
    - [文件系统](#文件系统)
    - [文件浏览](#文件浏览)

<!-- /TOC -->

# 模块
> 模块参数：

| 参数名    | 类型      | 必填 | 默认值 | 说明      | 最低版本 |
| :-       | :-       | :-  | :-    | :-        | :-     |
| module   | String   | 是  |       | 模块类型   |         |

> 参数赋值【module】：

| 赋值          | 功能 |
| :-           | :-   |
| mysql        | [mysql](#mysql) |
| fileSystem   | [文件系统](#文件系统) |
| formData     | 暂时不用 |
| fileBrowser  | [文件浏览](#文件浏览) |

<p align="right"><a href="#模块">返回模块</a> | <a href="#catalog">返回目录</a></p>

## mysql
---
> 功能参数【共有】：

| 参数名    | 类型      | 必填 | 默认值 | 说明      | 最低版本 |
| :-       | :-       | :-  | :-    | :-        | :-     |
| func     | String   | 是  |       | 功能类型   |        |
| table    | String   | 是  |       | 数据库表   |        |

> 参数赋值【func】：
| 赋值      | 说明 |
| :-       | :-   |
| add      | 增 |
| del      | 删 |
| up       | 改 |
| query    | 查 |

http://127.0.0.1:6989/?module=mysql&func=query&table=node_user

> 功能参数【特有】：

| 参数名    | 类型      | 必填 | 默认值 | 说明      | 最低版本 |
| :-       | :-       | :-  | :-    | :-        | :-     |
| func     | String   | 是  |       | 功能类型   |         |

<p align="right"><a href="#模块">返回模块</a> | <a href="#catalog">返回目录</a></p>

## 文件系统
---
<p align="right"><a href="#模块">返回模块</a> | <a href="#catalog">返回目录</a></p>

## 文件浏览
---
<p align="right"><a href="#模块">返回模块</a> | <a href="#catalog">返回目录</a></p>