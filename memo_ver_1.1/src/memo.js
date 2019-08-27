(function(date){
    var App = function() {};

    App.prototype.data = {
        //[1] 시간기록
        time: (function(date){
            function numbering(num) {
                return num < 10 ? '0' + num : num;
            };

            var year = date.getFullYear();
            var month = numbering(date.getMonth() + 1);
            var day = numbering(date.getDate());
            var hours = numbering(date.getHours());
            var sec = numbering(date.getSeconds());
            var min = numbering(date.getMinutes());
            var days = [year, month, day].join('-');
            var times = [hours, min, sec].join(':');
            var total = days.concat(' ' + times);

            return total;
        })(new Date()),
        //[2] 코드 생성
        key: function() {
            var key;
            return (function(){
                return key = (Math.random() * 0x10000).toString(16).substring(5);
            }());
        },
        //[3] 코드, 내용, 시간 등 저장
        storage: ['id, contents, time 등 저장']
    };

    var headerBtn = document.querySelectorAll('.memo-header-button');
    headerBtn.forEach(function(button) {
        button.addEventListener('click', function(e){
            this.getAttribute('data-id') === null ? this.setAttribute('data-id', App.prototype.data.key()) : e.preventDefault();
            
            e.preventDefault();
        });
    });
})();
