const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

client.on('connect', () => {

document.getElementById('status').innerHTML = "🟢 MQTT Connected";

// Subscribe สถานะของ R1 (LED1 - LED4)
client.subscribe('ono_air_2026/status/r1/led1');
client.subscribe('ono_air_2026/status/r1/led2');
client.subscribe('ono_air_2026/status/r1/led3');
client.subscribe('ono_air_2026/status/r1/led4');

// Subscribe สถานะของ R2
client.subscribe('ono_air_2026/status/r2/led1');
client.subscribe('ono_air_2026/status/r2/led2');
client.subscribe('ono_air_2026/status/r2/led3');
client.subscribe('ono_air_2026/status/r2/led4');

// Subscribe อุณหภูมิเซนเซอร์
client.subscribe('ono_air_2026/sensor/r1/temp');
client.subscribe('ono_air_2026/sensor/r2/temp');
client.subscribe('ono_air_2026/sensor/gateway/temp');

});

client.on('message', (topic, msg) => {

const value = msg.toString();

// --- ROOM 1 (LED1 - LED4) ---
if(topic === 'ono_air_2026/status/r1/led1'){
  document.getElementById('led1').innerHTML = value === 'ON' ? '🟢 ON' : '🔴 OFF';
}
else if(topic === 'ono_air_2026/status/r1/led2'){
  document.getElementById('led2').innerHTML = value === 'ON' ? '🟢 ON' : '🔴 OFF';
}
else if(topic === 'ono_air_2026/status/r1/led3'){
  document.getElementById('led3').innerHTML = value === 'ON' ? '🟢 ON' : '🔴 OFF';
}
else if(topic === 'ono_air_2026/status/r1/led4'){
  document.getElementById('led4').innerHTML = value === 'ON' ? '🟢 ON' : '🔴 OFF';
}

// --- ROOM 2 ---
else if(topic === 'ono_air_2026/status/r2/led1'){
  document.getElementById('r2_led1').innerHTML = value === 'ON' ? '🟢 ON' : '🔴 OFF';
}
else if(topic === 'ono_air_2026/status/r2/led2'){
  document.getElementById('r2_led2').innerHTML = value === 'ON' ? '🟢 ON' : '🔴 OFF';
}
else if(topic === 'ono_air_2026/status/r2/led3'){
  document.getElementById('r2_led3').innerHTML = value === 'ON' ? '🟢 ON' : '🔴 OFF';
}
else if(topic === 'ono_air_2026/status/r2/led4'){
  document.getElementById('r2_led4').innerHTML = value === 'ON' ? '🟢 ON' : '🔴 OFF';
}

// --- TEMPERATURES ---
else if(topic === 'ono_air_2026/sensor/r1/temp'){
  document.getElementById('temp_r1').innerHTML = value + ' °C';
  setRoomColor('air1', value);
}
else if(topic === 'ono_air_2026/sensor/r2/temp'){
  document.getElementById('temp_r2').innerHTML = value + ' °C';
  setRoomColor('air2', value);
}
else if(topic === 'ono_air_2026/sensor/gateway/temp'){
  document.getElementById('temp_gateway').innerHTML = value + " °C";
  setGatewayColor(value);
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
  el.classList.remove("green", "yellow", "red");
  const t = parseFloat(temp);

  if (t >= 0 && t <= 23.0) {
    el.classList.add("green");
  } 
  else if (t >= 23.1 && t <= 25.9) {
    el.classList.add("yellow");
  } 
  else if (t >= 26) {
    el.classList.add("red");
  }
}

function setGatewayColor(temp) {
  const box = document.getElementById("gatewayBox");
  box.classList.remove("green", "yellow", "red");
  const t = parseFloat(temp);

  if (t >= 0 && t <= 23.0) {
    box.classList.add("green");
  } 
  else if (t >= 23.1 && t <= 25.9) {
    box.classList.add("yellow");
  } 
  else if (t >= 26) {
    box.classList.add("red");
  }
}
