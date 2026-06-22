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
document.getElementById('temp_r1').innerHTML =
value + ' °C';
}

// TEMP R2
else if(topic === 'ono_air_2026/sensor/r2/temp'){
document.getElementById('temp_r2').innerHTML =
value + ' °C';
}

// GATEWAY
else if(topic === 'ono_air_2026/sensor/gateway/temp'){
document.getElementById('temp_gateway').innerHTML =
value;
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
