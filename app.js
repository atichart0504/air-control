const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

client.on('connect', () => {

document.getElementById('status').innerHTML = "🟢 MQTT Connected";

client.subscribe('ono_air_2026/status/r1/led1');
client.subscribe('ono_air_2026/status/r2');

client.subscribe('ono_air_2026/sensor/r1/temp');
client.subscribe('ono_air_2026/sensor/r2/temp');
client.subscribe('ono_air_2026/sensor/gateway/temp');

});

client.on('message', (topic, msg) => {

const value = msg.toString();

// ROOM 1
if(topic === 'ono_air_2026/status/r1/led1'){
document.getElementById('led1').innerHTML =
value === 'ON' ? '🟢 ON' : '🔴 OFF';
}

// ROOM 2
else if(topic === 'ono_air_2026/status/r2'){
document.getElementById('r2').innerHTML =
value === 'ON' ? '🟢 ON' : '🔴 OFF';
}

// TEMP R1
else if(topic === 'ono_air_2026/sensor/r1/temp'){
document.getElementById('temp_r1').innerHTML = value + ' °C';
setRoomColor('air1', value);
}

// TEMP R2
else if(topic === 'ono_air_2026/sensor/r2/temp'){
document.getElementById('temp_r2').innerHTML = value + ' °C';
setRoomColor('air2', value);
}

// GATEWAY
else if(topic === 'ono_air_2026/sensor/gateway/temp'){
document.getElementById('temp_gateway').innerHTML =
value;
setRoomColor('room', value);
}

});

client.on('error', () => {
document.getElementById('status').innerHTML = "🔴 MQTT Error";
});

client.on('offline', () => {
document.getElementById('status').innerHTML = "🟠 Offline";
});

client.on('reconnect', () => {
document.getElementById('status').innerHTML = "🟡 Reconnecting...";
});

function sendCmd(cmd){
client.publish('ono_air_2026/cmd', cmd);
}
function setRoomColor(roomId, temp) {
  const el = document.getElementById(roomId);

  // ล้างสีเก่าก่อน
  el.classList.remove("green", "yellow", "red");

  const t = parseFloat(temp);

  if (t >= 21 && t <= 23) {
    el.classList.add("green");
  } 
  else if (t >= 24 && t <= 25) {
    el.classList.add("yellow");
  } 
  else if (t >= 26) {
    el.classList.add("red");
  }
}
