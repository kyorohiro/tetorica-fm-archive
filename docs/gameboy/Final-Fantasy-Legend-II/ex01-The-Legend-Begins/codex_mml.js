// The Legend Begins — Game Boy / MML風に読み書きする編曲版
// codex.js の発音開始から音符を拾い、推定した8分音符の格子へ丸めたものです。
// 元の楽譜の復元・標準MMLへの準拠・原音の完全再現ではありません。
// 微小な再トリガーは省略。音程は平均律からGBの周期値へ丸めます。
// 長音のエンベロープ切替とビブラートは下の音色定義で近似します。
// 超高域への移動は休符と解釈。末尾の次ループ冒頭の短い断片は省きます。
//
// o4: オクターブ / l8: 省略時の音価 / c+・b-: ♯・♭ / r: 休符
// d4: 4分音符 / a2.: 付点2分 / a1&a2: 同音をタイで連結
// @lead: 音色 / pL,pC,pR: パン / $D: 下のフレーズを展開
// 各チャンネルは同時に開始。小節番号は推定4/4の読み位置です。
// 編集する場所：TEMPO → PHRASES → SCORE → INSTRUMENTS。

const TEMPO = 174.972359; // 推定値。4分音符/分。
const PHRASES = {
  D:     'a e f+ d', // 伴奏：A E F♯ D
  Bb:    'a+ e f d',
  A:     'a d e c+',
  Asus:  'a d e d',
  Aturn: 'a c+ e c+',
};

const SCORE = {
  pulse1: `
  l8
  pR r1&r1 // 01小節目から
  @lead o4 d4 d4 a1 // 03小節目から
  g+ a b4 // 04小節目から
  a1&a1 // 05小節目から
  pL o5 d4 d4 a1 // 07小節目から
  g+ a b4 // 08小節目から
  @pluck8 o4 $D pC @pluck6 $D // 09小節目から
  @pluck4 $D pR @pluck2 $D // 10小節目から
  @pluck8 $D pC @pluck6 $D // 11小節目から
  @pluck4 $D pL @pluck2 $D // 12小節目から
  @pluck8 $Bb pC @pluck6 $Bb // 13小節目から
  @pluck4 $Bb pR @pluck2 $Bb // 14小節目から
  @pluck8 $Asus pC @pluck6 $Asus // 15小節目から
  @pluck4 $Aturn pL @pluck2 $Aturn // 16小節目から
  @pluck8 $D pC @pluck6 $D // 17小節目から
  @pluck4 $D pR @pluck2 $D // 18小節目から
  @pluck8 $D pC @pluck6 $D // 19小節目から
  @pluck4 $D pL @pluck2 $D // 20小節目から
  @pluck8 $Bb pC @pluck6 $Bb // 21小節目から
  @pluck4 $Bb pR @pluck2 $Bb // 22小節目から
  @pluck8 $A pC @pluck6 $A // 23小節目から
  @pluck4 $A pL @pluck2 $A // 24小節目から
  @pluck8 $D pC @pluck6 $D // 25小節目から
  @pluck4 $D pR @pluck2 $D // 26小節目から
  @pluck8 $D pC @pluck6 $D // 27小節目から
  @pluck4 $D pL @pluck2 $D // 28小節目から
  @pluck8 $Bb pC @pluck6 $Bb // 29小節目から
  @pluck4 $Bb pR @pluck2 $Bb // 30小節目から
  @pluck8 $A pC @pluck6 $A // 31小節目から
  @pluck4 $A pL @pluck2 $A // 32小節目から
  @pluck8 $D pC @pluck6 $D // 33小節目から
  @pluck4 $D pR @pluck2 $D // 34小節目から
  @pluck8 $D pC @pluck6 $D // 35小節目から
  @pluck4 $D pL @pluck2 $D // 36小節目から
  @pluck8 $Bb pC @pluck6 $Bb // 37小節目から
  @pluck4 $Bb pR @pluck2 $Bb // 38小節目から
  @pluck8 $A pC @pluck6 $A // 39小節目から
  @pluck4 $A pL @pluck2 $A // 40小節目から
  `,
  pulse2: `
  l8
  pL @lead o4 d4 d4 a1 // 01小節目から
  g+ a b4 // 02小節目から
  a1&a1 // 03小節目から
  pC o5 d4 d4 a1 // 05小節目から
  g+ a b4 // 06小節目から
  a1&a1 // 07小節目から
  f+2. f+4 // 09小節目から
  g4 f+4 e4 g4 // 10小節目から
  f+2 d1 // 11小節目から
  o4 a2 // 12小節目から
  a+2 o5 d2 // 13小節目から
  e2 d2 // 14小節目から
  d1 // 15小節目から
  c+1 // 16小節目から
  f+2. f+4 // 17小節目から
  g4 f+4 e4 g4 // 18小節目から
  f+2 d1 // 19小節目から
  o4 a2 // 20小節目から
  a+2 o5 d2 // 21小節目から
  e2 d2 // 22小節目から
  a1&a2 // 23小節目から
  r2 // 24小節目から
  d4 d4 a1 // 25小節目から
  g+ a b4 // 26小節目から
  a2 d1 // 27小節目から
  d2 // 28小節目から
  a+2. a+4 // 29小節目から
  o6 c2 o5 a+2 // 30小節目から
  a1&a2 // 31小節目から
  r2 // 32小節目から
  d4 d4 a1 // 33小節目から
  g+ a b4 // 34小節目から
  a2 d1 // 35小節目から
  d2 // 36小節目から
  o6 d2. d4 // 37小節目から
  c2 o5 a+2 // 38小節目から
  a1&a2 // 39小節目から
  r2 // 40小節目から
  `,
  wave: `
  l8
  pC r1&r1&r1&r1&r1&r1&r1&r1 // 01小節目から
  @bass o3 d1&d1 // 09小節目から
  c1&c1 // 11小節目から
  o2 a+1&a+1 // 13小節目から
  a1&a1 // 15小節目から
  o3 d1&d1 // 17小節目から
  c1&c1 // 19小節目から
  o2 a+1&a+1 // 21小節目から
  a1&a1 // 23小節目から
  o3 d1&d1 // 25小節目から
  c1&c1 // 27小節目から
  o2 a+1&a+1 // 29小節目から
  a1&a1 // 31小節目から
  o3 d1&d1 // 33小節目から
  c1&c1 // 35小節目から
  o2 a+1&a+1 // 37小節目から
  a1&a1 // 39小節目から
  `,
};

// 音色。pluck の 8→6→4→2 は、同じ伴奏を弱めていく音量の段階。
const INSTRUMENTS = {
  lead: {
    duty: 0.5,
    envelope: {volume: 8, direction: 'up', period: 4},
    sustainAfter: 0.5, // 秒。長音の途中で減衰音色へ切替・再発音。
    sustain: {volume: 15, direction: 'down', period: 7},
    vibratoAfter: 0.5,
  },
  pluck8: {duty: 0.25, envelope: {volume: 8, direction: 'down', period: 4}},
  pluck6: {duty: 0.25, envelope: {volume: 6, direction: 'down', period: 4}},
  pluck4: {duty: 0.25, envelope: {volume: 4, direction: 'down', period: 4}},
  pluck2: {duty: 0.25, envelope: {volume: 2, direction: 'down', period: 4}},
  bass: {level: 0.5, vibratoAfter: 0.5},
};

// 以下は、このファイルだけで再生するための小さなMMLリーダー。
// 音価は4分=1拍。タイは1回の発音にまとめ、3声を共通の時間軸へ載せます。
function readMML(source, channel) {
  function expand(text, stack = []) {
    return text.replace(/\$([A-Za-z]\w*)/g, (_, name) => {
      if (!Object.hasOwn(PHRASES, name)) throw Error(`Unknown phrase: ${name}`);
      if (stack.includes(name)) throw Error(`Recursive phrase: ${name}`);
      return expand(PHRASES[name], [...stack, name]);
    });
  }
  const tokens = expand(source.replace(/\/\/[^\n]*/g, '')).trim().split(/\s+/);
  const notes = [];
  let octave = 4, length = 8, beat = 0, instrument = channel === 2 ? 'bass' : 'lead', pan = 'C';
  const semitones = {c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11};
  for (const token of tokens) {
    let match;
    if ((match = /^o([0-8])$/.exec(token))) { octave = Number(match[1]); continue; }
    if ((match = /^l(1|2|4|8|16|32|64)$/.exec(token))) { length = Number(match[1]); continue; }
    if ((match = /^p([LCR])$/.exec(token))) { pan = match[1]; continue; }
    if ((match = /^@(\w+)$/.exec(token))) {
      if (!Object.hasOwn(INSTRUMENTS, match[1])) throw Error(`Unknown instrument: ${token}`);
      instrument = match[1];
      if ((channel === 2) !== (instrument === 'bass')) throw Error(`Wrong channel for ${token}`);
      continue;
    }
    let duration = 0, pitch;
    for (const part of token.split('&')) {
      const n = /^([a-gr])([+-]?)(1|2|4|8|16|32|64)?(\.*)$/.exec(part);
      if (!n || (n[1] === 'r' && n[2])) throw Error(`Invalid MML: ${token}`);
      const midi = n[1] === 'r' ? null : 12 * (octave + 1) + semitones[n[1]] + (n[2] === '+' ? 1 : n[2] === '-' ? -1 : 0);
      if (pitch !== undefined && pitch !== midi) throw Error(`Tie requires the same pitch: ${token}`);
      pitch = midi;
      duration += 4 / Number(n[3] || length) * (2 - 2 ** -n[4].length);
    }
    notes.push({beat, duration, pitch, instrument, pan});
    beat += duration;
  }
  return {notes, beats: beat};
}

if (!Number.isFinite(TEMPO) || TEMPO <= 0) throw Error('TEMPO must be positive');
const tracks = ['pulse1', 'pulse2', 'wave'].map((name, channel) => readMML(SCORE[name], channel));
const SAMPLE_RATE = 44100;
const secondsPerBeat = 60 / TEMPO;
const gb = await createSoundChip('gameboy');
try {
  gb.initialize();
  gb.setMasterVolume(7, 7);
  gb.pulse.keyOff(0);
  gb.pulse.keyOff(1);
  gb.noise.keyOff();
  gb.wave.setWaveform(Array.from({length: 32}, (_, i) => i < 16 ? 15 : 0));

  const events = [];
  function at(seconds, action, priority = 1) {
    events.push({sample: Math.round(seconds * SAMPLE_RATE), action, priority});
  }
  function off(channel) {
    if (channel === 2) gb.wave.keyOff();
    else gb.pulse.keyOff(channel);
  }
  function frequency(channel, hz) {
    if (channel === 2) gb.wave.setFrequency(hz);
    else gb.pulse.setFrequency(channel, hz);
  }
  tracks.forEach((track, channel) => {
    for (const note of track.notes) {
      const start = note.beat * secondsPerBeat;
      const end = (note.beat + note.duration) * secondsPerBeat;
      if (note.pitch === null) { at(start, () => off(channel), 0); continue; }
      const voice = INSTRUMENTS[note.instrument];
      const hz = 440 * 2 ** ((note.pitch - 69) / 12);
      const clock = channel === 2 ? 65536 : 131072;
      const period = Math.round(2048 - clock / hz);
      if (period < 0 || period > 2047) throw Error(`Pitch out of GB range: ${note.pitch}`);
      at(start, () => {
        gb.setPan(channel, note.pan !== 'R', note.pan !== 'L');
        if (channel === 2) {
          gb.wave.setLevel(voice.level);
          frequency(channel, hz);
          gb.wave.keyOn();
        } else {
          gb.pulse.setDuty(channel, voice.duty);
          gb.pulse.setEnvelope(channel, voice.envelope);
          frequency(channel, hz);
          gb.pulse.keyOn(channel);
        }
      });
      if (voice.sustain && start + voice.sustainAfter < end) {
        at(start + voice.sustainAfter, () => {
          gb.pulse.setEnvelope(channel, voice.sustain);
          gb.pulse.keyOn(channel);
        });
      }
      if (voice.vibratoAfter !== undefined) {
        // 周期値を1〜2だけ動かす段階的な揺れ。元イベント列の近似です。
        const offsets = channel === 1 ? [1, 2, 1, 0] : [1, 0];
        const interval = channel === 1 ? 0.05 : 0.1;
        for (let i = 0; ; i++) {
          const time = start + voice.vibratoAfter + i * interval;
          if (time >= end) break;
          const shifted = Math.min(2047, period + offsets[i % offsets.length]);
          at(time, () => frequency(channel, clock / (2048 - shifted)));
        }
      }
      // 同時刻の消音を先に実行し、次の音の立ち上がりを消さない。
      at(end, () => off(channel), 0);
    }
  });
  const end = Math.round(Math.max(...tracks.map(track => track.beats)) * secondsPerBeat * SAMPLE_RATE);
  events.sort((a, b) => a.sample - b.sample || a.priority - b.priority);
  let position = 0;
  for (const event of events) {
    if (event.sample > position) await sleepSamples(event.sample - position, SAMPLE_RATE);
    position = event.sample;
    event.action();
  }
  if (position < end) await sleepSamples(end - position, SAMPLE_RATE);
} finally {
  gb.dispose();
}
