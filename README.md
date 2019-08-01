사내스터디
===========

## MEMO

### version 1.0 

#### 필수 기능 구현
```
valilla.js 로 만들어 보려고 했으나 selector 찾는데 어려움이 있었음.
그래서 ver 1.0은 Jquery를 사용.
ver 1.0의 목적은 메모장 기능을 구현하는 것이었기 때문에 욕심을 버리기로 하였음.  

- '+' 버튼을 눌러 새로운 메모장 추가 가능
- 내용 입력은 'contenteditable' 속성을 사용하였기 때문에 text 값으로 placeholder 작업
- 저장 버튼을 눌렀을 경우에 제목을 입력하지 않았다면 '-'를 Default 값으로 넣어 줌
- 저장 버튼을 누르면 해당 메모에 유니크한 키 값이 부여 됨
- 저장 버튼을 눌렀을 경우 Storage.porototype.data 배열에 해당 메모의 key, title, contents, date 값이 기록 됨
- 저장 버튼을 누른 후에는 저장 버튼이 수정 버튼으로 변경 됨 (class, text 값)
- 수정 버튼을 눌렀을 때 기존에 입력되었던 제목 혹은 내용과 일치 하지 않다면 수정된 값을 Storage.porototype.data에 저장 할 것인지 confirm이 노출 됨
- 삭제 버튼을 눌렀을 때 해당 메모 tag가 remove 되고, 
  해당되는 key 값을 검색하여 일치하는 key 값의 데이터 객체를 Stroage.prototype.data에서 삭제 됨
  filter로 배열에 남아있는 'empty' 값도 삭제 함
```