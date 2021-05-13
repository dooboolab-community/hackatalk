---
id: pgcli
title: pgcli
---

Pgcli is a command line interface for Postgres with auto-completion and syntax highlighting.

### Install

```
$ pip install pgcli
```

### Terminal Term Usage

| Options                | Explanation                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| -h, --host TEXT        | Host address of the postgres database                                                       |
| -p, --port INTEGER     | Port number at which the postgres instance is listening                                     |
| -U, --username TEXT    | Username to connect to the postgres database                                                |
| -u, --user TEXT        | Username to connect to the postgres database                                                |
| -W, --password         | Force password prompt                                                                       |
| -w, --no-password      | Never prompt for password                                                                   |
| --single-connection    | Do not use a separate connection for completions                                            |
| -v, --version          | Version of pgcli                                                                            |
| -d, --dbname TEXT      | database name to connect to                                                                 |
| --pgclirc PATH         | Location of pgclirc file                                                                    |
| -D, --dsn TEXT         | Use DSN configured into the [alias_dsn] section of pgclirc file                             |
| --list-dsn             | list of DSN configured into the [alias_dsn] section of pgclirc file                         |
| --row-limit INTEGER    | Set threshold for row limit prompt. Use 0 to disable prompt                                 |
| --less-chatty          | Skip intro on startup and goodbye on exit                                                   |
| --prompt TEXT          | Prompt format (Default: "\u@\h:\d> ")                                                       |
| --prompt-dsn TEXT      | Prompt format for connections using DSN aliases (Default: "\u@\h:\d> ")                     |
| -l, --list             | list available databases, then exit                                                         |
| --auto-vertical-output | Automatically switch to vertical output mode if the result is wider than the terminal width |
| --warn / --no-warn     | Warn before running a destructive query                                                     |
| --help                 | Show this message and exit                                                                  |
