# ng-bases
A base libs for angular 1. Used to develop H5 single page webapp in wechat.

### Requirement
Remote data format from API server: 
``` json
{
    "code": 0, //number type
    "msg": "success", // string type
    "data": [] // any type
}
```

### Installation

``` bash
$ npm install --save ng-bases
```

### usage

typescript:
``` ts
import ngb = require('ng-bases');

export let app = module('app', [
    require('angular-ui-router'),
    require('angular-ui-bootstrap'),
    require("angular-iscroll").name,
    require("oclazyload"),
    ngb.sgNgBases.name
]);
```

javascript:
``` js
import "ng-bases";
const App = angular.module(
    "app", [
        'ui.bootstrap',
        'ui.router',
        "oc.lazyLoad",
        'angular-iscroll',
        "sg.ng-bases"
    ]
);
```
