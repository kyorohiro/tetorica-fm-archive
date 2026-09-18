
# FinalFantasy Prelude



# MML 

#### [https://msxplay.com mml editor](https://msxplay.com/editor.html) 向け


[hello ymfm wasm](https://kyorohiro.github.io/hello_ymfm_wasm/) の [Tetorica VGM Analyzer](https://kyorohiro.github.io/hello_ymfm_wasm/vgm_analyzer/index.html) で変換

```
; VGM Analyzer analysis MML for MGSDRV (MSX music driver)
; Source: 01_Prelude.vgm
; Base-pitch transcription, quantized to a minimum of 1/16. Not a lossless VGM conversion.
; PSG noise/envelope hardware effects and OPLL vibrato/tremolo/sustain are not reproduced.
; VGM loop is not expanded; one pass is exported.
#opll_mode 0
#tempo 90

; PSG CH A
1 v5 o1 c16 d16 e16 g16 > c16 d16 e16 g16 > c16 d16 e16 g16 > c16 d16 e16 g16 > c16 <
1 g16 e16 d16 c16 < g16 e16 d16 c16 < g16 e16 d16 c16 < g16 e16 d16 < a16 b16 > c16 e16
1 a16 b16 > c16 e16 a16 b16 > c16 e16 a16 b16 > c16 e16 a16 e16 c16 < b16 a16 e16 c16 <
1 b16 a16 e16 c16 < b16 a16 e16 c16 < b16 > c16 d16 e16 g16 > c16 d16 e16 g16 > c16 d16
1 e16 g16 > c16 d16 e16 g16 > c16 < g16 e16 d16 c16 < g16 e16 d16 c16 < g16 e16 d16 c16
1 < g16 e16 d16 < a16 b16 > c16 e16 a16 b16 > c16 e16 a16 b16 > c16 e16 a16 b16 > c16
1 e16 a16 e16 c16 < b16 a16 e16 c16 < b16 a16 e16 c16 < b16 a16 e16 c16 < b16 a16 > c16
1 f16 g16 a16 > c16 f16 g16 a16 > c16 f16 g16 a16 > c16 f16 g16 a16 g16 f16 c16 < a16
1 g16 f16 c16 < a16 g16 f16 c16 < a16 g16 f16 c16 < b16 > d16 g16 a16 b16 > d16 g16 a16
1 b16 > d16 g16 a16 b16 > d16 g16 a16 b16 a16 g16 d16 < b16 a16 g16 d16 < b16 a16 g16
1 d16 < b16 a16 g16 d16 < g+16 > c16 d+16 g16 g+16 > c16 d+16 g16 g+16 > c16 d+16 g16
1 g+16 > c16 d+16 g16 g+16 g16 d+16 c16 < g+16 g16 d+16 c16 < g+16 g16 d+16 c16 < g+16
1 g16 d+16 c16 < a+16 > d16 f16 a16 a+16 > d16 f16 a16 a+16 > d16 f16 a16 a+16 > d16 f16
1 a16 a+16 a16 f16 d16 < a+16 a16 f16 d16 < a+16 a16 f16 d16 < a+16 a16 f16 d16 c16 d16
1 e16

; PSG CH B
2 v5 r8 o1 c16 d16 e16 g16 > c16 d16 e16 g16 > c16 d16 e16 g16 > c16 d16 e16 g16 > c16 <
2 g16 e16 d16 c16 < g16 e16 d16 c16 < g16 e16 d16 c16 < g16 e16 d16 < a16 b16 > c16 e16
2 a16 b16 > c16 e16 a16 b16 > c16 e16 a16 b16 > c16 e16 a16 e16 c16 < b16 a16 e16 c16 <
2 b16 a16 e16 c16 < b16 a16 e16 c16 < b16 > c16 d16 e16 g16 > c16 d16 e16 g16 > c16 d16
2 e16 g16 > c16 d16 e16 g16 > c16 < g16 e16 d16 c16 < g16 e16 d16 c16 < g16 e16 d16 c16
2 < g16 e16 d16 < a16 b16 > c16 e16 a16 b16 > c16 e16 a16 b16 > c16 e16 a16 b16 > c16
2 e16 a16 e16 c16 < b16 a16 e16 c16 < b16 a16 e16 c16 < b16 a16 e16 c16 < b16 a16 > c16
2 f16 g16 a16 > c16 f16 g16 a16 > c16 f16 g16 a16 > c16 f16 g16 a16 g16 f16 c16 < a16
2 g16 f16 c16 < a16 g16 f16 c16 < a16 g16 f16 c16 < b16 > d16 g16 a16 b16 > d16 g16 a16
2 b16 > d16 g16 a16 b16 > d16 g16 a16 b16 a16 g16 d16 < b16 a16 g16 d16 < b16 a16 g16
2 d16 < b16 a16 g16 d16 < g+16 > c16 d+16 g16 g+16 > c16 d+16 g16 g+16 > c16 d+16 g16
2 g+16 > c16 d+16 g16 g+16 g16 d+16 c16 < g+16 g16 d+16 c16 < g+16 g16 d+16 c16 < g+16
2 g16 d+16 c16 < a+16 > d16 f16 a16 a+16 > d16 f16 a16 a+16 > d16 f16 a16 a+16 > d16 f16
2 a16 a+16 a16 f16 d16 < a+16 a16 f16 d16 < a+16 a16 f16 d16 < a+16 a16 f16 d16 c16

; PSG CH C
3 v5 o1 c16 d16 e16 g16 > c16 d16 e16 g16 > c16 d16 e16 g16 > c16 d16 e16 g16 > c16 <
3 g16 e16 d16 c16 < g16 e16 d16 c16 < g16 e16 d16 c16 < g16 e16 d16 < a16 b16 > c16 e16
3 a16 b16 > c16 e16 a16 b16 > c16 e16 a16 b16 > c16 e16 a16 e16 c16 < b16 a16 e16 c16 <
3 b16 a16 e16 c16 < b16 a16 e16 c16 < b16 > c16 d16 e16 g16 > c16 d16 e16 g16 > c16 d16
3 e16 g16 > c16 d16 e16 g16 > c16 < g16 e16 d16 c16 < g16 e16 d16 c16 < g16 e16 d16 c16
3 < g16 e16 d16 < a16 b16 > c16 e16 a16 b16 > c16 e16 a16 b16 > c16 e16 a16 b16 > c16
3 e16 a16 e16 c16 < b16 a16 e16 c16 < b16 a16 e16 c16 < b16 a16 e16 c16 < b16 a16 > c16
3 f16 g16 a16 > c16 f16 g16 a16 > c16 f16 g16 a16 > c16 f16 g16 a16 g16 f16 c16 < a16
3 g16 f16 c16 < a16 g16 f16 c16 < a16 g16 f16 c16 < b16 > d16 g16 a16 b16 > d16 g16 a16
3 b16 > d16 g16 a16 b16 > d16 g16 a16 b16 a16 g16 d16 < b16 a16 g16 d16 < b16 a16 g16
3 d16 < b16 a16 g16 d16 < g+16 > c16 d+16 g16 g+16 > c16 d+16 g16 g+16 > c16 d+16 g16
3 g+16 > c16 d+16 g16 g+16 g16 d+16 c16 < g+16 g16 d+16 c16 < g+16 g16 d+16 c16 < g+16
3 g16 d+16 c16 < a+16 > d16 f16 a16 a+16 > d16 f16 a16 a+16 > d16 f16 a16 a+16 > d16 f16
3 a16 a+16 a16 f16 d16 < a+16 a16 f16 d16 < a+16 a16 f16 d16 < a+16 a16 f16 d16 c16 d16
3 e16

; FM CH 1
9 v5 r16 @0 o5 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16
9 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 a1& a1 g16 g16 g16 g16 g16 g16
9 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16
9 g16 g16 g16 g16 g16 a1& a1 f1& f1 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16
9 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g+1& g+1
9 a+1& a+1 g16 g16

; FM CH 2
a v5 @0 o5 g1& g1& g16 a1& a1 g1& g1 a1& a1 f1& f1 g1& g1 g+1& g+1 a+1& a+1 g16

; FM CH 3
b v5 @0 o5 e1& e1 e1& e1 e1& e1 e1& e1 d1& d1 e1& e1 e1 d+1 f1& f1 e8

; FM CH 4
c v5 @0 o5 d1& d1 e1& e1 d1& d1 e1& e1 c1& c1 d1& d1 d+1& d+1 d1& d1 d8

; FM CH 5
d v5 @0 o5 c1& c1 c1& c1 c1& c1 c1& c1 < a1& a1 b1& b1 b1& b1 a1& a1 > c8

; FM CH 6
e v5 @6 o2 c1& c1 < a1& a1 > c1& c1 < a1& a1 f1& f1 g16 g16 g16 g16 g16 g16 g16 g16 g16
e g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16 g16
e g16 g16 g+1& g+1 a+1& a+1 > c8

; FM CH 7
f v5 r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r8

; FM CH 8
g v5 r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r8

; FM CH 9
h v5 r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r1& r8


```