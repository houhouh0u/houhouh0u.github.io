$(function () {
    var $pages_container = $('.pages_container');
    var $pages = $('.pages');
    var $point_list = $('span');
    var $len = $pages.length;
    var $height = $(window).height();
    var iPoint = 0;
    var timer = null;//设置一个空值，没有这个无法实现函数节流（原理待查找）
    $pages.css('height', $height);
    //给第一个页面的内容一开始就加上动画
    $pages.eq(0).addClass('moving');
    $point_list.click(function () {
        var iNum = $(this).index();
        $pages_container.animate({ 'top': -iNum * $height }, 300);
        //这一句要放在定时器里面，在外面的话iPoint会-1；原因是定时器没执行完iPoint的值还是之前全局变量存的
        $point_list.eq(iNum).addClass('active').siblings().removeClass('active');
        //给当前页面增加动画内容
        $pages.eq(iNum).addClass('moving').siblings().removeClass('moving');
    })
    //鼠标滑动事件
    $(window).mousewheel(function (event, dat) {
        console.log(dat);
        console.log($len);
        clearTimeout(timer);
        timer = setTimeout(function () {
            if (dat == -1) {
                iPoint--;
            }
            else {
                iPoint++;
            }
            if (iPoint >= 0) {
                iPoint = 0
            }
            else if (iPoint < 1 - $len) {
                iPoint = 1 - $len;
            }
            //页面的切换动画
            $pages_container.animate({ 'top': iPoint * $height }, 300);
            //这一句要放在定时器里面，在外面的话iPoint会-1；原因是定时器没执行完iPoint的值还是之前全局变量存的
            $point_list.eq(-iPoint).addClass('active').siblings().removeClass('active');
            //给当前页面增加动画内容
            $pages.eq(-iPoint).addClass('moving').siblings().removeClass('moving');
        }, 200)
    })
})