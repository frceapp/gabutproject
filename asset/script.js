$(window).on("load", function () {
    window.cookie_username = $.cookie("username")
    window.features = ['Test', 'Kalkulator', 'Note']
    window.feature_ke = 0

    window.feature = function feature() {
        $('#main').css('opacity', `0%`)

        setTimeout(function () {
            $.ajax({
                type: "GET",
                url: document.URL + 'features/' + window.features[window.feature_ke].toLowerCase() + '.html',
                success: function (response) {
                    $('#main').css('opacity', `100%`)
                    $('#main').html(response)
                }
            });
        }, 1000)
    }

    window.afterlogin = function () {
        $('#logout').click(function () {
            $.removeCookie('username')
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
                $('#username-out').html(`Wellcome, ${window.cookie_username}`)
                $('title').html(`${window.cookie_username} - Gabut Project`)

                $('#main').html($('#after-login').html())

                afterlogin()
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