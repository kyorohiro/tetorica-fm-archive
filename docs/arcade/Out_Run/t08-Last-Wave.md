```
#title "08 Last Wave (with Seashore SFX).vgz"
; YM2151 FM transcription for MXDRV / mml2mdr (MDX). FM A-H only.
; 1/16 grid, rounded semitone pitch, key intervals without audible release.
; PCM/PSG, CH8 noise, partial keys and CSM omitted. Loop is not expanded.
; Voice parameters sampled at note/pitch boundaries. Live writes, pan and LFO are not replayed.
; Envelope/DT timing can differ at the target 4 MHz clock; source base pitch is transposed to nominal MDX tuning.
; Manual BPM 120; @t215 gives approximately 119.0930 BPM.
; 0 out-of-range intervals replaced by rests.
@0 = {
  31, 14, 15, 14, 6, 58, 0, 15, 3, 0, 0,
  31, 15, 5, 11, 1, 41, 1, 1, 4, 0, 0,
  31, 18, 6, 8, 1, 12, 0, 1, 4, 0, 0,
  31, 18, 6, 8, 1, 8, 1, 1, 4, 0, 0,
  4, 5, 15
}
@1 = {
  31, 14, 15, 14, 6, 58, 0, 15, 3, 0, 0,
  31, 15, 5, 11, 1, 41, 1, 1, 4, 0, 0,
  31, 18, 6, 8, 1, 12, 0, 1, 4, 0, 0,
  31, 18, 6, 8, 1, 12, 1, 1, 4, 0, 0,
  4, 5, 15
}
A @t215 q8 v15 p3 @0 o5 d16 r16 @1 o5 e1 & e8 @0 o5 e4 @1 o2 f4 & f8 & f16 o3 e1 & e4 & e8 & e16 r8 o4
A b8 r8 @0 o5 d8 @1 o4 f1 & f8 & f16 o4 f4 r8 r16 o3 c4 r2 @0 o4 b4 & b8 o4 e1 & e16 o4 b4 & b8 & b16
A r8 r16 @1 o4 f4 & f16 o5 d2 o4 b4 & b8 & b16 o4 b2 r8 o4 e8 r2 r16 @0 o5 c+4 o5 a+4 & a+8 o5
A f2 & f4 & f8 & f16 @1 o3 g2 & g4 & g8 & g16 @0 o5 g2 & g8 r8 @1 o4 g8 & g16 r8 @0 o5 a+4 r8 @1 o5 e8
A @0 o6 d4 r16 o6 d16 o6 e4 o6 d8 & d16 r2 r8 r16 o6 d4 & d16 o6 d4 & d8 & d16 o6 g2 & g4 o6 d8 & d16
A r1 o6 e8 & e16 o6 d4 r2 r4 o6 e4 r8 r16 o6 c4 r2 r8 o6 b4 & b16 o6 b4 & b8 @1 o4 e2 & e8 @0 o6
A e4 & e16 o6 d4 r4 o6 c4 r8 o5 b4 & b16 r4 r8 o6 a4 & a8 o6 g2 & g16 r8 r16 o6 a+4 & a+16 o6 g4 & g16
A o6 e8 & e16 r2 r16 o6 d4 & d8 o6 d2 & d4 & d16 o6 c1 & c16 r2 r4 r8 o5 a8 o5 g2 & g4 & g8 & g16
A r2 r4 r16 o5 a8 o5 g2 & g4 & g8 & g16 r2 r4 r8 o5 a8 o5 g4 & g16 r1 r16 @1 o4 d2 & d4 & d16 o5
A g1 & g2 & g4 & g16 r8 o4 b1 & b1 & b1 & b1 & b1 & b1 & b1 & b2 & b16 r16
B @t215 q8 v15 p3 @0 o5 d+16 r8 o5 e4 o5 e2 & e4 o5 d+16 @1 o4 a4 & a8 & a16 @0 o5 c4 @1 o4 e2 & e4 o4
B e4 o4 g4 & g8 & g16 o3 e2 o3 f1 & f4 & f8 & f16 o3 f4 & f8 & f16 o3 e2 & e4 o3 e1 & e8 & e16 o4
B a2 & a4 & a8 & a16 o4 b2 o4 g4 & g8 & g16 o4 g2 & g4 o4 g4 r4 r8 r16 @0 o5 d4 @1 o5 e4 o5
B e2 & e8 & e16 r8 @0 o5 f2 & f8 r16 o5 f4 & f8 @1 o5 d2 o3 c4 r8 @0 o5 g16 r4 @1 o5 c4 o4 e8 r4 @0 o6
B e8 @1 o5 e8 o5 e8 r4 r8 r16 o5 e1 & e8 & e16 o5 d8 o5 d8 r2 o5 d2 & d8 & d16 o4 g2 o5 e8 o5 e16 r2 o5
B e1 & e8 & e16 o5 d4 o5 d8 r4 r8 o5 d2 & d8 & d16 o4 g2 o5 c2 & c16 o5 c4 & c8 o5 d2 r8 r16 @0 o5 g4
B @1 o5 d2 & d4 o5 d8 & d16 r4 r8 o4 c+8 r4 o5 e4 o5 e2 & e4 & e8 & e16 o5 d2 o5 d4 & d8 & d16 o5 d4 o5
B d4 r4 o5 c1 & c8 & c16 o5 d8 & d16 o5 d8 r4 r8 o5 c1 & c8 & c16 o5 d4 o5 d8 r4 r8 o5 c1 & c8 & c16 o5
B d8 & d16 o5 d8 r4 r8 o5 c2 & c4 & c16 o4 f2 & f4 & f8 o5 a1 & a2 & a8 r16 o4
B g1 & g1 & g1 & g1 & g1 & g1 & g1 & g2 & g8 r16
C @t215 q8 v15 p3 r16 @0 o5 e4 o5 d2 & d4 & d8 o5 d16 @1 o4 f4 & f8 & f16 o5 e4 r16 o4 g2 & g8 & g16 o4
C g4 o4 b4 & b8 & b16 o4 e4 @0 o5 c8 & c16 o5 d+16 @1 o4 a1 & a8 & a16 o4 a4 & a8 & a16 o5 c4 r2 o4 e4
C o4 e1 & e8 & e16 o4 f2 & f4 & f8 & f16 o4 e2 o4 e4 & e8 & e16 o4 e2 & e4 & e8 o5 d2 & d16 o5 c+4
C r8 r16 @0 o5 g16 @1 o5 c2 & c8 & c16 o5 d2 & d4 r8 @0 o5 g4 & g16 @1 o4 b4 & b8 o4 b2 & b8 @0 o5
C a8 & a16 @1 o4 g4 & g8 o5 e4 & e8 o5 c8 o5 c8 r4 r8 r16 o5 c1 & c8 & c16 o4 b8 o4 b8 r2 o4
C b2 & b8 & b16 r8 o4 b4 & b8 o5 c8 o5 c16 r2 o5 c1 & c8 & c16 o4 b4 o4 b8 r4 r8 o4 b2 & b8 & b16 r8 o4
C b4 & b8 o4 a2 & a16 o4 a4 & a8 o4 b2 o4 b4 & b8 & b16 o4 b2 & b4 & b8 & b16 o4 a4 & a8 & a16 o4 e16
C r2 o5 c2 & c4 & c8 & c16 o4 b2 o4 b4 & b8 & b16 o4 b4 o4 b4 r4 o4 a1 & a8 & a16 o4 b8 & b16 o4 b8
C r4 r8 o4 a1 & a8 & a16 o4 b4 o4 b8 r4 r8 o4 a1 & a8 & a16 o4 b8 & b16 o4 b8 r4 r8 o4 a1 o4
C a2 & a4 & a8 o6 c1 & c4 & c8 & c16 r16 o4 e1 & e1 & e1 & e1 & e1 & e1 & e1 & e2 & e16 r8
D @t215 q8 v15 p3 r16 @1 o4 f1 & f4 & f8 & f16 @0 o5 d4 @1 o3 c8 & c16 r16 o4 b2 & b8 & b16 o4 b4
D r4 r16 o4 e8 r8 @0 o4 a4 & a16 o5 d16 @1 o3 f1 & f4 & f8 & f16 o3 f4 & f8 & f16 o3 e2 & e4 o3
D e1 & e8 & e16 o4 d4 & d8 & d16 r4 r16 o5 e8 & e16 r2 @0 o4 a4 & a8 & a16 @1 o5 d1 o3 a4 & a8 & a16 o3
D a2 o4 a2 & a8 & a16 o4 a2 & a4 & a8 & a16 o5 d4 o4 g4 & g8 o4 g2 & g8 o4 a+4 & a+16 @0 o6 c4 @1 o4
D g4 & g8 o4 a8 o4 a8 r4 r8 r16 o4 a1 & a8 & a16 o4 g8 o4 g8 r2 o4 g2 & g8 & g16 r8 @0 o5 a4 o6 d8 @1
D o4 a8 o4 a16 r2 o4 a1 & a8 & a16 o4 g4 o4 g8 r4 r8 o4 g2 & g8 & g16 r4 o5 d4 o4 f2 & f16 o4 f4 & f8
D o4 g2 r4 r16 @0 o5 g+8 @1 o4 g2 & g4 & g8 & g16 o4 c+2 o4 g2 o4 a2 & a4 & a8 & a16 o4 g2 o4
D g4 & g8 & g16 o4 g4 o4 g4 r4 o4 f1 & f8 & f16 o4 g8 & g16 o4 g8 r4 r8 o4 f1 & f8 & f16 o4 g4 o4 g8
D r4 r8 o4 f1 & f8 & f16 o4 g8 & g16 o4 g8 r4 r8 o4 f1 & f8 o5 c1 & c1 & c8 & c16 o4
D c1 & c1 & c1 & c1 & c1 & c1 & c1 & c2 & c8 r8
E @t215 q8 v15 p3 r16 @1 o2 f1 & f4 & f8 & f16 o5 c4 & c8 & c16 @0 o5 e16 @1 o5 d2 & d8 & d16 o5 e4
E r4 r16 o4 g4 & g8 o4 e4 r16 o5 c1 & c8 o5 e4 r4 r8 r16 o4 e2 & e4 o4 g1 & g8 & g16 o2 d4 & d8 & d16
E r4 r16 o4 f8 & f16 r2 o3 g4 & g8 & g16 o3 c1 r8 r16 o4 g4 r2 o4 f2 & f8 & f16 o4 f2 & f4 r8 r16 o3 d4
E o4 e4 & e8 o4 e2 & e8 o4 g4 & g8 & g16 o4 g2 o4 f8 o4 f8 r4 r8 r16 o4 f1 & f8 & f16 o4 e8 o4 e8 r2 o4
E e2 & e8 & e16 r4 o5 d4 o4 f8 o4 f8 r4 r8 r16 o4 f1 & f8 & f16 o4 e4 o4 e8 r4 r8 o4 e2 & e8 & e16 r2
E o4 d2 & d16 o4 d4 & d8 o4 f2 o4 f4 & f8 & f16 o4 e2 & e4 & e8 & e16 o4 e2 r8 o5 c+4 & c+8 o4 f2 & f16
E o4 f4 & f8 o4 f4 & f8 o4 f8 r4 r8 r16 o4 e4 o4 e4 r4 o4 d1 & d8 & d16 o4 e8 & e16 o4 e8 r4 r8 o4
E d1 & d8 & d16 o4 e4 o4 e8 r4 r8 o4 d1 & d8 & d16 o4 e8 & e16 o4 e8 r4 r8 o4 d1 & d4 & d16 o5 e1 & e1
E o3 c1 & c1 & c1 & c1 & c1 & c1 & c1 & c2 & c8 r8
F @t215 q8 v15 p3 r16 @1 o3 f1 & f4 & f8 & f16 o4 a4 & a8 & a16 @0 o5 f+16 r2 r4 o5 d+16 r8 @1 o4
F e4 & e8 & e16 o2 e2 r16 o5 e1 & e4 & e8 o5 d8 & d16 r4 o4 g2 o4 g2 & g4 & g8 & g16 o3 e2 r4 r16 @0 o5
F d2 & d8 r4 o4 g4 r8 o5 c4 & c16 o5 d1 @1 o2 a4 & a8 & a16 r4 o3 e4 o3 d2 & d4 & d8 & d16 r2 o4
F b8 & b16 r8 @0 o5 f+8 @1 o3 c2 r8 @0 o5 a4 & a8 @1 o3 c4 & c8 & c16 o3 c8 o3 c4 & c8 o3 f8 o3 f8
F r4 r8 r16 o3 f1 & f8 & f16 o3 e8 o3 e8 r2 o3 e1 & e8 & e16 o3 f8 o3 f8 r4 r8 r16 o3 f1 & f8 & f16 o3
F e4 o3 e8 r4 r8 o3 e1 & e8 & e16 o3 d2 & d4 & d8 & d16 o3 g2 o3 g4 & g8 & g16 o3 c2 & c4 & c8 & c16 o3
F a2 o3 a2 o3 d2 & d4 & d8 & d16 o3 g2 o3 g4 & g8 & g16 o3 c4 o3 c4 r4 o3 d2 & d4 & d8 & d16 o2 a4 o3
F c8 & c16 o3 c8 r4 r8 o3 d1 & d8 & d16 o3 c4 o3 c8 r4 r8 o3 d1 & d8 & d16 o3 c8 & c16 o3 c8 r4 r8 o3
F d1 & d1 & d1 & d4 & d16 o2 c1 & c1 & c1 & c1 & c1 & c1 & c1 & c2 & c8 r8
G @t215 q8 v15 p3 r8 @1 o4 a1 & a8 r4 o4 f4 & f8 & f16 @0 o5 g2 & g4 o5 d8 o5 e2 & e16 @1 o4 g4 o5 d4
G r8 @0 o5 e4 o5 e2 & e4 o5 d+16 r4 o5 d4 & d8 & d16 o4 b2 & b4 o4 g4 r2 r16 @1 o2 b4 & b8 r4 r8 r16 o3
G d2 o3 g2 r4 r16 @0 o5 d8 r4 r8 o5 e2 & e8 r16 o4 a+4 & a+8 @1 o4 g4 o4 g4 o2 d2 & d4 & d8 & d16 r2 o3
G g4 & g8 & g16 o2 c2 r4 o3 c4 o2 c4 & c8 & c16 o2 c8 o2 c4 & c8 o2 f8 o2 f8 r4 r8 r16 o2 f1 & f8 & f16
G o2 e8 o2 e8 r2 o2 e1 & e8 & e16 o2 f8 o2 f8 r4 r8 r16 o2 f1 & f8 & f16 o2 e4 o2 e8 r4 r8 o2
G e1 & e8 & e16 o2 d4 & d8 & d16 r4 @0 o6 c4 @1 o2 g2 r8 r16 o3 d4 o2 c2 & c4 & c8 & c16 o2 a2 & a4 o3
G e4 o2 d2 & d4 & d8 & d16 o2 g2 r8 r16 o3 d4 o2 c4 o2 c4 r4 o2 d1 & d8 & d16 o2 c8 & c16 o2 c8 r4 r8
G o2 d1 & d8 & d16 o2 c4 o2 c8 r4 r8 o2 d1 & d8 & d16 o2 c8 & c16 o2 c8 r4 r8 o2
G d1 & d1 & d1 & d4 & d16 r1 r1 r1 r1 r1 r1 r1 r2 r4
H @t215 q8 v15 p3 r8 @1 o5 c1 & c4 & c8 o3 f4 & f8 & f16 o2 e1 & e4 & e8 & e16 r8 o4 e4 & e8 @0 o5 e4
H o5 d2 & d8 & d16 r8 r16 o5 d16 o5 e4 & e8 & e16 o5 c4 @1 o4 b2 o5 c2 r2 r8 r16 o3 e4 r2 r8 o5
H c4 & c16 o2 g2 r8 r16 o3 d4 o2 c1 r8 r16 o4 e4 o4 e4 r8 @0 o5 a8 r2 r8 r16 o5 e4 @1 o2 g2 r2 r4 r16
H o5 e4 & e8 o4 e4 o4 e8 & e16 o4 e4 r8 o4 e4 & e8 r8 @0 o6 e8 & e16 o6 e2 & e4 & e8 o6 e4 & e8 & e16
H o6 c4 r2 r4 r8 o6 e2 & e16 r4 o6 c4 r8 o6 e8 & e16 o6 e2 & e4 & e8 r4 o6 d4 & d8 & d16 o6
H g2 & g4 & g16 o6 b8 r8 o6 g2 & g4 & g8 r8 r16 o6 d4 @1 o3 d2 r4 r8 @0 o5 b8 & b16 r4 r16 o5 a16 r4 o6
H g2 & g8 & g16 o6 e4 & e16 o6 a8 & a16 r8 r16 o6 f4 & f16 o6 d2 & d4 & d16 o6 e8 r2 r8 r16 o6 c4
H r2 r8 r16 o6 c+16 o6 d1 & d8 o5 b16 r2 r8 r16 o5 d1 & d8 o5 b16 r2 r4 o5 d1 & d8 o5 b16 r2 r8 r16 o6
H d1 & d1 & d1 & d4 & d16 r1 r1 r1 r1 r1 r1 r1 r2 r4

```