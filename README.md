## 关于
Node.js SDK for [processon](https://www.processon.com/).

![travis](https://img.shields.io/travis/isayme/processon.svg)

## Install
> npm install processon

## API

````
var processon = require('processon');
var client = new Client({
  access_token: 'your access_token'
});
````

### client.getUser(callback)
获取用户信息, 返回值详情参见[官方说明](http://open.processon.com/wiki#user).

### client.getDiagrams([params, ]callback)
获取用户所有文件, 返回值详情参见[官方文档](http://open.processon.com/wiki#diagrams).

通过params传入可选的参数: `page_size `, `cur_page`, `chart_title`, `teamid`, `status`.

### client.getRecentDiagrams(params, callback)
获取用户最近修改过的文件, 返回值详情参见[官方文档](http://open.processon.com/wiki#history).

通过params传入可选的参数: `count`.

### client.getCollaDiagrams(params, callback)
获取用户协作的文件, 返回值详情参见[官方文档](http://open.processon.com/wiki#colla).

通过params传入可选的参数: `page_size `, `cur_page`.

## Test
> npm test

在写测试用例的时间(2016.01.16), processon的API返回值在我看来还不够一致. 所以测试中忽略了部分检测.
