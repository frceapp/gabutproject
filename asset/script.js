$(window).on("load", function () {
    window.cookie_username = $.cookie("username")
    window.features = ['Test', 'Kalkulator', 'Note']
    window.feature_ke = 0

    window.feature = function feature(fastload=false) {
        if (fastload) {
            var loadtime = 0
            var path = $.cookie("path")
        } else {
            $('#main').css('opacity', `0%`)
            var loadtime = 1000
            var path = window.features[window.feature_ke].toLowerCase()
        }

        setTimeout(function () {
            $.ajax({
                type: "GET",
                url: window.location.origin + '/features/' + path + '.html',
                success: function (response) {
                    $('#main').css('opacity', `100%`)
                    $('#main').html(response)
                    $('#main').append(`
                        <a id='home-button' class="float">
                            <i class="fa fa-home my-float"></i>
                        </a>
                    `)

                    $.cookie("path", path, {
                        expires: 1,
                        secure: true
                    })

                    $('#home-button').click(function() {
                        $.cookie("path", 'home', {
                            expires: 1,
                            secure: true
                        })

                        location.reload()
                    })
                }
            });
        }, loadtime)
    }

    window.afterlogin = function () {
        $('#logout').click(function () {
            $.removeCookie('username')
            $.removeCookie('path')
            location.reload()
        })

        $('#list-f').html(`<br><button type="button" id="${window.features[0]}" class="btn btn-danger list-f-i btn-feature">${window.features[0]}</button>`)

        $('.btn-control').click(function () {
            var curbtn = $(this).val()
            run = false

            if (curbtn == 'prev' && window.feature_ke > 0) {
                window.feature_ke -= 1

                run = true
            } else if (curbtn == 'next' && window.feature_ke < window.features.length - 1) {
                window.feature_ke += 1

                run = true
            }

            if (!run) {
                return;
            }

            $('#list-f').html(`<br><button type="button" value="${window.features[window.feature_ke]}" class="btn btn-danger list-f-i btn-feature">${window.features[window.feature_ke]}</button>`)

            $('.btn-feature').click(function () {
                feature()
            })
        })

        $('.btn-feature').click(function () {
            feature()
        })
    }

    setTimeout(function () {
        $('#main').css('opacity', `0`)
        setTimeout(function () {
            if (typeof window.cookie_username === 'undefined') {
                $('#main').html($('.login').html())
            } else {

                if (typeof $.cookie("path") === 'undefined') {
                    $.cookie("path", 'home', {
                        expires: 1,
                        secure: true
                    })

                    var load_home = true
                } else if ($.cookie("path") != 'home') {
                    feature(true)
                    var load_home = false
                } else {
                    var load_home = true
                }

                if (load_home) {
                    $('#username-out').html(`Wellcome, ${window.cookie_username}`)
                    $('title').html(`${window.cookie_username} - Gabut Project`)

                    $('#main').html($('#after-login').html())

                    afterlogin()
                }
            }

            $('#main').css('opacity', `1`)

            $('#username').on('input', function () {
                if ($(this).val() == '') {
                    $('#login').prop('disabled', true);
                } else {
                    $('#login').prop('disabled', false);
                }
            })

            $('#form-login').on('submit', function (e) {
                e.preventDefault();
                $('#login').trigger('click');
            });

            $('#login').click(function () {
                $('#main').css('transform', `translateX(-100%)`)

                var username = $('#username').val()

                if (typeof window.cookie_username === 'undefined') {
                    $.cookie("username", username, {
                        expires: 1,
                        secure: true
                    })

                    window.cookie_username = $.cookie("username");
                }

                $('#username-out').html(`Wellcome, ${window.cookie_username}`)

                $('title').html(`${window.cookie_username} - Gabut Project`)

                setTimeout(function () {
                    $('#main').html($('#after-login').html())

                    $('#main').css('transform', `translateX(0%)`)

                    afterlogin()
                }, 1000)
            })
        }, 100)
    }, 0)
});