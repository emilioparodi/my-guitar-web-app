/* -- Tuner Switch */

function changeTunerToDropD() {
  document.getElementById('standard').style.display = "none";
  document.getElementById('drop-d').style.display = "inline";
  document.getElementById('tuner-button-e').style.display = "none";
  document.getElementById('tuner-button-d').style.display = "inline";
};

function changeTunerToStandardTuning() {
  document.getElementById('standard').style.display = "inline";
  document.getElementById('drop-d').style.display = "none";
  document.getElementById('tuner-button-e').style.display = "inline";
  document.getElementById('tuner-button-d').style.display = "none";
};