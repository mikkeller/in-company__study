(function(){
    
    var Storage = function() {};

    Storage.prototype.data = [];

    var time = function() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();

        if(month < 10){
        month = '0' + month;
        }
        if(day < 10){
            day = '0' + day;
        }
        if(min < 10){
            min = '0' + min;
        }

        return year + '-' + month + '-' + day + ' ' + hours + ':' + min;
    }

    var unique = function() {
        var key;
        return (function(){
            return key = Math.ceil(Math.random() * 9999);
        }());
    };

    var item = `
                <li class="memo__item">
                    <div class="memo__header">
                        <div class="memo__header-info">
                            <p class="memo__date">지금</p>
                            <input class="memo__title" type="text" placeholder="제목을 입력하세요.">
                        </div>
                        <div class="memo__action-box">
                            <button class="action-button action-button--save" title="저장하기">저장</button>
                            <button class="action-button action-button--delete" title="삭제하기">삭제</button>
                        </div>
                    </div>
                    <div class="memo__contents-wrap">
                        <div class="memo__contents" contenteditable="true">내용을 입력하세요.</div>
                    </div>
                </li>
    `;

    $(document).on("click", ".memo-add-button", function() {
        //메모가 없을 경우 메모 생성해주고 nodata 날려주기
        if($('.memo__list').children('.memo__item').length == 0) {
            $('.memo__nodata-item').hide();
        }
        
        $(item).appendTo($('.memo__list'));
    });

    $(document).on("click", ".action-button", function(e) {
        var parent = $(this).parents('.memo__item');
        var date = parent.find('.memo__date');
        var title = parent.find('.memo__title').val();
        var contents = parent.find('.memo__contents').text();

        if($(this).hasClass('action-button--save')) { //저장 버튼
            //Key 값이 없을 경우 최초 생성
            
            if(!parent.attr('data-id')) {
                parent.attr('data-id', unique());
            }

            //제목 입력값 없을 경우
            if(title === '') {
                parent.find('.memo__title').val('-');
            }

            //메모 data 넣어주기
            var info = `{ "key": "${parent.attr('data-id')}", "title": "${title}", "contents": "${contents}", "date": "${time()}" }`;
            Storage.prototype.data.push(info);

            //작성 시간 넣어주기
            date.show().text(time());

            //저장 후 수정 버튼으로 교체시켜주기
            $(this).addClass('action-button--modify').removeClass('action-button--save').attr('title', '수정하기').text('수정');

            console.log('저장완료', Storage.prototype.data);
        } else if ($(this).hasClass('action-button--modify')) { //수정 버튼
            var i;
            var obj;

            Storage.prototype.data.forEach((item, index) => {
                obj = ( typeof Storage.prototype.data[index] === 'string' ? JSON.parse(Storage.prototype.data[index]) : Storage.prototype.data[index] );
                if(obj.key == parent.attr('data-id')) {
                    i = index;
                    
                    if(obj.title !== title ||obj.contents !== contents) { //입력되어있던 제목 혹은 내용이 같지 않다면
                    if(confirm('수정하시겠습니까?')) {
                            if(obj.title !== title) {
                                console.log('제목이 달라서 수정했어');
            
                                obj.title = `${title}`;
                            }
            
                            if(obj.contents !== contents) {
                                console.log('내용이 달라서 수정했어');
            
                                obj.contents = `${contents}`;
                            }
                    }
                    date.text(time());
                    obj.date = `${time()}`;
                    }
                }
            });

            Storage.prototype.data[i] = obj;
            console.log('수정완료', Storage.prototype.data);
        } else if ($(this).hasClass('action-button--delete')) { // 삭제 버튼
            if (confirm('메모를 삭제하시겠습니까?')) {
                var obj;
                parent.remove();
                Storage.prototype.data.forEach((item, index) => {
                    obj = ( typeof Storage.prototype.data[index] === 'string' ? JSON.parse(Storage.prototype.data[index]) : Storage.prototype.data[index] );
                    if(obj.key == parent.attr('data-id')) {
                        delete Storage.prototype.data[index];
                    }
                });

                Storage.prototype.data = Storage.prototype.data.filter(function(n) {
                    return n !== 'empty';
                });
            }
            
            console.log('삭제완료', Storage.prototype.data);
        }

    });


    $(document).on('focusin', '.memo__contents', function(e) {
        if($(this).text() === '내용을 입력하세요.') {
            $(this).text('');
        }
    });

    $(document).on('focusout', '.memo__contents', function(e) {
        if($(this).text() === '') {
            $(this).text('내용을 입력하세요.');
        }
    });

}());