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
    else iOutput(iReturn);
}

function iSearch(i){
    console.log(i);
    var isName = i.toLowerCase().search('name'); console.log(isName);
    var isMath = /[0-9]/.test(i);
    if(isName >=0){
        var isWhat = i.toLowerCase().search('what'); console.log(isWhat);
        if(isWhat >=0){
            return 'asking name';
        } else {
            var isMy = i.toLowerCase().search('my'); console.log(isWhat);
            if(isMy >=0){
                return 'telling name';
            }
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

function iOutput(i){
    output.innerHTML = output.innerHTML +'Q. '+input.value + '<br>A. ' + i + '<br><br>';
    input.value = '';
}