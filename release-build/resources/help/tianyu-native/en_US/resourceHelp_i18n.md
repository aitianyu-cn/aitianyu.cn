# Multilingual Resources

&nbsp;

## Multilingual Source Files

```
    {
        "": {               // { string } Macro definition name

            "": "",         // { string } Language ID - Language string

            "default": ""   // { string } The default language string
        }
    }
```

## Configuration

### Generation

&nbsp;&nbsp;`resource/i18n/config.json`

```
    {
        "": {                   // {  string  } Generate an ID that is not used in the generated result

            "source": [],       // { [string] } Set the source files to be included
                                                (starting from the directory where the configuration file resides)
            "description": [
                "",             // {  string  } Set the Chinese description
                ""              // {  string  } Set the English description
            ],
            "target": ""        // {  string  } Setting output file name
        }
    }
```

### Language Information

&nbsp;&nbsp;`${Project Root Path}/config/res.config.json` - language part

```
    {
        ···,

        "language": {
            "default": "",              // {  string  } Setting the Default Language
                                                        (This setting is only available when the language configuration is generated separately.
                                                        The language information in 'build.json' is used preferentially when the project is generated.)
            "defines": {
                "": {                   // {  string  } Language ID
                                                        (Only used to distinguish languages in profile China)
                    "def": {
                        "id": "",       // {  string  } Set Language ID
                                                        (Used for language ID in the language source file)
                        "desc": [
                            "",         // {  string  } Setting Chinese Description
                            ""          // {  string  } Setting English Description
                        ]
                    },
                    "map": []           // { [string] } Set a reference list
                                                        (If the input language matches the string in the list, the language is used.)
                },
            }
        },

        ···
    }
```

&nbsp;
