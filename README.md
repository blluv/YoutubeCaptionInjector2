# YoutubeCaptionInjector2

유튜브 영상에 커스텀 자막을 삽입해줍니다!

옛날에 비슷한걸 만들었지만 그대로 잊혀져서 새로 만드는 무언가!

## 작동 방식
유튜브 메인 페이지에서 내부 스크립트로 넘기는 부분을
수정하는 방식으로 자막을 삽입합니다

## TMI(?)
서버쪽 귀찮아서 그냥 파일로 처리했습니다(?)

유튜브에서 자막 요청할 때 fmt에 srv3, 3, json3가 들어갈 수 있지만
현재 유튜브는 json3만 요청하기 때문에 그냥 슥슥(?)

base.js가 로딩이 안되면 desktop_polymer에서 스크립트를 추가해주는데 이상하게 그건 remove해도 안지워지는..
그래서 현재 async 부분이 조금 불안한.. (자막 가져오는건 xhr blocking으로 처리!)

## example video
https://www.youtube.com/watch?v=dd3pgZYAGwY
(자막 출처: https://www.youtube.com/watch?v=XCs7FacjHQY)
