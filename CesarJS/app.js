var read = require('read');
var fs = require('fs');
var max = 0;
var res, ind;
var new_mas = [];

function abc(str, num) {
    str = str.toLowerCase();
    str = str.split("");
    // console.log(str);
    num = parseInt(num);
    var ch;
    var flag = false;
    var mas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    for (var i = 0; i < str.length; i++) {
        for (var j = 0; j < mas.length; j++) {
            if (str[i] == mas[j]) {
                var rem = j;
                // console.log(rem);
                flag = true;
            }
        }
        ch = (rem + num) % 26;
        // console.log(false);
        // console.log("rem: " + rem + " Num: " + num + " str[i]: " + str[i] + " mas[ch]: " + mas[ch]);
        if (flag == true) {
            str[i] = mas[ch];
        }
        flag = false;
    }
    str = str.join("");
    // console.log(str);
    return str;
}

function addNumber(num) {
    var bool = false;
    for (var i = 0; i < new_mas.length; i += 2) {
        if (new_mas[i] == num) {
            new_mas[i + 1] += 1;
            bool = true;
        }
    }
    if (bool == false) {
        new_mas.push(num, 1)
    }
}

toLower = function(x) {
    return x.toLowerCase();
};

fs.open("readme.txt", "r+", 0644, function(err, file_handle) {
    if (!err) {
        fs.read(file_handle, 10000000, null, 'utf8', function(err, data) {
            data = data.split(/\W+/);
            data = data.map(toLower);
            // console.log(data);
            read({
                prompt: "Code: "
            }, function(err, code) {
              var new_string = code;
                code = code.split(/\W+/);
                code = code.map(toLower);
                process.stdin.destroy();
                for (var i = 0; i < data.length; i++) {
                    if (data[i].length > 1) {
                        for (var j = 0; j < code.length; j++) {
                            for (var num = 1; num < 27; num++) {
                                var new_str = code[j];
                                var new_num = parseInt(num);
                                var result = abc(new_str, new_num);
                                 //console.log(data[i]+ ' ' + result);
                                if (data[i] == result) {
                                     console.log(result + " Number: " + num);
                                    addNumber(num);
                                }
                            }
                        }
                    }
                }
                 console.log(new_mas);
                for (var i = 1; i < new_mas.length; i += 2) {
                    if (new_mas[i] >= max) {
                        max = new_mas[i]
                        ind = new_mas[i-1]
                    }
                }
                console.log(max);
                console.log(26-ind);
                console.log(abc(new_string,(ind).toString()));
            })
        })
    } else {
        console.log(err);
    }
});
