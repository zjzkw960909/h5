html
    head
        meta(charset="utf-8" name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no")
        link(rel="stylesheet", href="../css/rotation.css")
    body
        .rotation
            img.leftIcon.icon(src="../images/right.png")
            .images
                img.midImg(value="1", src="../images/1.png")
                img.rightImg(value="2", src="../images/2.png")
                img.rightImg(value="3", src="../images/3.png")
            img.rightIcon.icon(src="../images/left.png")
            .pages
                span.circle.active(value="1")
                span.circle(value="2")
                span.circle(value="3")
        script(type="text/javascript", src="http://apps.bdimg.com/libs/zepto/1.1.4/zepto.min.js")
        script(type="text/javascript", src="../babel/rotation.js")
            
        
