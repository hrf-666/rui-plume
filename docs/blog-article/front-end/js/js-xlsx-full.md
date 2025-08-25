---
title: xlsx.full JS上传(导入,导出)Excel 源码
description: xlsx.full JS上传(导入,导出)Excel 源码
date: 2021-06-20T00:00:00.000Z
tags:
  - xlsx.full
  - js
  - excel
createTime: 2025/08/25 23:47:02
permalink: /article/bs1igkf8/
---

# xlsx.full JS上传(导入,导出)Excel 源码

2023-11-07 最近更新
- [相关的视频教程](https://www.bilibili.com/video/BV1uK4y1Z7uw?share_source=copy_web)

### 导入

```js
<!doctype
html >
< html >
< head >
< meta
charset = "UTF-8" >
    < title > 上传文件 < /title>
<script type="text/javascript" src='./xlsx.core.min.js'></script>
<link href="./bootstrap.min.css" rel="stylesheet"/>
<style>
    .lqwvje-btn {
    display: inline-block;
    height: 38px;
    line-height: 38px;
    padding: 0 18px;
    background-color: #009688;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    font-size: 14px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
}
</style>
</head>

<body>
    <label id="realBtn">
        <input type="file" id="testFile" style="display:none">
            上传文件
    </label>


    <script type="text/javascript">
        window.onload = function () {
        document.getElementById("testFile").addEventListener("click", function () {
            const dt = new DataTransfer();
            const input = document.getElementById('testFile');
            input.files = dt.files;//清空input file
        });

        //原创来自 www.luofenming.com
        //首先监听input框的变动，选中一个新的文件会触发change事件
        document.querySelector("#testFile").addEventListener("change", function () {
        //获取到选中的文件
        var file = document.querySelector("#testFile").files[0];
        if (file.size > 1024 * 1024) {
        alert('当前文件大小:' + Math.floor(file.size / 1024) + 'KB,上传文件不能大于1024KB');
        return false;
    }
        var type = file.name.split('.');
        if (type[type.length - 1] !== 'xlsx' && type[type.length - 1] !== 'xls') {
        alert('只能选择excel文件导入');
        return false;
    }
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function (e) {
        const data = e.target.result;
        const zzexcel = window.XLS.read(data, {
        type: 'binary'
    });
        const result = [];
        for (let i = 0; i < zzexcel.SheetNames.length; i++) {
        const newData = window.XLS.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[i]]);
        result.push(...newData)
    }
        console.log(JSON.stringify(result));
        //for (var i = 0; i < result.length; i++) {
        //    console.log(JSON.stringify(result[i]));
        //}
        //这里可以写执行 post发送到服务端
    }
    });

    }

    </script>
</body>
</html>
```

### 导出

```js
<!DOCTYPE
html >
< html >
< head >
< meta
charset = "UTF-8" >
    < title > js导出excel < /title>
<script type="text/javascript" src="./xlsx.core.min.js"></script>
</head>
<body>
    <button onclick="downloadExl(jsono)">导出</button>


    <script>
        var jsono = [{
        "姓名": "张三",
        "年龄": "30",
        "性别": "男"
    }, {
        "姓名": "李四",
        "年龄": "40",
        "性别": "女"
    }, {
        "姓名": "王五",
        "年龄": "50",
        "性别": "男"
    }];

        var tmpDown; //导出的二进制对象
        function downloadExl(json, type) {
        //根据json数据，获取excel的第一行(例如:姓名、年龄、性别)存至map
        var tmpdata = json[0];
        json.unshift({});
        var keyMap = []; //获取keys
        for (var k in tmpdata) {
        keyMap.push(k);
        json[0][k] = k;
    }
        var tmpdata = [];
        json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)

    }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
        v: v.v
    });

        //设置区域,比如表格从A1到D10
        var outputPos = Object.keys(tmpdata);
        var tmpWB = {
        SheetNames: [], //保存的表标题
        Sheets: {}
    };

        var sheetName = '保存的sheet名字';

        tmpWB.SheetNames.push(sheetName);

        tmpWB.Sheets[sheetName] = Object.assign({},
        tmpdata, //内容
    {'!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1]}//设置填充区域
        );


        //创建二进制对象写入转换好的字节流
        tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
    {bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
        ))], {
        type: ""
    });
        var href = URL.createObjectURL(tmpDown); //创建对象超链接
        var aLink = document.createElement('a');
        aLink.href = href;//绑定a标签
        aLink.download = '我是导出来的测试文件.xlsx';
        aLink.click();//模拟点击实现下载

        setTimeout(function () { //延时释放
        URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);
    }

        //字符串转字符流
        function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

        //将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
        function getCharCol(n) {
        let temCol = '',
        s = '',
        m = 0
        while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
    }
        return s
    }

    </script>
</body>
</html>
```

### 导出带单元格合并的excel

```js
<!DOCTYPE
html >
< html
lang = "zh-cn" >
    < head >
    < meta
charset = "UTF-8" >
    < title > JS读取和导出excel示例 < /title>
<script type="text/javascript" src="./xlsx.core.min.js"></script>
</head>
<body>
    <input type="button" value="导出带单元格合并的excel" onclick="exportSpecialExcel()"/>


    <script type="text/javascript">

        // 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
        function sheet2blob(sheet, sheetName) {
        sheetName = sheetName || 'sheet1';
        var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
        workbook.Sheets[sheetName] = sheet;
        // 生成excel的配置项
        var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
        var wbout = XLSX.write(workbook, wopts);
        var blob = new Blob([s2ab(wbout)], {type: "application/octet-stream"});
        // 字符串转ArrayBuffer
        function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
        return blob;
    }

        function exportSpecialExcel() {
        var aoa = [
        ['主要信息', null, null, '其它信息'], // 特别注意合并的地方后面预留2个null
        ['姓名', '性别', '年龄', '注册时间'],
        ['张三', '男', 18, new Date()],
        ['李四', '女', 22, new Date()]
        ];
        var sheet = XLSX.utils.aoa_to_sheet(aoa);
        sheet['!merges'] = [
        // 设置A1-C1的单元格合并
    {s: {r: 0, c: 0}, e: {r: 0, c: 2}}
        ];



        var tmpDown = sheet2blob(sheet, '我是导出带单元格合并的excel')

        var href = URL.createObjectURL(tmpDown); //创建对象超链接
        var aLink = document.createElement('a');
        aLink.href = href;//绑定a标签
        aLink.download = '我是导出带单元格合并的excel.xlsx';
        aLink.click();//模拟点击实现下载

        setTimeout(function () { //延时释放
        URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);
    }
    </script>
</body>
</html>
```

xlsx.core.min.js [链接: ](https://pan.baidu.com/s/1KMv0jWUrDqux8Rumlz3OXQ) 提取码: r1np

- [原文链接](https://www.luofenming.com/show.aspx?id=ART2021033000002)
