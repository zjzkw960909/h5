let startX, endX, offset

var loopPic = {
    activeId: $('.active').attr('value') - 0,//当前图对应的原点
    imgLength: $('.images img').length,//图片总数
    isFinish: true, //判断是否完成动画
    setTime () {
        let time = setInterval(() => {
            this.isFinish = true
            clearInterval(time)
        }, 1050)
    },
    leftActive () {
        this.activeId = $('.active').attr('value') - 0
        if (this.activeId !== this.imgLength) {
            $('.active').removeClass('active')
            $(`.circle[value="${this.activeId + 1}"]`).addClass('active')
        }
    },
    rightActive () {
        this.activeId = $('.active').attr('value') - 0
        if (this.activeId !== 1) {
            $('.active').removeClass('active')
            $(`.circle[value="${this.activeId - 1}"]`).addClass('active')
        }
    },
    turnLeft (e = $($('.rightImg')[0]), clickCircle = null) {
        if ((clickCircle || $('.rightImg').length) && this.isFinish) {
            this.isFinish = false
            $('.midImg').removeClass().addClass('midToLeft leftImg')
            e.removeClass().addClass('rightToMid midImg')
            if (clickCircle) {
                $('.active').removeClass('active')
                $(clickCircle.target).addClass('active')
            } else {
                this.leftActive()
            }
            this.setTime()
        }
    },
    turnRight (e = $($('.leftImg')[$('.leftImg').length - 1]), clickCircle = null)  {
        if ((clickCircle || $('.leftImg').length) && this.isFinish) {
            this.isFinish = false
            $('.midImg').removeClass().addClass('midToRight rightImg')
            e.removeClass().addClass('leftToMid midImg')
            if (clickCircle) {
                $('.active').removeClass('active')
                $(clickCircle.target).addClass('active')
            } else {
                this.rightActive()
            }
            this.setTime()
        }
    },
    turnClick (e) {
        let nowValue = $(e.target).attr("value") - 0
        if (nowValue) {
            if (!$(e.target).hasClass('active')) {
                this.activeId = $('.active').attr('value') - 0
                if (this.activeId < nowValue) {
                    this.turnLeft($(`img[value="${nowValue}"]`), e)
                } else {
                    this.turnRight($(`img[value="${nowValue}"]`), e) 
                }
                this.setTime()
            }
        }
    }
}

$('.images').on('touchstart', (e) => {
    startX = e.touches[0].pageX
})
$('.images').on('touchend', (e) => {
    endX = e.changedTouches[0].pageX
    offset = endX - startX
    if (Math.abs(offset) > 30) {
        if (offset >= 0) {
            loopPic.turnRight()
        } else {
            loopPic.turnLeft()
        }
    }
})

$('.pages').on('click', (e) => {
    loopPic.turnClick(e)
})
$('.leftIcon').on('click', () => {
    loopPic.turnRight()
})
$('.rightIcon').on('click', () => {
    loopPic.turnLeft()
})
