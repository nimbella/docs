# Nim command flags

This document explains flags that appear on many `nim` commands with similar meaning.  Flags unique to one or very few commands are documented [in the command summary](nim-cmd.md).

* [`--apihost`](#--apihost)
* [`--auth`](#--auth)
* [`--debug`](#--help)
* [`--help`](#--help)
* [`--json`](#--json)
* [`--verbose`](#--verbose)
* [`--version`](#--version)

---

##### --apihost

Most Nimbella users do not need to specify this flag and generally shouldn't.  It becomes relevant if you use `nim` with OpenWhisk resources outside the Nimbella stack, or if you are developing on the Nimbella stack using test versions of the stack.  It specifies the URL of the OpenWhisk backend with which you are interacting.

---

##### --auth

Alias `-u`.

Most Nimbella users do not need to specify this flag and generally shouldn't.  It becomes relevant if you use `nim` with OpenWhisk resources outside the Nimbella stack.  You use it to provide an OpenWhisk "API key" in the form `<uuid>:<key>`.   Usually you must also provide `--apihost` when you provide `--auth`.

Typical Nimbella users either have a single set of credentials, which should support all the `nim` commands, or, if you have multiple namespaces, use the techniques described in [Nimbella Namespaces](namespaces.md) to manage them.

---

##### --debug

This flag is used to activate debugging traces that are useful in diagnosing problems.  If you are getting help from Nimbella staff on a problem you may be asked to use this flag.  We do not document the values that can follow this flag but you can obtain an understanding of how it works if you are familiar with [the code](https://github.com/nimbella/nimbella-cli).

---

##### --help

Displays the syntax for the command on which it appears.  The command doesn't execute.

---

##### --json

---

##### --verbose

Alias `-v`.

Normally, errors result in an informative message with no distracting stack trace.  When the error is unexpected and might represent a bug, the `--verbose` or `-v` flag causes the entire error object (including a stack trace, usually) to be displayed for reporting purposes.

---

##### --version

This flag causes `nim` to display version information and exit.  Usually, the `nim info` command is more informative but `--version` is terser and may be better for scripts.

---

