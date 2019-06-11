사내스터디
===========

## 1 day 

### 1. 자바스크립트 특징

#### 인터프리터
위에서 아래로 읽고 실행, 읽고 실행 / 클라이언트의 웹브라우저에서 해석되고 실행한다.

<br>

<br>

#### 호출 스택
순서대로 쌓이고 실행하며 마지막에 들어온 것이 먼저 나간다.
```
function first(){
    second();
    console.log('first 실행!')
}
function second(){
    third();
    console.log('second 실행!')
}
function third(){
    console.log('third 실행!')
}
first();

// 실행시
console.log() => third 실행!
console.log() => second 실행!
console.log() => first 실행!


function test(){
    console.log('test 실행!')
}
console.log('시작');
setTimeout(test, 0);
console.log('끝');

// 실행시
console.log() => 시작
console.log() => test 실행!
console.log() => 끝
```

<br>

<br>

#### 이벤트루프
이벤트루프는 호출스택에 쌓이고, api를 통해 콜백된 함수들이 이벤트큐에 쌓이게 되는데, 호출스택이 비워졌을 때 이벤트루프가 감지하여 호출스택으로 보내주고 호출스택으로 옮겨간 기능은 실행되게 된다.
<br>
참조 블로그 : <a href="https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84%EC%99%80-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%98-%EB%B6%80%EC%83%81-async-await%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%BD%94%EB%94%A9-%ED%8C%81-%EB%8B%A4%EC%84%AF-%EA%B0%80%EC%A7%80-df65ffb4e7e?gi=bb12e25b98ae" target="_blank">바로가기</a>

<br>

<br>

### 2. 자바스크립트 핵심 개념

아래와 같은 개념들이 핵심이며 앞으로 다루게 될 내용이다.
1. __객체__ 자바스크립트의 '거의' 모든 것은 객체이다. 거의라고 표현한 이유는 몇 가지가 제외되는데, 기본 타입인 boolean, number, string이다. 그리고 특별한 값인 null, undefined도 해당 된다.
2. __함수__ 자바스크립트에서는 함수도 객체로 취급한다. 여러가지 특징 때문에 함수는 일급 객체로 다뤄진다.
3. __프로토타입__ 모든 객체는 숨겨진 링크인 프로토타입을 가진다.
4. __실행 컨텍스트와 클로저__ 자신만의 독특한 과정으로 실행 컨텍스트를 만들고 그 안에서 실행이 이루어진다. 자신만의 scope를 갖고 이 과정에서 클로저를 구현할 수 있다.
5. __객체지향 프로그래밍__ 클래스를 지원하진 않지만 객체지향 프로그래밍이 가능하다. 프로토타입 체인과 클로저로 객체지향 프로그래밍에서 제시하는 상속, 캡슐화, 정보 은닉 등의 개념을 소환할 수 있다.

<br>

<br>

#### 데이터타입
아래와 같이 타입을 사용한다.
```
// 숫자
var num = 10;
var floatNum = 0.1;

// 문자
var singleStr = '안녕하소';
var doubleStr = "안녕하소";

// 불린
var boolTrue = true;
var boolFalse = false;

// undefined
var undeifnedVar;

// null
var nullValue = null;

// 해당값이 어떤 타입인지는 typeof로 볼 수 있다.
ex) typeof singleStr

// null은 typeof로 하면 Object를 반환하니 변수를 사용하여 타입체크를 하자.
typeof nullValue === null (X);
nullValue === null (O);

//특정 타입에 따라서 typeof로 해도 Object로 반환될 때가 있다.
자세히 알고 싶을 땐 아래와 같이 Object의 prototype을 활용한다.
ex) Object.prototype.toString.call(singleStr)
```

<br>

<br>

#### 객체
Object는 생성자함수 와 리터럴 방식을 이용해 만들 수 있다.
```
// 생성자
var alba = new Object();
    alba.name = '알바천국';
    alba.cf = true;

// 리터럴
var alba2 = {
    name : '알바천국',
    cf : true
}

// 객체는 for in 으로 탐색 가능
for(var item in alba2){
    console.log(item) // key
    console.log(alba2[item]); // value
}
```

<br>

<br>

#### 배열
배열은 Array.isArray로 타입 확인이 가능하다.
```
// 배열생성
var tempArr = new Array();
var tempArr = [];
    temp[0] = 100;
    temp[5] = true;
    temp[10] = 'what?!';

// 동적할당이 가능하며 위에처럼 3개만 할당했더라도,
가장 큰 인덱스값은 10이기 때문에 가장 큰 인덱스값 만큼의 길이를 갖게된다.

console.log(temp.length);
// 11 (100, undefinedx4, true, undefinedx4, 'what')

// 배열탐색은 for문 사용
for(var i=0; i<tempArr.length; i++){
    tempArr[i]
}

// 1.js의 코드처럼 prototype을 사용한 타입체크나 map혹은 filter로 배열탐색이 가능하다
```

<br>

<br>

#### 프로토타입
프로토타입은 붕어빵틀 같은 것. 여러군데에 써야 할 때 정해진 틀을 가져와서 사용할 수 있게끔 하는 것.
```
function Alba(){
    this.name = '알바천국'
    this.work = 'am9 - pm6'
}
var lch = new Alba();
var kmw = new Alba();
// 위의 경우는 lch의 2개, kmw의 2개 총 4군데에 메모리를 차지한다.

function Alba(){}
Alba.prototype.name = '알바천국'
Alba.prototype.work = 'am9-pm6'
var lch = new Alba();
var kmw = new Alba();
// 위의 경우는 prototype에 2개만 차지하기때문에 메모리절감이 된다.
```
<br>
prototype은 함수가 가지고 있던 값들만 가지고 있지만
__proto__는 생성될 때 조상이었던 Object를 참조한다.
<br>
참조 블로그 : <a href="https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67" target="_blank">바로가기</a>