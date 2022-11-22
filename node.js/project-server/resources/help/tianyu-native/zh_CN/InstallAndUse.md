# 安装与使用

### &nbsp;依赖环境

- 依赖环境：Node.Js
- 编&nbsp;&nbsp;译&nbsp;&nbsp;器：MSVC(Microsoft Visual C++)、GNU、Clang
- 工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;具：cmake，make（Visual Studio）

&nbsp;

### &nbsp;如何构建

1. 获取源代码  
   可以通过如下方式获取：

   ```
   · 从Github拉取：git clone https://github.com/aitianyu-cn/tianyu-native.git
   · 下载 zip 包 ：https://github.com/aitianyu-cn/tianyu-native/archive/refs/heads/rel.zip
   ```

2. 初始化天宇库环境  
   用于初始化基本的依赖，如多语言。

   ```
    · cd ${tianyu-native}/tools
    · npm install           // 安装依赖包（如果已经安装，可跳过）
    · npm run build-i18n    // 初始化多语言
   ```

   - 更多工具信息，请参考 `自动化工具`

     ` `

3. 生成项目

   ```
    · cd cd ${tianyu-native}/tools
    · npm install           // 安装依赖包（如果已经安装，可跳过）
    · npm run build         // 生成测试与库
              build-test    // 只生成测试
              build-native  // 只生成库
    · mkdir build       // 由于cmake没有清理生成项目的功能，建议构建单独的文件夹保证生成文件和原始项目分离
    · cd build
    · cmake ..
   ```

   - 更多工具信息，请参考 `自动化工具`

     ` `

4. 编译项目  
   执行编译之后，生成的文件将会保存在 `${项目根目录}/target` 文件夹中。

   > bin 文件夹：保存所有生成的单元测试可执行文件
   >
   > lib 文件夹：保存所有生成的静态链接库（`dty.common.native.test.*` 的库文件为测试用，正式代码中不包含）

   ```
    > make
        · make

    > Visual Studio
        · 方式1：devenv.exe "Tianyu Development library.sln" // 需要安装 Visual Studio

        · 方式2：msbuild "Tianyu Development library.sln"    // 需要安装 Microsoft Build Engine
   ```

&nbsp;

# &nbsp;如何使用

1. 引用头文件

   - 方式 1：直接引用 `${项目根目录}/native` 目录之下的所有头文件。
   -
   - 方式 2：拷贝所有 `${项目根目录}/native` 目录下的头文件至新的目录中，通过新的目录进行访问（需要注意的是：拷贝不能影响文件的目录层级）

   &nbsp;

2. 链接  
   完成项目构建之后，所有静态库文件都将保存在 `${项目根目录}/target/lib` 文件夹中。生成可执行文件时，根据使用的头文件，按照本文档 <描述> 部分提供的库分类添加依赖并链接。

   &nbsp;
