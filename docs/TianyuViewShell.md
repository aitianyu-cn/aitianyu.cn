# TianyuViewShell

天宇视图外壳：用于为 aitianyu 网站提供统一的 UI 视图管理。

TianyuViewShell 将分为以下四层进行渲染，每一层为独立的组件构成，用于提供不同的显示、装载等功能。

# TianyuViewBackground

### **天宇视图背景**

天宇视图背景用于为 aitianyu 网页提供背景控制能力，为最底层。

# TianyuViewWorkspace

天宇视图工作区为 aitianyu 网页的正常工作区，处于第 0 层，所有的网页组建、逻辑交互一般都处于此层，类似于一个封装的 html 区域。

# TianyuViewMessage

天宇视图消息层用于为 aitianyu 网页提供消息 tooltips 的弹出层，此层在工作区之上，主要用于显示异常、提示等消息。

# TianyuViewDialog

天宇视图弹出层，此层为 aitianyu 网页的最上层，用于提供选择弹出框的支持，同时为此层提供完全封闭功能（即创建一个蒙版层，该层为半透明设计，阻断所有对该层之后的操作，只有当 dialog 关闭后，才能继续进行）
