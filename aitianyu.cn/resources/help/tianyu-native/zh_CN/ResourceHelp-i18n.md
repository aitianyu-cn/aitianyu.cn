# 多语言资源

## 多语言源文件

```
    {
        "": {               // { string } 宏定义名称
            "": "",         // { string } 语言ID - 语言字符串
            "default": ""   // { string } 缺省的语言字符串
        }
    }
```

## 配置

### 生成配置

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`resource/i18n/config.json`

```
    {
        "": {                   // {  string  } 生成ID，生成结果中不使用
            "source": [],       // { [string] } 设置需要包含的源文件（以配置文件所在目录为起始目录）
            "description": [
                "",             // {  string  } 设置中文描述信息
                ""              // {  string  } 设置英文描述信息
            ],
            "target": ""        // {  string  } 设置输出文件名
        }
    }
```

### 语言信息配置

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`${项目根目录}/config/res.config.json` - 语言部分

```
    {
        ···,

        "language": {
            "default": "",              // {  string  } 设置默认语言
                                                        （该设置只在单独生成语言配置时可用，生成项目时会优先使用`build.json`中的语言信息）
            "defines": {
                "": {                   // {  string  } 语言ID - 只用于在配置文件中国区分语言
                    "def": {
                        "id": "",       // {  string  } 设置语言ID - 用于语言源文件中的语言ID
                        "desc": [
                            "",         // {  string  } 设置中文描述
                            ""          // {  string  } 设置英文描述
                        ]
                    },
                    "map": []           // { [string] } 设置对照列表
                                                        （当输入的语言可以匹配列表中的字符串时，说明使用该语言）
                },
            }
        },

        ···
    }
```

&nbsp;
