# 描述

### &nbsp;天宇开发库 - 核心库

> 头文件：`${项目根目录}/native/dty-core.hxx`, `${项目根目录}/native/prime/core/*`  
> 源文件：
>
> - 开发源：`${项目根目录}/native/dty-core.cpp`, `${项目根目录}/native/prime/core/src/*`
> - 测试源：`${项目根目录}/native/dty-test-core.cpp`, `${项目根目录}/test/prime/core/*`
>
> - 单元测试：`${项目根目录}/test/dty-core/*`  
>   &nbsp;
>
> 依&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;赖：`${项目根目录}/native/res/i18n/language.h`
>
> 目标文件：Windows：`dty-core.lib`，Linux 和 MacOS： `libdty-core.a`  
>  &nbsp;
>
> 说明：核心库包含开发必须的基本定义、类型和实现，同时提供轻量级的测试环境（本项目所有开发的单元测试部分使用核心库的测试工具进行，不依赖外部测试环境）。依赖项为静态多语言支持。  
> &nbsp;

&nbsp;
