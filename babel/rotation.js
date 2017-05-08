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
    listenAnimationEnd: function listenAnimationEnd() {
        //动画完成后设置状态 
        var _this = this;
        $('.images img').on('animationend webkitAnimationEnd', function () {
            _this.isFinish = true;
            var showImgValue = $('.midImg').attr('value');
            if (showImgValue - 0 === 1) {
                $('.images .leftImg').removeClass().addClass('rightImg');
            }
            if (showImgValue - 0 === _this.imgLength) {
                $('.images .rightImg').removeClass().addClass('leftImg');
            }
        });
    },
    active: function active() {
        this.activeId = $('.midImg').attr('value') - 0;
        $('.active').removeClass('active');
        $('.circle[value="' + this.activeId + '"]').addClass('active');
    },
    turn: function turn(way, e) {
        var clickCircle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        if (this.isFinish) {
            this.isFinish = false;
            if (way === 'right') {
                e = e || $($('.rightImg')[0]);
                if ($('.midImg').attr('value') - 0 < this.imgLength) {
                    $('.midImg').removeClass().addClass('midToLeft leftImg');
                    e.removeClass().addClass('rightToMid midImg');
                } else {
                    $('.midImg').removeClass().addClass('midToLeft leftImg');
                    $($('.images img')[0]).removeClass().addClass('rightToMid midImg');
                }
            } else {
                e = e || $($('.leftImg')[$('.leftImg').length - 1]);
                if ($('.midImg').attr('value') - 0 > 1) {
                    $('.midImg').removeClass().addClass('midToRight rightImg');
                    e.removeClass().addClass('leftToMid midImg');
                } else {
                    $('.midImg').removeClass().addClass('midToRight rightImg');
                    $($('.images img')[this.imgLength - 1]).removeClass().addClass('leftToMid midImg');
                }
            }
            if (clickCircle) {
                $('.active').removeClass('active');
                $(clickCircle.target).addClass('active');
            } else {
                this.active();
            }
        }
    },

    //点击圆点时正方形的移动
    turnClick: function turnClick(e) {
        var nowValue = $(e.target).attr("value") - 0;
        if (nowValue) {
            if (!$(e.target).hasClass('active')) {
                this.activeId = $('.active').attr('value') - 0;
                if (this.activeId < nowValue) {
                    this.turn('right', $('img[value="' + nowValue + '"]'), e);
                } else {
                    this.turn('left', $('img[value="' + nowValue + '"]'), e);
                }
            }
        }
    }
};
loopPic.listenAnimationEnd();
$('.images').on('touchstart', function (e) {
    startX = e.touches[0].pageX;
});
$('.images').on('touchend', function (e) {
    endX = e.changedTouches[0].pageX;
    offset = endX - startX;
    if (Math.abs(offset) > 30) {
        if (offset >= 0) {
            loopPic.turn('left');
        } else {
            loopPic.turn('right');
        }
    }
});

$('.pages').on('click', function (e) {
    loopPic.turnClick(e);
});
$('.leftIcon').on('click', function () {
    loopPic.turn('left');
});
$('.rightIcon').on('click', function () {
    loopPic.turn('right');
});