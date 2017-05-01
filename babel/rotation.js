'use strict';

/*
 * 功能说明:
 * 立体移动的正方形轮播图
 * 插件依赖:zepto
 */

var startX = void 0,
    endX = void 0,
    offset = void 0;

var loopPic = {
    activeId: $('.active').attr('value') - 0, //当前图对应的原点
    imgLength: $('.images img').length, //图片总数
    isFinish: true, //判断是否完成动画
    setTime: function setTime() {
        var _this = this;

        //动画完成后设置状态 
        var time = setInterval(function () {
            _this.isFinish = true;
            clearInterval(time);
        }, 1050);
    },

    //左移时，改变圆点状态
    leftActive: function leftActive() {
        this.activeId = $('.active').attr('value') - 0;
        if (this.activeId !== this.imgLength) {
            $('.active').removeClass('active');
            $('.circle[value="' + (this.activeId + 1) + '"]').addClass('active');
        }
    },

    //右移时，改变原点状态
    rightActive: function rightActive() {
        this.activeId = $('.active').attr('value') - 0;
        if (this.activeId !== 1) {
            $('.active').removeClass('active');
            $('.circle[value="' + (this.activeId - 1) + '"]').addClass('active');
        }
    },

    //正方形向左移动
    turnLeft: function turnLeft() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $($('.rightImg')[0]);
        var clickCircle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if ((clickCircle || $('.rightImg').length) && this.isFinish) {
            this.isFinish = false;
            $('.midImg').removeClass().addClass('midToLeft leftImg');
            e.removeClass().addClass('rightToMid midImg');
            if (clickCircle) {
                $('.active').removeClass('active');
                $(clickCircle.target).addClass('active');
            } else {
                this.leftActive();
            }
            this.setTime();
        }
    },

    //正方形向右移动
    turnRight: function turnRight() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $($('.leftImg')[$('.leftImg').length - 1]);
        var clickCircle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if ((clickCircle || $('.leftImg').length) && this.isFinish) {
            this.isFinish = false;
            $('.midImg').removeClass().addClass('midToRight rightImg');
            e.removeClass().addClass('leftToMid midImg');
            if (clickCircle) {
                $('.active').removeClass('active');
                $(clickCircle.target).addClass('active');
            } else {
                this.rightActive();
            }
            this.setTime();
        }
    },

    //点击圆点时正方形的移动
    turnClick: function turnClick(e) {
        var nowValue = $(e.target).attr("value") - 0;
        if (nowValue) {
            if (!$(e.target).hasClass('active')) {
                this.activeId = $('.active').attr('value') - 0;
                if (this.activeId < nowValue) {
                    this.turnLeft($('img[value="' + nowValue + '"]'), e);
                } else {
                    this.turnRight($('img[value="' + nowValue + '"]'), e);
                }
                this.setTime();
            }
        }
    }
};

$('.images').on('touchstart', function (e) {
    startX = e.touches[0].pageX;
});
$('.images').on('touchend', function (e) {
    endX = e.changedTouches[0].pageX;
    offset = endX - startX;
    if (Math.abs(offset) > 30) {
        if (offset >= 0) {
            loopPic.turnRight();
        } else {
            loopPic.turnLeft();
        }
    }
});

$('.pages').on('click', function (e) {
    loopPic.turnClick(e);
});
$('.leftIcon').on('click', function () {
    loopPic.turnRight();
});
$('.rightIcon').on('click', function () {
    loopPic.turnLeft();
});