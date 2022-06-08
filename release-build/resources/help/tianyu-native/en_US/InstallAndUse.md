# INSTALL & USE

### &nbsp;Environment Dependency

- Dependency&nbsp;:&nbsp; .Net 6.0
- Compiler&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; MSVC(Microsoft Visual C++)、GNU、Clang
- Tools&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; cmake，make（Visual Studio）

&nbsp;

### &nbsp;How to Build

1. **Get the Source Code**  
   You can get the source code by the following ways:

   ```
   · Pull Repo from Git   : git clone https://github.com/aitianyu-cn/tianyu-native.git
   · Download Zip-Package : https://github.com/aitianyu-cn/tianyu-native/archive/refs/heads/rel.zip
   ```

2. **Initializing**  
   Used to initialize basic dependencies, such as _Multi-Languages_.

   ```
    · cd ${tianyu-native}
    · ./init.sh             // PowerShell or Linux Shell or Mac Shell
      init.bat              // Windows Command

    · To Get Help: [init.sh | init.bat] help
   ```

3. **Make Project**

   ```
    · mkdir build       // Since cmake does not have the ability to clean up generated projects,
                        // it is recommended to build a separate folder to keep the generated
                        // files separate from the original project.
    · cd build
    · cmake .. [OPTION]

        Option:
            -D DTEST=true: Specifies that tianyu test modules can be generated for code testing.
   ```

4. **Compile**  
   After compiling, the generated files will be stored in the `${PROJECT_ROOT}/target` folder.

   > bin : Save all generated unit test executables.
   >
   > lib &nbsp;: Save all generated static link libraries ( `dty.common.native.test.*` library files are for testing purposes, not included in the official code).

   ```
    > make
        · make

    > Visual Studio
        · Option 1: devenv.exe "Tianyu Development library.sln" // Needs to Install 'Visual Studio'

        · Option 2: msbuild "Tianyu Development library.sln"    // Needs to Install 'Microsoft Build Engine'
   ```

&nbsp;  
&nbsp;

# &nbsp;How to Use

1. **Include Header Files**

   - Option 1 : Directly includes all header files under `${PROJECT_ROOT}/native`.

   - Option 2 : Copy all headers from `${PROJECT_ROOT}/native` to a new directory and access them through the new directory (note: copying does not affect the directory level of the files).

2. **Link**  
   After the project is built, all the static library files will be saved in the `${PROJECT_ROOT}/target/lib` folder. When generating the executable, add dependencies and links according to the library classification provided in the < Description > section of this document, depending on the header files used.

   &nbsp;
