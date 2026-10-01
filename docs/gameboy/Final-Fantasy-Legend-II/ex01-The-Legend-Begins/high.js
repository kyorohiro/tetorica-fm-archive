// Game Boy VGM: one pass, original register order and 44100 Hz sample waits.
// Asynchronous waits are not sample-accurate audio scheduling.
// Envelope/sweep evolve in the chip. Comments describe writes, not internal live state.
const gb = await createSoundChip('gameboy');
try {
  gb.reset(); // Replay original power/setup writes without injecting initialize defaults.
  gb.writeRegister(0x16, 0x80); // t=0.000000s (sample 0): APU power ON
  gb.adoptRegisterState(); // Use original setup; no added writes or reset.
  gb.writeRegister(0x16, 0xff); // t=0.000000s (sample 0): APU power ON
  gb.adoptRegisterState(); // Use original setup; no added writes or reset.
  gb.pulse.setEnvelope(0, {volume: 1, direction: 'down', period: 0}); // t=0.000000s (sample 0): CH1 envelope: initial volume 1, down, period 0 (automatic change disabled); no retrigger
  gb.pulse.setEnvelope(1, {volume: 1, direction: 'down', period: 0}); // t=0.000000s (sample 0): CH2 envelope: initial volume 1, down, period 0 (automatic change disabled); no retrigger
  gb.writeRegister(0x0c, 0x10); // t=0.000000s (sample 0): CH3 output level 0%
  gb.noise.setEnvelope({volume: 1, direction: 'down', period: 0}); // t=0.000000s (sample 0): CH4 envelope: initial volume 1, down, period 0 (automatic change disabled); no retrigger
  gb.pulse.setSweep({direction: 'up', period: 0, shift: 0}); // t=0.000000s (sample 0): CH1 sweep: period 0, up, shift 0
  gb.writeRegister(0x03, 0xff); // t=0.000000s (sample 0): CH1 written pitch 73.102 Hz; no retrigger
  gb.writeRegister(0x08, 0xff); // t=0.000000s (sample 0): CH2 written pitch 73.102 Hz; no retrigger
  gb.writeRegister(0x0b, 0xff); // t=0.000000s (sample 0): register 0xff1b
  gb.writeRegister(0x0d, 0xff); // t=0.000000s (sample 0): CH3 written pitch 36.551 Hz; no retrigger
  gb.writeRegister(0x04, 0x07); // t=0.000000s (sample 0): CH1 written pitch 131072.000 Hz; trigger false, length enabled false
  gb.writeRegister(0x09, 0x07); // t=0.000000s (sample 0): CH2 written pitch 131072.000 Hz; trigger false, length enabled false
  gb.writeRegister(0x0e, 0x07); // t=0.000000s (sample 0): CH3 written pitch 65536.000 Hz; trigger false, length enabled false
  gb.noise.setEnvelope({volume: 0, direction: 'down', period: 0}); // t=0.000000s (sample 0): CH4 envelope: initial volume 0, down, period 0 (automatic change disabled); no retrigger
  gb.writeRegister(0x13, 0x80); // t=0.000000s (sample 0): CH4 trigger true, length enabled false
  gb.setMasterVolume(7, 7); // t=0.000000s (sample 0): master volume L 7, R 7; VIN bits preserved
  gb.writeRegister(0x15, 0xff); // t=0.000000s (sample 0): channel routing (low nibble right, high nibble left)
  await sleepSamples(741, 44100);
  gb.pulse.setSweep({direction: 'up', period: 0, shift: 0}); // t=0.016803s (sample 741): CH1 sweep: period 0, up, shift 0
  gb.writeRegister(0x03, 0xff); // t=0.016803s (sample 741): CH1 written pitch 131072.000 Hz; no retrigger
  gb.writeRegister(0x08, 0xff); // t=0.016803s (sample 741): CH2 written pitch 131072.000 Hz; no retrigger
  gb.writeRegister(0x0b, 0xff); // t=0.016803s (sample 741): register 0xff1b
  gb.writeRegister(0x0d, 0xff); // t=0.016803s (sample 741): CH3 written pitch 65536.000 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x07); // t=0.016825s (sample 742): CH1 written pitch 131072.000 Hz; trigger false, length enabled false
  gb.writeRegister(0x09, 0x07); // t=0.016825s (sample 742): CH2 written pitch 131072.000 Hz; trigger false, length enabled false
  gb.writeRegister(0x0e, 0x07); // t=0.016825s (sample 742): CH3 written pitch 65536.000 Hz; trigger false, length enabled false
  gb.noise.setEnvelope({volume: 0, direction: 'down', period: 0}); // t=0.016825s (sample 742): CH4 envelope: initial volume 0, down, period 0 (automatic change disabled); no retrigger
  gb.writeRegister(0x13, 0x80); // t=0.016825s (sample 742): CH4 trigger true, length enabled false
  await sleepSamples(87, 44100);
  gb.pulse.setDuty(1, 0.5); // t=0.018798s (sample 829): CH2 duty 50%; length load 0
  await sleepSamples(5, 44100);
  gb.setPan(1, true, false); // t=0.018912s (sample 834): channel routing (low nibble right, high nibble left)
  await sleepSamples(11, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=0.019161s (sample 845): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x42); // t=0.019161s (sample 845): CH2 written pitch 689.853 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x86); // t=0.019184s (sample 846): CH2 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setDuty(0, 0.5); // t=0.019478s (sample 859): CH1 duty 50%; length load 0
  await sleepSamples(6, 44100);
  gb.setPan(0, false, true); // t=0.019615s (sample 865): channel routing (low nibble right, high nibble left)
  await sleepSamples(4, 44100);
  gb.pulse.setFrequency(0, 131072); // t=0.019705s (sample 869): CH1 written pitch 131072.000 Hz; no retrigger
  await sleepSamples(6, 44100);
  gb.writeRegister(0x0a, 0x00); // t=0.019841s (sample 875): CH3 DAC OFF
  await sleepSamples(1, 44100);
  gb.writeRegister(0x20, 0xff); // t=0.019864s (sample 876): wave RAM samples 0/1: 15, 15; direct write (no added stop)
  gb.writeRegister(0x21, 0xff); // t=0.019864s (sample 876): wave RAM samples 2/3: 15, 15; direct write (no added stop)
  gb.writeRegister(0x22, 0xff); // t=0.019864s (sample 876): wave RAM samples 4/5: 15, 15; direct write (no added stop)
  await sleepSamples(1, 44100);
  gb.writeRegister(0x23, 0xff); // t=0.019887s (sample 877): wave RAM samples 6/7: 15, 15; direct write (no added stop)
  gb.writeRegister(0x24, 0xff); // t=0.019887s (sample 877): wave RAM samples 8/9: 15, 15; direct write (no added stop)
  await sleepSamples(1, 44100);
  gb.writeRegister(0x25, 0xff); // t=0.019909s (sample 878): wave RAM samples 10/11: 15, 15; direct write (no added stop)
  gb.writeRegister(0x26, 0xff); // t=0.019909s (sample 878): wave RAM samples 12/13: 15, 15; direct write (no added stop)
  gb.writeRegister(0x27, 0xff); // t=0.019909s (sample 878): wave RAM samples 14/15: 15, 15; direct write (no added stop)
  await sleepSamples(1, 44100);
  gb.writeRegister(0x28, 0x00); // t=0.019932s (sample 879): wave RAM samples 16/17: 0, 0; direct write (no added stop)
  gb.writeRegister(0x29, 0x00); // t=0.019932s (sample 879): wave RAM samples 18/19: 0, 0; direct write (no added stop)
  await sleepSamples(1, 44100);
  gb.writeRegister(0x2a, 0x00); // t=0.019955s (sample 880): wave RAM samples 20/21: 0, 0; direct write (no added stop)
  gb.writeRegister(0x2b, 0x00); // t=0.019955s (sample 880): wave RAM samples 22/23: 0, 0; direct write (no added stop)
  gb.writeRegister(0x2c, 0x00); // t=0.019955s (sample 880): wave RAM samples 24/25: 0, 0; direct write (no added stop)
  await sleepSamples(1, 44100);
  gb.writeRegister(0x2d, 0x00); // t=0.019977s (sample 881): wave RAM samples 26/27: 0, 0; direct write (no added stop)
  gb.writeRegister(0x2e, 0x00); // t=0.019977s (sample 881): wave RAM samples 28/29: 0, 0; direct write (no added stop)
  await sleepSamples(1, 44100);
  gb.writeRegister(0x2f, 0x00); // t=0.020000s (sample 882): wave RAM samples 30/31: 0, 0; direct write (no added stop)
  gb.writeRegister(0x0a, 0x80); // t=0.020000s (sample 882): CH3 DAC ON
  gb.writeRegister(0x0c, 0x00); // t=0.020000s (sample 882): CH3 output level 0%
  gb.writeRegister(0x0e, 0x87); // t=0.020000s (sample 882): CH3 written pitch 65536.000 Hz; trigger true, length enabled false
  await sleepSamples(5, 44100);
  gb.wave.setLevel(0.5); // t=0.020113s (sample 887): CH3 output level 50%
  await sleepSamples(6, 44100);
  gb.setPan(0, false, true); // t=0.020249s (sample 893): channel routing (low nibble right, high nibble left)
  await sleepSamples(3, 44100);
  gb.wave.setLevel(0); // t=0.020317s (sample 896): CH3 output level 0%
  await sleepSamples(1328, 44100);
  gb.pulse.setFrequency(1, 293.8834080717489); // t=0.050431s (sample 2224): CH2 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=0.050476s (sample 2226): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x86); // t=0.050476s (sample 2226): CH2 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(13290, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=0.351837s (sample 15516): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x42); // t=0.351859s (sample 15517): CH2 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x09, 0x86); // t=0.351859s (sample 15517): CH2 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.writeRegister(0x08, 0x42); // t=0.352154s (sample 15530): CH2 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=0.352177s (sample 15531): CH2 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=0.352200s (sample 15532): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x86); // t=0.352222s (sample 15533): CH2 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(15490, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=0.703469s (sample 31023): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0xd6); // t=0.703469s (sample 31023): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x86); // t=0.703492s (sample 31024): CH2 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(1, 439.83892617449663); // t=0.703787s (sample 31037): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=0.703832s (sample 31039): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x86); // t=0.703832s (sample 31039): CH2 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(22142, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=1.205918s (sample 53181): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=1.205941s (sample 53182): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x86); // t=1.205964s (sample 53183): CH2 written pitch 441.320 Hz; trigger true, length enabled false
  await sleepSamples(2206, 44100);
  gb.pulse.setFrequency(1, 442.81081081081084); // t=1.255986s (sample 55389): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=1.306213s (sample 57604): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 439.83892617449663); // t=1.356440s (sample 59819): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.writeRegister(0x08, 0xd7); // t=1.406689s (sample 62035): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=1.406712s (sample 62036): CH2 written pitch 441.320 Hz; trigger false, length enabled false
  await sleepSamples(2214, 44100);
  gb.pulse.setFrequency(1, 442.81081081081084); // t=1.456916s (sample 64250): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=1.507143s (sample 66465): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2222, 44100);
  gb.pulse.setFrequency(1, 439.83892617449663); // t=1.557528s (sample 68687): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=1.607778s (sample 70903): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2207, 44100);
  gb.writeRegister(0x08, 0xd8); // t=1.657823s (sample 73110): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=1.657846s (sample 73111): CH2 written pitch 442.811 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=1.708073s (sample 75326): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 439.83892617449663); // t=1.758299s (sample 77541): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=1.808549s (sample 79757): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2214, 44100);
  gb.pulse.setFrequency(1, 442.81081081081084); // t=1.858753s (sample 81971): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0xd7); // t=1.908980s (sample 84186): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=1.909002s (sample 84187): CH2 written pitch 441.320 Hz; trigger false, length enabled false
  await sleepSamples(2221, 44100);
  gb.writeRegister(0x08, 0xd6); // t=1.959365s (sample 86408): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=1.959388s (sample 86409): CH2 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=2.009637s (sample 88625): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2207, 44100);
  gb.pulse.setFrequency(1, 442.81081081081084); // t=2.059683s (sample 90832): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=2.076463s (sample 91572): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0xc4); // t=2.076463s (sample 91572): CH2 written pitch 414.785 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x86); // t=2.076485s (sample 91573): CH2 written pitch 414.785 Hz; trigger true, length enabled false
  await sleepSamples(1474, 44100);
  gb.pulse.setFrequency(1, 414.7848101265823); // t=2.109909s (sample 93047): CH2 written pitch 414.785 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=2.109955s (sample 93049): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x86); // t=2.109955s (sample 93049): CH2 written pitch 414.785 Hz; trigger true, length enabled false
  await sleepSamples(5907, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=2.243900s (sample 98956): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0xd6); // t=2.243900s (sample 98956): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x86); // t=2.243923s (sample 98957): CH2 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.pulse.setFrequency(1, 439.83892617449663); // t=2.260612s (sample 99693): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=2.260658s (sample 99695): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x86); // t=2.260658s (sample 99695): CH2 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(6645, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=2.411338s (sample 106340): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0xf7); // t=2.411338s (sample 106340): CH2 written pitch 494.611 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x86); // t=2.411361s (sample 106341): CH2 written pitch 494.611 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(1, 494.611320754717); // t=2.411655s (sample 106354): CH2 written pitch 494.611 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=2.411701s (sample 106356): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x86); // t=2.411701s (sample 106356): CH2 written pitch 494.611 Hz; trigger true, length enabled false
  await sleepSamples(15490, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=2.762948s (sample 121846): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0xd6); // t=2.762971s (sample 121847): CH2 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x09, 0x86); // t=2.762971s (sample 121847): CH2 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=2.763243s (sample 121859): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x42); // t=2.763243s (sample 121859): CH1 written pitch 689.853 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=2.763265s (sample 121860): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(7, 44100);
  gb.wave.setLevel(0); // t=2.763424s (sample 121867): CH3 output level 0%
  await sleepSamples(8, 44100);
  gb.pulse.setFrequency(1, 439.83892617449663); // t=2.763605s (sample 121875): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=2.763651s (sample 121877): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x86); // t=2.763651s (sample 121877): CH2 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(706, 44100);
  gb.writeRegister(0x03, 0x42); // t=2.779660s (sample 122583): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=2.779683s (sample 122584): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=2.779705s (sample 122585): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=2.779728s (sample 122586): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(14029, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=3.097846s (sample 136615): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=3.097868s (sample 136616): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=3.097891s (sample 136617): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1473, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=3.131293s (sample 138090): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=3.131338s (sample 138092): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=3.131338s (sample 138092): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(5912, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=3.265397s (sample 144004): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=3.265442s (sample 144006): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x86); // t=3.265442s (sample 144006): CH2 written pitch 441.320 Hz; trigger true, length enabled false
  await sleepSamples(2206, 44100);
  gb.pulse.setFrequency(1, 442.81081081081084); // t=3.315465s (sample 146212): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=3.365692s (sample 148427): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0xd6); // t=3.415918s (sample 150642): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=3.415941s (sample 150643): CH2 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1479, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=3.449478s (sample 152122): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=3.449501s (sample 152123): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=3.449501s (sample 152123): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.writeRegister(0x08, 0xd7); // t=3.466168s (sample 152858): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=3.466190s (sample 152859): CH2 written pitch 441.320 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=3.482902s (sample 153596): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=3.482948s (sample 153598): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=3.482948s (sample 153598): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(1475, 44100);
  gb.pulse.setFrequency(1, 442.81081081081084); // t=3.516395s (sample 155073): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=3.566621s (sample 157288): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2222, 44100);
  gb.pulse.setFrequency(1, 439.83892617449663); // t=3.617007s (sample 159510): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=3.667256s (sample 161726): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2208, 44100);
  gb.pulse.setFrequency(1, 442.81081081081084); // t=3.717324s (sample 163934): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=3.767551s (sample 166149): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 439.83892617449663); // t=3.817778s (sample 168364): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=3.868027s (sample 170580): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2214, 44100);
  gb.writeRegister(0x08, 0xd8); // t=3.918231s (sample 172794): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=3.918254s (sample 172795): CH2 written pitch 442.811 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=3.968481s (sample 175010): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.writeRegister(0x03, 0xd7); // t=3.985215s (sample 175748): CH1 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=3.985238s (sample 175749): CH1 written pitch 441.320 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 15, direction: 'down', period: 7}); // t=3.985261s (sample 175750): CH1 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=3.985261s (sample 175750): CH1 written pitch 441.320 Hz; trigger true, length enabled false
  await sleepSamples(1482, 44100);
  gb.pulse.setFrequency(1, 439.83892617449663); // t=4.018866s (sample 177232): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=4.069116s (sample 179448): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(731, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=4.085692s (sample 180179): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1483, 44100);
  gb.pulse.setFrequency(1, 442.81081081081084); // t=4.119320s (sample 181662): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(2208, 44100);
  gb.writeRegister(0x08, 0xd7); // t=4.169388s (sample 183870): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=4.169410s (sample 183871): CH2 written pitch 441.320 Hz; trigger false, length enabled false
  await sleepSamples(746, 44100);
  gb.pulse.setFrequency(0, 441.3198653198653); // t=4.186327s (sample 184617): CH1 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1469, 44100);
  gb.pulse.setFrequency(1, 439.83892617449663); // t=4.219637s (sample 186086): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=4.269887s (sample 188302): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.writeRegister(0x03, 0xd6); // t=4.286599s (sample 189039): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=4.286621s (sample 189040): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1476, 44100);
  gb.pulse.setFrequency(1, 442.81081081081084); // t=4.320091s (sample 190516): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=4.370317s (sample 192731): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setFrequency(0, 441.3198653198653); // t=4.387098s (sample 193471): CH1 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1482, 44100);
  gb.writeRegister(0x08, 0xd6); // t=4.420703s (sample 194953): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=4.420726s (sample 194954): CH2 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0xd7); // t=4.470952s (sample 197169): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=4.470975s (sample 197170): CH2 written pitch 441.320 Hz; trigger false, length enabled false
  await sleepSamples(730, 44100);
  gb.writeRegister(0x03, 0xd6); // t=4.487528s (sample 197900): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=4.487551s (sample 197901): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1483, 44100);
  gb.pulse.setFrequency(1, 442.81081081081084); // t=4.521179s (sample 199384): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(2208, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=4.571247s (sample 201592): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(747, 44100);
  gb.pulse.setFrequency(0, 441.3198653198653); // t=4.588186s (sample 202339): CH1 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1468, 44100);
  gb.pulse.setFrequency(1, 439.83892617449663); // t=4.621474s (sample 203807): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=4.671723s (sample 206023): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=4.688458s (sample 206761): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.pulse.setFrequency(1, 442.81081081081084); // t=4.721950s (sample 208238): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=4.772177s (sample 210453): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.writeRegister(0x03, 0xd7); // t=4.788934s (sample 211192): CH1 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=4.788957s (sample 211193): CH1 written pitch 441.320 Hz; trigger false, length enabled false
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=4.805714s (sample 211932): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xc4); // t=4.805737s (sample 211933): CH1 written pitch 414.785 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=4.805737s (sample 211933): CH1 written pitch 414.785 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(1, 439.83892617449663); // t=4.822404s (sample 212668): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setFrequency(0, 414.7848101265823); // t=4.839161s (sample 213407): CH1 written pitch 414.785 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=4.839206s (sample 213409): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=4.839206s (sample 213409): CH1 written pitch 414.785 Hz; trigger true, length enabled false
  await sleepSamples(1482, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=4.872812s (sample 214891): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2214, 44100);
  gb.writeRegister(0x08, 0xd8); // t=4.923016s (sample 217105): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=4.923039s (sample 217106): CH2 written pitch 442.811 Hz; trigger false, length enabled false
  await sleepSamples(2208, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=4.973107s (sample 219314): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=4.989909s (sample 220055): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0xd6); // t=4.989909s (sample 220055): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=4.989932s (sample 220056): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=4.990204s (sample 220068): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=4.990249s (sample 220070): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=4.990249s (sample 220070): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(1459, 44100);
  gb.pulse.setFrequency(1, 439.83892617449663); // t=5.023333s (sample 221529): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=5.073583s (sample 223745): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2214, 44100);
  gb.pulse.setFrequency(1, 442.81081081081084); // t=5.123787s (sample 225959): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(1480, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=5.157347s (sample 227439): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0xf7); // t=5.157347s (sample 227439): CH1 written pitch 494.611 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=5.157370s (sample 227440): CH1 written pitch 494.611 Hz; trigger true, length enabled false
  await sleepSamples(734, 44100);
  gb.writeRegister(0x08, 0xd7); // t=5.174014s (sample 228174): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=5.174036s (sample 228175): CH2 written pitch 441.320 Hz; trigger false, length enabled false
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(0, 494.611320754717); // t=5.190771s (sample 228913): CH1 written pitch 494.611 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=5.190816s (sample 228915): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=5.190816s (sample 228915): CH1 written pitch 494.611 Hz; trigger true, length enabled false
  await sleepSamples(1475, 44100);
  gb.pulse.setFrequency(1, 439.83892617449663); // t=5.224263s (sample 230390): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2223, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=5.274671s (sample 232613): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2214, 44100);
  gb.pulse.setFrequency(1, 442.81081081081084); // t=5.324875s (sample 234827): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(2208, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=5.374943s (sample 237035): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0xd6); // t=5.425170s (sample 239250): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=5.425193s (sample 239251): CH2 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0xd7); // t=5.475420s (sample 241466): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=5.475442s (sample 241467): CH2 written pitch 441.320 Hz; trigger false, length enabled false
  await sleepSamples(738, 44100);
  gb.setPan(1, true, true); // t=5.492177s (sample 242205): channel routing (low nibble right, high nibble left)
  await sleepSamples(8, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=5.492358s (sample 242213): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x21); // t=5.492381s (sample 242214): CH2 written pitch 273.637 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=5.492381s (sample 242214): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=5.492585s (sample 242223): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=5.492608s (sample 242224): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=5.492608s (sample 242224): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(7, 44100);
  gb.wave.setLevel(0); // t=5.492766s (sample 242231): CH3 output level 0%
  await sleepSamples(9, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=5.492971s (sample 242240): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=5.493016s (sample 242242): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=5.493016s (sample 242242): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(1439, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=5.525646s (sample 243681): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=5.525692s (sample 243683): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=5.525692s (sample 243683): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(14028, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=5.843787s (sample 257711): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x21); // t=5.843810s (sample 257712): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=5.843832s (sample 257713): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(1474, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=5.877256s (sample 259187): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=5.877302s (sample 259189): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=5.877302s (sample 259189): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(5167, 44100);
  gb.writeRegister(0x03, 0xd7); // t=5.994467s (sample 264356): CH1 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=5.994490s (sample 264357): CH1 written pitch 441.320 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 15, direction: 'down', period: 7}); // t=5.994512s (sample 264358): CH1 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=5.994512s (sample 264358): CH1 written pitch 441.320 Hz; trigger true, length enabled false
  await sleepSamples(4429, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=6.094943s (sample 268787): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(3692, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=6.178662s (sample 272479): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x6b); // t=6.178685s (sample 272480): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=6.178707s (sample 272481): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=6.179002s (sample 272494): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=6.179048s (sample 272496): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=6.179048s (sample 272496): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(722, 44100);
  gb.pulse.setFrequency(0, 441.3198653198653); // t=6.195420s (sample 273218): CH1 written pitch 441.320 Hz; no retrigger
  await sleepSamples(4436, 44100);
  gb.writeRegister(0x03, 0xd6); // t=6.296009s (sample 277654): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=6.296032s (sample 277655): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(4424, 44100);
  gb.pulse.setFrequency(0, 441.3198653198653); // t=6.396349s (sample 282079): CH1 written pitch 441.320 Hz; no retrigger
  await sleepSamples(4429, 44100);
  gb.writeRegister(0x03, 0xd6); // t=6.496780s (sample 286508): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=6.496803s (sample 286509): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(4431, 44100);
  gb.pulse.setFrequency(0, 441.3198653198653); // t=6.597279s (sample 290940): CH1 written pitch 441.320 Hz; no retrigger
  await sleepSamples(3690, 44100);
  gb.writeRegister(0x08, 0x6c); // t=6.680952s (sample 294630): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=6.680975s (sample 294631): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=6.680998s (sample 294632): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=6.681020s (sample 294633): CH2 written pitch 885.622 Hz; trigger true, length enabled false
  await sleepSamples(743, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=6.697868s (sample 295376): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1470, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=6.731202s (sample 296846): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=6.781429s (sample 299061): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.writeRegister(0x03, 0xd7); // t=6.798186s (sample 299800): CH1 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=6.798209s (sample 299801): CH1 written pitch 441.320 Hz; trigger false, length enabled false
  await sleepSamples(1475, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=6.831655s (sample 301276): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=6.881905s (sample 303492): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=6.898639s (sample 304230): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1483, 44100);
  gb.writeRegister(0x08, 0x6d); // t=6.932268s (sample 305713): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=6.932290s (sample 305714): CH2 written pitch 891.646 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=6.982517s (sample 307929): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(732, 44100);
  gb.pulse.setFrequency(0, 441.3198653198653); // t=6.999116s (sample 308661): CH1 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1476, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=7.032585s (sample 310137): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=7.082834s (sample 312353): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(745, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=7.099728s (sample 313098): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1469, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=7.133039s (sample 314567): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0x6c); // t=7.183265s (sample 316782): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=7.183288s (sample 316783): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(739, 44100);
  gb.pulse.setFrequency(0, 441.3198653198653); // t=7.200045s (sample 317522): CH1 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1476, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=7.233515s (sample 318998): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=7.283764s (sample 321214): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.writeRegister(0x03, 0xd6); // t=7.300476s (sample 321951): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=7.300499s (sample 321952): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1483, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=7.334127s (sample 323435): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=7.384354s (sample 325650): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(733, 44100);
  gb.pulse.setFrequency(0, 441.3198653198653); // t=7.400975s (sample 326383): CH1 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1482, 44100);
  gb.writeRegister(0x08, 0x6b); // t=7.434580s (sample 327865): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=7.434603s (sample 327866): CH2 written pitch 879.678 Hz; trigger false, length enabled false
  await sleepSamples(2208, 44100);
  gb.writeRegister(0x08, 0x6c); // t=7.484671s (sample 330074): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=7.484694s (sample 330075): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(744, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=7.501565s (sample 330819): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1470, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=7.534898s (sample 332289): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=7.551655s (sample 333028): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x62); // t=7.551678s (sample 333029): CH2 written pitch 829.570 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=7.551678s (sample 333029): CH2 written pitch 829.570 Hz; trigger true, length enabled false
  await sleepSamples(1475, 44100);
  gb.pulse.setFrequency(1, 829.5696202531645); // t=7.585125s (sample 334504): CH2 written pitch 829.570 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=7.585170s (sample 334506): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=7.585170s (sample 334506): CH2 written pitch 829.570 Hz; trigger true, length enabled false
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(0, 441.3198653198653); // t=7.601905s (sample 335244): CH1 written pitch 441.320 Hz; no retrigger
  await sleepSamples(4429, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=7.702336s (sample 339673): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=7.735850s (sample 341151): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x6b); // t=7.735850s (sample 341151): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=7.735873s (sample 341152): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=7.736168s (sample 341165): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=7.736213s (sample 341167): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=7.736213s (sample 341167): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(2937, 44100);
  gb.writeRegister(0x03, 0xd7); // t=7.802812s (sample 344104): CH1 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=7.802834s (sample 344105): CH1 written pitch 441.320 Hz; trigger false, length enabled false
  await sleepSamples(4430, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=7.903288s (sample 348535): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x7b); // t=7.903288s (sample 348535): CH2 written pitch 985.504 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=7.903311s (sample 348536): CH2 written pitch 985.504 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=7.903605s (sample 348549): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1461, 44100);
  gb.writeRegister(0x08, 0x7b); // t=7.936735s (sample 350010): CH2 written pitch 985.504 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=7.936757s (sample 350011): CH2 written pitch 985.504 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=7.936780s (sample 350012): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=7.936803s (sample 350013): CH2 written pitch 985.504 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.pulse.setFrequency(0, 441.3198653198653); // t=8.003741s (sample 352965): CH1 written pitch 441.320 Hz; no retrigger
  await sleepSamples(4430, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=8.104195s (sample 357395): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.pulse.setFrequency(0, 441.3198653198653); // t=8.204671s (sample 361826): CH1 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=8.238163s (sample 363303): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x6b); // t=8.238163s (sample 363303): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=8.238186s (sample 363304): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.setPan(0, true, false); // t=8.238390s (sample 363313): channel routing (low nibble right, high nibble left)
  await sleepSamples(9, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=8.238594s (sample 363322): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x21); // t=8.238617s (sample 363323): CH1 written pitch 273.637 Hz; no retrigger
  gb.writeRegister(0x04, 0x87); // t=8.238617s (sample 363323): CH1 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(7, 44100);
  gb.wave.setLevel(0); // t=8.238776s (sample 363330): CH3 output level 0%
  await sleepSamples(8, 44100);
  gb.writeRegister(0x08, 0x6b); // t=8.238957s (sample 363338): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=8.238980s (sample 363339): CH2 written pitch 879.678 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=8.239002s (sample 363340): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=8.239002s (sample 363340): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(700, 44100);
  gb.writeRegister(0x03, 0x21); // t=8.254875s (sample 364040): CH1 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x07); // t=8.254898s (sample 364041): CH1 written pitch 587.767 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=8.254921s (sample 364042): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x87); // t=8.254921s (sample 364042): CH1 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(14769, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=8.589819s (sample 378811): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x21); // t=8.589819s (sample 378811): CH1 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x87); // t=8.589841s (sample 378812): CH1 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 587.7668161434977); // t=8.606508s (sample 379547): CH1 written pitch 587.767 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=8.606553s (sample 379549): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x87); // t=8.606553s (sample 379549): CH1 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(5905, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=8.740454s (sample 385454): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=8.740499s (sample 385456): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=8.740499s (sample 385456): CH2 written pitch 885.622 Hz; trigger true, length enabled false
  await sleepSamples(2213, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=8.790680s (sample 387669): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=8.840907s (sample 389884): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=8.891134s (sample 392099): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1480, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=8.924694s (sample 393579): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x6b); // t=8.924694s (sample 393579): CH1 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x87); // t=8.924717s (sample 393580): CH1 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.writeRegister(0x08, 0x6c); // t=8.941383s (sample 394315): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=8.941406s (sample 394316): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(0, 879.6778523489933); // t=8.958118s (sample 395053): CH1 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=8.958163s (sample 395055): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x87); // t=8.958163s (sample 395055): CH1 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(1481, 44100);
  gb.writeRegister(0x08, 0x6d); // t=8.991746s (sample 396536): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=8.991769s (sample 396537): CH2 written pitch 891.646 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=9.041995s (sample 398752): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=9.092222s (sample 400967): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2209, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=9.142313s (sample 403176): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2214, 44100);
  gb.writeRegister(0x08, 0x6d); // t=9.192517s (sample 405390): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=9.192540s (sample 405391): CH2 written pitch 891.646 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=9.242766s (sample 407606): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=9.292993s (sample 409821): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=9.343243s (sample 412037): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2214, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=9.393447s (sample 414251): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2222, 44100);
  gb.writeRegister(0x08, 0x6c); // t=9.443832s (sample 416473): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=9.443855s (sample 416474): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(731, 44100);
  gb.pulse.setFrequency(0, 885.6216216216217); // t=9.460431s (sample 417205): CH1 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 15, direction: 'down', period: 7}); // t=9.460476s (sample 417207): CH1 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x04, 0x87); // t=9.460476s (sample 417207): CH1 written pitch 885.622 Hz; trigger true, length enabled false
  await sleepSamples(1481, 44100);
  gb.writeRegister(0x08, 0x6b); // t=9.494059s (sample 418688): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=9.494082s (sample 418689): CH2 written pitch 879.678 Hz; trigger false, length enabled false
  await sleepSamples(2209, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=9.544172s (sample 420898): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(744, 44100);
  gb.writeRegister(0x03, 0x6b); // t=9.561043s (sample 421642): CH1 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x07); // t=9.561066s (sample 421643): CH1 written pitch 879.678 Hz; trigger false, length enabled false
  await sleepSamples(1469, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=9.594376s (sample 423112): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=9.644603s (sample 425327): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setFrequency(0, 885.6216216216217); // t=9.661383s (sample 426067): CH1 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1475, 44100);
  gb.writeRegister(0x08, 0x6b); // t=9.694830s (sample 427542): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=9.694853s (sample 427543): CH2 written pitch 879.678 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0x6c); // t=9.745079s (sample 429758): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=9.745102s (sample 429759): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.writeRegister(0x03, 0x6b); // t=9.761814s (sample 430496): CH1 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x07); // t=9.761837s (sample 430497): CH1 written pitch 879.678 Hz; trigger false, length enabled false
  await sleepSamples(1476, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=9.795306s (sample 431973): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2222, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=9.845692s (sample 434195): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(733, 44100);
  gb.pulse.setFrequency(0, 885.6216216216217); // t=9.862313s (sample 434928): CH1 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1482, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=9.895918s (sample 436410): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2209, 44100);
  gb.writeRegister(0x08, 0x6c); // t=9.946009s (sample 438619): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=9.946032s (sample 438620): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(744, 44100);
  gb.pulse.setFrequency(0, 879.6778523489933); // t=9.962902s (sample 439364): CH1 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1470, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=9.996236s (sample 440834): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=10.046463s (sample 443049): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(746, 44100);
  gb.writeRegister(0x03, 0x6c); // t=10.063379s (sample 443795): CH1 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x07); // t=10.063401s (sample 443796): CH1 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(1468, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=10.096689s (sample 445264): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=10.146939s (sample 447480): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(0, 879.6778523489933); // t=10.163673s (sample 448218): CH1 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1476, 44100);
  gb.writeRegister(0x08, 0x6d); // t=10.197143s (sample 449694): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=10.197166s (sample 449695): CH2 written pitch 891.646 Hz; trigger false, length enabled false
  await sleepSamples(2222, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=10.247551s (sample 451917): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(732, 44100);
  gb.pulse.setFrequency(0, 885.6216216216217); // t=10.264150s (sample 452649): CH1 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=10.297664s (sample 454127): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x62); // t=10.297687s (sample 454128): CH1 written pitch 829.570 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x87); // t=10.297710s (sample 454129): CH1 written pitch 829.570 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=10.297982s (sample 454141): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(722, 44100);
  gb.writeRegister(0x03, 0x62); // t=10.314354s (sample 454863): CH1 written pitch 829.570 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x07); // t=10.314376s (sample 454864): CH1 written pitch 829.570 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=10.314399s (sample 454865): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x87); // t=10.314422s (sample 454866): CH1 written pitch 829.570 Hz; trigger true, length enabled false
  await sleepSamples(1475, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=10.347868s (sample 456341): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2214, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=10.398073s (sample 458555): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0x6c); // t=10.448299s (sample 460770): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=10.448322s (sample 460771): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=10.465102s (sample 461511): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x6b); // t=10.465125s (sample 461512): CH1 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x87); // t=10.465147s (sample 461513): CH1 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 879.6778523489933); // t=10.465420s (sample 461525): CH1 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=10.465465s (sample 461527): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x87); // t=10.465465s (sample 461527): CH1 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(1459, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=10.498549s (sample 462986): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=10.548798s (sample 465202): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2214, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=10.599002s (sample 467416): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2218, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=10.649297s (sample 469634): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x7b); // t=10.649320s (sample 469635): CH1 written pitch 985.504 Hz; no retrigger
  gb.writeRegister(0x04, 0x87); // t=10.649320s (sample 469635): CH1 written pitch 985.504 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=10.649592s (sample 469647): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(723, 44100);
  gb.pulse.setFrequency(0, 985.5037593984962); // t=10.665986s (sample 470370): CH1 written pitch 985.504 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'up', period: 4}); // t=10.666032s (sample 470372): CH1 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x87); // t=10.666032s (sample 470372): CH1 written pitch 985.504 Hz; trigger true, length enabled false
  await sleepSamples(1481, 44100);
  gb.writeRegister(0x08, 0x6b); // t=10.699615s (sample 471853): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=10.699637s (sample 471854): CH2 written pitch 879.678 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0x6c); // t=10.749864s (sample 474069): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=10.749887s (sample 474070): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(2207, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=10.799932s (sample 476277): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=10.850159s (sample 478492): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=10.900385s (sample 480707): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.writeRegister(0x08, 0x6c); // t=10.950635s (sample 482923): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=10.950658s (sample 482924): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(1476, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=10.984127s (sample 484400): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x4f); // t=10.984150s (sample 484401): CH2 written pitch 740.520 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=10.984150s (sample 484401): CH2 written pitch 740.520 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setDuty(0, 0.25); // t=10.984422s (sample 484413): CH1 duty 25%; length load 0
  await sleepSamples(15, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=10.984762s (sample 484428): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=10.984785s (sample 484429): CH1 written pitch 3120.762 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=10.984807s (sample 484430): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(10, 44100);
  gb.wave.setLevel(0.5); // t=10.985034s (sample 484440): CH3 output level 50%
  gb.writeRegister(0x0d, 0x42); // t=10.985034s (sample 484440): CH3 written pitch 344.926 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=10.985057s (sample 484441): CH3 written pitch 146.942 Hz; trigger false, length enabled false
  await sleepSamples(10, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=10.985283s (sample 484451): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(687, 44100);
  gb.pulse.setFrequency(1, 740.5197740112994); // t=11.000862s (sample 485138): CH2 written pitch 740.520 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=11.000884s (sample 485139): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=11.000907s (sample 485140): CH2 written pitch 740.520 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=11.017596s (sample 485876): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=11.017642s (sample 485878): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=11.017642s (sample 485878): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(5908, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=11.151610s (sample 491786): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=11.151633s (sample 491787): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=11.151633s (sample 491787): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=11.168299s (sample 492522): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=11.168345s (sample 492524): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=11.168345s (sample 492524): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(7384, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=11.335782s (sample 499908): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=11.335805s (sample 499909): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=11.335805s (sample 499909): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(1474, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=11.369229s (sample 501383): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=11.369274s (sample 501385): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=11.369274s (sample 501385): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(5167, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=11.486440s (sample 506552): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=11.503220s (sample 507292): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=11.503243s (sample 507293): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=11.503243s (sample 507293): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x08, 0x50); // t=11.503515s (sample 507305): CH2 written pitch 744.727 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=11.503537s (sample 507306): CH2 written pitch 744.727 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=11.503560s (sample 507307): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=11.503583s (sample 507308): CH2 written pitch 744.727 Hz; trigger true, length enabled false
  await sleepSamples(720, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=11.519909s (sample 508028): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=11.519955s (sample 508030): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=11.519955s (sample 508030): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1482, 44100);
  gb.pulse.setFrequency(1, 748.9828571428571); // t=11.553560s (sample 509512): CH2 written pitch 748.983 Hz; no retrigger
  await sleepSamples(1470, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=11.586893s (sample 510982): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 744.7272727272727); // t=11.603628s (sample 511720): CH2 written pitch 744.727 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 740.5197740112994); // t=11.653855s (sample 513935): CH2 written pitch 740.520 Hz; no retrigger
  await sleepSamples(742, 44100);
  gb.setPan(0, true, true); // t=11.670680s (sample 514677): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=11.670907s (sample 514687): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=11.670930s (sample 514688): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=11.670930s (sample 514688): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=11.671224s (sample 514701): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=11.671247s (sample 514702): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=11.671270s (sample 514703): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(710, 44100);
  gb.writeRegister(0x0d, 0x43); // t=11.687370s (sample 515413): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=11.687392s (sample 515414): CH3 written pitch 147.272 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 744.7272727272727); // t=11.704104s (sample 516151): CH2 written pitch 744.727 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 748.9828571428571); // t=11.754331s (sample 518366): CH2 written pitch 748.983 Hz; no retrigger
  await sleepSamples(1484, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=11.787982s (sample 519850): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(731, 44100);
  gb.pulse.setFrequency(1, 744.7272727272727); // t=11.804558s (sample 520581): CH2 written pitch 744.727 Hz; no retrigger
  await sleepSamples(1479, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=11.838095s (sample 522060): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=11.838118s (sample 522061): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=11.838118s (sample 522061): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(1, 740.5197740112994); // t=11.854785s (sample 522796): CH2 written pitch 740.520 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=11.871542s (sample 523535): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=11.871587s (sample 523537): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=11.871587s (sample 523537): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=11.888299s (sample 524274): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(745, 44100);
  gb.pulse.setFrequency(1, 744.7272727272727); // t=11.905193s (sample 525019): CH2 written pitch 744.727 Hz; no retrigger
  await sleepSamples(2214, 44100);
  gb.writeRegister(0x08, 0x51); // t=11.955397s (sample 527233): CH2 written pitch 748.983 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=11.955420s (sample 527234): CH2 written pitch 748.983 Hz; trigger false, length enabled false
  await sleepSamples(1470, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=11.988753s (sample 528704): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 744.7272727272727); // t=12.005488s (sample 529442): CH2 written pitch 744.727 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=12.022245s (sample 530181): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x4f); // t=12.022268s (sample 530182): CH2 written pitch 740.520 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=12.022268s (sample 530182): CH2 written pitch 740.520 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=12.022472s (sample 530191): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=12.022494s (sample 530192): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=12.022494s (sample 530192): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x9e); // t=12.022766s (sample 530204): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=12.022789s (sample 530205): CH1 written pitch 370.260 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=12.022812s (sample 530206): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=12.022834s (sample 530207): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(1450, 44100);
  gb.pulse.setFrequency(1, 740.5197740112994); // t=12.055714s (sample 531657): CH2 written pitch 740.520 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=12.055760s (sample 531659): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=12.055760s (sample 531659): CH2 written pitch 740.520 Hz; trigger true, length enabled false
  await sleepSamples(1476, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=12.089229s (sample 533135): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(4432, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=12.189728s (sample 537567): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x42); // t=12.189728s (sample 537567): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=12.189751s (sample 537568): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x0d, 0x42); // t=12.190023s (sample 537580): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=12.190045s (sample 537581): CH3 written pitch 146.942 Hz; trigger false, length enabled false
  await sleepSamples(1460, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=12.223152s (sample 539041): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=12.223197s (sample 539043): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=12.223197s (sample 539043): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(2953, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=12.290159s (sample 541996): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(2953, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=12.357120s (sample 544949): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x59); // t=12.357143s (sample 544950): CH2 written pitch 784.862 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=12.357143s (sample 544950): CH2 written pitch 784.862 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=12.357460s (sample 544964): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=12.357483s (sample 544965): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=12.357483s (sample 544965): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 784.8622754491018); // t=12.357755s (sample 544977): CH2 written pitch 784.862 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=12.357800s (sample 544979): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=12.357800s (sample 544979): CH2 written pitch 784.862 Hz; trigger true, length enabled false
  await sleepSamples(708, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=12.373855s (sample 545687): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=12.373900s (sample 545689): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=12.373900s (sample 545689): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x0d, 0x42); // t=12.390590s (sample 546425): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=12.390612s (sample 546426): CH3 written pitch 146.942 Hz; trigger false, length enabled false
  await sleepSamples(4431, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=12.491088s (sample 550857): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=12.524603s (sample 552335): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x72); // t=12.524603s (sample 552335): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=12.524626s (sample 552336): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=12.524898s (sample 552348): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=12.524943s (sample 552350): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=12.524943s (sample 552350): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2943, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=12.591678s (sample 555293): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(4424, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=12.691995s (sample 559717): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x4f); // t=12.692018s (sample 559718): CH2 written pitch 740.520 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=12.692018s (sample 559718): CH2 written pitch 740.520 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=12.692222s (sample 559727): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=12.692245s (sample 559728): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=12.692245s (sample 559728): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=12.692562s (sample 559742): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(712, 44100);
  gb.writeRegister(0x08, 0x4f); // t=12.708707s (sample 560454): CH2 written pitch 740.520 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=12.708730s (sample 560455): CH2 written pitch 740.520 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=12.708753s (sample 560456): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=12.708776s (sample 560457): CH2 written pitch 740.520 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=12.725465s (sample 561193): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=12.725510s (sample 561195): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=12.725510s (sample 561195): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=12.792449s (sample 564147): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(3694, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=12.876213s (sample 567841): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=12.876236s (sample 567842): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=12.876236s (sample 567842): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x42); // t=12.876508s (sample 567854): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=12.876531s (sample 567855): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=12.876553s (sample 567856): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=12.876576s (sample 567857): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=12.892925s (sample 568578): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(4437, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=12.993537s (sample 573015): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(2208, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=13.043605s (sample 575223): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x39); // t=13.043628s (sample 575224): CH2 written pitch 658.653 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=13.043651s (sample 575225): CH2 written pitch 658.653 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.setPan(0, false, true); // t=13.043855s (sample 575234): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=13.044082s (sample 575244): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=13.044104s (sample 575245): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=13.044104s (sample 575245): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(716, 44100);
  gb.pulse.setFrequency(1, 658.6532663316583); // t=13.060340s (sample 575961): CH2 written pitch 658.653 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=13.060385s (sample 575963): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=13.060385s (sample 575963): CH2 written pitch 658.653 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x03, 0xd6); // t=13.077075s (sample 576699): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=13.077098s (sample 576700): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=13.077120s (sample 576701): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=13.077143s (sample 576702): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(744, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=13.094014s (sample 577446): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(4423, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=13.194308s (sample 581869): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=13.211088s (sample 582609): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=13.211111s (sample 582610): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=13.211111s (sample 582610): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=13.227778s (sample 583345): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=13.227823s (sample 583347): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=13.227823s (sample 583347): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2953, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=13.294785s (sample 586300): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(3691, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=13.378481s (sample 589991): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x59); // t=13.378503s (sample 589992): CH2 written pitch 784.862 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=13.378526s (sample 589993): CH2 written pitch 784.862 Hz; trigger true, length enabled false
  await sleepSamples(8, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=13.378707s (sample 590001): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=13.378730s (sample 590002): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=13.378753s (sample 590003): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=13.379025s (sample 590015): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=13.379070s (sample 590017): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=13.379070s (sample 590017): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(712, 44100);
  gb.writeRegister(0x0d, 0x42); // t=13.395215s (sample 590729): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=13.395238s (sample 590730): CH3 written pitch 146.942 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 784.8622754491018); // t=13.411950s (sample 591467): CH2 written pitch 784.862 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=13.411995s (sample 591469): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=13.411995s (sample 591469): CH2 written pitch 784.862 Hz; trigger true, length enabled false
  await sleepSamples(3699, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=13.495873s (sample 595168): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(2947, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=13.562698s (sample 598115): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=13.562721s (sample 598116): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=13.562744s (sample 598117): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(734, 44100);
  gb.writeRegister(0x03, 0x42); // t=13.579388s (sample 598851): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=13.579410s (sample 598852): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=13.579433s (sample 598853): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=13.579456s (sample 598854): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=13.596145s (sample 599590): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.writeRegister(0x0d, 0x43); // t=13.696621s (sample 604021): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=13.696644s (sample 604022): CH3 written pitch 147.272 Hz; trigger false, length enabled false
  await sleepSamples(1476, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=13.730113s (sample 605498): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x4f); // t=13.730136s (sample 605499): CH2 written pitch 740.520 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=13.730136s (sample 605499): CH2 written pitch 740.520 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=13.730454s (sample 605513): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0xd6); // t=13.730454s (sample 605513): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=13.730476s (sample 605514): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(7, 44100);
  gb.wave.setLevel(0.5); // t=13.730635s (sample 605521): CH3 output level 50%
  await sleepSamples(1, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=13.730658s (sample 605522): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(10, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=13.730884s (sample 605532): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=13.730930s (sample 605534): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=13.730930s (sample 605534): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(702, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=13.746848s (sample 606236): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 740.5197740112994); // t=13.763583s (sample 606974): CH2 written pitch 740.520 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=13.763628s (sample 606976): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=13.763628s (sample 606976): CH2 written pitch 740.520 Hz; trigger true, length enabled false
  await sleepSamples(5907, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=13.897574s (sample 612883): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=13.897596s (sample 612884): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=13.897619s (sample 612885): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1473, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=13.931020s (sample 614358): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=13.931066s (sample 614360): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=13.931066s (sample 614360): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(5907, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=14.065011s (sample 620267): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=14.065034s (sample 620268): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=14.065057s (sample 620269): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(734, 44100);
  gb.writeRegister(0x03, 0x9e); // t=14.081701s (sample 621003): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=14.081723s (sample 621004): CH1 written pitch 370.260 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=14.081746s (sample 621005): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=14.081769s (sample 621006): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(7384, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=14.249206s (sample 628390): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=14.249229s (sample 628391): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=14.249229s (sample 628391): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.wave.setFrequency(131.072); // t=14.249524s (sample 628404): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(722, 44100);
  gb.pulse.setFrequency(1, 744.7272727272727); // t=14.265896s (sample 629126): CH2 written pitch 744.727 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=14.265941s (sample 629128): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=14.265941s (sample 629128): CH2 written pitch 744.727 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x03, 0x42); // t=14.282630s (sample 629864): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=14.282653s (sample 629865): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=14.282676s (sample 629866): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=14.282676s (sample 629866): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1475, 44100);
  gb.pulse.setFrequency(1, 748.9828571428571); // t=14.316122s (sample 631341): CH2 written pitch 748.983 Hz; no retrigger
  await sleepSamples(1484, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=14.349773s (sample 632825): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(731, 44100);
  gb.pulse.setFrequency(1, 744.7272727272727); // t=14.366349s (sample 633556): CH2 written pitch 744.727 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=14.416599s (sample 635772): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x21); // t=14.416621s (sample 635773): CH2 written pitch 587.767 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=14.416621s (sample 635773): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(10, 44100);
  gb.setPan(0, true, true); // t=14.416848s (sample 635783): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=14.417075s (sample 635793): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=14.417098s (sample 635794): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=14.417098s (sample 635794): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=14.417370s (sample 635806): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=14.417415s (sample 635808): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=14.417415s (sample 635808): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(702, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=14.433333s (sample 636510): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=14.433379s (sample 636512): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=14.433379s (sample 636512): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(738, 44100);
  gb.wave.setFrequency(131.072); // t=14.450113s (sample 637250): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(4429, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=14.550544s (sample 641679): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(1479, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=14.584082s (sample 643158): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=14.584104s (sample 643159): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=14.584104s (sample 643159): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x72); // t=14.584376s (sample 643171): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=14.584399s (sample 643172): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=14.584422s (sample 643173): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=14.584444s (sample 643174): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2943, 44100);
  gb.wave.setFrequency(131.072); // t=14.651179s (sample 646117): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(4425, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=14.751519s (sample 650542): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=14.751542s (sample 650543): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=14.751542s (sample 650543): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=14.751837s (sample 650556): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(1460, 44100);
  gb.writeRegister(0x03, 0x9e); // t=14.784943s (sample 652016): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=14.784966s (sample 652017): CH1 written pitch 370.260 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=14.784989s (sample 652018): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=14.785011s (sample 652019): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.wave.setFrequency(131.072); // t=14.851950s (sample 654971): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(2952, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=14.918889s (sample 657923): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=14.918934s (sample 657925): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=14.918934s (sample 657925): CH2 written pitch 590.414 Hz; trigger true, length enabled false
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=14.935692s (sample 658664): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=14.935714s (sample 658665): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=14.935714s (sample 658665): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=14.936009s (sample 658678): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=14.936054s (sample 658680): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=14.936054s (sample 658680): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=14.952404s (sample 659401): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.writeRegister(0x08, 0x23); // t=14.969116s (sample 660138): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=14.969138s (sample 660139): CH2 written pitch 593.086 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=15.019365s (sample 662354): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.wave.setFrequency(131.072); // t=15.052880s (sample 663832): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=15.069592s (sample 664569): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1484, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=15.103243s (sample 666053): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=15.103265s (sample 666054): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=15.103265s (sample 666054): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(731, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=15.119841s (sample 666785): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=15.136576s (sample 667523): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=15.136621s (sample 667525): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=15.136621s (sample 667525): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(743, 44100);
  gb.writeRegister(0x0d, 0x0b); // t=15.153469s (sample 668268): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=15.153492s (sample 668269): CH3 written pitch 130.810 Hz; trigger false, length enabled false
  await sleepSamples(730, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=15.170045s (sample 668999): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(2222, 44100);
  gb.writeRegister(0x08, 0x22); // t=15.220431s (sample 671221): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=15.220454s (sample 671222): CH2 written pitch 590.414 Hz; trigger false, length enabled false
  await sleepSamples(1471, 44100);
  gb.wave.setFrequency(131.072); // t=15.253810s (sample 672693): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=15.270567s (sample 673432): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=15.270590s (sample 673433): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=15.270590s (sample 673433): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x08, 0x21); // t=15.270862s (sample 673445): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=15.270884s (sample 673446): CH2 written pitch 587.767 Hz; trigger false, length enabled false
  await sleepSamples(722, 44100);
  gb.writeRegister(0x03, 0x72); // t=15.287256s (sample 674168): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=15.287279s (sample 674169): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=15.287302s (sample 674170): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=15.287324s (sample 674171): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1482, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=15.320930s (sample 675653): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1469, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=15.354240s (sample 677122): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=15.370975s (sample 677860): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=15.421202s (sample 680075): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=15.438005s (sample 680816): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=15.438027s (sample 680817): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=15.438027s (sample 680817): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=15.438322s (sample 680830): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=15.438367s (sample 680832): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=15.438367s (sample 680832): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(722, 44100);
  gb.wave.setFrequency(131.072); // t=15.454739s (sample 681554): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(736, 44100);
  gb.writeRegister(0x08, 0x21); // t=15.471429s (sample 682290): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=15.471451s (sample 682291): CH2 written pitch 587.767 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0x22); // t=15.521678s (sample 684506): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=15.521701s (sample 684507): CH2 written pitch 590.414 Hz; trigger false, length enabled false
  await sleepSamples(1483, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=15.555329s (sample 685990): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(731, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=15.571905s (sample 686721): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(2218, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=15.622200s (sample 688939): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x42); // t=15.622200s (sample 688939): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=15.622222s (sample 688940): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=15.622494s (sample 688952): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(723, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=15.638889s (sample 689675): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=15.638934s (sample 689677): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=15.638934s (sample 689677): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.writeRegister(0x0d, 0x0c); // t=15.655646s (sample 690414): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=15.655669s (sample 690415): CH3 written pitch 131.072 Hz; trigger false, length enabled false
  await sleepSamples(743, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=15.672517s (sample 691158): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=15.722766s (sample 693374): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1470, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=15.756100s (sample 694844): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=15.772834s (sample 695582): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(742, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=15.789660s (sample 696324): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0xd6); // t=15.789683s (sample 696325): CH2 written pitch 3120.762 Hz; no retrigger
  gb.writeRegister(0x09, 0x86); // t=15.789683s (sample 696325): CH2 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(10, 44100);
  gb.setPan(0, true, false); // t=15.789909s (sample 696335): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=15.790136s (sample 696345): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=15.790159s (sample 696346): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=15.790159s (sample 696346): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0xd6); // t=15.790431s (sample 696358): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=15.790454s (sample 696359): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=15.790476s (sample 696360): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=15.790499s (sample 696361): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(1436, 44100);
  gb.pulse.setFrequency(1, 439.83892617449663); // t=15.823061s (sample 697797): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=15.823107s (sample 697799): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x86); // t=15.823107s (sample 697799): CH2 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(1476, 44100);
  gb.wave.setFrequency(131.072); // t=15.856576s (sample 699275): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(4432, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=15.957075s (sample 703707): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x72); // t=15.957075s (sample 703707): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=15.957098s (sample 703708): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x0d, 0x0b); // t=15.957370s (sample 703720): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=15.957392s (sample 703721): CH3 written pitch 130.810 Hz; trigger false, length enabled false
  await sleepSamples(1460, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=15.990499s (sample 705181): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=15.990544s (sample 705183): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=15.990544s (sample 705183): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2953, 44100);
  gb.wave.setFrequency(131.072); // t=16.057506s (sample 708136): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(2955, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=16.124512s (sample 711091): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x9e); // t=16.124512s (sample 711091): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=16.124535s (sample 711092): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=16.141202s (sample 711827): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=16.141247s (sample 711829): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=16.141247s (sample 711829): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x0d, 0x0b); // t=16.157937s (sample 712565): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=16.157959s (sample 712566): CH3 written pitch 130.810 Hz; trigger false, length enabled false
  await sleepSamples(4431, 44100);
  gb.wave.setFrequency(131.072); // t=16.258435s (sample 716997): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=16.308685s (sample 719213): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=16.308707s (sample 719214): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=16.308707s (sample 719214): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=16.325374s (sample 719949): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=16.325420s (sample 719951): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x86); // t=16.325420s (sample 719951): CH2 written pitch 441.320 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x03, 0x42); // t=16.342109s (sample 720687): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=16.342132s (sample 720688): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=16.342154s (sample 720689): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=16.342177s (sample 720690): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(743, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=16.359025s (sample 721433): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(731, 44100);
  gb.pulse.setFrequency(1, 442.81081081081084); // t=16.375601s (sample 722164): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=16.425828s (sample 724379): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.writeRegister(0x0d, 0x0c); // t=16.459342s (sample 725857): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=16.459365s (sample 725858): CH3 written pitch 131.072 Hz; trigger false, length enabled false
  await sleepSamples(738, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=16.476100s (sample 726596): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0xe7); // t=16.476100s (sample 726596): CH2 written pitch 466.448 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x86); // t=16.476122s (sample 726597): CH2 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=16.476417s (sample 726610): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xe7); // t=16.476440s (sample 726611): CH1 written pitch 466.448 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=16.476440s (sample 726611): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(11, 44100);
  gb.wave.setLevel(0.5); // t=16.476689s (sample 726622): CH3 output level 50%
  gb.writeRegister(0x0d, 0xce); // t=16.476689s (sample 726622): CH3 written pitch 214.170 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=16.476712s (sample 726623): CH3 written pitch 116.612 Hz; trigger false, length enabled false
  await sleepSamples(10, 44100);
  gb.pulse.setFrequency(1, 466.44839857651243); // t=16.476939s (sample 726633): CH2 written pitch 466.448 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=16.476984s (sample 726635): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x86); // t=16.476984s (sample 726635): CH2 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(698, 44100);
  gb.pulse.setFrequency(0, 466.44839857651243); // t=16.492812s (sample 727333): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=16.492857s (sample 727335): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=16.492857s (sample 727335): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=16.509569s (sample 728072): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(5909, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=16.643560s (sample 733981): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=16.643583s (sample 733982): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=16.643583s (sample 733982): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x72); // t=16.643855s (sample 733994): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=16.643878s (sample 733995): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=16.643900s (sample 733996): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=16.643923s (sample 733997): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(7368, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=16.810998s (sample 741365): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x89); // t=16.811020s (sample 741366): CH1 written pitch 349.525 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=16.811020s (sample 741366): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(1473, 44100);
  gb.writeRegister(0x03, 0x89); // t=16.844422s (sample 742839): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=16.844444s (sample 742840): CH1 written pitch 349.525 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=16.844467s (sample 742841): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=16.844490s (sample 742842): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(5907, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=16.978435s (sample 748749): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=16.978458s (sample 748750): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=16.978458s (sample 748750): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 468.1142857142857); // t=16.978730s (sample 748762): CH2 written pitch 468.114 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=16.978776s (sample 748764): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x86); // t=16.978776s (sample 748764): CH2 written pitch 468.114 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=16.995125s (sample 749485): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=16.995170s (sample 749487): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=16.995170s (sample 749487): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=17.011882s (sample 750224): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 469.7921146953405); // t=17.028617s (sample 750962): CH2 written pitch 469.792 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 468.1142857142857); // t=17.078844s (sample 753177): CH2 written pitch 468.114 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=17.112336s (sample 754654): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 466.44839857651243); // t=17.129070s (sample 755392): CH2 written pitch 466.448 Hz; no retrigger
  await sleepSamples(1481, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=17.162653s (sample 756873): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x21); // t=17.162676s (sample 756874): CH2 written pitch 273.637 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=17.162676s (sample 756874): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.setPan(0, true, true); // t=17.162880s (sample 756883): channel routing (low nibble right, high nibble left)
  await sleepSamples(11, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=17.163129s (sample 756894): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0xe7); // t=17.163129s (sample 756894): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=17.163152s (sample 756895): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(712, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=17.179297s (sample 757607): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=17.179342s (sample 757609): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=17.179342s (sample 757609): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(0, 466.44839857651243); // t=17.196054s (sample 758346): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=17.196100s (sample 758348): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=17.196100s (sample 758348): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(744, 44100);
  gb.writeRegister(0x0d, 0xcf); // t=17.212971s (sample 759092): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=17.212993s (sample 759093): CH3 written pitch 116.820 Hz; trigger false, length enabled false
  await sleepSamples(4422, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=17.313265s (sample 763515): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=17.330045s (sample 764255): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=17.330068s (sample 764256): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=17.330091s (sample 764257): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(734, 44100);
  gb.writeRegister(0x03, 0x72); // t=17.346735s (sample 764991): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=17.346757s (sample 764992): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=17.346780s (sample 764993): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=17.346803s (sample 764994): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=17.413741s (sample 767946): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(3693, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=17.497483s (sample 771639): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x89); // t=17.497506s (sample 771640): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=17.497528s (sample 771641): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 349.5253333333333); // t=17.497800s (sample 771653): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=17.497846s (sample 771655): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=17.497846s (sample 771655): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=17.514195s (sample 772376): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(4438, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=17.614830s (sample 776814): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(2209, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=17.664921s (sample 779023): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=17.664943s (sample 779024): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=17.664966s (sample 779025): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(734, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=17.681610s (sample 779759): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=17.681655s (sample 779761): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=17.681655s (sample 779761): CH2 written pitch 590.414 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=17.698367s (sample 780498): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=17.698413s (sample 780500): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=17.698413s (sample 780500): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=17.715125s (sample 781237): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(744, 44100);
  gb.writeRegister(0x08, 0x23); // t=17.731995s (sample 781981): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=17.732018s (sample 781982): CH2 written pitch 593.086 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=17.782245s (sample 784197): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1471, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=17.815601s (sample 785668): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=17.832313s (sample 786405): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=17.849070s (sample 787144): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x39); // t=17.849093s (sample 787145): CH2 written pitch 658.653 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=17.849093s (sample 787145): CH2 written pitch 658.653 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=17.849410s (sample 787159): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xe7); // t=17.849433s (sample 787160): CH1 written pitch 466.448 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=17.849433s (sample 787160): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0xe7); // t=17.849705s (sample 787172): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=17.849728s (sample 787173): CH1 written pitch 466.448 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=17.849751s (sample 787174): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=17.849773s (sample 787175): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(1445, 44100);
  gb.pulse.setFrequency(1, 658.6532663316583); // t=17.882540s (sample 788620): CH2 written pitch 658.653 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=17.882585s (sample 788622): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=17.882585s (sample 788622): CH2 written pitch 658.653 Hz; trigger true, length enabled false
  await sleepSamples(1475, 44100);
  gb.writeRegister(0x0d, 0xce); // t=17.916032s (sample 790097): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=17.916054s (sample 790098): CH3 written pitch 116.612 Hz; trigger false, length enabled false
  await sleepSamples(4432, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=18.016553s (sample 794530): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=18.016576s (sample 794531): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=18.016576s (sample 794531): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=18.016893s (sample 794545): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(1459, 44100);
  gb.writeRegister(0x03, 0x72); // t=18.049977s (sample 796004): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=18.050000s (sample 796005): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=18.050023s (sample 796006): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=18.050023s (sample 796006): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=18.116961s (sample 798958): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(2956, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=18.183991s (sample 801914): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x89); // t=18.184014s (sample 801915): CH1 written pitch 349.525 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=18.184014s (sample 801915): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 349.5253333333333); // t=18.200680s (sample 802650): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=18.200726s (sample 802652): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=18.200726s (sample 802652): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.writeRegister(0x0d, 0xcf); // t=18.217438s (sample 803389): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=18.217460s (sample 803390): CH3 written pitch 116.820 Hz; trigger false, length enabled false
  await sleepSamples(4429, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=18.317891s (sample 807819): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1479, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=18.351429s (sample 809298): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=18.351451s (sample 809299): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=18.351451s (sample 809299): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x42); // t=18.351723s (sample 809311): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=18.351746s (sample 809312): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=18.351769s (sample 809313): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=18.351791s (sample 809314): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1458, 44100);
  gb.pulse.setFrequency(1, 661.979797979798); // t=18.384853s (sample 810772): CH2 written pitch 661.980 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=18.384898s (sample 810774): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=18.384898s (sample 810774): CH2 written pitch 661.980 Hz; trigger true, length enabled false
  await sleepSamples(1483, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=18.418526s (sample 812257): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(730, 44100);
  gb.pulse.setFrequency(1, 665.3401015228426); // t=18.435079s (sample 812987): CH2 written pitch 665.340 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0x3a); // t=18.485306s (sample 815202): CH2 written pitch 661.980 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=18.485329s (sample 815203): CH2 written pitch 661.980 Hz; trigger false, length enabled false
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=18.518821s (sample 816680): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=18.535578s (sample 817419): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x21); // t=18.535578s (sample 817419): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=18.535601s (sample 817420): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.setPan(0, false, true); // t=18.535805s (sample 817429): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=18.536032s (sample 817439): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xe7); // t=18.536054s (sample 817440): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=18.536077s (sample 817441): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=18.536349s (sample 817453): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=18.536372s (sample 817454): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=18.536395s (sample 817455): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(701, 44100);
  gb.pulse.setFrequency(0, 466.44839857651243); // t=18.552290s (sample 818156): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=18.552336s (sample 818158): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=18.552336s (sample 818158): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(2953, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=18.619297s (sample 821111): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(3693, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=18.703039s (sample 824804): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=18.703061s (sample 824805): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=18.703061s (sample 824805): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=18.703356s (sample 824818): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=18.703401s (sample 824820): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=18.703401s (sample 824820): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=18.719751s (sample 825541): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(4438, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=18.820385s (sample 829979): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(2209, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=18.870476s (sample 832188): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x89); // t=18.870499s (sample 832189): CH1 written pitch 349.525 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=18.870499s (sample 832189): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(1474, 44100);
  gb.pulse.setFrequency(0, 349.5253333333333); // t=18.903923s (sample 833663): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=18.903968s (sample 833665): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=18.903968s (sample 833665): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x0d, 0xce); // t=18.920658s (sample 834401): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=18.920680s (sample 834402): CH3 written pitch 116.612 Hz; trigger false, length enabled false
  await sleepSamples(4431, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=19.021156s (sample 838833): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=19.037914s (sample 839572): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=19.037937s (sample 839573): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=19.037937s (sample 839573): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x08, 0x22); // t=19.038209s (sample 839585): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=19.038231s (sample 839586): CH2 written pitch 590.414 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=19.038254s (sample 839587): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=19.038277s (sample 839588): CH2 written pitch 590.414 Hz; trigger true, length enabled false
  await sleepSamples(720, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=19.054603s (sample 840308): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=19.054649s (sample 840310): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=19.054649s (sample 840310): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1475, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=19.088095s (sample 841785): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=19.121587s (sample 843262): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=19.138322s (sample 844000): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=19.188549s (sample 846215): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=19.222063s (sample 847693): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x21); // t=19.222086s (sample 847694): CH2 written pitch 587.767 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=19.222086s (sample 847694): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=19.222404s (sample 847708): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=19.222426s (sample 847709): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=19.222426s (sample 847709): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(8, 44100);
  gb.wave.setLevel(0.5); // t=19.222608s (sample 847717): CH3 output level 50%
  gb.wave.setFrequency(109.95973154362416); // t=19.222608s (sample 847717): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(11, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=19.222857s (sample 847728): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(702, 44100);
  gb.writeRegister(0x08, 0x21); // t=19.238776s (sample 848430): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=19.238798s (sample 848431): CH2 written pitch 587.767 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=19.238821s (sample 848432): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=19.238844s (sample 848433): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=19.255533s (sample 849169): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=19.255578s (sample 849171): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=19.255578s (sample 849171): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(5908, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=19.389546s (sample 855079): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x42); // t=19.389546s (sample 855079): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=19.389569s (sample 855080): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=19.406236s (sample 855815): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=19.406281s (sample 855817): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=19.406281s (sample 855817): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(6646, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=19.556984s (sample 862463): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x72); // t=19.556984s (sample 862463): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=19.557007s (sample 862464): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=19.557279s (sample 862476): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=19.557324s (sample 862478): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=19.557324s (sample 862478): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(7369, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=19.724422s (sample 869847): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x42); // t=19.724422s (sample 869847): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=19.724444s (sample 869848): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x0d, 0xad); // t=19.724717s (sample 869860): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=19.724739s (sample 869861): CH3 written pitch 110.145 Hz; trigger false, length enabled false
  await sleepSamples(721, 44100);
  gb.writeRegister(0x08, 0x22); // t=19.741088s (sample 870582): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=19.741111s (sample 870583): CH2 written pitch 590.414 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=19.741134s (sample 870584): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=19.741156s (sample 870585): CH2 written pitch 590.414 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=19.757846s (sample 871321): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=19.757891s (sample 871323): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=19.757891s (sample 871323): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1482, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=19.791497s (sample 872805): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(1470, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=19.824830s (sample 874275): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(745, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=19.841723s (sample 875020): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2208, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=19.891791s (sample 877228): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(742, 44100);
  gb.setPan(0, true, true); // t=19.908617s (sample 877970): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=19.908844s (sample 877980): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=19.908866s (sample 877981): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=19.908866s (sample 877981): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0xd6); // t=19.909138s (sample 877993): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=19.909161s (sample 877994): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=19.909184s (sample 877995): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=19.909206s (sample 877996): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(710, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=19.925306s (sample 878706): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=19.942041s (sample 879444): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2214, 44100);
  gb.writeRegister(0x08, 0x23); // t=19.992245s (sample 881658): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=19.992268s (sample 881659): CH2 written pitch 593.086 Hz; trigger false, length enabled false
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=20.025760s (sample 883136): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=20.042494s (sample 883874): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1479, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=20.076032s (sample 885353): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=20.076054s (sample 885354): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=20.076054s (sample 885354): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=20.092721s (sample 886089): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.writeRegister(0x03, 0x42); // t=20.109456s (sample 886827): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=20.109478s (sample 886828): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=20.109501s (sample 886829): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=20.109524s (sample 886830): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(744, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=20.126395s (sample 887574): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(731, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=20.142971s (sample 888305): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2221, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=20.193333s (sample 890526): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(1471, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=20.226689s (sample 891997): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=20.243469s (sample 892737): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=20.243492s (sample 892738): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=20.243492s (sample 892738): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=20.243764s (sample 892750): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(723, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=20.260159s (sample 893473): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=20.260204s (sample 893475): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=20.260204s (sample 893475): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1482, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=20.293810s (sample 894957): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1471, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=20.327166s (sample 896428): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=20.343900s (sample 897166): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2214, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=20.394104s (sample 899380): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=20.410907s (sample 900121): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=20.410930s (sample 900122): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=20.410930s (sample 900122): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x42); // t=20.411202s (sample 900134): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=20.411224s (sample 900135): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=20.411247s (sample 900136): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=20.411270s (sample 900137): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(720, 44100);
  gb.writeRegister(0x0d, 0xac); // t=20.427596s (sample 900857): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=20.427619s (sample 900858): CH3 written pitch 109.960 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=20.444331s (sample 901595): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0x21); // t=20.494558s (sample 903810): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=20.494580s (sample 903811): CH2 written pitch 587.767 Hz; trigger false, length enabled false
  await sleepSamples(1485, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=20.528254s (sample 905296): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(730, 44100);
  gb.writeRegister(0x08, 0x22); // t=20.544807s (sample 906026): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=20.544830s (sample 906027): CH2 written pitch 590.414 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=20.595057s (sample 908242): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x14); // t=20.595079s (sample 908243): CH2 written pitch 555.390 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=20.595079s (sample 908243): CH2 written pitch 555.390 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=20.595397s (sample 908257): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0xd6); // t=20.595397s (sample 908257): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=20.595420s (sample 908258): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 555.3898305084746); // t=20.595692s (sample 908270): CH2 written pitch 555.390 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=20.595737s (sample 908272): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=20.595737s (sample 908272): CH2 written pitch 555.390 Hz; trigger true, length enabled false
  await sleepSamples(707, 44100);
  gb.writeRegister(0x03, 0xd6); // t=20.611769s (sample 908979): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=20.611791s (sample 908980): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=20.611814s (sample 908981): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=20.611837s (sample 908982): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=20.628526s (sample 909718): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.writeRegister(0x0d, 0xad); // t=20.729002s (sample 914149): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=20.729025s (sample 914150): CH3 written pitch 110.145 Hz; trigger false, length enabled false
  await sleepSamples(1477, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=20.762517s (sample 915627): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x27); // t=20.762540s (sample 915628): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=20.762562s (sample 915629): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 277.107822410148); // t=20.762834s (sample 915641): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=20.762880s (sample 915643): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=20.762880s (sample 915643): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(2936, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=20.829456s (sample 918579): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(4432, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=20.929955s (sample 923011): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=20.929977s (sample 923012): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=20.930000s (sample 923013): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=20.930295s (sample 923026): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(1460, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=20.963401s (sample 924486): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=20.963447s (sample 924488): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=20.963447s (sample 924488): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=21.030385s (sample 927440): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(2955, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=21.097392s (sample 930395): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x27); // t=21.097415s (sample 930396): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=21.097438s (sample 930397): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 557.7531914893617); // t=21.097710s (sample 930409): CH2 written pitch 557.753 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=21.097732s (sample 930410): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=21.097755s (sample 930411): CH2 written pitch 557.753 Hz; trigger true, length enabled false
  await sleepSamples(720, 44100);
  gb.writeRegister(0x03, 0x27); // t=21.114082s (sample 931131): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=21.114104s (sample 931132): CH1 written pitch 277.108 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=21.114127s (sample 931133): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=21.114150s (sample 931134): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=21.130862s (sample 931871): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 560.1367521367522); // t=21.147574s (sample 932608): CH2 written pitch 560.137 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 557.7531914893617); // t=21.197800s (sample 934823): CH2 written pitch 557.753 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=21.231315s (sample 936301): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.writeRegister(0x08, 0x14); // t=21.248027s (sample 937038): CH2 written pitch 555.390 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=21.248050s (sample 937039): CH2 written pitch 555.390 Hz; trigger false, length enabled false
  await sleepSamples(741, 44100);
  gb.setPan(0, true, false); // t=21.264853s (sample 937780): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=21.265079s (sample 937790): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=21.265102s (sample 937791): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=21.265102s (sample 937791): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=21.265397s (sample 937804): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=21.265442s (sample 937806): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=21.265442s (sample 937806): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(1448, 44100);
  gb.writeRegister(0x08, 0x15); // t=21.298277s (sample 939254): CH2 written pitch 557.753 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=21.298299s (sample 939255): CH2 written pitch 557.753 Hz; trigger false, length enabled false
  await sleepSamples(1484, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=21.331950s (sample 940739): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(730, 44100);
  gb.pulse.setFrequency(1, 560.1367521367522); // t=21.348503s (sample 941469): CH2 written pitch 560.137 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 557.7531914893617); // t=21.398730s (sample 943684): CH2 written pitch 557.753 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.writeRegister(0x0d, 0xac); // t=21.432222s (sample 945161): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=21.432245s (sample 945162): CH3 written pitch 109.960 Hz; trigger false, length enabled false
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=21.449025s (sample 945902): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x27); // t=21.449048s (sample 945903): CH1 written pitch 277.108 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=21.449048s (sample 945903): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 555.3898305084746); // t=21.449320s (sample 945915): CH2 written pitch 555.390 Hz; no retrigger
  await sleepSamples(723, 44100);
  gb.pulse.setFrequency(0, 277.107822410148); // t=21.465714s (sample 946638): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=21.465760s (sample 946640): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=21.465760s (sample 946640): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(1482, 44100);
  gb.pulse.setFrequency(1, 557.7531914893617); // t=21.499365s (sample 948122): CH2 written pitch 557.753 Hz; no retrigger
  await sleepSamples(1471, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=21.532721s (sample 949593): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 560.1367521367522); // t=21.549433s (sample 950330): CH2 written pitch 560.137 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 557.7531914893617); // t=21.599660s (sample 952545): CH2 written pitch 557.753 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=21.616463s (sample 953286): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=21.616485s (sample 953287): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=21.616485s (sample 953287): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x72); // t=21.616757s (sample 953299): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=21.616780s (sample 953300): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=21.616803s (sample 953301): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=21.616825s (sample 953302): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(720, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=21.633152s (sample 954022): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 555.3898305084746); // t=21.649887s (sample 954760): CH2 written pitch 555.390 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 557.7531914893617); // t=21.700136s (sample 956976): CH2 written pitch 557.753 Hz; no retrigger
  await sleepSamples(1484, 44100);
  gb.writeRegister(0x0d, 0xad); // t=21.733787s (sample 958460): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=21.733810s (sample 958461): CH3 written pitch 110.145 Hz; trigger false, length enabled false
  await sleepSamples(729, 44100);
  gb.writeRegister(0x08, 0x16); // t=21.750340s (sample 959190): CH2 written pitch 560.137 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=21.750363s (sample 959191): CH2 written pitch 560.137 Hz; trigger false, length enabled false
  await sleepSamples(1479, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=21.783900s (sample 960670): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x27); // t=21.783923s (sample 960671): CH1 written pitch 277.108 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=21.783923s (sample 960671): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(1, 557.7531914893617); // t=21.800590s (sample 961406): CH2 written pitch 557.753 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.writeRegister(0x03, 0x27); // t=21.817324s (sample 962144): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=21.817347s (sample 962145): CH1 written pitch 277.108 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=21.817370s (sample 962146): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=21.817370s (sample 962146): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=21.834082s (sample 962883): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(745, 44100);
  gb.pulse.setFrequency(1, 555.3898305084746); // t=21.850975s (sample 963628): CH2 written pitch 555.390 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 557.7531914893617); // t=21.901224s (sample 965844): CH2 written pitch 557.753 Hz; no retrigger
  await sleepSamples(1470, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=21.934558s (sample 967314): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=21.951293s (sample 968052): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x4f); // t=21.951315s (sample 968053): CH2 written pitch 740.520 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=21.951315s (sample 968053): CH2 written pitch 740.520 Hz; trigger true, length enabled false
  await sleepSamples(19, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=21.951746s (sample 968072): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=21.951769s (sample 968073): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=21.951769s (sample 968073): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(15, 44100);
  gb.wave.setLevel(0.5); // t=21.952109s (sample 968088): CH3 output level 50%
  gb.wave.setFrequency(146.94170403587444); // t=21.952109s (sample 968088): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(10, 44100);
  gb.pulse.setFrequency(1, 740.5197740112994); // t=21.952336s (sample 968098): CH2 written pitch 740.520 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=21.952381s (sample 968100): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=21.952381s (sample 968100): CH2 written pitch 740.520 Hz; trigger true, length enabled false
  await sleepSamples(690, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=21.968027s (sample 968790): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=21.968073s (sample 968792): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=21.968073s (sample 968792): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=21.984785s (sample 969529): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(6647, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=22.135510s (sample 976176): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=22.135533s (sample 976177): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=22.135533s (sample 976177): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1474, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=22.168957s (sample 977651): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=22.169002s (sample 977653): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=22.169002s (sample 977653): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(5907, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=22.302948s (sample 983560): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=22.302971s (sample 983561): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=22.302971s (sample 983561): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.writeRegister(0x03, 0x9e); // t=22.319637s (sample 984296): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=22.319660s (sample 984297): CH1 written pitch 370.260 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=22.319683s (sample 984298): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=22.319683s (sample 984298): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(5905, 44100);
  gb.pulse.setFrequency(1, 744.7272727272727); // t=22.453583s (sample 990203): CH2 written pitch 744.727 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=22.453628s (sample 990205): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=22.453628s (sample 990205): CH2 written pitch 744.727 Hz; trigger true, length enabled false
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=22.470385s (sample 990944): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=22.470408s (sample 990945): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=22.470408s (sample 990945): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=22.470703s (sample 990958): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=22.470748s (sample 990960): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=22.470748s (sample 990960): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=22.487098s (sample 991681): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.writeRegister(0x08, 0x51); // t=22.503810s (sample 992418): CH2 written pitch 748.983 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=22.503832s (sample 992419): CH2 written pitch 748.983 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 744.7272727272727); // t=22.554059s (sample 994634): CH2 written pitch 744.727 Hz; no retrigger
  await sleepSamples(1484, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=22.587710s (sample 996118): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(731, 44100);
  gb.pulse.setFrequency(1, 740.5197740112994); // t=22.604286s (sample 996849): CH2 written pitch 740.520 Hz; no retrigger
  await sleepSamples(1480, 44100);
  gb.setPan(0, true, true); // t=22.637846s (sample 998329): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=22.638073s (sample 998339): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=22.638095s (sample 998340): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=22.638095s (sample 998340): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(725, 44100);
  gb.pulse.setFrequency(1, 744.7272727272727); // t=22.654535s (sample 999065): CH2 written pitch 744.727 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=22.671270s (sample 999803): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=22.671315s (sample 999805): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=22.671315s (sample 999805): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.writeRegister(0x0d, 0x43); // t=22.688027s (sample 1000542): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=22.688050s (sample 1000543): CH3 written pitch 147.272 Hz; trigger false, length enabled false
  await sleepSamples(743, 44100);
  gb.pulse.setFrequency(1, 748.9828571428571); // t=22.704898s (sample 1001286): CH2 written pitch 748.983 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0x50); // t=22.755125s (sample 1003501): CH2 written pitch 744.727 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=22.755147s (sample 1003502): CH2 written pitch 744.727 Hz; trigger false, length enabled false
  await sleepSamples(1470, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=22.788481s (sample 1004972): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 740.5197740112994); // t=22.805215s (sample 1005710): CH2 written pitch 740.520 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=22.822018s (sample 1006451): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x72); // t=22.822018s (sample 1006451): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=22.822041s (sample 1006452): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=22.822313s (sample 1006464): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=22.822358s (sample 1006466): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=22.822358s (sample 1006466): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1460, 44100);
  gb.pulse.setFrequency(1, 744.7272727272727); // t=22.855465s (sample 1007926): CH2 written pitch 744.727 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=22.888957s (sample 1009403): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 748.9828571428571); // t=22.905669s (sample 1010140): CH2 written pitch 748.983 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 744.7272727272727); // t=22.955896s (sample 1012355): CH2 written pitch 744.727 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=22.989410s (sample 1013833): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x4f); // t=22.989433s (sample 1013834): CH2 written pitch 740.520 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=22.989433s (sample 1013834): CH2 written pitch 740.520 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=22.989637s (sample 1013843): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=22.989660s (sample 1013844): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=22.989660s (sample 1013844): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=22.989955s (sample 1013857): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(713, 44100);
  gb.writeRegister(0x08, 0x4f); // t=23.006122s (sample 1014570): CH2 written pitch 740.520 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=23.006145s (sample 1014571): CH2 written pitch 740.520 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=23.006168s (sample 1014572): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=23.006190s (sample 1014573): CH2 written pitch 740.520 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=23.022880s (sample 1015309): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=23.022925s (sample 1015311): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=23.022925s (sample 1015311): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(2953, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=23.089887s (sample 1018264): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(2955, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=23.156893s (sample 1021219): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x42); // t=23.156893s (sample 1021219): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=23.156916s (sample 1021220): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=23.173583s (sample 1021955): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=23.173628s (sample 1021957): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=23.173628s (sample 1021957): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x0d, 0x42); // t=23.190317s (sample 1022693): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=23.190340s (sample 1022694): CH3 written pitch 146.942 Hz; trigger false, length enabled false
  await sleepSamples(4431, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=23.290816s (sample 1027125): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(1476, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=23.324286s (sample 1028601): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x59); // t=23.324308s (sample 1028602): CH2 written pitch 784.862 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=23.324308s (sample 1028602): CH2 written pitch 784.862 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=23.324626s (sample 1028616): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=23.324649s (sample 1028617): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=23.324649s (sample 1028617): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0xd6); // t=23.324921s (sample 1028629): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=23.324943s (sample 1028630): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=23.324966s (sample 1028631): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=23.324989s (sample 1028632): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(1445, 44100);
  gb.pulse.setFrequency(1, 784.8622754491018); // t=23.357755s (sample 1030077): CH2 written pitch 784.862 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=23.357800s (sample 1030079): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=23.357800s (sample 1030079): CH2 written pitch 784.862 Hz; trigger true, length enabled false
  await sleepSamples(1482, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=23.391406s (sample 1031561): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(4425, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=23.491746s (sample 1035986): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=23.508503s (sample 1036725): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=23.508526s (sample 1036726): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=23.508526s (sample 1036726): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=23.525193s (sample 1037461): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=23.525238s (sample 1037463): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=23.525238s (sample 1037463): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=23.592177s (sample 1040415): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(3693, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=23.675918s (sample 1044108): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x4f); // t=23.675918s (sample 1044108): CH2 written pitch 740.520 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=23.675941s (sample 1044109): CH2 written pitch 740.520 Hz; trigger true, length enabled false
  await sleepSamples(8, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=23.676122s (sample 1044117): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=23.676145s (sample 1044118): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=23.676168s (sample 1044119): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=23.676440s (sample 1044131): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=23.676485s (sample 1044133): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=23.676485s (sample 1044133): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(713, 44100);
  gb.writeRegister(0x0d, 0x43); // t=23.692653s (sample 1044846): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=23.692676s (sample 1044847): CH3 written pitch 147.272 Hz; trigger false, length enabled false
  await sleepSamples(736, 44100);
  gb.pulse.setFrequency(1, 740.5197740112994); // t=23.709365s (sample 1045583): CH2 written pitch 740.520 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=23.709410s (sample 1045585): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=23.709410s (sample 1045585): CH2 written pitch 740.520 Hz; trigger true, length enabled false
  await sleepSamples(3698, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=23.793265s (sample 1049283): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(2210, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=23.843379s (sample 1051493): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=23.843401s (sample 1051494): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=23.843401s (sample 1051494): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1473, 44100);
  gb.writeRegister(0x03, 0x42); // t=23.876803s (sample 1052967): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=23.876825s (sample 1052968): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=23.876848s (sample 1052969): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=23.876871s (sample 1052970): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(744, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=23.893741s (sample 1053714): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(4423, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=23.994036s (sample 1058137): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=24.010794s (sample 1058876): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x39); // t=24.010794s (sample 1058876): CH2 written pitch 658.653 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=24.010816s (sample 1058877): CH2 written pitch 658.653 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.setPan(0, false, true); // t=24.011020s (sample 1058886): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=24.011247s (sample 1058896): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=24.011270s (sample 1058897): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=24.011270s (sample 1058897): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x08, 0x39); // t=24.011542s (sample 1058909): CH2 written pitch 658.653 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=24.011565s (sample 1058910): CH2 written pitch 658.653 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=24.011587s (sample 1058911): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=24.011610s (sample 1058912): CH2 written pitch 658.653 Hz; trigger true, length enabled false
  await sleepSamples(701, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=24.027506s (sample 1059613): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=24.027551s (sample 1059615): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=24.027551s (sample 1059615): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(2953, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=24.094512s (sample 1062568): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=24.194989s (sample 1066999): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=24.195011s (sample 1067000): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=24.195034s (sample 1067001): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=24.195306s (sample 1067013): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(1461, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=24.228435s (sample 1068474): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=24.228481s (sample 1068476): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=24.228481s (sample 1068476): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2960, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=24.295601s (sample 1071436): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(2946, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=24.362404s (sample 1074382): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x59); // t=24.362426s (sample 1074383): CH2 written pitch 784.862 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=24.362426s (sample 1074383): CH2 written pitch 784.862 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=24.362630s (sample 1074392): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=24.362653s (sample 1074393): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=24.362653s (sample 1074393): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 784.8622754491018); // t=24.362925s (sample 1074405): CH2 written pitch 784.862 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=24.362971s (sample 1074407): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=24.362971s (sample 1074407): CH2 written pitch 784.862 Hz; trigger true, length enabled false
  await sleepSamples(712, 44100);
  gb.writeRegister(0x03, 0x9e); // t=24.379116s (sample 1075119): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=24.379138s (sample 1075120): CH1 written pitch 370.260 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=24.379161s (sample 1075121): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=24.379184s (sample 1075122): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=24.395873s (sample 1075858): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.writeRegister(0x0d, 0x43); // t=24.496349s (sample 1080289): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=24.496372s (sample 1080290): CH3 written pitch 147.272 Hz; trigger false, length enabled false
  await sleepSamples(1477, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=24.529864s (sample 1081767): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=24.529887s (sample 1081768): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=24.529909s (sample 1081769): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=24.530181s (sample 1081781): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=24.530227s (sample 1081783): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=24.530227s (sample 1081783): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(2936, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=24.596803s (sample 1084719): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=24.697279s (sample 1089150): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x4f); // t=24.697302s (sample 1089151): CH2 written pitch 740.520 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=24.697302s (sample 1089151): CH2 written pitch 740.520 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=24.697619s (sample 1089165): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0xd6); // t=24.697619s (sample 1089165): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=24.697642s (sample 1089166): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(7, 44100);
  gb.wave.setLevel(0.5); // t=24.697800s (sample 1089173): CH3 output level 50%
  await sleepSamples(1, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=24.697823s (sample 1089174): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(11, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=24.698073s (sample 1089185): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(702, 44100);
  gb.pulse.setFrequency(1, 740.5197740112994); // t=24.713991s (sample 1089887): CH2 written pitch 740.520 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=24.714036s (sample 1089889): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=24.714036s (sample 1089889): CH2 written pitch 740.520 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=24.730748s (sample 1090626): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=24.730794s (sample 1090628): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=24.730794s (sample 1090628): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(6646, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=24.881497s (sample 1097274): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=24.881519s (sample 1097275): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=24.881519s (sample 1097275): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x72); // t=24.881791s (sample 1097287): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=24.881814s (sample 1097288): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=24.881837s (sample 1097289): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=24.881859s (sample 1097290): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(7368, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=25.048934s (sample 1104658): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=25.048957s (sample 1104659): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=25.048957s (sample 1104659): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(1473, 44100);
  gb.writeRegister(0x03, 0x9e); // t=25.082358s (sample 1106132): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=25.082381s (sample 1106133): CH1 written pitch 370.260 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=25.082404s (sample 1106134): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=25.082404s (sample 1106134): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(5167, 44100);
  gb.writeRegister(0x0d, 0x0c); // t=25.199569s (sample 1111301): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=25.199592s (sample 1111302): CH3 written pitch 131.072 Hz; trigger false, length enabled false
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=25.216372s (sample 1112042): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=25.216395s (sample 1112043): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=25.216395s (sample 1112043): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 744.7272727272727); // t=25.216667s (sample 1112055): CH2 written pitch 744.727 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=25.216712s (sample 1112057): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=25.216712s (sample 1112057): CH2 written pitch 744.727 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=25.233061s (sample 1112778): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=25.233107s (sample 1112780): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=25.233107s (sample 1112780): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1481, 44100);
  gb.writeRegister(0x08, 0x51); // t=25.266689s (sample 1114261): CH2 written pitch 748.983 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=25.266712s (sample 1114262): CH2 written pitch 748.983 Hz; trigger false, length enabled false
  await sleepSamples(1470, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=25.300045s (sample 1115732): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 744.7272727272727); // t=25.316780s (sample 1116470): CH2 written pitch 744.727 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 740.5197740112994); // t=25.367007s (sample 1118685): CH2 written pitch 740.520 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=25.383764s (sample 1119424): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x21); // t=25.383787s (sample 1119425): CH2 written pitch 587.767 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=25.383787s (sample 1119425): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(10, 44100);
  gb.setPan(0, true, true); // t=25.384014s (sample 1119435): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=25.384240s (sample 1119445): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=25.384263s (sample 1119446): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=25.384263s (sample 1119446): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0xd6); // t=25.384535s (sample 1119458): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=25.384558s (sample 1119459): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=25.384580s (sample 1119460): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=25.384603s (sample 1119461): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(702, 44100);
  gb.wave.setFrequency(131.072); // t=25.400522s (sample 1120163): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=25.417234s (sample 1120900): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=25.417279s (sample 1120902): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=25.417279s (sample 1120902): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(3698, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=25.501134s (sample 1124600): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(2210, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=25.551247s (sample 1126810): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=25.551270s (sample 1126811): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=25.551270s (sample 1126811): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1473, 44100);
  gb.writeRegister(0x03, 0x72); // t=25.584671s (sample 1128284): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=25.584694s (sample 1128285): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=25.584717s (sample 1128286): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=25.584717s (sample 1128286): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(738, 44100);
  gb.wave.setFrequency(131.072); // t=25.601451s (sample 1129024): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(4429, 44100);
  gb.writeRegister(0x0d, 0x0b); // t=25.701882s (sample 1133453): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=25.701905s (sample 1133454): CH3 written pitch 130.810 Hz; trigger false, length enabled false
  await sleepSamples(1478, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=25.735420s (sample 1134932): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=25.735442s (sample 1134933): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=25.735442s (sample 1134933): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=25.735737s (sample 1134946): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=25.735782s (sample 1134948): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=25.735782s (sample 1134948): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(2937, 44100);
  gb.wave.setFrequency(131.072); // t=25.802381s (sample 1137885): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=25.902857s (sample 1142316): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=25.902880s (sample 1142317): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=25.902880s (sample 1142317): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=25.903175s (sample 1142330): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(722, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=25.919546s (sample 1143052): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=25.919592s (sample 1143054): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=25.919592s (sample 1143054): CH2 written pitch 590.414 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=25.936304s (sample 1143791): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=25.936349s (sample 1143793): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=25.936349s (sample 1143793): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1474, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=25.969773s (sample 1145267): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.writeRegister(0x0d, 0x0c); // t=26.003288s (sample 1146745): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=26.003311s (sample 1146746): CH3 written pitch 131.072 Hz; trigger false, length enabled false
  await sleepSamples(743, 44100);
  gb.writeRegister(0x08, 0x22); // t=26.020159s (sample 1147489): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=26.020181s (sample 1147490): CH2 written pitch 590.414 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=26.070408s (sample 1149705): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=26.070431s (sample 1149706): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=26.070431s (sample 1149706): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=26.070703s (sample 1149718): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(718, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=26.086984s (sample 1150436): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=26.087029s (sample 1150438): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=26.087029s (sample 1150438): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=26.103741s (sample 1151175): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=26.120499s (sample 1151914): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2214, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=26.170703s (sample 1154128): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.writeRegister(0x0d, 0x0c); // t=26.204218s (sample 1155606): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=26.204240s (sample 1155607): CH3 written pitch 131.072 Hz; trigger false, length enabled false
  await sleepSamples(736, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=26.220930s (sample 1156343): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=26.237732s (sample 1157084): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=26.237755s (sample 1157085): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=26.237755s (sample 1157085): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=26.238050s (sample 1157098): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=26.238095s (sample 1157100): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=26.238095s (sample 1157100): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1458, 44100);
  gb.writeRegister(0x08, 0x21); // t=26.271156s (sample 1158558): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=26.271179s (sample 1158559): CH2 written pitch 587.767 Hz; trigger false, length enabled false
  await sleepSamples(1484, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=26.304830s (sample 1160043): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(731, 44100);
  gb.writeRegister(0x08, 0x22); // t=26.321406s (sample 1160774): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=26.321429s (sample 1160775): CH2 written pitch 590.414 Hz; trigger false, length enabled false
  await sleepSamples(2214, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=26.371633s (sample 1162989): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.wave.setFrequency(131.072); // t=26.405147s (sample 1164467): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=26.421927s (sample 1165207): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x9e); // t=26.421927s (sample 1165207): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=26.421950s (sample 1165208): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=26.422222s (sample 1165220): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(723, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=26.438617s (sample 1165943): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=26.438662s (sample 1165945): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=26.438662s (sample 1165945): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(1481, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=26.472245s (sample 1167426): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1471, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=26.505601s (sample 1168897): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(745, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=26.522494s (sample 1169642): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2208, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=26.572562s (sample 1171850): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=26.589365s (sample 1172591): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x42); // t=26.589365s (sample 1172591): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=26.589388s (sample 1172592): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=26.589660s (sample 1172604): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=26.589705s (sample 1172606): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=26.589705s (sample 1172606): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(722, 44100);
  gb.wave.setFrequency(131.072); // t=26.606077s (sample 1173328): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=26.622789s (sample 1174065): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=26.673016s (sample 1176280): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1484, 44100);
  gb.writeRegister(0x0d, 0x0b); // t=26.706667s (sample 1177764): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=26.706689s (sample 1177765): CH3 written pitch 130.810 Hz; trigger false, length enabled false
  await sleepSamples(731, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=26.723265s (sample 1178496): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1480, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=26.756825s (sample 1179976): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0xd6); // t=26.756848s (sample 1179977): CH2 written pitch 3120.762 Hz; no retrigger
  gb.writeRegister(0x09, 0x86); // t=26.756848s (sample 1179977): CH2 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(10, 44100);
  gb.setPan(0, true, false); // t=26.757075s (sample 1179987): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=26.757302s (sample 1179997): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=26.757324s (sample 1179998): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=26.757324s (sample 1179998): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(712, 44100);
  gb.writeRegister(0x08, 0xd6); // t=26.773469s (sample 1180710): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=26.773492s (sample 1180711): CH2 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=26.773515s (sample 1180712): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x86); // t=26.773537s (sample 1180713): CH2 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=26.790227s (sample 1181449): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=26.790272s (sample 1181451): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=26.790272s (sample 1181451): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(738, 44100);
  gb.wave.setFrequency(131.072); // t=26.807007s (sample 1182189): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(4429, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=26.907438s (sample 1186618): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=26.924240s (sample 1187359): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x72); // t=26.924240s (sample 1187359): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=26.924263s (sample 1187360): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=26.940930s (sample 1188095): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=26.940975s (sample 1188097): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=26.940975s (sample 1188097): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2953, 44100);
  gb.wave.setFrequency(131.072); // t=27.007937s (sample 1191050): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=27.108413s (sample 1195481): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=27.108435s (sample 1195482): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=27.108435s (sample 1195482): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=27.108730s (sample 1195495): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(1460, 44100);
  gb.writeRegister(0x03, 0x9e); // t=27.141837s (sample 1196955): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=27.141859s (sample 1196956): CH1 written pitch 370.260 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=27.141882s (sample 1196957): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=27.141905s (sample 1196958): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(2959, 44100);
  gb.wave.setFrequency(131.072); // t=27.209002s (sample 1199917): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(2948, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=27.275850s (sample 1202865): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=27.275873s (sample 1202866): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=27.275873s (sample 1202866): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=27.276145s (sample 1202878): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=27.276190s (sample 1202880): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x86); // t=27.276190s (sample 1202880): CH2 written pitch 441.320 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=27.292540s (sample 1203601): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=27.292585s (sample 1203603): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=27.292585s (sample 1203603): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=27.309297s (sample 1204340): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(745, 44100);
  gb.pulse.setFrequency(1, 442.81081081081084); // t=27.326190s (sample 1205085): CH2 written pitch 442.811 Hz; no retrigger
  await sleepSamples(2208, 44100);
  gb.pulse.setFrequency(1, 441.3198653198653); // t=27.376259s (sample 1207293): CH2 written pitch 441.320 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.wave.setFrequency(131.072); // t=27.409773s (sample 1208771): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 439.83892617449663); // t=27.426485s (sample 1209508): CH2 written pitch 439.839 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=27.443243s (sample 1210247): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0xe7); // t=27.443265s (sample 1210248): CH2 written pitch 466.448 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x86); // t=27.443288s (sample 1210249): CH2 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=27.443583s (sample 1210262): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xe7); // t=27.443605s (sample 1210263): CH1 written pitch 466.448 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=27.443605s (sample 1210263): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(11, 44100);
  gb.wave.setLevel(0.5); // t=27.443855s (sample 1210274): CH3 output level 50%
  gb.writeRegister(0x0d, 0xce); // t=27.443855s (sample 1210274): CH3 written pitch 214.170 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=27.443878s (sample 1210275): CH3 written pitch 116.612 Hz; trigger false, length enabled false
  await sleepSamples(10, 44100);
  gb.pulse.setFrequency(0, 466.44839857651243); // t=27.444104s (sample 1210285): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=27.444150s (sample 1210287): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=27.444150s (sample 1210287): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(698, 44100);
  gb.writeRegister(0x0d, 0xce); // t=27.459977s (sample 1210985): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=27.460000s (sample 1210986): CH3 written pitch 116.612 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 466.44839857651243); // t=27.476712s (sample 1211723): CH2 written pitch 466.448 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=27.476757s (sample 1211725): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x86); // t=27.476757s (sample 1211725): CH2 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(5908, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=27.610726s (sample 1217633): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=27.610748s (sample 1217634): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=27.610748s (sample 1217634): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1473, 44100);
  gb.writeRegister(0x03, 0x72); // t=27.644150s (sample 1219107): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=27.644172s (sample 1219108): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=27.644195s (sample 1219109): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=27.644218s (sample 1219110): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(6645, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=27.794898s (sample 1225755): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x89); // t=27.794921s (sample 1225756): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=27.794943s (sample 1225757): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 349.5253333333333); // t=27.795215s (sample 1225769): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=27.795261s (sample 1225771): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=27.795261s (sample 1225771): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(7368, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=27.962336s (sample 1233139): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=27.962358s (sample 1233140): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=27.962381s (sample 1233141): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=27.962653s (sample 1233153): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(722, 44100);
  gb.pulse.setFrequency(1, 468.1142857142857); // t=27.979025s (sample 1233875): CH2 written pitch 468.114 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=27.979070s (sample 1233877): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x86); // t=27.979070s (sample 1233877): CH2 written pitch 468.114 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=27.995782s (sample 1234614): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=27.995828s (sample 1234616): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=27.995828s (sample 1234616): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1474, 44100);
  gb.writeRegister(0x08, 0xe9); // t=28.029252s (sample 1236090): CH2 written pitch 469.792 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=28.029274s (sample 1236091): CH2 written pitch 469.792 Hz; trigger false, length enabled false
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=28.062766s (sample 1237568): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(744, 44100);
  gb.writeRegister(0x08, 0xe8); // t=28.079637s (sample 1238312): CH2 written pitch 468.114 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x06); // t=28.079660s (sample 1238313): CH2 written pitch 468.114 Hz; trigger false, length enabled false
  await sleepSamples(2212, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=28.129819s (sample 1240525): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x21); // t=28.129841s (sample 1240526): CH2 written pitch 273.637 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=28.129841s (sample 1240526): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.setPan(0, true, true); // t=28.130045s (sample 1240535): channel routing (low nibble right, high nibble left)
  await sleepSamples(11, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=28.130295s (sample 1240546): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0xe7); // t=28.130295s (sample 1240546): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=28.130317s (sample 1240547): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=28.130590s (sample 1240559): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=28.130635s (sample 1240561): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=28.130635s (sample 1240561): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(698, 44100);
  gb.writeRegister(0x03, 0xe7); // t=28.146463s (sample 1241259): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=28.146485s (sample 1241260): CH1 written pitch 466.448 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=28.146508s (sample 1241261): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=28.146531s (sample 1241262): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=28.163243s (sample 1241999): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(4430, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=28.263696s (sample 1246429): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=28.297211s (sample 1247907): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=28.297234s (sample 1247908): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=28.297256s (sample 1247909): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=28.297528s (sample 1247921): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=28.297574s (sample 1247923): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=28.297574s (sample 1247923): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2944, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=28.364331s (sample 1250867): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(4422, 44100);
  gb.writeRegister(0x0d, 0xce); // t=28.464603s (sample 1255289): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=28.464626s (sample 1255290): CH3 written pitch 116.612 Hz; trigger false, length enabled false
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=28.481406s (sample 1256030): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x89); // t=28.481429s (sample 1256031): CH1 written pitch 349.525 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=28.481429s (sample 1256031): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 349.5253333333333); // t=28.498095s (sample 1256766): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=28.498141s (sample 1256768): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=28.498141s (sample 1256768): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(2953, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=28.565102s (sample 1259721): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(2952, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=28.632041s (sample 1262673): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=28.632086s (sample 1262675): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=28.632086s (sample 1262675): CH2 written pitch 590.414 Hz; trigger true, length enabled false
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=28.648844s (sample 1263414): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=28.648866s (sample 1263415): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=28.648866s (sample 1263415): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x42); // t=28.649138s (sample 1263427): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=28.649161s (sample 1263428): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=28.649184s (sample 1263429): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=28.649206s (sample 1263430): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(720, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=28.665533s (sample 1264150): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=28.682268s (sample 1264888): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=28.732494s (sample 1267103): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1485, 44100);
  gb.writeRegister(0x0d, 0xcf); // t=28.766168s (sample 1268588): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=28.766190s (sample 1268589): CH3 written pitch 116.820 Hz; trigger false, length enabled false
  await sleepSamples(729, 44100);
  gb.writeRegister(0x08, 0x21); // t=28.782721s (sample 1269318): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=28.782744s (sample 1269319): CH2 written pitch 587.767 Hz; trigger false, length enabled false
  await sleepSamples(1477, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=28.816236s (sample 1270796): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x39); // t=28.816259s (sample 1270797): CH2 written pitch 658.653 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=28.816259s (sample 1270797): CH2 written pitch 658.653 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=28.816576s (sample 1270811): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xe7); // t=28.816599s (sample 1270812): CH1 written pitch 466.448 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=28.816599s (sample 1270812): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(722, 44100);
  gb.pulse.setFrequency(1, 658.6532663316583); // t=28.832971s (sample 1271534): CH2 written pitch 658.653 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=28.833016s (sample 1271536): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=28.833016s (sample 1271536): CH2 written pitch 658.653 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x03, 0xe7); // t=28.849705s (sample 1272272): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=28.849728s (sample 1272273): CH1 written pitch 466.448 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=28.849751s (sample 1272274): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=28.849773s (sample 1272275): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(743, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=28.866621s (sample 1273018): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(4424, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=28.966939s (sample 1277442): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=28.983719s (sample 1278182): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=28.983741s (sample 1278183): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=28.983741s (sample 1278183): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=29.000408s (sample 1278918): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=29.000454s (sample 1278920): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=29.000454s (sample 1278920): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=29.067392s (sample 1281872): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(4432, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=29.167891s (sample 1286304): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x89); // t=29.167914s (sample 1286305): CH1 written pitch 349.525 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=29.167914s (sample 1286305): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=29.168231s (sample 1286319): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(1460, 44100);
  gb.pulse.setFrequency(0, 349.5253333333333); // t=29.201338s (sample 1287779): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=29.201383s (sample 1287781): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=29.201383s (sample 1287781): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(2959, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=29.268481s (sample 1290740): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(2948, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=29.335329s (sample 1293688): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=29.335351s (sample 1293689): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=29.335351s (sample 1293689): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x08, 0x3a); // t=29.335624s (sample 1293701): CH2 written pitch 661.980 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=29.335646s (sample 1293702): CH2 written pitch 661.980 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=29.335669s (sample 1293703): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=29.335692s (sample 1293704): CH2 written pitch 661.980 Hz; trigger true, length enabled false
  await sleepSamples(720, 44100);
  gb.writeRegister(0x03, 0x42); // t=29.352018s (sample 1294424): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=29.352041s (sample 1294425): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=29.352063s (sample 1294426): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=29.352063s (sample 1294426): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(738, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=29.368798s (sample 1295164): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(744, 44100);
  gb.pulse.setFrequency(1, 665.3401015228426); // t=29.385669s (sample 1295908): CH2 written pitch 665.340 Hz; no retrigger
  await sleepSamples(2208, 44100);
  gb.pulse.setFrequency(1, 661.979797979798); // t=29.435737s (sample 1298116): CH2 written pitch 661.980 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.writeRegister(0x0d, 0xce); // t=29.469229s (sample 1299593): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=29.469252s (sample 1299594): CH3 written pitch 116.612 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 658.6532663316583); // t=29.485964s (sample 1300331): CH2 written pitch 658.653 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=29.502744s (sample 1301071): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x21); // t=29.502744s (sample 1301071): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=29.502766s (sample 1301072): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.setPan(0, false, true); // t=29.502971s (sample 1301081): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=29.503197s (sample 1301091): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xe7); // t=29.503220s (sample 1301092): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=29.503243s (sample 1301093): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 466.44839857651243); // t=29.503515s (sample 1301105): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=29.503560s (sample 1301107): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=29.503560s (sample 1301107): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(1439, 44100);
  gb.writeRegister(0x08, 0x21); // t=29.536190s (sample 1302546): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=29.536213s (sample 1302547): CH2 written pitch 587.767 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=29.536236s (sample 1302548): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=29.536259s (sample 1302549): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(1476, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=29.569728s (sample 1304025): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=29.670204s (sample 1308456): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=29.670227s (sample 1308457): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=29.670227s (sample 1308457): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=29.670522s (sample 1308470): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1461, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=29.703651s (sample 1309931): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=29.703696s (sample 1309933): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=29.703696s (sample 1309933): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.writeRegister(0x0d, 0xcf); // t=29.770635s (sample 1312885): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=29.770658s (sample 1312886): CH3 written pitch 116.820 Hz; trigger false, length enabled false
  await sleepSamples(2954, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=29.837642s (sample 1315840): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x89); // t=29.837664s (sample 1315841): CH1 written pitch 349.525 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=29.837664s (sample 1315841): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.writeRegister(0x03, 0x89); // t=29.854331s (sample 1316576): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=29.854354s (sample 1316577): CH1 written pitch 349.525 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=29.854376s (sample 1316578): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=29.854376s (sample 1316578): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=29.871088s (sample 1317315): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=29.971565s (sample 1321746): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(2217, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=30.021837s (sample 1323963): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x42); // t=30.021837s (sample 1323963): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=30.021859s (sample 1323964): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(734, 44100);
  gb.writeRegister(0x08, 0x22); // t=30.038503s (sample 1324698): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=30.038526s (sample 1324699): CH2 written pitch 590.414 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=30.038549s (sample 1324700): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=30.038571s (sample 1324701): CH2 written pitch 590.414 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=30.055261s (sample 1325437): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=30.055306s (sample 1325439): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=30.055306s (sample 1325439): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(744, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=30.072177s (sample 1326183): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(731, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=30.088753s (sample 1326914): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(2222, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=30.139138s (sample 1329136): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1471, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=30.172494s (sample 1330607): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=30.189229s (sample 1331345): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x6b); // t=30.189252s (sample 1331346): CH2 written pitch 879.678 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=30.189252s (sample 1331346): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=30.189569s (sample 1331360): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=30.189592s (sample 1331361): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=30.189592s (sample 1331361): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(8, 44100);
  gb.wave.setLevel(0.5); // t=30.189773s (sample 1331369): CH3 output level 50%
  gb.wave.setFrequency(109.95973154362416); // t=30.189773s (sample 1331369): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(10, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=30.190000s (sample 1331379): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=30.190045s (sample 1331381): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=30.190045s (sample 1331381): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(702, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=30.205964s (sample 1332083): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=30.206009s (sample 1332085): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=30.206009s (sample 1332085): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x0d, 0xac); // t=30.222698s (sample 1332821): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=30.222721s (sample 1332822): CH3 written pitch 109.960 Hz; trigger false, length enabled false
  await sleepSamples(5909, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=30.356712s (sample 1338731): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x42); // t=30.356712s (sample 1338731): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=30.356735s (sample 1338732): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=30.357007s (sample 1338744): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=30.357052s (sample 1338746): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=30.357052s (sample 1338746): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(7369, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=30.524150s (sample 1346115): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x72); // t=30.524150s (sample 1346115): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=30.524172s (sample 1346116): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1473, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=30.557574s (sample 1347589): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=30.557619s (sample 1347591): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=30.557619s (sample 1347591): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(5905, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=30.691519s (sample 1353496): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=30.691565s (sample 1353498): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=30.691565s (sample 1353498): CH2 written pitch 885.622 Hz; trigger true, length enabled false
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=30.708322s (sample 1354237): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x27); // t=30.708345s (sample 1354238): CH1 written pitch 277.108 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=30.708345s (sample 1354238): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x27); // t=30.708617s (sample 1354250): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=30.708639s (sample 1354251): CH1 written pitch 277.108 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=30.708662s (sample 1354252): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=30.708685s (sample 1354253): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(720, 44100);
  gb.writeRegister(0x0d, 0xad); // t=30.725011s (sample 1354973): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=30.725034s (sample 1354974): CH3 written pitch 110.145 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=30.741746s (sample 1355711): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0x6c); // t=30.791973s (sample 1357926): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=30.791995s (sample 1357927): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=30.825488s (sample 1359404): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=30.842222s (sample 1360142): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1480, 44100);
  gb.setPan(0, true, true); // t=30.875782s (sample 1361622): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=30.876009s (sample 1361632): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=30.876032s (sample 1361633): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=30.876032s (sample 1361633): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(725, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=30.892472s (sample 1362358): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.writeRegister(0x03, 0xd6); // t=30.909184s (sample 1363095): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=30.909206s (sample 1363096): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=30.909229s (sample 1363097): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=30.909252s (sample 1363098): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(744, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=30.926122s (sample 1363842): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(730, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=30.942676s (sample 1364572): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2222, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=30.993061s (sample 1366794): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1471, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=31.026417s (sample 1368265): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=31.043197s (sample 1369005): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=31.043220s (sample 1369006): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=31.043220s (sample 1369006): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=31.043492s (sample 1369018): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(723, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=31.059887s (sample 1369741): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=31.059932s (sample 1369743): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=31.059932s (sample 1369743): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1475, 44100);
  gb.writeRegister(0x08, 0x6c); // t=31.093379s (sample 1371218): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=31.093401s (sample 1371219): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=31.126893s (sample 1372696): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=31.143605s (sample 1373433): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=31.193832s (sample 1375648): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=31.210635s (sample 1376389): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=31.210658s (sample 1376390): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=31.210658s (sample 1376390): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x72); // t=31.210930s (sample 1376402): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=31.210952s (sample 1376403): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=31.210975s (sample 1376404): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=31.210998s (sample 1376405): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(720, 44100);
  gb.writeRegister(0x0d, 0xac); // t=31.227324s (sample 1377125): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=31.227347s (sample 1377126): CH3 written pitch 109.960 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=31.244059s (sample 1377863): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=31.294308s (sample 1380079): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1485, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=31.327982s (sample 1381564): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(730, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=31.344535s (sample 1382294): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2217, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=31.394807s (sample 1384511): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x27); // t=31.394830s (sample 1384512): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=31.394853s (sample 1384513): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=31.395125s (sample 1384525): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(722, 44100);
  gb.writeRegister(0x03, 0x27); // t=31.411497s (sample 1385247): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=31.411519s (sample 1385248): CH1 written pitch 277.108 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=31.411542s (sample 1385249): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=31.411565s (sample 1385250): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=31.428254s (sample 1385986): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(745, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=31.445147s (sample 1386731): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=31.495397s (sample 1388947): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1471, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=31.528753s (sample 1390418): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(736, 44100);
  gb.writeRegister(0x08, 0x6d); // t=31.545442s (sample 1391154): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=31.545465s (sample 1391155): CH2 written pitch 891.646 Hz; trigger false, length enabled false
  await sleepSamples(745, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=31.562358s (sample 1391900): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=31.562381s (sample 1391901): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=31.562381s (sample 1391901): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=31.562676s (sample 1391914): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=31.562721s (sample 1391916): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=31.562721s (sample 1391916): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(1454, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=31.595692s (sample 1393370): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=31.629184s (sample 1394847): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=31.645918s (sample 1395585): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=31.696168s (sample 1397801): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=31.729683s (sample 1399279): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=31.729705s (sample 1399280): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=31.729728s (sample 1399281): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=31.730023s (sample 1399294): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(721, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=31.746372s (sample 1400015): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=31.763129s (sample 1400754): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=31.763175s (sample 1400756): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=31.763175s (sample 1400756): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1481, 44100);
  gb.writeRegister(0x08, 0x6c); // t=31.796757s (sample 1402237): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=31.796780s (sample 1402238): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(1470, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=31.830113s (sample 1403708): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(745, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=31.847007s (sample 1404453): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2210, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=31.897120s (sample 1406663): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=31.897143s (sample 1406664): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=31.897166s (sample 1406665): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x08, 0x6c); // t=31.897438s (sample 1406677): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=31.897460s (sample 1406678): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(721, 44100);
  gb.writeRegister(0x03, 0x72); // t=31.913810s (sample 1407399): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=31.913832s (sample 1407400): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=31.913855s (sample 1407401): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=31.913878s (sample 1407402): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=31.930590s (sample 1408139): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=31.947302s (sample 1408876): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=31.997528s (sample 1411091): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=32.031043s (sample 1412569): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.writeRegister(0x08, 0x6b); // t=32.047755s (sample 1413306): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=32.047778s (sample 1413307): CH2 written pitch 879.678 Hz; trigger false, length enabled false
  await sleepSamples(1479, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=32.081315s (sample 1414786): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x27); // t=32.081338s (sample 1414787): CH1 written pitch 277.108 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=32.081338s (sample 1414787): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.writeRegister(0x08, 0x6c); // t=32.098005s (sample 1415522): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=32.098027s (sample 1415523): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(0, 277.107822410148); // t=32.114739s (sample 1416260): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=32.114785s (sample 1416262): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=32.114785s (sample 1416262): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(745, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=32.131678s (sample 1417007): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(730, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=32.148231s (sample 1417737): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=32.198458s (sample 1419952): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.writeRegister(0x0d, 0xac); // t=32.231950s (sample 1421429): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=32.231973s (sample 1421430): CH3 written pitch 109.960 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 131072); // t=32.248685s (sample 1422167): CH2 written pitch 131072.000 Hz; no retrigger
  await sleepSamples(7, 44100);
  gb.setPan(0, true, false); // t=32.248844s (sample 1422174): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=32.249070s (sample 1422184): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=32.249093s (sample 1422185): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=32.249093s (sample 1422185): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=32.265442s (sample 1422906): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=32.265488s (sample 1422908): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=32.265488s (sample 1422908): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(2953, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=32.332449s (sample 1425861): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(3693, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=32.416190s (sample 1429554): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=32.416213s (sample 1429555): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=32.416213s (sample 1429555): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x42); // t=32.416485s (sample 1429567): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=32.416508s (sample 1429568): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=32.416531s (sample 1429569): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=32.416553s (sample 1429570): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(720, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=32.432880s (sample 1430290): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(4438, 44100);
  gb.writeRegister(0x0d, 0xad); // t=32.533515s (sample 1434728): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=32.533537s (sample 1434729): CH3 written pitch 110.145 Hz; trigger false, length enabled false
  await sleepSamples(2209, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=32.583628s (sample 1436938): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=32.583651s (sample 1436939): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=32.583651s (sample 1436939): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1473, 44100);
  gb.writeRegister(0x03, 0x72); // t=32.617052s (sample 1438412): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=32.617075s (sample 1438413): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=32.617098s (sample 1438414): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=32.617098s (sample 1438414): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=32.633810s (sample 1439151): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.writeRegister(0x0d, 0xad); // t=32.734286s (sample 1443582): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=32.734308s (sample 1443583): CH3 written pitch 110.145 Hz; trigger false, length enabled false
  await sleepSamples(1477, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=32.767800s (sample 1445060): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x27); // t=32.767823s (sample 1445061): CH1 written pitch 277.108 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=32.767823s (sample 1445061): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 277.107822410148); // t=32.768118s (sample 1445074): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=32.768163s (sample 1445076): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=32.768163s (sample 1445076): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(2936, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=32.834739s (sample 1448012): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=32.935215s (sample 1452443): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x21); // t=32.935215s (sample 1452443): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=32.935238s (sample 1452444): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(19, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=32.935669s (sample 1452463): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=32.935692s (sample 1452464): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=32.935692s (sample 1452464): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(15, 44100);
  gb.wave.setLevel(0.5); // t=32.936032s (sample 1452479): CH3 output level 50%
  gb.wave.setFrequency(146.94170403587444); // t=32.936032s (sample 1452479): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(11, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=32.936281s (sample 1452490): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(690, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=32.951927s (sample 1453180): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=32.951973s (sample 1453182): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=32.951973s (sample 1453182): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=32.968685s (sample 1453919): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=32.968730s (sample 1453921): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=32.968730s (sample 1453921): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(5907, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=33.102676s (sample 1459828): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=33.102698s (sample 1459829): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=33.102698s (sample 1459829): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.writeRegister(0x03, 0x72); // t=33.119365s (sample 1460564): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=33.119388s (sample 1460565): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=33.119410s (sample 1460566): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=33.119410s (sample 1460566): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(6645, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=33.270091s (sample 1467211): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x21); // t=33.270091s (sample 1467211): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=33.270113s (sample 1467212): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=33.270317s (sample 1467221): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x9e); // t=33.270317s (sample 1467221): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=33.270340s (sample 1467222): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=33.270612s (sample 1467234): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=33.270658s (sample 1467236): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=33.270658s (sample 1467236): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(1450, 44100);
  gb.writeRegister(0x08, 0x21); // t=33.303537s (sample 1468686): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=33.303560s (sample 1468687): CH2 written pitch 587.767 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=33.303583s (sample 1468688): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=33.303605s (sample 1468689): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(5905, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=33.437506s (sample 1474594): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=33.454308s (sample 1475335): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x42); // t=33.454308s (sample 1475335): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=33.454331s (sample 1475336): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=33.470998s (sample 1476071): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=33.471043s (sample 1476073): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=33.471043s (sample 1476073): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=33.537982s (sample 1479025): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(3692, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=33.621701s (sample 1482717): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x6b); // t=33.621723s (sample 1482718): CH2 written pitch 879.678 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=33.621723s (sample 1482718): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.setPan(0, true, true); // t=33.621927s (sample 1482727): channel routing (low nibble right, high nibble left)
  await sleepSamples(11, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=33.622177s (sample 1482738): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=33.622200s (sample 1482739): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=33.622200s (sample 1482739): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=33.622472s (sample 1482751): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=33.622517s (sample 1482753): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=33.622517s (sample 1482753): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(703, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=33.638458s (sample 1483456): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=33.655170s (sample 1484193): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=33.655215s (sample 1484195): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=33.655215s (sample 1484195): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(3697, 44100);
  gb.writeRegister(0x0d, 0x42); // t=33.739048s (sample 1487892): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=33.739070s (sample 1487893): CH3 written pitch 146.942 Hz; trigger false, length enabled false
  await sleepSamples(2210, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=33.789184s (sample 1490103): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x72); // t=33.789184s (sample 1490103): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=33.789206s (sample 1490104): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1473, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=33.822608s (sample 1491577): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=33.822653s (sample 1491579): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=33.822653s (sample 1491579): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(745, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=33.839546s (sample 1492324): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(4422, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=33.939819s (sample 1496746): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=33.956621s (sample 1497487): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x9e); // t=33.956621s (sample 1497487): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=33.956644s (sample 1497488): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=33.973311s (sample 1498223): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=33.973356s (sample 1498225): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=33.973356s (sample 1498225): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.writeRegister(0x0d, 0x43); // t=34.040295s (sample 1501177): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=34.040317s (sample 1501178): CH3 written pitch 147.272 Hz; trigger false, length enabled false
  await sleepSamples(3693, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=34.124059s (sample 1504871): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x42); // t=34.124059s (sample 1504871): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=34.124082s (sample 1504872): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=34.124354s (sample 1504884): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=34.124399s (sample 1504886): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=34.124399s (sample 1504886): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=34.140748s (sample 1505607): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=34.157483s (sample 1506345): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=34.157528s (sample 1506347): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=34.157528s (sample 1506347): CH2 written pitch 885.622 Hz; trigger true, length enabled false
  await sleepSamples(2213, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=34.207710s (sample 1508560): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1485, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=34.241383s (sample 1510045): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(730, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=34.257937s (sample 1510775): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2223, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=34.308345s (sample 1512998): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=34.308367s (sample 1512999): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=34.308367s (sample 1512999): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=34.308639s (sample 1513011): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(718, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=34.324921s (sample 1513729): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=34.324966s (sample 1513731): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=34.324966s (sample 1513731): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=34.341678s (sample 1514468): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(745, 44100);
  gb.writeRegister(0x08, 0x6c); // t=34.358571s (sample 1515213): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=34.358594s (sample 1515214): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(2207, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=34.408639s (sample 1517421): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=34.442154s (sample 1518899): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=34.458866s (sample 1519636): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=34.475669s (sample 1520377): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=34.475692s (sample 1520378): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=34.475692s (sample 1520378): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x72); // t=34.475964s (sample 1520390): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=34.475986s (sample 1520391): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=34.476009s (sample 1520392): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=34.476032s (sample 1520393): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1458, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=34.509093s (sample 1521851): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=34.542608s (sample 1523329): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.writeRegister(0x08, 0x6c); // t=34.559342s (sample 1524067): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=34.559365s (sample 1524068): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(2214, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=34.609569s (sample 1526282): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1479, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=34.643107s (sample 1527761): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=34.643129s (sample 1527762): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=34.643129s (sample 1527762): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=34.643447s (sample 1527776): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(721, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=34.659796s (sample 1528497): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.writeRegister(0x03, 0x9e); // t=34.676531s (sample 1529235): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=34.676553s (sample 1529236): CH1 written pitch 370.260 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=34.676576s (sample 1529237): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=34.676599s (sample 1529238): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(1481, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=34.710181s (sample 1530719): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1470, 44100);
  gb.writeRegister(0x0d, 0x42); // t=34.743515s (sample 1532189): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=34.743537s (sample 1532190): CH3 written pitch 146.942 Hz; trigger false, length enabled false
  await sleepSamples(745, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=34.760431s (sample 1532935): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2210, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=34.810544s (sample 1535145): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=34.810567s (sample 1535146): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=34.810567s (sample 1535146): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=34.810839s (sample 1535158): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(723, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=34.827234s (sample 1535881): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=34.827279s (sample 1535883): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=34.827279s (sample 1535883): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(738, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=34.844014s (sample 1536621): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=34.860726s (sample 1537358): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=34.910952s (sample 1539573): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=34.944444s (sample 1541050): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=34.961202s (sample 1541789): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=34.994694s (sample 1543266): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x62); // t=34.994717s (sample 1543267): CH2 written pitch 829.570 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=34.994717s (sample 1543267): CH2 written pitch 829.570 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.setPan(0, false, true); // t=34.994921s (sample 1543276): channel routing (low nibble right, high nibble left)
  await sleepSamples(11, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=34.995170s (sample 1543287): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0xd6); // t=34.995170s (sample 1543287): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=34.995193s (sample 1543288): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(715, 44100);
  gb.pulse.setFrequency(1, 829.5696202531645); // t=35.011406s (sample 1544003): CH2 written pitch 829.570 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=35.011451s (sample 1544005): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=35.011451s (sample 1544005): CH2 written pitch 829.570 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=35.028163s (sample 1544742): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=35.028209s (sample 1544744): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=35.028209s (sample 1544744): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(744, 44100);
  gb.writeRegister(0x0d, 0x43); // t=35.045079s (sample 1545488): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=35.045102s (sample 1545489): CH3 written pitch 147.272 Hz; trigger false, length enabled false
  await sleepSamples(4422, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=35.145374s (sample 1549911): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=35.162132s (sample 1550650): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x6b); // t=35.162154s (sample 1550651): CH2 written pitch 879.678 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=35.162154s (sample 1550651): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=35.162358s (sample 1550660): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=35.162381s (sample 1550661): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=35.162381s (sample 1550661): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=35.162653s (sample 1550673): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=35.162698s (sample 1550675): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=35.162698s (sample 1550675): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(712, 44100);
  gb.writeRegister(0x03, 0x72); // t=35.178844s (sample 1551387): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=35.178866s (sample 1551388): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=35.178889s (sample 1551389): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=35.178912s (sample 1551390): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.writeRegister(0x0d, 0x43); // t=35.245850s (sample 1554342): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=35.245873s (sample 1554343): CH3 written pitch 147.272 Hz; trigger false, length enabled false
  await sleepSamples(3691, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=35.329569s (sample 1558034): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x7b); // t=35.329592s (sample 1558035): CH2 written pitch 985.504 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=35.329592s (sample 1558035): CH2 written pitch 985.504 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=35.329796s (sample 1558044): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=35.329819s (sample 1558045): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=35.329819s (sample 1558045): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=35.330091s (sample 1558057): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=35.330136s (sample 1558059): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=35.330136s (sample 1558059): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(713, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=35.346304s (sample 1558772): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 985.5037593984962); // t=35.363039s (sample 1559510): CH2 written pitch 985.504 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=35.363084s (sample 1559512): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=35.363084s (sample 1559512): CH2 written pitch 985.504 Hz; trigger true, length enabled false
  await sleepSamples(3698, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=35.446939s (sample 1563210): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(2209, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=35.497029s (sample 1565419): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=35.497052s (sample 1565420): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=35.497075s (sample 1565421): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1473, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=35.530476s (sample 1566894): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=35.530522s (sample 1566896): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=35.530522s (sample 1566896): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=35.547234s (sample 1567633): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=35.647710s (sample 1572064): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(1476, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=35.681179s (sample 1573540): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x6b); // t=35.681202s (sample 1573541): CH2 written pitch 879.678 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=35.681202s (sample 1573541): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=35.681519s (sample 1573555): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=35.681542s (sample 1573556): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=35.681542s (sample 1573556): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(8, 44100);
  gb.wave.setLevel(0.5); // t=35.681723s (sample 1573564): CH3 output level 50%
  gb.wave.setFrequency(130.81037924151696); // t=35.681723s (sample 1573564): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(11, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=35.681973s (sample 1573575): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=35.682018s (sample 1573577): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=35.682018s (sample 1573577): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(701, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=35.697914s (sample 1574278): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=35.714649s (sample 1575016): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=35.714694s (sample 1575018): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=35.714694s (sample 1575018): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(5908, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=35.848662s (sample 1580926): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=35.848685s (sample 1580927): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=35.848685s (sample 1580927): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1473, 44100);
  gb.writeRegister(0x03, 0x72); // t=35.882086s (sample 1582400): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=35.882109s (sample 1582401): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=35.882132s (sample 1582402): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=35.882154s (sample 1582403): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(5907, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=36.016100s (sample 1588310): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=36.016122s (sample 1588311): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=36.016122s (sample 1588311): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=36.032789s (sample 1589046): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=36.032834s (sample 1589048): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=36.032834s (sample 1589048): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(6646, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=36.183537s (sample 1595694): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=36.183560s (sample 1595695): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=36.183560s (sample 1595695): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x42); // t=36.183832s (sample 1595707): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=36.183855s (sample 1595708): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=36.183878s (sample 1595709): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=36.183900s (sample 1595710): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(720, 44100);
  gb.wave.setFrequency(131.072); // t=36.200227s (sample 1596430): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=36.216961s (sample 1597168): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=36.217007s (sample 1597170): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=36.217007s (sample 1597170): CH2 written pitch 885.622 Hz; trigger true, length enabled false
  await sleepSamples(2213, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=36.267188s (sample 1599383): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1485, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=36.300862s (sample 1600868): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(730, 44100);
  gb.writeRegister(0x08, 0x6c); // t=36.317415s (sample 1601598): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=36.317438s (sample 1601599): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(2216, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=36.367687s (sample 1603815): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x21); // t=36.367687s (sample 1603815): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=36.367710s (sample 1603816): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.setPan(0, true, true); // t=36.367914s (sample 1603825): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=36.368141s (sample 1603835): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=36.368163s (sample 1603836): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=36.368186s (sample 1603837): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=36.368458s (sample 1603849): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=36.368481s (sample 1603850): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=36.368503s (sample 1603851): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(701, 44100);
  gb.writeRegister(0x03, 0xd6); // t=36.384399s (sample 1604552): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=36.384422s (sample 1604553): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=36.384444s (sample 1604554): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=36.384467s (sample 1604555): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(131.072); // t=36.401179s (sample 1605292): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(4429, 44100);
  gb.writeRegister(0x0d, 0x0b); // t=36.501610s (sample 1609721): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=36.501633s (sample 1609722): CH3 written pitch 130.810 Hz; trigger false, length enabled false
  await sleepSamples(1478, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=36.535147s (sample 1611200): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=36.535170s (sample 1611201): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=36.535170s (sample 1611201): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=36.535465s (sample 1611214): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=36.535510s (sample 1611216): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=36.535510s (sample 1611216): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2937, 44100);
  gb.wave.setFrequency(131.072); // t=36.602109s (sample 1614153): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=36.702585s (sample 1618584): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=36.702608s (sample 1618585): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=36.702608s (sample 1618585): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=36.702902s (sample 1618598): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(1461, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=36.736032s (sample 1620059): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=36.736077s (sample 1620061): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=36.736077s (sample 1620061): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.writeRegister(0x0d, 0x0c); // t=36.803016s (sample 1623013): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=36.803039s (sample 1623014): CH3 written pitch 131.072 Hz; trigger false, length enabled false
  await sleepSamples(2954, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=36.870023s (sample 1625968): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=36.870045s (sample 1625969): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=36.870045s (sample 1625969): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x08, 0x22); // t=36.870317s (sample 1625981): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=36.870340s (sample 1625982): CH2 written pitch 590.414 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=36.870363s (sample 1625983): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=36.870385s (sample 1625984): CH2 written pitch 590.414 Hz; trigger true, length enabled false
  await sleepSamples(720, 44100);
  gb.writeRegister(0x03, 0x42); // t=36.886712s (sample 1626704): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=36.886735s (sample 1626705): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=36.886757s (sample 1626706): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=36.886757s (sample 1626706): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=36.903469s (sample 1627443): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=36.920204s (sample 1628181): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=36.970431s (sample 1630396): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.wave.setFrequency(131.072); // t=37.003946s (sample 1631874): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=37.020658s (sample 1632611): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1485, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=37.054331s (sample 1634096): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0xd6); // t=37.054331s (sample 1634096): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=37.054354s (sample 1634097): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(730, 44100);
  gb.writeRegister(0x08, 0x22); // t=37.070907s (sample 1634827): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=37.070930s (sample 1634828): CH2 written pitch 590.414 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=37.087642s (sample 1635565): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=37.087687s (sample 1635567): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=37.087687s (sample 1635567): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(744, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=37.104558s (sample 1636311): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(731, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=37.121134s (sample 1637042): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=37.171361s (sample 1639257): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.wave.setFrequency(131.072); // t=37.204875s (sample 1640735): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=37.221655s (sample 1641475): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x72); // t=37.221655s (sample 1641475): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=37.221678s (sample 1641476): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=37.221950s (sample 1641488): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(723, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=37.238345s (sample 1642211): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=37.238390s (sample 1642213): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=37.238390s (sample 1642213): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1482, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=37.271995s (sample 1643695): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1470, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=37.305329s (sample 1645165): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.writeRegister(0x08, 0x23); // t=37.322041s (sample 1645902): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=37.322063s (sample 1645903): CH2 written pitch 593.086 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=37.372290s (sample 1648118): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=37.389093s (sample 1648859): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x9e); // t=37.389093s (sample 1648859): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=37.389116s (sample 1648860): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=37.389388s (sample 1648872): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=37.389433s (sample 1648874): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=37.389433s (sample 1648874): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(722, 44100);
  gb.wave.setFrequency(131.072); // t=37.405805s (sample 1649596): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=37.422517s (sample 1650333): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=37.472766s (sample 1652549): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1483, 44100);
  gb.writeRegister(0x0d, 0x0b); // t=37.506395s (sample 1654032): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=37.506417s (sample 1654033): CH3 written pitch 130.810 Hz; trigger false, length enabled false
  await sleepSamples(730, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=37.522971s (sample 1654763): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(1480, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=37.556531s (sample 1656243): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x42); // t=37.556531s (sample 1656243): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=37.556553s (sample 1656244): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(734, 44100);
  gb.writeRegister(0x08, 0x22); // t=37.573197s (sample 1656978): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=37.573220s (sample 1656979): CH2 written pitch 590.414 Hz; trigger false, length enabled false
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=37.589955s (sample 1657717): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=37.590000s (sample 1657719): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=37.590000s (sample 1657719): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(738, 44100);
  gb.wave.setFrequency(131.072); // t=37.606735s (sample 1658457): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(743, 44100);
  gb.writeRegister(0x08, 0x21); // t=37.623583s (sample 1659200): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=37.623605s (sample 1659201): CH2 written pitch 587.767 Hz; trigger false, length enabled false
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=37.673855s (sample 1661417): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1469, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=37.707166s (sample 1662886): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=37.723900s (sample 1663624): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=37.740680s (sample 1664364): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x21); // t=37.740680s (sample 1664364): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=37.740703s (sample 1664365): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.setPan(0, true, false); // t=37.740907s (sample 1664374): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=37.741134s (sample 1664384): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=37.741156s (sample 1664385): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=37.741156s (sample 1664385): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=37.741451s (sample 1664398): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=37.741497s (sample 1664400): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=37.741497s (sample 1664400): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(1439, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=37.774127s (sample 1665839): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=37.774172s (sample 1665841): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=37.774172s (sample 1665841): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(1476, 44100);
  gb.writeRegister(0x0d, 0x0c); // t=37.807642s (sample 1667317): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=37.807664s (sample 1667318): CH3 written pitch 131.072 Hz; trigger false, length enabled false
  await sleepSamples(4431, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=37.908141s (sample 1671749): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=37.908163s (sample 1671750): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=37.908163s (sample 1671750): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=37.908458s (sample 1671763): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(1460, 44100);
  gb.writeRegister(0x03, 0x72); // t=37.941565s (sample 1673223): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=37.941587s (sample 1673224): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=37.941610s (sample 1673225): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=37.941633s (sample 1673226): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.wave.setFrequency(131.072); // t=38.008571s (sample 1676178): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(2955, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=38.075578s (sample 1679133): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=38.075601s (sample 1679134): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=38.075601s (sample 1679134): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=38.092268s (sample 1679869): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=38.092313s (sample 1679871): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=38.092313s (sample 1679871): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=38.109025s (sample 1680608): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.wave.setFrequency(131.072); // t=38.209501s (sample 1685039): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=38.243016s (sample 1686517): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=38.243039s (sample 1686518): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=38.243039s (sample 1686518): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x42); // t=38.243311s (sample 1686530): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=38.243333s (sample 1686531): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=38.243356s (sample 1686532): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=38.243379s (sample 1686533): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1458, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=38.276440s (sample 1687991): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=38.276485s (sample 1687993): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=38.276485s (sample 1687993): CH2 written pitch 590.414 Hz; trigger true, length enabled false
  await sleepSamples(1483, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=38.310113s (sample 1689476): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(730, 44100);
  gb.writeRegister(0x08, 0x23); // t=38.326667s (sample 1690206): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=38.326689s (sample 1690207): CH2 written pitch 593.086 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=38.376916s (sample 1692422): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=38.410431s (sample 1693900): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x73); // t=38.410431s (sample 1693900): CH2 written pitch 929.589 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=38.410454s (sample 1693901): CH2 written pitch 929.589 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=38.410748s (sample 1693914): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xe7); // t=38.410771s (sample 1693915): CH1 written pitch 466.448 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=38.410771s (sample 1693915): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(11, 44100);
  gb.wave.setLevel(0.5); // t=38.411020s (sample 1693926): CH3 output level 50%
  gb.writeRegister(0x0d, 0xce); // t=38.411020s (sample 1693926): CH3 written pitch 214.170 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=38.411043s (sample 1693927): CH3 written pitch 116.612 Hz; trigger false, length enabled false
  await sleepSamples(10, 44100);
  gb.writeRegister(0x0d, 0xce); // t=38.411270s (sample 1693937): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=38.411293s (sample 1693938): CH3 written pitch 116.612 Hz; trigger false, length enabled false
  await sleepSamples(699, 44100);
  gb.pulse.setFrequency(1, 929.5886524822695); // t=38.427143s (sample 1694637): CH2 written pitch 929.589 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=38.427188s (sample 1694639): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=38.427188s (sample 1694639): CH2 written pitch 929.589 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x03, 0xe7); // t=38.443878s (sample 1695375): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=38.443900s (sample 1695376): CH1 written pitch 466.448 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=38.443923s (sample 1695377): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=38.443946s (sample 1695378): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(6645, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=38.594626s (sample 1702023): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=38.594649s (sample 1702024): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=38.594671s (sample 1702025): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=38.594943s (sample 1702037): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=38.594989s (sample 1702039): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=38.594989s (sample 1702039): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(7368, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=38.762063s (sample 1709407): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x89); // t=38.762086s (sample 1709408): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=38.762109s (sample 1709409): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(1473, 44100);
  gb.pulse.setFrequency(0, 349.5253333333333); // t=38.795510s (sample 1710882): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=38.795556s (sample 1710884): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=38.795556s (sample 1710884): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(5167, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=38.912721s (sample 1716051): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=38.929501s (sample 1716791): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=38.929524s (sample 1716792): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=38.929546s (sample 1716793): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 936.2285714285714); // t=38.929819s (sample 1716805): CH2 written pitch 936.229 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=38.929864s (sample 1716807): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=38.929864s (sample 1716807): CH2 written pitch 936.229 Hz; trigger true, length enabled false
  await sleepSamples(720, 44100);
  gb.writeRegister(0x03, 0x42); // t=38.946190s (sample 1717527): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=38.946213s (sample 1717528): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=38.946236s (sample 1717529): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=38.946259s (sample 1717530): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1474, 44100);
  gb.pulse.setFrequency(1, 942.9640287769785); // t=38.979683s (sample 1719004): CH2 written pitch 942.964 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.writeRegister(0x0d, 0xce); // t=39.013175s (sample 1720481): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=39.013197s (sample 1720482): CH3 written pitch 116.612 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 936.2285714285714); // t=39.029909s (sample 1721219): CH2 written pitch 936.229 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0x73); // t=39.080136s (sample 1723434): CH2 written pitch 929.589 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=39.080159s (sample 1723435): CH2 written pitch 929.589 Hz; trigger false, length enabled false
  await sleepSamples(741, 44100);
  gb.setPan(0, true, true); // t=39.096961s (sample 1724176): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=39.097188s (sample 1724186): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xe7); // t=39.097211s (sample 1724187): CH1 written pitch 466.448 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=39.097211s (sample 1724187): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 466.44839857651243); // t=39.097506s (sample 1724200): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=39.097551s (sample 1724202): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=39.097551s (sample 1724202): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(711, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=39.113673s (sample 1724913): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.writeRegister(0x08, 0x74); // t=39.130385s (sample 1725650): CH2 written pitch 936.229 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=39.130408s (sample 1725651): CH2 written pitch 936.229 Hz; trigger false, length enabled false
  await sleepSamples(2214, 44100);
  gb.pulse.setFrequency(1, 942.9640287769785); // t=39.180612s (sample 1727865): CH2 written pitch 942.964 Hz; no retrigger
  await sleepSamples(1484, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=39.214263s (sample 1729349): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(731, 44100);
  gb.pulse.setFrequency(1, 936.2285714285714); // t=39.230839s (sample 1730080): CH2 written pitch 936.229 Hz; no retrigger
  await sleepSamples(2218, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=39.281134s (sample 1732298): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=39.281156s (sample 1732299): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=39.281156s (sample 1732299): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 929.5886524822695); // t=39.281429s (sample 1732311): CH2 written pitch 929.589 Hz; no retrigger
  await sleepSamples(723, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=39.297823s (sample 1733034): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=39.297868s (sample 1733036): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=39.297868s (sample 1733036): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.writeRegister(0x0d, 0xcf); // t=39.314580s (sample 1733773): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=39.314603s (sample 1733774): CH3 written pitch 116.820 Hz; trigger false, length enabled false
  await sleepSamples(744, 44100);
  gb.pulse.setFrequency(1, 936.2285714285714); // t=39.331474s (sample 1734518): CH2 written pitch 936.229 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 942.9640287769785); // t=39.381701s (sample 1736733): CH2 written pitch 942.964 Hz; no retrigger
  await sleepSamples(1470, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=39.415034s (sample 1738203): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 936.2285714285714); // t=39.431769s (sample 1738941): CH2 written pitch 936.229 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=39.448526s (sample 1739680): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x73); // t=39.448549s (sample 1739681): CH2 written pitch 929.589 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=39.448549s (sample 1739681): CH2 written pitch 929.589 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=39.448753s (sample 1739690): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x89); // t=39.448776s (sample 1739691): CH1 written pitch 349.525 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=39.448776s (sample 1739691): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 349.5253333333333); // t=39.449070s (sample 1739704): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=39.449116s (sample 1739706): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=39.449116s (sample 1739706): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(1450, 44100);
  gb.pulse.setFrequency(1, 929.5886524822695); // t=39.481995s (sample 1741156): CH2 written pitch 929.589 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=39.482041s (sample 1741158): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=39.482041s (sample 1741158): CH2 written pitch 929.589 Hz; trigger true, length enabled false
  await sleepSamples(1476, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=39.515510s (sample 1742634): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(4432, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=39.616009s (sample 1747066): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=39.616032s (sample 1747067): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=39.616032s (sample 1747067): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=39.616327s (sample 1747080): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1460, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=39.649433s (sample 1748540): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=39.649478s (sample 1748542): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=39.649478s (sample 1748542): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(2953, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=39.716440s (sample 1751495): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(2953, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=39.783401s (sample 1754448): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x83); // t=39.783424s (sample 1754449): CH2 written pitch 1048.576 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=39.783424s (sample 1754449): CH2 written pitch 1048.576 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=39.783741s (sample 1754463): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xe7); // t=39.783764s (sample 1754464): CH1 written pitch 466.448 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=39.783764s (sample 1754464): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 1048.576); // t=39.784036s (sample 1754476): CH2 written pitch 1048.576 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=39.784082s (sample 1754478): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=39.784082s (sample 1754478): CH2 written pitch 1048.576 Hz; trigger true, length enabled false
  await sleepSamples(708, 44100);
  gb.pulse.setFrequency(0, 466.44839857651243); // t=39.800136s (sample 1755186): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=39.800181s (sample 1755188): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=39.800181s (sample 1755188): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=39.816893s (sample 1755925): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=39.917370s (sample 1760356): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=39.967619s (sample 1762572): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=39.967642s (sample 1762573): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=39.967642s (sample 1762573): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1474, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=40.001066s (sample 1764047): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=40.001111s (sample 1764049): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=40.001111s (sample 1764049): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(743, 44100);
  gb.writeRegister(0x0d, 0xce); // t=40.017959s (sample 1764792): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=40.017982s (sample 1764793): CH3 written pitch 116.612 Hz; trigger false, length enabled false
  await sleepSamples(4424, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=40.118299s (sample 1769217): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=40.135057s (sample 1769956): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x89); // t=40.135079s (sample 1769957): CH1 written pitch 349.525 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=40.135079s (sample 1769957): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.writeRegister(0x03, 0x89); // t=40.151746s (sample 1770692): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=40.151769s (sample 1770693): CH1 written pitch 349.525 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=40.151791s (sample 1770694): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=40.151791s (sample 1770694): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=40.218730s (sample 1773646): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(2953, 44100);
  gb.pulse.setFrequency(1, 1057.032258064516); // t=40.285692s (sample 1776599): CH2 written pitch 1057.032 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=40.285737s (sample 1776601): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=40.285737s (sample 1776601): CH2 written pitch 1057.032 Hz; trigger true, length enabled false
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=40.302494s (sample 1777340): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=40.302517s (sample 1777341): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=40.302517s (sample 1777341): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=40.302812s (sample 1777354): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=40.302857s (sample 1777356): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=40.302857s (sample 1777356): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.writeRegister(0x0d, 0xcf); // t=40.319206s (sample 1778077): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=40.319229s (sample 1778078): CH3 written pitch 116.820 Hz; trigger false, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x08, 0x85); // t=40.335918s (sample 1778814): CH2 written pitch 1065.626 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=40.335941s (sample 1778815): CH2 written pitch 1065.626 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 1057.032258064516); // t=40.386168s (sample 1781030): CH2 written pitch 1057.032 Hz; no retrigger
  await sleepSamples(1484, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=40.419819s (sample 1782514): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(731, 44100);
  gb.pulse.setFrequency(1, 1048.576); // t=40.436395s (sample 1783245): CH2 written pitch 1048.576 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=40.469909s (sample 1784723): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x73); // t=40.469909s (sample 1784723): CH2 written pitch 929.589 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=40.469932s (sample 1784724): CH2 written pitch 929.589 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.setPan(0, false, true); // t=40.470136s (sample 1784733): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=40.470363s (sample 1784743): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xe7); // t=40.470385s (sample 1784744): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=40.470408s (sample 1784745): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(715, 44100);
  gb.pulse.setFrequency(1, 929.5886524822695); // t=40.486621s (sample 1785460): CH2 written pitch 929.589 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=40.486667s (sample 1785462): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=40.486667s (sample 1785462): CH2 written pitch 929.589 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(0, 466.44839857651243); // t=40.503379s (sample 1786199): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=40.503424s (sample 1786201): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=40.503424s (sample 1786201): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=40.520136s (sample 1786938): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(4430, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=40.620590s (sample 1791368): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1479, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=40.654127s (sample 1792847): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x72); // t=40.654127s (sample 1792847): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=40.654150s (sample 1792848): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=40.654422s (sample 1792860): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=40.654467s (sample 1792862): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=40.654467s (sample 1792862): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2937, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=40.721066s (sample 1795799): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(4432, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=40.821565s (sample 1800231): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x89); // t=40.821565s (sample 1800231): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=40.821587s (sample 1800232): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x0d, 0xce); // t=40.821859s (sample 1800244): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=40.821882s (sample 1800245): CH3 written pitch 116.612 Hz; trigger false, length enabled false
  await sleepSamples(1460, 44100);
  gb.pulse.setFrequency(0, 349.5253333333333); // t=40.854989s (sample 1801705): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=40.855034s (sample 1801707): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=40.855034s (sample 1801707): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(2953, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=40.921995s (sample 1804660): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(2955, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=40.989002s (sample 1807615): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x42); // t=40.989002s (sample 1807615): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=40.989025s (sample 1807616): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 936.2285714285714); // t=40.989297s (sample 1807628): CH2 written pitch 936.229 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=40.989342s (sample 1807630): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=40.989342s (sample 1807630): CH2 written pitch 936.229 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=41.005692s (sample 1808351): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=41.005737s (sample 1808353): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=41.005737s (sample 1808353): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x0d, 0xce); // t=41.022426s (sample 1809089): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=41.022449s (sample 1809090): CH3 written pitch 116.612 Hz; trigger false, length enabled false
  await sleepSamples(744, 44100);
  gb.pulse.setFrequency(1, 942.9640287769785); // t=41.039320s (sample 1809834): CH2 written pitch 942.964 Hz; no retrigger
  await sleepSamples(2208, 44100);
  gb.writeRegister(0x08, 0x74); // t=41.089388s (sample 1812042): CH2 written pitch 936.229 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=41.089410s (sample 1812043): CH2 written pitch 936.229 Hz; trigger false, length enabled false
  await sleepSamples(1478, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=41.122925s (sample 1813521): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 929.5886524822695); // t=41.139637s (sample 1814258): CH2 written pitch 929.589 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=41.156395s (sample 1814997): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x6b); // t=41.156417s (sample 1814998): CH2 written pitch 879.678 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=41.156417s (sample 1814998): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=41.156735s (sample 1815012): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=41.156757s (sample 1815013): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=41.156757s (sample 1815013): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(8, 44100);
  gb.wave.setLevel(0.5); // t=41.156939s (sample 1815021): CH3 output level 50%
  gb.wave.setFrequency(109.95973154362416); // t=41.156939s (sample 1815021): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(10, 44100);
  gb.writeRegister(0x03, 0xd6); // t=41.157166s (sample 1815031): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=41.157188s (sample 1815032): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=41.157211s (sample 1815033): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=41.157234s (sample 1815034): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(701, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=41.173129s (sample 1815735): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=41.189864s (sample 1816473): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=41.189909s (sample 1816475): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=41.189909s (sample 1816475): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(6646, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=41.340612s (sample 1823121): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=41.340635s (sample 1823122): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=41.340635s (sample 1823122): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=41.357302s (sample 1823857): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=41.357347s (sample 1823859): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=41.357347s (sample 1823859): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(6646, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=41.508050s (sample 1830505): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=41.508073s (sample 1830506): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=41.508073s (sample 1830506): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x72); // t=41.508345s (sample 1830518): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=41.508367s (sample 1830519): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=41.508390s (sample 1830520): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=41.508413s (sample 1830521): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(7368, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=41.675488s (sample 1837889): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x27); // t=41.675510s (sample 1837890): CH1 written pitch 277.108 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=41.675510s (sample 1837890): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=41.675805s (sample 1837903): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(722, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=41.692177s (sample 1838625): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=41.692222s (sample 1838627): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=41.692222s (sample 1838627): CH2 written pitch 885.622 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x03, 0x27); // t=41.708912s (sample 1839363): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=41.708934s (sample 1839364): CH1 written pitch 277.108 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=41.708957s (sample 1839365): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=41.708980s (sample 1839366): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(1474, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=41.742404s (sample 1840840): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.writeRegister(0x0d, 0xac); // t=41.775896s (sample 1842317): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=41.775918s (sample 1842318): CH3 written pitch 109.960 Hz; trigger false, length enabled false
  await sleepSamples(744, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=41.792789s (sample 1843062): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2212, 44100);
  gb.setPan(0, true, true); // t=41.842948s (sample 1845274): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=41.843175s (sample 1845284): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=41.843197s (sample 1845285): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=41.843197s (sample 1845285): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=41.843469s (sample 1845297): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(712, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=41.859615s (sample 1846009): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=41.859660s (sample 1846011): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=41.859660s (sample 1846011): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(738, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=41.876395s (sample 1846749): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.writeRegister(0x08, 0x6c); // t=41.893107s (sample 1847486): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=41.893129s (sample 1847487): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(2214, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=41.943333s (sample 1849701): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=41.976825s (sample 1851178): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=41.993560s (sample 1851916): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1479, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=42.027098s (sample 1853395): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=42.027120s (sample 1853396): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=42.027143s (sample 1853397): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(734, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=42.043787s (sample 1854131): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=42.060544s (sample 1854870): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=42.060590s (sample 1854872): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=42.060590s (sample 1854872): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(744, 44100);
  gb.writeRegister(0x0d, 0xad); // t=42.077460s (sample 1855616): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=42.077483s (sample 1855617): CH3 written pitch 110.145 Hz; trigger false, length enabled false
  await sleepSamples(730, 44100);
  gb.writeRegister(0x08, 0x6c); // t=42.094036s (sample 1856347): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=42.094059s (sample 1856348): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(2214, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=42.144263s (sample 1858562): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=42.177755s (sample 1860039): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=42.194535s (sample 1860779): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=42.194558s (sample 1860780): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=42.194580s (sample 1860781): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=42.194853s (sample 1860793): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(722, 44100);
  gb.writeRegister(0x03, 0x72); // t=42.211224s (sample 1861515): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=42.211247s (sample 1861516): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=42.211270s (sample 1861517): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=42.211293s (sample 1861518): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1481, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=42.244875s (sample 1862999): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1471, 44100);
  gb.writeRegister(0x0d, 0xad); // t=42.278231s (sample 1864470): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=42.278254s (sample 1864471): CH3 written pitch 110.145 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=42.294966s (sample 1865208): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2214, 44100);
  gb.writeRegister(0x08, 0x6d); // t=42.345170s (sample 1867422): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=42.345193s (sample 1867423): CH2 written pitch 891.646 Hz; trigger false, length enabled false
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=42.361973s (sample 1868163): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x27); // t=42.361995s (sample 1868164): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=42.362018s (sample 1868165): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 277.107822410148); // t=42.362290s (sample 1868177): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=42.362336s (sample 1868179): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=42.362336s (sample 1868179): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=42.378685s (sample 1868900): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=42.395420s (sample 1869638): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=42.445646s (sample 1871853): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1485, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=42.479320s (sample 1873338): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(731, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=42.495896s (sample 1874069): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1483, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=42.529524s (sample 1875552): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=42.529546s (sample 1875553): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=42.529546s (sample 1875553): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(730, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=42.546100s (sample 1876283): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=42.562857s (sample 1877022): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=42.562902s (sample 1877024): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=42.562902s (sample 1877024): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=42.579615s (sample 1877761): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(744, 44100);
  gb.writeRegister(0x08, 0x6c); // t=42.596485s (sample 1878505): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=42.596508s (sample 1878506): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=42.646735s (sample 1880721): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1471, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=42.680091s (sample 1882192): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=42.696848s (sample 1882931): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=42.696871s (sample 1882932): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=42.696893s (sample 1882933): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x08, 0x6c); // t=42.697166s (sample 1882945): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=42.697188s (sample 1882946): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(721, 44100);
  gb.writeRegister(0x03, 0x42); // t=42.713537s (sample 1883667): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=42.713560s (sample 1883668): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=42.713583s (sample 1883669): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=42.713605s (sample 1883670): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1474, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=42.747029s (sample 1885144): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.writeRegister(0x0d, 0xac); // t=42.780522s (sample 1886621): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=42.780544s (sample 1886622): CH3 written pitch 109.960 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=42.797256s (sample 1887359): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0x6b); // t=42.847483s (sample 1889574): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=42.847506s (sample 1889575): CH2 written pitch 879.678 Hz; trigger false, length enabled false
  await sleepSamples(1479, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=42.881043s (sample 1891054): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=42.881066s (sample 1891055): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=42.881066s (sample 1891055): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=42.881383s (sample 1891069): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(721, 44100);
  gb.writeRegister(0x08, 0x6c); // t=42.897732s (sample 1891790): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=42.897755s (sample 1891791): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.writeRegister(0x03, 0x72); // t=42.914467s (sample 1892528): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=42.914490s (sample 1892529): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=42.914512s (sample 1892530): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=42.914512s (sample 1892530): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1475, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=42.947959s (sample 1894005): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=42.981451s (sample 1895482): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(745, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=42.998345s (sample 1896227): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2211, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=43.048481s (sample 1898438): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x27); // t=43.048503s (sample 1898439): CH1 written pitch 277.108 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=43.048503s (sample 1898439): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=43.048776s (sample 1898451): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(723, 44100);
  gb.pulse.setFrequency(0, 277.107822410148); // t=43.065170s (sample 1899174): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=43.065215s (sample 1899176): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=43.065215s (sample 1899176): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.writeRegister(0x0d, 0xad); // t=43.081927s (sample 1899913): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=43.081950s (sample 1899914): CH3 written pitch 110.145 Hz; trigger false, length enabled false
  await sleepSamples(744, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=43.098821s (sample 1900658): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2208, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=43.148889s (sample 1902866): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=43.182381s (sample 1904343): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=43.199116s (sample 1905081): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 131072); // t=43.215850s (sample 1905819): CH2 written pitch 131072.000 Hz; no retrigger
  await sleepSamples(7, 44100);
  gb.setPan(0, true, false); // t=43.216009s (sample 1905826): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=43.216236s (sample 1905836): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=43.216259s (sample 1905837): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=43.216259s (sample 1905837): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=43.216553s (sample 1905850): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=43.216599s (sample 1905852): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=43.216599s (sample 1905852): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(2929, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=43.283016s (sample 1908781): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(4425, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=43.383356s (sample 1913206): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=43.383379s (sample 1913207): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=43.383379s (sample 1913207): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=43.383673s (sample 1913220): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(1460, 44100);
  gb.writeRegister(0x03, 0x42); // t=43.416780s (sample 1914680): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=43.416803s (sample 1914681): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=43.416825s (sample 1914682): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=43.416848s (sample 1914683): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=43.483787s (sample 1917635): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(3693, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=43.567528s (sample 1921328): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=43.567551s (sample 1921329): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=43.567551s (sample 1921329): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=43.567846s (sample 1921342): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=43.567891s (sample 1921344): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=43.567891s (sample 1921344): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=43.584240s (sample 1922065): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=43.684717s (sample 1926496): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=43.734966s (sample 1928712): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x27); // t=43.734989s (sample 1928713): CH1 written pitch 277.108 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=43.734989s (sample 1928713): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(1474, 44100);
  gb.pulse.setFrequency(0, 277.107822410148); // t=43.768413s (sample 1930187): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=43.768458s (sample 1930189): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=43.768458s (sample 1930189): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(743, 44100);
  gb.writeRegister(0x0d, 0xac); // t=43.785306s (sample 1930932): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=43.785329s (sample 1930933): CH3 written pitch 109.960 Hz; trigger false, length enabled false
  await sleepSamples(4424, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=43.885646s (sample 1935357): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=43.902381s (sample 1936095): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x21); // t=43.902381s (sample 1936095): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=43.902404s (sample 1936096): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(19, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=43.902834s (sample 1936115): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=43.902857s (sample 1936116): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=43.902857s (sample 1936116): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(15, 44100);
  gb.wave.setLevel(0.5); // t=43.903197s (sample 1936131): CH3 output level 50%
  gb.wave.setFrequency(146.94170403587444); // t=43.903197s (sample 1936131): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(10, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=43.903424s (sample 1936141): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=43.903469s (sample 1936143): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=43.903469s (sample 1936143): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(689, 44100);
  gb.writeRegister(0x03, 0xd6); // t=43.919093s (sample 1936832): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=43.919116s (sample 1936833): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=43.919138s (sample 1936834): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=43.919161s (sample 1936835): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=43.935850s (sample 1937571): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(5909, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=44.069841s (sample 1943480): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=44.069864s (sample 1943481): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=44.069864s (sample 1943481): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=44.070159s (sample 1943494): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=44.070204s (sample 1943496): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=44.070204s (sample 1943496): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(8105, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=44.253991s (sample 1951601): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x21); // t=44.254014s (sample 1951602): CH2 written pitch 587.767 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=44.254014s (sample 1951602): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=44.254218s (sample 1951611): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=44.254240s (sample 1951612): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=44.254240s (sample 1951612): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=44.254512s (sample 1951624): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=44.254558s (sample 1951626): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=44.254558s (sample 1951626): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(713, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=44.270726s (sample 1952339): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=44.270771s (sample 1952341): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=44.270771s (sample 1952341): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(6646, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=44.421474s (sample 1958987): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x42); // t=44.421474s (sample 1958987): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=44.421497s (sample 1958988): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=44.421769s (sample 1959000): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=44.421814s (sample 1959002): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=44.421814s (sample 1959002): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=44.438163s (sample 1959723): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(4437, 44100);
  gb.writeRegister(0x0d, 0x42); // t=44.538776s (sample 1964160): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=44.538798s (sample 1964161): CH3 written pitch 146.942 Hz; trigger false, length enabled false
  await sleepSamples(2208, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=44.588866s (sample 1966369): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x6b); // t=44.588889s (sample 1966370): CH2 written pitch 879.678 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=44.588889s (sample 1966370): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(10, 44100);
  gb.setPan(0, true, true); // t=44.589116s (sample 1966380): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=44.589342s (sample 1966390): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=44.589365s (sample 1966391): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=44.589365s (sample 1966391): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(715, 44100);
  gb.writeRegister(0x08, 0x6b); // t=44.605578s (sample 1967106): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=44.605601s (sample 1967107): CH2 written pitch 879.678 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=44.605624s (sample 1967108): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=44.605646s (sample 1967109): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=44.622336s (sample 1967845): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=44.622381s (sample 1967847): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=44.622381s (sample 1967847): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(738, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=44.639116s (sample 1968585): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(4429, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=44.739546s (sample 1973014): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=44.756349s (sample 1973755): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x72); // t=44.756349s (sample 1973755): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=44.756372s (sample 1973756): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=44.773039s (sample 1974491): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=44.773084s (sample 1974493): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=44.773084s (sample 1974493): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.writeRegister(0x0d, 0x43); // t=44.840023s (sample 1977445): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=44.840045s (sample 1977446): CH3 written pitch 147.272 Hz; trigger false, length enabled false
  await sleepSamples(4431, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=44.940522s (sample 1981877): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=44.940544s (sample 1981878): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=44.940544s (sample 1981878): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=44.940839s (sample 1981891): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(1460, 44100);
  gb.writeRegister(0x03, 0x9e); // t=44.973946s (sample 1983351): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=44.973968s (sample 1983352): CH1 written pitch 370.260 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=44.973991s (sample 1983353): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=44.974014s (sample 1983354): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(2959, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=45.041111s (sample 1986313): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(2948, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=45.107959s (sample 1989261): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=45.107982s (sample 1989262): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=45.107982s (sample 1989262): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=45.108254s (sample 1989274): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=45.108299s (sample 1989276): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=45.108299s (sample 1989276): CH2 written pitch 885.622 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=45.124649s (sample 1989997): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=45.124694s (sample 1989999): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=45.124694s (sample 1989999): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=45.141406s (sample 1990736): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(744, 44100);
  gb.writeRegister(0x08, 0x6d); // t=45.158277s (sample 1991480): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=45.158299s (sample 1991481): CH2 written pitch 891.646 Hz; trigger false, length enabled false
  await sleepSamples(2208, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=45.208367s (sample 1993689): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=45.241882s (sample 1995167): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=45.258594s (sample 1995904): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(746, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=45.275510s (sample 1996650): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=45.275533s (sample 1996651): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=45.275533s (sample 1996651): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0xd6); // t=45.275805s (sample 1996663): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=45.275828s (sample 1996664): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=45.275850s (sample 1996665): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=45.275873s (sample 1996666): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(1454, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=45.308844s (sample 1998120): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=45.342336s (sample 1999597): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.writeRegister(0x08, 0x6d); // t=45.359048s (sample 2000334): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=45.359070s (sample 2000335): CH2 written pitch 891.646 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=45.409297s (sample 2002550): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1479, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=45.442834s (sample 2004029): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=45.442857s (sample 2004030): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=45.442857s (sample 2004030): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=45.443175s (sample 2004044): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(721, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=45.459524s (sample 2004765): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.writeRegister(0x03, 0x72); // t=45.476259s (sample 2005503): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=45.476281s (sample 2005504): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=45.476304s (sample 2005505): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=45.476327s (sample 2005506): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1482, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=45.509932s (sample 2006988): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1469, 44100);
  gb.writeRegister(0x0d, 0x42); // t=45.543243s (sample 2008457): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=45.543265s (sample 2008458): CH3 written pitch 146.942 Hz; trigger false, length enabled false
  await sleepSamples(744, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=45.560136s (sample 2009202): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2208, 44100);
  gb.writeRegister(0x08, 0x6c); // t=45.610204s (sample 2011410): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=45.610227s (sample 2011411): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=45.627007s (sample 2012151): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=45.627029s (sample 2012152): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=45.627052s (sample 2012153): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=45.627324s (sample 2012165): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=45.627370s (sample 2012167): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=45.627370s (sample 2012167): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(722, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=45.643741s (sample 2012889): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=45.660454s (sample 2013626): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=45.710703s (sample 2015842): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1476, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=45.744172s (sample 2017318): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=45.760907s (sample 2018056): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1479, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=45.794444s (sample 2019535): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=45.794467s (sample 2019536): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=45.794490s (sample 2019537): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(734, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=45.811134s (sample 2020271): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=45.827891s (sample 2021010): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=45.827937s (sample 2021012): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=45.827937s (sample 2021012): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(744, 44100);
  gb.writeRegister(0x0d, 0x43); // t=45.844807s (sample 2021756): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=45.844830s (sample 2021757): CH3 written pitch 147.272 Hz; trigger false, length enabled false
  await sleepSamples(729, 44100);
  gb.writeRegister(0x08, 0x6b); // t=45.861361s (sample 2022486): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=45.861383s (sample 2022487): CH2 written pitch 879.678 Hz; trigger false, length enabled false
  await sleepSamples(2222, 44100);
  gb.writeRegister(0x08, 0x6c); // t=45.911769s (sample 2024709): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=45.911791s (sample 2024710): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(1469, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=45.945102s (sample 2026179): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=45.961859s (sample 2026918): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x62); // t=45.961882s (sample 2026919): CH2 written pitch 829.570 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=45.961882s (sample 2026919): CH2 written pitch 829.570 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.setPan(0, false, true); // t=45.962086s (sample 2026928): channel routing (low nibble right, high nibble left)
  await sleepSamples(11, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=45.962336s (sample 2026939): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0xd6); // t=45.962336s (sample 2026939): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=45.962358s (sample 2026940): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 829.5696202531645); // t=45.962630s (sample 2026952): CH2 written pitch 829.570 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=45.962676s (sample 2026954): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=45.962676s (sample 2026954): CH2 written pitch 829.570 Hz; trigger true, length enabled false
  await sleepSamples(701, 44100);
  gb.writeRegister(0x03, 0xd6); // t=45.978571s (sample 2027655): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=45.978594s (sample 2027656): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=45.978617s (sample 2027657): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=45.978639s (sample 2027658): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=46.045578s (sample 2030610): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(3692, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=46.129297s (sample 2034302): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x6b); // t=46.129320s (sample 2034303): CH2 written pitch 879.678 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=46.129320s (sample 2034303): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=46.129524s (sample 2034312): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=46.129546s (sample 2034313): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=46.129546s (sample 2034313): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=46.129819s (sample 2034325): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=46.129864s (sample 2034327): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=46.129864s (sample 2034327): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(713, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=46.146032s (sample 2035040): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=46.162766s (sample 2035778): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=46.162789s (sample 2035779): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=46.162812s (sample 2035780): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(3698, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=46.246667s (sample 2039478): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(2946, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=46.313469s (sample 2042424): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x7b); // t=46.313492s (sample 2042425): CH2 written pitch 985.504 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=46.313492s (sample 2042425): CH2 written pitch 985.504 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=46.313696s (sample 2042434): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=46.313719s (sample 2042435): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=46.313719s (sample 2042435): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x08, 0x7b); // t=46.313991s (sample 2042447): CH2 written pitch 985.504 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=46.314014s (sample 2042448): CH2 written pitch 985.504 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=46.314036s (sample 2042449): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=46.314059s (sample 2042450): CH2 written pitch 985.504 Hz; trigger true, length enabled false
  await sleepSamples(712, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=46.330204s (sample 2043162): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=46.330249s (sample 2043164): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=46.330249s (sample 2043164): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=46.346961s (sample 2043901): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.wave.setFrequency(147.27191011235956); // t=46.447438s (sample 2048332): CH3 written pitch 147.272 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=46.480952s (sample 2049810): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=46.480975s (sample 2049811): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=46.480975s (sample 2049811): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x42); // t=46.481247s (sample 2049823): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=46.481270s (sample 2049824): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=46.481293s (sample 2049825): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=46.481315s (sample 2049826): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(2935, 44100);
  gb.writeRegister(0x0d, 0x42); // t=46.547868s (sample 2052761): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=46.547891s (sample 2052762): CH3 written pitch 146.942 Hz; trigger false, length enabled false
  await sleepSamples(4430, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=46.648345s (sample 2057192): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x6b); // t=46.648367s (sample 2057193): CH2 written pitch 879.678 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=46.648367s (sample 2057193): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=46.648685s (sample 2057207): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=46.648707s (sample 2057208): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=46.648707s (sample 2057208): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(8, 44100);
  gb.wave.setLevel(0.5); // t=46.648889s (sample 2057216): CH3 output level 50%
  gb.wave.setFrequency(130.81037924151696); // t=46.648889s (sample 2057216): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(11, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=46.649138s (sample 2057227): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(703, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=46.665079s (sample 2057930): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=46.665102s (sample 2057931): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=46.665125s (sample 2057932): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x03, 0xd6); // t=46.681814s (sample 2058668): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=46.681837s (sample 2058669): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=46.681859s (sample 2058670): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=46.681859s (sample 2058670): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(5908, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=46.815828s (sample 2064578): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=46.815850s (sample 2064579): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=46.815850s (sample 2064579): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=46.832517s (sample 2065314): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=46.832562s (sample 2065316): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=46.832562s (sample 2065316): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(6646, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=46.983265s (sample 2071962): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=46.983288s (sample 2071963): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=46.983288s (sample 2071963): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x9e); // t=46.983560s (sample 2071975): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=46.983583s (sample 2071976): CH1 written pitch 370.260 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=46.983605s (sample 2071977): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=46.983628s (sample 2071978): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(7366, 44100);
  gb.wave.setFrequency(131.072); // t=47.150658s (sample 2079344): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=47.167438s (sample 2080084): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=47.167460s (sample 2080085): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=47.167460s (sample 2080085): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x08, 0x6c); // t=47.167732s (sample 2080097): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=47.167755s (sample 2080098): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=47.167778s (sample 2080099): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=47.167800s (sample 2080100): CH2 written pitch 885.622 Hz; trigger true, length enabled false
  await sleepSamples(720, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=47.184127s (sample 2080820): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=47.184172s (sample 2080822): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=47.184172s (sample 2080822): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1482, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=47.217778s (sample 2082304): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1470, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=47.251111s (sample 2083774): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=47.267846s (sample 2084512): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=47.318073s (sample 2086727): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=47.334853s (sample 2087467): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x21); // t=47.334853s (sample 2087467): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=47.334875s (sample 2087468): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.setPan(0, true, true); // t=47.335079s (sample 2087477): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=47.335306s (sample 2087487): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=47.335329s (sample 2087488): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=47.335351s (sample 2087489): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=47.335624s (sample 2087501): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=47.335669s (sample 2087503): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=47.335669s (sample 2087503): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(702, 44100);
  gb.writeRegister(0x0d, 0x0c); // t=47.351587s (sample 2088205): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=47.351610s (sample 2088206): CH3 written pitch 131.072 Hz; trigger false, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x08, 0x21); // t=47.368299s (sample 2088942): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=47.368322s (sample 2088943): CH2 written pitch 587.767 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=47.368345s (sample 2088944): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=47.368367s (sample 2088945): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(3697, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=47.452200s (sample 2092642): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(2210, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=47.502313s (sample 2094852): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=47.502336s (sample 2094853): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=47.502336s (sample 2094853): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1474, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=47.535760s (sample 2096327): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=47.535805s (sample 2096329): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=47.535805s (sample 2096329): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(131.072); // t=47.552517s (sample 2097066): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(4430, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=47.652971s (sample 2101496): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=47.669751s (sample 2102236): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=47.669773s (sample 2102237): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=47.669773s (sample 2102237): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.writeRegister(0x03, 0x9e); // t=47.686440s (sample 2102972): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=47.686463s (sample 2102973): CH1 written pitch 370.260 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=47.686485s (sample 2102974): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=47.686485s (sample 2102974): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(2953, 44100);
  gb.wave.setFrequency(131.072); // t=47.753447s (sample 2105927): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(4432, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=47.853946s (sample 2110359): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x42); // t=47.853946s (sample 2110359): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=47.853968s (sample 2110360): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x0d, 0x0b); // t=47.854240s (sample 2110372): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=47.854263s (sample 2110373): CH3 written pitch 130.810 Hz; trigger false, length enabled false
  await sleepSamples(721, 44100);
  gb.writeRegister(0x08, 0x22); // t=47.870612s (sample 2111094): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=47.870635s (sample 2111095): CH2 written pitch 590.414 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=47.870658s (sample 2111096): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=47.870680s (sample 2111097): CH2 written pitch 590.414 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=47.887370s (sample 2111833): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=47.887415s (sample 2111835): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=47.887415s (sample 2111835): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1475, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=47.920862s (sample 2113310): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(1485, 44100);
  gb.wave.setFrequency(131.072); // t=47.954535s (sample 2114795): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(730, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=47.971088s (sample 2115525): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2223, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=48.021497s (sample 2117748): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0xd6); // t=48.021497s (sample 2117748): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=48.021519s (sample 2117749): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=48.021791s (sample 2117761): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(718, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=48.038073s (sample 2118479): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=48.038118s (sample 2118481): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=48.038118s (sample 2118481): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x0d, 0x0b); // t=48.054807s (sample 2119217): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=48.054830s (sample 2119218): CH3 written pitch 130.810 Hz; trigger false, length enabled false
  await sleepSamples(745, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=48.071723s (sample 2119963): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2207, 44100);
  gb.writeRegister(0x08, 0x23); // t=48.121769s (sample 2122170): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=48.121791s (sample 2122171): CH2 written pitch 593.086 Hz; trigger false, length enabled false
  await sleepSamples(1478, 44100);
  gb.wave.setFrequency(131.072); // t=48.155306s (sample 2123649): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=48.172018s (sample 2124386): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=48.188821s (sample 2125127): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x72); // t=48.188821s (sample 2125127): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=48.188844s (sample 2125128): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=48.189116s (sample 2125140): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=48.189161s (sample 2125142): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=48.189161s (sample 2125142): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1459, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=48.222245s (sample 2126601): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1484, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=48.255896s (sample 2128085): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(732, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=48.272494s (sample 2128817): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2214, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=48.322698s (sample 2131031): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(1480, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=48.356259s (sample 2132511): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x9e); // t=48.356259s (sample 2132511): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=48.356281s (sample 2132512): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.writeRegister(0x0d, 0x0c); // t=48.356576s (sample 2132525): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=48.356599s (sample 2132526): CH3 written pitch 131.072 Hz; trigger false, length enabled false
  await sleepSamples(720, 44100);
  gb.writeRegister(0x08, 0x22); // t=48.372925s (sample 2133246): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=48.372948s (sample 2133247): CH2 written pitch 590.414 Hz; trigger false, length enabled false
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(0, 370.2598870056497); // t=48.389683s (sample 2133985): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=48.389728s (sample 2133987): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=48.389728s (sample 2133987): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(1482, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=48.423333s (sample 2135469): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1470, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=48.456667s (sample 2136939): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(746, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=48.473583s (sample 2137685): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2207, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=48.523628s (sample 2139892): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=48.540431s (sample 2140633): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=48.540454s (sample 2140634): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=48.540454s (sample 2140634): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x42); // t=48.540726s (sample 2140646): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=48.540748s (sample 2140647): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=48.540771s (sample 2140648): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=48.540794s (sample 2140649): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.wave.setFrequency(131.072); // t=48.557143s (sample 2141370): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=48.573855s (sample 2142107): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0x21); // t=48.624082s (sample 2144322): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=48.624104s (sample 2144323): CH2 written pitch 587.767 Hz; trigger false, length enabled false
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=48.657596s (sample 2145800): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.writeRegister(0x08, 0x22); // t=48.674331s (sample 2146538): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=48.674354s (sample 2146539): CH2 written pitch 590.414 Hz; trigger false, length enabled false
  await sleepSamples(1477, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=48.707846s (sample 2148016): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x21); // t=48.707846s (sample 2148016): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=48.707868s (sample 2148017): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.setPan(0, true, false); // t=48.708073s (sample 2148026): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=48.708299s (sample 2148036): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=48.708322s (sample 2148037): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=48.708322s (sample 2148037): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(716, 44100);
  gb.pulse.setFrequency(1, 587.7668161434977); // t=48.724558s (sample 2148753): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=48.724603s (sample 2148755): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=48.724603s (sample 2148755): CH2 written pitch 587.767 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x03, 0xd6); // t=48.741293s (sample 2149491): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=48.741315s (sample 2149492): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=48.741338s (sample 2149493): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=48.741361s (sample 2149494): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(744, 44100);
  gb.wave.setFrequency(131.072); // t=48.758231s (sample 2150238): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(4423, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=48.858526s (sample 2154661): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=48.875306s (sample 2155401): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=48.875329s (sample 2155402): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=48.875329s (sample 2155402): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=48.891995s (sample 2156137): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=48.892041s (sample 2156139): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=48.892041s (sample 2156139): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2953, 44100);
  gb.wave.setFrequency(131.072); // t=48.959002s (sample 2159092): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(3693, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=49.042744s (sample 2162785): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x9e); // t=49.042766s (sample 2162786): CH1 written pitch 370.260 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=49.042766s (sample 2162786): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x9e); // t=49.043039s (sample 2162798): CH1 written pitch 370.260 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=49.043061s (sample 2162799): CH1 written pitch 370.260 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=49.043084s (sample 2162800): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=49.043107s (sample 2162801): CH1 written pitch 370.260 Hz; trigger true, length enabled false
  await sleepSamples(720, 44100);
  gb.writeRegister(0x0d, 0x0b); // t=49.059433s (sample 2163521): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=49.059456s (sample 2163522): CH3 written pitch 130.810 Hz; trigger false, length enabled false
  await sleepSamples(4438, 44100);
  gb.wave.setFrequency(131.072); // t=49.160091s (sample 2167960): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(2947, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=49.226916s (sample 2170907): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=49.226939s (sample 2170908): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=49.226961s (sample 2170909): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=49.227234s (sample 2170921): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=49.227256s (sample 2170922): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=49.227279s (sample 2170923): CH2 written pitch 590.414 Hz; trigger true, length enabled false
  await sleepSamples(720, 44100);
  gb.writeRegister(0x03, 0x42); // t=49.243605s (sample 2171643): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=49.243628s (sample 2171644): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=49.243651s (sample 2171645): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=49.243673s (sample 2171646): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.wave.setFrequency(130.81037924151696); // t=49.260363s (sample 2172382): CH3 written pitch 130.810 Hz; no retrigger
  await sleepSamples(745, 44100);
  gb.pulse.setFrequency(1, 593.0859728506788); // t=49.277256s (sample 2173127): CH2 written pitch 593.086 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 590.4144144144144); // t=49.327483s (sample 2175342): CH2 written pitch 590.414 Hz; no retrigger
  await sleepSamples(1471, 44100);
  gb.writeRegister(0x0d, 0x0c); // t=49.360839s (sample 2176813): CH3 written pitch 131.072 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x06); // t=49.360862s (sample 2176814): CH3 written pitch 131.072 Hz; trigger false, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x08, 0x21); // t=49.377551s (sample 2177550): CH2 written pitch 587.767 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=49.377574s (sample 2177551): CH2 written pitch 587.767 Hz; trigger false, length enabled false
  await sleepSamples(742, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=49.394399s (sample 2178293): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x90); // t=49.394422s (sample 2178294): CH2 written pitch 1170.286 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=49.394422s (sample 2178294): CH2 written pitch 1170.286 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=49.394739s (sample 2178308): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0xe7); // t=49.394739s (sample 2178308): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=49.394762s (sample 2178309): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(11, 44100);
  gb.wave.setLevel(0.5); // t=49.395011s (sample 2178320): CH3 output level 50%
  gb.wave.setFrequency(116.61209964412811); // t=49.395011s (sample 2178320): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(10, 44100);
  gb.writeRegister(0x03, 0xe7); // t=49.395238s (sample 2178330): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=49.395261s (sample 2178331): CH1 written pitch 466.448 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=49.395283s (sample 2178332): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=49.395306s (sample 2178333): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(695, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=49.411066s (sample 2179028): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 1170.2857142857142); // t=49.427800s (sample 2179766): CH2 written pitch 1170.286 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=49.427846s (sample 2179768): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=49.427846s (sample 2179768): CH2 written pitch 1170.286 Hz; trigger true, length enabled false
  await sleepSamples(5907, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=49.561791s (sample 2185675): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=49.561814s (sample 2185676): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=49.561837s (sample 2185677): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1473, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=49.595238s (sample 2187150): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=49.595283s (sample 2187152): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=49.595283s (sample 2187152): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(5907, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=49.729229s (sample 2193059): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x89); // t=49.729252s (sample 2193060): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=49.729274s (sample 2193061): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(734, 44100);
  gb.writeRegister(0x03, 0x89); // t=49.745918s (sample 2193795): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=49.745941s (sample 2193796): CH1 written pitch 349.525 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=49.745964s (sample 2193797): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=49.745986s (sample 2193798): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(7384, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=49.913424s (sample 2201182): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=49.913447s (sample 2201183): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=49.913447s (sample 2201183): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=49.913741s (sample 2201196): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(722, 44100);
  gb.pulse.setFrequency(1, 1180.8288288288288); // t=49.930113s (sample 2201918): CH2 written pitch 1180.829 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=49.930159s (sample 2201920): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=49.930159s (sample 2201920): CH2 written pitch 1180.829 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x03, 0x42); // t=49.946848s (sample 2202656): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=49.946871s (sample 2202657): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=49.946893s (sample 2202658): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=49.946893s (sample 2202658): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1475, 44100);
  gb.pulse.setFrequency(1, 1191.5636363636363); // t=49.980340s (sample 2204133): CH2 written pitch 1191.564 Hz; no retrigger
  await sleepSamples(1484, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=50.013991s (sample 2205617): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(731, 44100);
  gb.pulse.setFrequency(1, 1180.8288288288288); // t=50.030567s (sample 2206348): CH2 written pitch 1180.829 Hz; no retrigger
  await sleepSamples(2218, 44100);
  gb.setPan(0, true, true); // t=50.080862s (sample 2208566): channel routing (low nibble right, high nibble left)
  await sleepSamples(11, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=50.081111s (sample 2208577): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0xe7); // t=50.081111s (sample 2208577): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=50.081134s (sample 2208578): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 1170.2857142857142); // t=50.081406s (sample 2208590): CH2 written pitch 1170.286 Hz; no retrigger
  await sleepSamples(712, 44100);
  gb.pulse.setFrequency(0, 466.44839857651243); // t=50.097551s (sample 2209302): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=50.097596s (sample 2209304): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=50.097596s (sample 2209304): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(738, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=50.114331s (sample 2210042): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(744, 44100);
  gb.pulse.setFrequency(1, 1180.8288288288288); // t=50.131202s (sample 2210786): CH2 written pitch 1180.829 Hz; no retrigger
  await sleepSamples(2208, 44100);
  gb.pulse.setFrequency(1, 1191.5636363636363); // t=50.181270s (sample 2212994): CH2 written pitch 1191.564 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=50.214762s (sample 2214471): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 1180.8288288288288); // t=50.231497s (sample 2215209): CH2 written pitch 1180.829 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=50.248299s (sample 2215950): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=50.248322s (sample 2215951): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=50.248322s (sample 2215951): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x72); // t=50.248594s (sample 2215963): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=50.248617s (sample 2215964): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=50.248639s (sample 2215965): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=50.248662s (sample 2215966): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1458, 44100);
  gb.pulse.setFrequency(1, 1170.2857142857142); // t=50.281723s (sample 2217424): CH2 written pitch 1170.286 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.writeRegister(0x0d, 0xcf); // t=50.315238s (sample 2218902): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=50.315261s (sample 2218903): CH3 written pitch 116.820 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 1180.8288288288288); // t=50.331973s (sample 2219640): CH2 written pitch 1180.829 Hz; no retrigger
  await sleepSamples(2214, 44100);
  gb.writeRegister(0x08, 0x92); // t=50.382177s (sample 2221854): CH2 written pitch 1191.564 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=50.382200s (sample 2221855): CH2 written pitch 1191.564 Hz; trigger false, length enabled false
  await sleepSamples(1477, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=50.415692s (sample 2223332): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x90); // t=50.415714s (sample 2223333): CH2 written pitch 1170.286 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=50.415714s (sample 2223333): CH2 written pitch 1170.286 Hz; trigger true, length enabled false
  await sleepSamples(9, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=50.415918s (sample 2223342): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x89); // t=50.415941s (sample 2223343): CH1 written pitch 349.525 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=50.415941s (sample 2223343): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=50.416236s (sample 2223356): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(714, 44100);
  gb.pulse.setFrequency(1, 1170.2857142857142); // t=50.432426s (sample 2224070): CH2 written pitch 1170.286 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=50.432472s (sample 2224072): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=50.432472s (sample 2224072): CH2 written pitch 1170.286 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x03, 0x89); // t=50.449161s (sample 2224808): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=50.449184s (sample 2224809): CH1 written pitch 349.525 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=50.449206s (sample 2224810): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=50.449206s (sample 2224810): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(2953, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=50.516168s (sample 2227763): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(3693, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=50.599909s (sample 2231456): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=50.599932s (sample 2231457): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=50.599932s (sample 2231457): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=50.600227s (sample 2231470): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=50.600272s (sample 2231472): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=50.600272s (sample 2231472): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=50.616621s (sample 2232193): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(4431, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=50.717098s (sample 2236624): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=50.767324s (sample 2238839): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x83); // t=50.767324s (sample 2238839): CH2 written pitch 1048.576 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=50.767347s (sample 2238840): CH2 written pitch 1048.576 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=50.767642s (sample 2238853): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xe7); // t=50.767664s (sample 2238854): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=50.767687s (sample 2238855): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.pulse.setFrequency(1, 1048.576); // t=50.784036s (sample 2239576): CH2 written pitch 1048.576 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=50.784082s (sample 2239578): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=50.784082s (sample 2239578): CH2 written pitch 1048.576 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(0, 466.44839857651243); // t=50.800794s (sample 2240315): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=50.800839s (sample 2240317): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=50.800839s (sample 2240317): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(743, 44100);
  gb.writeRegister(0x0d, 0xce); // t=50.817687s (sample 2241060): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=50.817710s (sample 2241061): CH3 written pitch 116.612 Hz; trigger false, length enabled false
  await sleepSamples(4424, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=50.918027s (sample 2245485): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=50.934785s (sample 2246224): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=50.934807s (sample 2246225): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=50.934807s (sample 2246225): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.writeRegister(0x03, 0x72); // t=50.951474s (sample 2246960): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=50.951497s (sample 2246961): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=50.951519s (sample 2246962): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=50.951542s (sample 2246963): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2951, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=51.018458s (sample 2249914): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(3694, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=51.102222s (sample 2253608): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x89); // t=51.102245s (sample 2253609): CH1 written pitch 349.525 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=51.102245s (sample 2253609): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 349.5253333333333); // t=51.102540s (sample 2253622): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=51.102585s (sample 2253624): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=51.102585s (sample 2253624): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.writeRegister(0x0d, 0xcf); // t=51.118934s (sample 2254345): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=51.118957s (sample 2254346): CH3 written pitch 116.820 Hz; trigger false, length enabled false
  await sleepSamples(4436, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=51.219546s (sample 2258782): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(2210, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=51.269660s (sample 2260992): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=51.269683s (sample 2260993): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=51.269683s (sample 2260993): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(1, 1057.032258064516); // t=51.286349s (sample 2261728): CH2 written pitch 1057.032 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=51.286395s (sample 2261730): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=51.286395s (sample 2261730): CH2 written pitch 1057.032 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=51.303107s (sample 2262467): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=51.303152s (sample 2262469): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=51.303152s (sample 2262469): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.writeRegister(0x0d, 0xcf); // t=51.319864s (sample 2263206): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=51.319887s (sample 2263207): CH3 written pitch 116.820 Hz; trigger false, length enabled false
  await sleepSamples(743, 44100);
  gb.pulse.setFrequency(1, 1065.6260162601627); // t=51.336735s (sample 2263950): CH2 written pitch 1065.626 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0x84); // t=51.386961s (sample 2266165): CH2 written pitch 1057.032 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=51.386984s (sample 2266166): CH2 written pitch 1057.032 Hz; trigger false, length enabled false
  await sleepSamples(1470, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=51.420317s (sample 2267636): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 1048.576); // t=51.437052s (sample 2268374): CH2 written pitch 1048.576 Hz; no retrigger
  await sleepSamples(742, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=51.453878s (sample 2269116): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x73); // t=51.453900s (sample 2269117): CH2 written pitch 929.589 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=51.453900s (sample 2269117): CH2 written pitch 929.589 Hz; trigger true, length enabled false
  await sleepSamples(10, 44100);
  gb.setPan(0, false, true); // t=51.454127s (sample 2269127): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=51.454354s (sample 2269137): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xe7); // t=51.454376s (sample 2269138): CH1 written pitch 466.448 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=51.454376s (sample 2269138): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0xe7); // t=51.454649s (sample 2269150): CH1 written pitch 466.448 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=51.454671s (sample 2269151): CH1 written pitch 466.448 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=51.454694s (sample 2269152): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=51.454717s (sample 2269153): CH1 written pitch 466.448 Hz; trigger true, length enabled false
  await sleepSamples(1436, 44100);
  gb.pulse.setFrequency(1, 929.5886524822695); // t=51.487279s (sample 2270589): CH2 written pitch 929.589 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=51.487324s (sample 2270591): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=51.487324s (sample 2270591): CH2 written pitch 929.589 Hz; trigger true, length enabled false
  await sleepSamples(1476, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=51.520794s (sample 2272067): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(4432, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=51.621293s (sample 2276499): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x72); // t=51.621293s (sample 2276499): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=51.621315s (sample 2276500): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x0d, 0xce); // t=51.621587s (sample 2276512): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=51.621610s (sample 2276513): CH3 written pitch 116.612 Hz; trigger false, length enabled false
  await sleepSamples(1460, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=51.654717s (sample 2277973): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=51.654762s (sample 2277975): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=51.654762s (sample 2277975): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(2953, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=51.721723s (sample 2280928): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(2955, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=51.788730s (sample 2283883): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x89); // t=51.788730s (sample 2283883): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=51.788753s (sample 2283884): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 349.5253333333333); // t=51.805420s (sample 2284619): CH1 written pitch 349.525 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=51.805465s (sample 2284621): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=51.805465s (sample 2284621): CH1 written pitch 349.525 Hz; trigger true, length enabled false
  await sleepSamples(736, 44100);
  gb.writeRegister(0x0d, 0xce); // t=51.822154s (sample 2285357): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=51.822177s (sample 2285358): CH3 written pitch 116.612 Hz; trigger false, length enabled false
  await sleepSamples(4431, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=51.922653s (sample 2289789): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(1478, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=51.956168s (sample 2291267): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0x42); // t=51.956168s (sample 2291267): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=51.956190s (sample 2291268): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=51.956463s (sample 2291280): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=51.956508s (sample 2291282): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=51.956508s (sample 2291282): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1459, 44100);
  gb.pulse.setFrequency(1, 936.2285714285714); // t=51.989592s (sample 2292741): CH2 written pitch 936.229 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=51.989637s (sample 2292743): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=51.989637s (sample 2292743): CH2 written pitch 936.229 Hz; trigger true, length enabled false
  await sleepSamples(1482, 44100);
  gb.wave.setFrequency(116.61209964412811); // t=52.023243s (sample 2294225): CH3 written pitch 116.612 Hz; no retrigger
  await sleepSamples(731, 44100);
  gb.pulse.setFrequency(1, 942.9640287769785); // t=52.039819s (sample 2294956): CH2 written pitch 942.964 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 936.2285714285714); // t=52.090045s (sample 2297171): CH2 written pitch 936.229 Hz; no retrigger
  await sleepSamples(1479, 44100);
  gb.wave.setFrequency(116.81996434937611); // t=52.123583s (sample 2298650): CH3 written pitch 116.820 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=52.140317s (sample 2299388): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x08, 0x6b); // t=52.140317s (sample 2299388): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=52.140340s (sample 2299389): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=52.140635s (sample 2299402): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=52.140658s (sample 2299403): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=52.140658s (sample 2299403): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(8, 44100);
  gb.wave.setLevel(0.5); // t=52.140839s (sample 2299411): CH3 output level 50%
  gb.writeRegister(0x0d, 0xac); // t=52.140839s (sample 2299411): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=52.140862s (sample 2299412): CH3 written pitch 109.960 Hz; trigger false, length enabled false
  await sleepSamples(9, 44100);
  gb.writeRegister(0x08, 0x6b); // t=52.141066s (sample 2299421): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=52.141088s (sample 2299422): CH2 written pitch 879.678 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=52.141111s (sample 2299423): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x87); // t=52.141134s (sample 2299424): CH2 written pitch 879.678 Hz; trigger true, length enabled false
  await sleepSamples(701, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=52.157029s (sample 2300125): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=52.157075s (sample 2300127): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=52.157075s (sample 2300127): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=52.173787s (sample 2300864): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(5909, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=52.307778s (sample 2306773): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=52.307800s (sample 2306774): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=52.307800s (sample 2306774): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x42); // t=52.308073s (sample 2306786): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=52.308095s (sample 2306787): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=52.308118s (sample 2306788): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=52.308141s (sample 2306789): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(7368, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=52.475215s (sample 2314157): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=52.475238s (sample 2314158): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=52.475238s (sample 2314158): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1473, 44100);
  gb.writeRegister(0x03, 0x72); // t=52.508639s (sample 2315631): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=52.508662s (sample 2315632): CH1 written pitch 329.327 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=52.508685s (sample 2315633): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=52.508707s (sample 2315634): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(5907, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=52.642653s (sample 2321541): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x27); // t=52.642676s (sample 2321542): CH1 written pitch 277.108 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=52.642676s (sample 2321542): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=52.642948s (sample 2321554): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(1, {volume: 15, direction: 'down', period: 7}); // t=52.642993s (sample 2321556): CH2 envelope: initial volume 15, down, period 7 (109.375 ms/step); no retrigger
  gb.writeRegister(0x09, 0x87); // t=52.642993s (sample 2321556): CH2 written pitch 885.622 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.pulse.setFrequency(0, 277.107822410148); // t=52.659342s (sample 2322277): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=52.659388s (sample 2322279): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=52.659388s (sample 2322279): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=52.676100s (sample 2323016): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=52.692834s (sample 2323754): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=52.743061s (sample 2325969): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=52.776553s (sample 2327446): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=52.793288s (sample 2328184): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1480, 44100);
  gb.setPan(0, true, true); // t=52.826848s (sample 2329664): channel routing (low nibble right, high nibble left)
  await sleepSamples(10, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=52.827075s (sample 2329674): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=52.827098s (sample 2329675): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=52.827098s (sample 2329675): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(725, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=52.843537s (sample 2330400): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=52.860272s (sample 2331138): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=52.860317s (sample 2331140): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=52.860317s (sample 2331140): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(744, 44100);
  gb.writeRegister(0x0d, 0xad); // t=52.877188s (sample 2331884): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=52.877211s (sample 2331885): CH3 written pitch 110.145 Hz; trigger false, length enabled false
  await sleepSamples(729, 44100);
  gb.writeRegister(0x08, 0x6d); // t=52.893741s (sample 2332614): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=52.893764s (sample 2332615): CH2 written pitch 891.646 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=52.943991s (sample 2334830): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=52.977483s (sample 2336307): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=52.994263s (sample 2337047): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=52.994286s (sample 2337048): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=52.994308s (sample 2337049): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=52.994580s (sample 2337061): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(722, 44100);
  gb.writeRegister(0x03, 0x42); // t=53.010952s (sample 2337783): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=53.010975s (sample 2337784): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=53.010998s (sample 2337785): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=53.011020s (sample 2337786): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1482, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=53.044626s (sample 2339268): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1470, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=53.077959s (sample 2340738): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=53.094671s (sample 2341475): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0x6c); // t=53.144898s (sample 2343690): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=53.144921s (sample 2343691): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(740, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=53.161701s (sample 2344431): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=53.161723s (sample 2344432): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=53.161746s (sample 2344433): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=53.162018s (sample 2344445): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=53.162063s (sample 2344447): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=53.162063s (sample 2344447): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=53.178413s (sample 2345168): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=53.195147s (sample 2345906): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=53.245397s (sample 2348122): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1484, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=53.279048s (sample 2349606): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(730, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=53.295601s (sample 2350336): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1479, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=53.329138s (sample 2351815): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x27); // t=53.329161s (sample 2351816): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=53.329184s (sample 2351817): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(734, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=53.345828s (sample 2352551): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setFrequency(0, 277.107822410148); // t=53.362585s (sample 2353290): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 6, direction: 'down', period: 4}); // t=53.362630s (sample 2353292): CH1 envelope: initial volume 6, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=53.362630s (sample 2353292): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=53.379342s (sample 2354029): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(744, 44100);
  gb.writeRegister(0x08, 0x6b); // t=53.396213s (sample 2354773): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=53.396236s (sample 2354774): CH2 written pitch 879.678 Hz; trigger false, length enabled false
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0x6c); // t=53.446463s (sample 2356989): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=53.446485s (sample 2356990): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(1470, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=53.479819s (sample 2358460): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=53.496531s (sample 2359197): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(746, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=53.513447s (sample 2359943): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0xd6); // t=53.513469s (sample 2359944): CH1 written pitch 439.839 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=53.513469s (sample 2359944): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.pulse.setFrequency(0, 439.83892617449663); // t=53.513741s (sample 2359956): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=53.513787s (sample 2359958): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=53.513787s (sample 2359958): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(1454, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=53.546757s (sample 2361412): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.writeRegister(0x0d, 0xac); // t=53.580249s (sample 2362889): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=53.580272s (sample 2362890): CH3 written pitch 109.960 Hz; trigger false, length enabled false
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=53.596984s (sample 2363627): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2216, 44100);
  gb.writeRegister(0x08, 0x6c); // t=53.647234s (sample 2365843): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=53.647256s (sample 2365844): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(1478, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=53.680771s (sample 2367322): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=53.680794s (sample 2367323): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=53.680794s (sample 2367323): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=53.681111s (sample 2367337): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(721, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=53.697460s (sample 2368058): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.writeRegister(0x03, 0x42); // t=53.714195s (sample 2368796): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=53.714218s (sample 2368797): CH1 written pitch 293.883 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=53.714240s (sample 2368798): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=53.714240s (sample 2368798): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(1475, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=53.747687s (sample 2370273): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=53.781179s (sample 2371750): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(745, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=53.798073s (sample 2372495): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(2211, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=53.848209s (sample 2374706): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=53.848231s (sample 2374707): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=53.848231s (sample 2374707): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=53.848526s (sample 2374720): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(722, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=53.864898s (sample 2375442): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=53.864943s (sample 2375444): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=53.864943s (sample 2375444): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(737, 44100);
  gb.writeRegister(0x0d, 0xad); // t=53.881655s (sample 2376181): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=53.881678s (sample 2376182): CH3 written pitch 110.145 Hz; trigger false, length enabled false
  await sleepSamples(743, 44100);
  gb.writeRegister(0x08, 0x6d); // t=53.898526s (sample 2376925): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=53.898549s (sample 2376926): CH2 written pitch 891.646 Hz; trigger false, length enabled false
  await sleepSamples(2208, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=53.948617s (sample 2379134): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=53.982109s (sample 2380611): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(738, 44100);
  gb.pulse.setFrequency(1, 879.6778523489933); // t=53.998844s (sample 2381349): CH2 written pitch 879.678 Hz; no retrigger
  await sleepSamples(741, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=54.015646s (sample 2382090): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x27); // t=54.015669s (sample 2382091): CH1 written pitch 277.108 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=54.015669s (sample 2382091): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(12, 44100);
  gb.writeRegister(0x03, 0x27); // t=54.015941s (sample 2382103): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=54.015964s (sample 2382104): CH1 written pitch 277.108 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 4, direction: 'down', period: 4}); // t=54.015986s (sample 2382105): CH1 envelope: initial volume 4, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=54.016009s (sample 2382106): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(1459, 44100);
  gb.pulse.setFrequency(1, 885.6216216216217); // t=54.049093s (sample 2383565): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1484, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=54.082744s (sample 2385049): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(730, 44100);
  gb.pulse.setFrequency(1, 891.6462585034013); // t=54.099297s (sample 2385779): CH2 written pitch 891.646 Hz; no retrigger
  await sleepSamples(2215, 44100);
  gb.writeRegister(0x08, 0x6c); // t=54.149524s (sample 2387994): CH2 written pitch 885.622 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x09, 0x07); // t=54.149546s (sample 2387995): CH2 written pitch 885.622 Hz; trigger false, length enabled false
  await sleepSamples(1477, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=54.183039s (sample 2389472): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(737, 44100);
  gb.pulse.setFrequency(1, 131072); // t=54.199751s (sample 2390209): CH2 written pitch 131072.000 Hz; no retrigger
  await sleepSamples(7, 44100);
  gb.setPan(0, true, false); // t=54.199909s (sample 2390216): channel routing (low nibble right, high nibble left)
  await sleepSamples(11, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=54.200159s (sample 2390227): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0xd6); // t=54.200159s (sample 2390227): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=54.200181s (sample 2390228): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(720, 44100);
  gb.writeRegister(0x03, 0xd6); // t=54.216508s (sample 2390948): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x06); // t=54.216531s (sample 2390949): CH1 written pitch 439.839 Hz; trigger false, length enabled false
  await sleepSamples(1, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=54.216553s (sample 2390950): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=54.216553s (sample 2390950): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(2953, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=54.283515s (sample 2393903): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(3693, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=54.367256s (sample 2397596): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x42); // t=54.367279s (sample 2397597): CH1 written pitch 293.883 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=54.367279s (sample 2397597): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(13, 44100);
  gb.pulse.setFrequency(0, 293.8834080717489); // t=54.367574s (sample 2397610): CH1 written pitch 293.883 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=54.367619s (sample 2397612): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=54.367619s (sample 2397612): CH1 written pitch 293.883 Hz; trigger true, length enabled false
  await sleepSamples(721, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=54.383968s (sample 2398333): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(4438, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=54.484603s (sample 2402771): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(2209, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=54.534694s (sample 2404980): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x72); // t=54.534717s (sample 2404981): CH1 written pitch 329.327 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=54.534717s (sample 2404981): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(1474, 44100);
  gb.pulse.setFrequency(0, 329.32663316582915); // t=54.568141s (sample 2406455): CH1 written pitch 329.327 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=54.568186s (sample 2406457): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=54.568186s (sample 2406457): CH1 written pitch 329.327 Hz; trigger true, length enabled false
  await sleepSamples(743, 44100);
  gb.writeRegister(0x0d, 0xac); // t=54.585034s (sample 2407200): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x0e, 0x05); // t=54.585057s (sample 2407201): CH3 written pitch 109.960 Hz; trigger false, length enabled false
  await sleepSamples(4424, 44100);
  gb.wave.setFrequency(110.14453781512606); // t=54.685374s (sample 2411625): CH3 written pitch 110.145 Hz; no retrigger
  await sleepSamples(739, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=54.702132s (sample 2412364): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x03, 0x27); // t=54.702154s (sample 2412365): CH1 written pitch 277.108 Hz; no retrigger
  gb.writeRegister(0x04, 0x86); // t=54.702154s (sample 2412365): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(735, 44100);
  gb.pulse.setFrequency(0, 277.107822410148); // t=54.718821s (sample 2413100): CH1 written pitch 277.108 Hz; no retrigger
  await sleepSamples(2, 44100);
  gb.pulse.setEnvelope(0, {volume: 2, direction: 'down', period: 4}); // t=54.718866s (sample 2413102): CH1 envelope: initial volume 2, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x04, 0x86); // t=54.718866s (sample 2413102): CH1 written pitch 277.108 Hz; trigger true, length enabled false
  await sleepSamples(2952, 44100);
  gb.wave.setFrequency(109.95973154362416); // t=54.785805s (sample 2416054): CH3 written pitch 109.960 Hz; no retrigger
  await sleepSamples(4435, 44100);
  gb.pulse.setEnvelope(1, {volume: 8, direction: 'up', period: 4}); // t=54.886372s (sample 2420489): CH2 envelope: initial volume 8, up, period 4 (62.5 ms/step); no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x08, 0x4f); // t=54.886395s (sample 2420490): CH2 written pitch 740.520 Hz; no retrigger
  gb.writeRegister(0x09, 0x87); // t=54.886395s (sample 2420490): CH2 written pitch 740.520 Hz; trigger true, length enabled false
  await sleepSamples(24, 44100);
  gb.pulse.setEnvelope(0, {volume: 8, direction: 'down', period: 4}); // t=54.886939s (sample 2420514): CH1 envelope: initial volume 8, down, period 4 (62.5 ms/step); no retrigger
  gb.writeRegister(0x03, 0xd6); // t=54.886939s (sample 2420514): CH1 written pitch 439.839 Hz; no retrigger
  await sleepSamples(1, 44100);
  gb.writeRegister(0x04, 0x86); // t=54.886961s (sample 2420515): CH1 written pitch 439.839 Hz; trigger true, length enabled false
  await sleepSamples(14, 44100);
  gb.wave.setLevel(0.5); // t=54.887279s (sample 2420529): CH3 output level 50%
  await sleepSamples(1, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=54.887302s (sample 2420530): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(11, 44100);
  gb.wave.setFrequency(146.94170403587444); // t=54.887551s (sample 2420541): CH3 written pitch 146.942 Hz; no retrigger
  await sleepSamples(681, 44100);
} finally {
  gb.dispose();
}
