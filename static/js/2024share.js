var govshare = govshare || {
    version: "1.0"
};
(function() {
    var share = $('#share');
    var share_more = $('.gwds_more', share);
    var sharePopup = $('#share-popup');
    var close = $('b', sharePopup);
    var title = encodeURIComponent(document.title);
    var title1 = $('.detail>h1').text();
    var url = window.location.href; //正式分享地址代码
	$('#ewm_share').qrcode(url);
    var shareA = $('.share-btn');
    $('.gwds_weixin').click(function() {
        $('#div_div').html('');
        $('#div_div').qrcode(url);
        $('.code-box').show();
    });
	
	
    $('.weixin_close').click(function() {
        $('.code-box').hide();
        $('#div_div').html('');
    })
    var list = {
        'gwds_tsina': 'http://service.weibo.com/share/share.php?url=' + url + "&title=" + title + '-' + title1,
    }
    var UnityFunction = {
        init: function() {
            this.more();
            this.bindShare();
        },
        more: function() {
            var _this = this;
            share_more.on('mouseenter', function() {
                sharePopup.show();
                _this.setPosition();
            }).on('mouseleave', function() {
                outTimer = setTimeout(function() {
                    sharePopup.hide();
                }, 200);
            });
            sharePopup.on('mouseenter', function() {
                clearTimeout(outTimer)
                sharePopup.show();
            }).on('mouseleave', function() {
                sharePopup.hide();
            });
            close.on('click', function() {
                sharePopup.hide();
            })
        },
        setPosition: function() {
            var position = share.offset();
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            var left = winWidth - position.left < 350 ? 'left' : 'right';
            var top = winHeight - position.top < 150 ? 'top' : 'bottom';
            sharePopup.css({
                left: (position.left + 141) + 'px',
                top: (position.top + 28) + 'px'
            })
            sharePopup.removeClass().addClass(left + ' share-popup ' + top);

        },
        bindShare: function() {
            shareA.on('click', function() {
                var key = $(this).data('w');
                if (key != 'gwds_weixin') {
                    window.open(list[key]);
                    return false
                }
            })
        }

    }
    UnityFunction.init()
})();