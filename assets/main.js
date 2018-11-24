document.addEventListener('DOMContentLoaded', function () {
    var cleanLines = [];
    window.openFile = function (event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function () {
            var text = reader.result;
            var node = document.getElementById('output');
            node.innerText = text;

            var lines = text.split('\n');
            var numOfGroups = lines[0];
            lines.splice(0, 1);
            var someArray = [];
            for (var line = 0; line < lines.length; line++) {
                if (lines[line].trim().length < 1) {
                    cleanLines.push(someArray);
                    someArray = [];
                } else {
                    if (lines.indexOf(lines[line]) + 1 == lines.length) {
                        someArray.push(lines[line]);
                        cleanLines.push(someArray);
                        someArray = [];
                    }
                    someArray.push(lines[line]);
                }
            }

            var allAcSum = [];
            cleanLines.forEach(function (element) {
                element.splice(0, 1);
                var sumAcNums = [];
                element.forEach(function (acNumber) {
                    var splitAcNumber = acNumber.split(" ");
                    var total = 0;
                    splitAcNumber.forEach(function (singleNumber) {
                        total += parseInt(singleNumber);
                    });
                    sumAcNums.push({ id: total, ac: acNumber });
                    sumAcNums.sort(function (a, b) {
                        if (a.id !== b.id) {
                            return a.id - b.id
                        }
                    });
                });
                allAcSum.push(sumAcNums);
            });

            var result = [];
            allAcSum.forEach(function (item) {
                var twinsArray = [];
                item.forEach(function (val) {
                    var check = twinsArray.find(o => o.ac == val.ac);
                    if (check == undefined) twinsArray.push({ ac: val.ac, count: 1 });
                    else check.count++;

                });
                result.push(twinsArray);
            });

            result.forEach(function (item) {
                for (var i = 0; i < item.length; i++) {
                    document.getElementById("result").innerHTML += "<div>" + (item[i].ac) + "  "+ (item[i].count) +"</div>";
                }
                document.getElementById("result").innerHTML += "<div><p> </p></div>";
            });           
        };
        reader.readAsText(input.files[0]);
    };
});