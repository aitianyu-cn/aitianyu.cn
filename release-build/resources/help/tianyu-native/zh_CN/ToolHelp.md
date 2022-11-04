# 天宇开发库助手 - 帮助文档 （中文版）

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**天宇开发库助手**基于 Node.Js 所开发的自动化构建工具，通过配置文件，可以自动的完成项目 CMake 清单的生成。

&nbsp;

## **生成**

### _生成前的准备_

1. 确保已安装 `Node.Js` 运行环境。  
   如需安装，请前往 [https://nodejs.org/](https://nodejs.org/)  
   &nbsp;
2. 安装依赖项
   ```
    npm install
   ```
   &nbsp;

### _执行脚本_

- npm run build  
   执行所有生成，生成目标 CMake 清单将包括所有的可用的测试、可用的库。完成生成后，将会生成库所对应的头文件至`${项目根目录}/target/header`中。  
  &nbsp;
- npm run build-native  
   执行生成只包含可用库的 CMake 清单。完成生成后，将会生成库所对应的头文件至`${项目根目录}/target/header`中。  
  &nbsp;
- npm run build-test  
   执行生成只包含测试单元以及测试单元依赖库的 CMake 清单。  
  &nbsp;
- npm run build-i18n  
  执行生成项目`多语言`依赖项。  
  &nbsp;

## **自定义配置**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`天宇开发库助手`不包含运行时的参数，所有控制参数均通过配置文件实现。如下为用于生成时的配置信息：

### 项目配置

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`${项目根目录}/config/make/build.json`

```
    {
        "dev": true,                                    // { boolean }  设置当前是否为开发环境
        "cmake": {                                      // CMake 配置项
            "version": "3.18",                          // { string }   设置CMake最小支持版本
            "project": {                                // 项目信息 配置项
                "name": "Tianyu Development library",   // { string }   设置项目名
                "version": "0.0.1"                      // { string }   设置项目版本
            },
            "cpp": {                                    // C++ 配置项
                "standard": 17                          // { number }   设置项目所需C++版本
            },
            "output": {                                 // 输出信息 配置项（所有目录均基于项目输出路径）
                "bin": "bin",                           // { string }   设置可执行文件输出目录
                "lib": "lib",                           // { string }   设置库文件输出目录
                "header": "header"                      // { string }   设置头文件输出目录
            }
        },
        "baseURL": "",                                  // { string }   设置项目起始路径（以包含tools的文件夹为起始目录）
        "output": "target",                             // { string }   设置项目输出路径（以项目起始路径为起始目录）
        "language": null,                               // { string | null } 设置生成时的国际化语言
                                                                { null }   - 使用default语言
                                                                { string } - 使用对应语言，如果语言不存在，则使用default语言
        "log": "full"                                   // { string | null } 设置生成时的日志类型
                                                                { null }   - 生成精简的日志
                                                                { string } - 只有为“full”时输出完整日志，其他情况输出精简 日志
    }
```

### 库配置

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`${项目根目录}/config/make/build-native.json`

```
    {
        "libs": {                       // 库配置项
            "Library Name": {           // {  string  } 设置生成库文件的名称
                "path": [],             // { [string] } 设置该库所需要引用的源文件目录（目录为项目起始路径的相对路径）
                "build": true,          // { boolean  } 设置该库是否需要生成（false时该库将被忽略）
                "type": "static",       // {  string  } 库类型（static - 静态库 | dynamic - 动态库）
                "exclude": [],          // { [string] } 设置导出时需要忽略的源文件（相对于项目起始路径的完整路径）
                "include": []           // { [string] } 设置导出时需要附加的源文件（相对于项目起始路径的完整路径）
                                                        exclude优先原则，当一个文件存在于exclude和include时，将被忽略
            }
        },
        "res": {                        // 资源文件配置项
            "base": "",                 // {  string  } 设置资源文件源目录（相对于项目起始路径）
            "output": "",               // {  string  } 设置资源文件导出目录（用于输出头文件时相对头文件目录的路径）
            "includes": []              // { [string] } 设置需要包含的资源文件的目录
        }
    }

```

注意：

- 在生成资源文件依赖时，会自动导入到`${项目根目录}/native`中。
- 库路径下必须包含源文件的清单文件，文件配置请参考[源文件清单](#src_list)。

### 测试配置

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`${项目根目录}/config/make/build-test.json`

```
    {
        "base": "",                     // {  string  } 设置测试根目录（相对于项目根目录）
        "libs": {                       // 库配置项
            "": {                       // {  string  } 设置测试依赖的库名称
                "path": [],             // { [string] } 设置该库所需要引用的源文件目录（目录为项目起始路径的相对路径）
                "build": true,          // { boolean  } 设置该库是否需要生成（false时该库将被忽略）
                "type": "static",       // {  string  } 库类型（static - 静态库 | dynamic - 动态库）
                "exclude": [],          // { [string] } 设置导出时需要忽略的源文件（相对于项目起始路径的完整路径）
                "include": []           // { [string] } 设置导出时需要附加的源文件（相对于项目起始路径的完整路径）
                                                        exclude优先原则，当一个文件存在于exclude和include时，将被忽略
            }
        },
        "bin": {                        // 测试执行文件配置项
            "": {                       // {  string  } 测试组的名称
                "path": ""              // {  string  } 测试组的路径（相对于测试根目录）
            }
        }
    }
```

注意：

- 生成测试时，不会生成头文件。
- 在生成资源文件依赖时，会自动导入到`${项目根目录}/native`中。
- 在生成测试可执行文件时，文件名将以测试组名称为开头（`${测试组名称}.${测试名}`）。
- 库路径下必须包含源文件的清单文件，文件配置请参考[源文件清单](#src_list)。
- 测试组路径下必须包含测试清单，文件配置请参考[测试清单](#test_list)。

## **依赖信息**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`天宇开发库助手`在进行自动生成时，自动化脚本在读取配置文件后，会获取各个目录下的相关描述信息完成构建。如下为构建时所依赖的描述信息：

### <span id="src_list">源文件清单</span>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`list.json`

```
    {
        "src": [],      // { [string] } 此项为源文件列表，包含所有在此清单文件所在目录下需要包含的源文件
                                        文件路径为基于该目录的相对路径
                                        生成时不会自动递归搜索子目录，如需包含子目录源文件，则需要在此列表中添加
        "header": []    // { [string] } 此项为头文件列表，包含所有需要在生成头文件目录下需要包含的文件
                                        文件路径为基于该目录的相对路径
                                        生成时不会自动递归搜索子目录，如需包含子目录源文件，则需要在此列表中添加
    }
```

### <span id="test_list">测试清单</span>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`test.json`

```
    {
        "": {                   // {  string  } 测试名称
            "build": true,      // { boolean  } 设置该测试是否需要生成
            "src": [],          // { [string] } 设置测试所需的源文件，该源文件为指定的测试源文件
                                                起始路径为此测试清单文件所在目录
            "include": [],      // { [string] } 设置需要包含的其他源文件
                                                起始路径为项目根目录
            "lib": []           // { [string] } 设置测试依赖的库，库名称需要与测试配置项中的名称一致
        }
    }
```

### 资源文件

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;资源文件配置信息，请参考`resouce`目录下各个资源目录下的`README.md`。
