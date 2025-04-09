<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://camo.githubusercontent.com/f538d9a749f7c49325cb8264739fecac0280f8ff1375937e7095737ef97d9048/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d526561637425323051756572792d4646343135343f7374796c653d666f722d7468652d6261646765266c6f676f3d72656163742532307175657279266c6f676f436f6c6f723d7768697465">
  <br>
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
  <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
</p>
<br>
<p align="center">
   <h1><strong>React-appStore 프로젝트</strong>🛒</h1>

  <ul>
    <li><span>목표: Apple appStore API활용하여, 앱스토어를 웹버전으로 만들기</span></li>
    <li><span>기술스택: react, react-query, scss, axios, firebaseHosting</li>
    <li><span>배포링크: https://react-web-app-store.web.app/</span></li>
    <li>
      <span>주요기능</span>
      <ol>
        <li>queryCache</li>
        <li>검색</li>
        <li>상세</li>
        <li>infinite Scroll (INF)</li>
        <li>INF이벤트 시 throttle</li>
      </ol>
    </li>
  </ul>

  <h2>ISSUE</h2>
  <ul>
    <li><span>1). 2025-03-26(수): appStore API의 CORS 이슈 -> cors이슈와 더불어 user-agent영향도 있음을 확인 -> 서버 프록시로 우회하기로 결정</li>
    <li><span>2). 2025-04-08(화): 모바일 에뮬레이터에서 itunesSearchAPI활용 시, user-agent에 따른 apple api응답차이로 인한 빈배열 발생 -> soultion 진행중(1번,2번 둘다 수정하여 진행중)</li>
    <li><span>3). 2025-04-08(화): 크롬 모바일 에뮬레이터가 아닌 상태로 브라우저 크기만 줄여서 볼때는 위에 적은 2가지 이슈 없이 빈배열에 대한 오류 없음(결국, 서버를 통해 중계가 필요하다)</li>
    <li><span>4). 2025-04-09(수): ![image](https://github.com/user-attachments/assets/2166b222-b916-4d3d-a497-3a30d84d81a7)
        "프록시서버"가 없어서 vercel을 통하여 만들어봤지만 vercel이 번들링을 제대로 하질못해서 (서버리스 함수 빌드) 프록시서버 생성 불가
        따라서, 해당 '앱스토어웹버전' 화면 확인시에 위에 캡처화면처럼 화면사이즈를 줄여서 보면 기능확인 가능</li>
  </ul>
</p>
