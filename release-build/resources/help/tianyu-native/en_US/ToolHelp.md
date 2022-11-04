# Tianyu Development Library Helper - Help Document (English)

&nbsp;&nbsp;**Tianyu Development Library Helper**The automatic construction tool developed based on Node.Js can automatically complete the generation of the project CMake list through the configuration file.

&nbsp;

## **Generation**

### _Preparation before Generation_

1. Ensure that the `Node.Js` runtime environment is installed.  
   For installation, please go to [https://nodejs.org/](https://nodejs.org/)  
   &nbsp;
2. Installing Dependencies
   ```
    npm install
   ```
   &nbsp;

### _Execute the Script_

- npm run build  
   All builds are performed, and the build target CMake list will include all available `tests` and `libraries`. After the build is complete, the corresponding header file to the library will be generated into`${Project Root Path}/target/header`.  
  &nbsp;
- npm run build-native  
   Do generate a CMake list that contains only the available `libraries`. After the build is complete, the corresponding header file to the library will be generated into`${Project Root Path}/target/header`.  
  &nbsp;
- npm run build-test  
  Perform a CMake listing that contains only the `test units` and the `libraries` that the test units depend on.  
  &nbsp;
- npm run build-i18n  
  Perform the generation of project `Multiple Language` dependencies.  
  &nbsp;

## **Custom Configuration**

&nbsp;&nbsp;`Tianyu Development Library Helper` does not contain runtime parameters, all control parameters are realized through the configuration file. The following is the configuration information for the generation:

### Project Configuration

&nbsp;&nbsp;`${Project Root Path}/config/make/build.json`

```
    {
        "dev": true,                                    // { boolean }  Sets whether the current development environment is used

        "cmake": {                                      // CMake configuration items

            "version": "3.18",                          // { string }   Set the minimum supported version of CMake

            "project": {                                // Project information configuration items

                "name": "Tianyu Development library",   // { string }   Setting the project name

                "version": "0.0.1"                      // { string }   Setting the Project Version
            },
            "cpp": {                                    // C++ configuration items

                "standard": 17                          // { number }   Set the C++ version required for the project
            },
            "output": {                                 // Output information configuration items

                                                           (all directories are based on the project output path)

                "bin": "bin",                           // { string }   Set the output directory of the executable file

                "lib": "lib",                           // { string }   Set the output directory of the library file

                "header": "header"                      // { string }   Set the output directory of the header file
            }
        },
        "baseURL": "",                                  // { string }   Set the start path of the project
                                                                        (start with the folder containing tools)

        "output": "target",                             // { string }   Set the project output path
                                                                        (with the project start path as the start directory)

        "language": null,                               // { string | null } Set the internationalization language at build time
                                                                { null }   - use default language
                                                                { string } - Use the language. If the language does not exist, use the default language

        "log": "full"                                   // { string | null } Set the log type during generation
                                                                { null }   - Generate condensed logs
                                                                { string } - full logs are displayed only when the value is "full".
                                                                             Thin logs are displayed in other cases
    }
```

### Library Configuration

&nbsp;&nbsp;`${Project Root Path}/config/make/build-native.json`

```
    {
        "libs": {                       // Library configuration items

            "": {                       // {  string  } Set the name of the build library file

                "path": [],             // { [string] } Set the source directory that the library needs to reference

                                                        (the directory is a relative path to the project's start path)

                "build": true,          // { boolean  } Sets whether the library needs to be generated
                                                        (the library will be ignored when false)

                "type": "static",       // {  string  } Types of libraries
                                                        (static - static library | dynamic - dynamic library)

                "exclude": [],          // { [string] } Set the source file to be ignored for export
                                                        (the full path relative to the project start path)

                "include": []           // { [string] } Set the source file to attach when exporting
                                                        (the full path relative to the project's start path)
                                                        exclude takes precedence. Files that exist in exclude or include are ignored
            }
        },
        "res": {                        // Resource file configuration items

            "base": "",                 // {  string  } Set the source directory of the resource file
                                                        (relative to the project start path)

            "output": "",               // {  string  } Set the resource file export directory
                                                        (the path relative to the header directory when exporting header files)

            "includes": []              // { [string] } Set the directory of the resource files to be included
        }
    }

```

Note:

- When resource file dependencies are generated, they are automatically imported into `${Project Root Path}/native`.
- The library path must contain the list file of the source file. For details about how to configure the file[Source File List](#src_list).

### Test Configuration

&nbsp;&nbsp;`${Project Root Path}/config/make/build-test.json`

```
    {
        "base": "",                     // {  string  } Set the test Root directory (as opposed to `Project Root Path`)

        "libs": {                       // Library configuration items

            "": {                       // {  string  } Set the name of the build library file

                "path": [],             // { [string] } Set the source directory that the library needs to reference
                                                        (the directory is a relative path to the project's start path)

                "build": true,          // { boolean  } Sets whether the library needs to be generated
                                                        (the library will be ignored when false)

                "type": "static",       // {  string  } Types of libraries
                                                        (static - static library | dynamic - dynamic library)

                "exclude": [],          // { [string] } Set the source file to be ignored for export
                                                        (the full path relative to the project start path)

                "include": []           // { [string] } Set the source file to attach when exporting
                                                        (the full path relative to the project's start path)
                                                        exclude takes precedence. Files that exist in exclude or include are ignored
            }
        },
        "bin": {                        // Test execution file configuration items

            "": {                       // {  string  } Name of the test group

                "path": ""              // {  string  } Path to the test group (relative to the test root)
            }
        }
    }
```

Note:

- When the test is built, no header file is generated.
- When resource file dependencies are generated, they are automatically imported into `${Project Root Path}/native`.
- When the test executable is generated, the file name begins with the test group name (`${Test Group Name}.${Test Name}`).
- The library path must contain the list file of the source file. For details about how to configure the file[Source File List](#src_list).
- The test group path must contain the test list. For details about file configuration, see [Test List](#test_list).

## **Dependency Information**

&nbsp;&nbsp;`Tianyu Development Library Helper` during automatic generation, the automated script will obtain related description information in each directory after reading the configuration file to complete construction. The following description information is relied upon when building:

### <span id="src_list">Source File List</span>

&nbsp;&nbsp;`list.json`

```
    {
        "src": [],      // { [string] } This item is the source file list, which contains all the source files,
                                        that need to be included in the directory where the list file resides.

        "header": []    // { [string] } This is the header file list and contains all the files,
                                        that need to be included in the generated header file directory.
    }
```

Note:

- The file path is a relative path based on the directory.
- Subdirectories are not automatically recursively searched during generation. If you want to include subdirectory source files, you need to add them to this list.

### <span id="test_list">Test List</span>

&nbsp;&nbsp;`test.json`

```
    {
        "": {                   // {  string  } test name

            "build": true,      // { boolean  } Sets whether this test needs to be built

            "src": [],          // { [string] } Sets the source file required by the test. The source file is the specified test source file
                                                (Start path The directory where this test manifest file is located)

            "include": [],      // { [string] } Set additional source files to include
                                                (The start Path is Project Root Path)

            "lib": []           // { [string] } Set the library that the test depends on.
                                                The library name needs to be the same as the name in the test configuration item
        }
    }
```

### Resource File

&nbsp;&nbsp;For resource file configuration information, refer to `README.md` under each resource directory in the `resouce` directory.
