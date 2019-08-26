document.addEventListener('DOMContentLoaded', function (event) {
  const draw = document.getElementById('draw');
  const inputFile = document.getElementById('inputFile');
  const reader = new FileReader();
  const outputText = document.getElementById('outputText');
  const downloadButton = document.getElementById('download');

  reader.onload = function () {
    let commandLine = reader.result;
    try {
      let commandDecoder = new CommandDecoder(commandLine);
      let drawText = commandDecoder.draw();
      outputText.value = drawText;
    } catch (e) {
      alert(e);
    }
  };

  draw.addEventListener('click', () => {
    if (inputFile.files[0]) {
      reader.readAsText(inputFile.files[0]);
    } else  alert('Select input.txt');
  }, false);

  downloadButton.addEventListener('click', () => {
    download(outputText.value, 'output.txt');
  });

});


function download(text, filename) {
  var file = new Blob([text], { type: 'text/plain' });
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click(); 
}
