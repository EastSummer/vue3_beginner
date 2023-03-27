### [URL strings and URL objects](https://nodejs.org/api/url.html#url_url_strings_and_url_objects)

URL字符串是一个包含多个意义组件的结构化字符串。解析时，返回一个URL对象，其中包含每个组件的值。

```node:url```模块提供了两个用于处理URL的API：一个是特定于node.js的传统API，另一个是和web浏览器使用相同的[WHATWG URL Standard](https://url.spec.whatwg.org/)标准的较新API。

下面提供了WHATWG和遗留API之间的比较。以此URL```'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash```为例，上方显示由遗留```url.parse()```返回的对象。下方则是```WHATWG URL```的对象。

```WHATWG URL```的原始属性包括协议和主机，但不包括用户名或密码。

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
(All spaces in the "" line should be ignored. They are purely for formatting.)
```

