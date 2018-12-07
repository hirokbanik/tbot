var output = document.getElementById('output');
var input = document.getElementById('input');

document.addEventListener('click', function (e) {
    input.focus();
});

document.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) run(input.value);
});

function run(i){
    var iWords = i.split(' '); //console.log(iWords);
    // var iReturn = iSearch(iWords);
    var iReturn = iSearch(i);
    console.log(iReturn);

    if(iReturn == 'asking name') iOutput('My name is tBot.');
    else if(iReturn == 'telling name') iOutput('Hello and Welcome.');
    else if(typeof(iReturn)=='number') iOutput(i+' = '+iReturn);
    else if(iReturn == 'translate') console.log('translate');
    else iOutput(iReturn);
}

function iSearch(i){
    console.log(i);
    var isName = i.toLowerCase().search('name'); console.log(isName);
    var isMath = /[0-9]/.test(i);
    var isTranslate = /translate/i.test(i);
    if(isTranslate){
        // var iText = i.slice(/translate/i.exec(i).index+10);
        var iText = i.replace('translate','');
        console.log(iText);
        iTranslate(iText);
        return 'translate';
    } else if(isName >=0){
        var isWhat = i.toLowerCase().search('what'); console.log(isWhat);
        if(isWhat >=0){
            return 'asking name';
        } else {
            var isMy = i.toLowerCase().search('my'); console.log(isWhat);
            if(isMy >=0){
                return 'telling name';
            } else return i.toUpperCase() + '...';
        }
    } else if(isMath){
        var mathStart = (/[0-9]/.exec(i)).index;
        var mathEnd = /[0-9]$/.exec(i).index;

        var math = i.slice(mathStart, mathEnd+1);

        return eval(math);
    } else {
        return i.toUpperCase()+'...';
    }
}

function iTranslate(i) {
    var iText = encodeURIComponent(i);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var oText = JSON.parse(this.responseText).text[0];
            console.log(oText);
            iOutput(oText);
        }
    };
    xhttp.open("POST", "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20181207T094138Z.fe19b6bdf4def687.30cc9ab70f1cac5b08fb1cf020e20cc5a1c40f8b&format=plain&lang=en-bn&text="+iText, true);
    xhttp.send();
}

function iOutput(i){
    output.innerHTML = output.innerHTML +'user$ '+input.value + '<br>tbot$ ' + i + '<br><br>';
    input.value = '';
}